from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
import jwt
import bcrypt
from datetime import datetime, timezone, timedelta
from fastapi import UploadFile, File
from fastapi.staticfiles import StaticFiles
import shutil
import cloudinary
import cloudinary.uploader
import razorpay
import hmac
import hashlib


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

cloudinary.config(
    cloud_name=os.environ['CLOUD_NAME'],
    api_key=os.environ['API_KEY'],
    api_secret=os.environ['API_SECRET'],
    secure=True,
)
razorpay_client = razorpay.Client(
    auth=(
        os.environ["RAZORPAY_KEY_ID"],
        os.environ["RAZORPAY_KEY_SECRET"],
    )
)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Auth config
JWT_SECRET = os.environ.get('JWT_SECRET', 'diamond-chem-india-secret-key-2026')
ADMIN_USERNAME = os.environ.get('ADMIN_USERNAME', 'admin')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'admin123')

app = FastAPI()
api_router = APIRouter(prefix="/api")

# ---------- Models ----------
class Variant(BaseModel):
    size: str  # e.g. \"500ml\", \"2L\", \"5L\"
    price: float

class Product(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    category: str
    description: str
    image: str
    variants: List[Variant]
    featured: bool = False

    amazon_url: Optional[str] = ""
    flipkart_url: Optional[str] = ""

class ProductCreate(BaseModel):
    name: str
    category: str
    description: str
    image: str
    variants: List[Variant]
    featured: bool = False

    amazon_url: Optional[str] = ""
    flipkart_url: Optional[str] = ""

class ProductUpdate(BaseModel):
    name: str
    category: str
    description: str
    image: str
    variants: List[Variant]
    featured: bool = False
    
    amazon_url: Optional[str] = ""
    flipkart_url: Optional[str] = ""

class OrderItem(BaseModel):
    product_id: str
    product_name: str
    variant_size: str
    variant_price: float
    quantity: int

class OrderCreate(BaseModel):
    dealer_name: str
    phone: str
    email: Optional[str] = None
    address: str

    payment_method: Optional[str] = None

    products: List[OrderItem]

class RazorpayOrderCreate(BaseModel):
    dealer_name: str
    phone: str
    email: Optional[str] = None
    address: str
    products: List[OrderItem]

class Order(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))

    dealer_name: str
    phone: str
    email: Optional[str] = None
    address: str

    products: List[OrderItem]

    total_quantity: int
    total_amount: float

    # Order Status
    status: str = "Pending"

    # Payment Details
    payment_status: str = "Pending"      # Pending | Paid | Failed | Refunded
    payment_method: Optional[str] = None # UPI | Card | Net Banking | Wallet
    payment_id: Optional[str] = None
    razorpay_order_id: Optional[str] = None
    razorpay_signature: Optional[str] = None

    date: str = Field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat()
    )

class PaymentVerify(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str

    dealer_name: str
    phone: str
    email: Optional[str] = None
    address: str

    products: List[OrderItem]

class StatusUpdate(BaseModel):
    status: str

class LoginRequest(BaseModel):
    username: str
    password: str


# ---------- Auth ----------
def create_token(username: str) -> str:
    payload = {
        "sub": username,
        "exp": datetime.now(timezone.utc) + timedelta(days=7),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")

def verify_admin(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer"):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = authorization.split(" ", 1)[1]
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        if payload.get("sub") != ADMIN_USERNAME:
            raise HTTPException(status_code=401, detail="Invalid token")
        return payload["sub"]
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Diamond Chem India API"}

@api_router.get("/products", response_model=List[Product])
async def get_products():
    items = await db.products.find({}, {"_id": 0}).to_list(1000)
    return items

@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    item = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not item:
        raise HTTPException(status_code=404, detail="Product not found")
    return item

@api_router.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    result = cloudinary.uploader.upload(
        file.file,
        folder="samples",
    )

    return {
        "image": result["secure_url"]
    }

@api_router.post("/products", response_model=Product)
async def create_product(
    payload: ProductCreate,
    _: str = Depends(verify_admin)
):
    product = Product(**payload.model_dump())

    await db.products.insert_one(product.model_dump())

    return product

@api_router.put("/products/{product_id}", response_model=Product)
async def update_product(
    product_id: str,
    payload: ProductUpdate,
    _: str = Depends(verify_admin)
):
    existing = await db.products.find_one({"id": product_id})

    if not existing:
        raise HTTPException(status_code=404, detail="Product not found")

    await db.products.update_one(
        {"id": product_id},
        {
            "$set": payload.model_dump()
        }
    )

    updated = await db.products.find_one(
        {"id": product_id},
        {"_id": 0}
    )

    return updated

@api_router.delete("/products/{product_id}")
async def delete_product(
    product_id: str,
    _: str = Depends(verify_admin)
):
    result = await db.products.delete_one({"id": product_id})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")

    return {"message": "Product deleted successfully"}

@api_router.post("/payment/create-order")
async def create_razorpay_order(payload: RazorpayOrderCreate):

    total_amount = sum(
        p.quantity * p.variant_price
        for p in payload.products
    )

    razorpay_order = razorpay_client.order.create({
        "amount": int(total_amount * 100),   # paisa
        "currency": "INR",
        "payment_capture": 1
    })

    return {
        "key": os.environ["RAZORPAY_KEY_ID"],
        "amount": int(total_amount * 100),
        "currency": "INR",
        "order_id": razorpay_order["id"],
        "dealer_name": payload.dealer_name,
        "phone": payload.phone,
        "email": payload.email,
        "address": payload.address,
        "products": payload.products,
    }

@api_router.post("/payment/verify")
async def verify_payment(payload: PaymentVerify):

    generated_signature = hmac.new(
        os.environ["RAZORPAY_KEY_SECRET"].encode(),
        (
            payload.razorpay_order_id
            + "|"
            + payload.razorpay_payment_id
        ).encode(),
        hashlib.sha256,
    ).hexdigest()

    if generated_signature != payload.razorpay_signature:
        raise HTTPException(
            status_code=400,
            detail="Invalid payment signature"
        )

    total_quantity = sum(
        p.quantity
        for p in payload.products
    )

    total_amount = sum(
        p.quantity * p.variant_price
        for p in payload.products
    )

    order = Order(
        dealer_name=payload.dealer_name,
        phone=payload.phone,
        email=payload.email,
        address=payload.address,

        products=payload.products,

        total_quantity=total_quantity,
        total_amount=total_amount,

        payment_status="Paid",
        payment_method="Razorpay",

        payment_id=payload.razorpay_payment_id,
        razorpay_order_id=payload.razorpay_order_id,
        razorpay_signature=payload.razorpay_signature,
    )

    await db.orders.insert_one(order.model_dump())

    return order

@api_router.post("/orders", response_model=Order)
async def create_order(payload: OrderCreate):
    total_quantity = sum(p.quantity for p in payload.products)
    total_amount = sum(p.quantity * p.variant_price for p in payload.products)
    order = Order(
    dealer_name=payload.dealer_name,
    phone=payload.phone,
    email=payload.email,
    address=payload.address,

    payment_method=payload.payment_method,

    products=payload.products,

    total_quantity=total_quantity,
    total_amount=total_amount,
)
    doc = order.model_dump()
    await db.orders.insert_one(doc)
    return order

@api_router.get("/orders", response_model=List[Order])
async def list_orders(_: str = Depends(verify_admin)):
    items = await db.orders.find({}, {"_id": 0}).sort("date", -1).to_list(1000)
    return items

@api_router.put("/orders/{order_id}", response_model=Order)
async def update_order_status(order_id: str, payload: StatusUpdate, _: str = Depends(verify_admin)):
    if payload.status not in ["Pending", "Packed", "Dispatched", "Delivered"]:
        raise HTTPException(status_code=400, detail="Invalid status")
    result = await db.orders.find_one_and_update(
        {"id": order_id},
        {"$set": {"status": payload.status}},
        return_document=True,
        projection={"_id": 0},
    )
    if not result:
        raise HTTPException(status_code=404, detail="Order not found")
    return result

@api_router.delete("/orders/{order_id}")
async def delete_order(order_id: str, _: str = Depends(verify_admin)):
    res = await db.orders.delete_one({"id": order_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Order not found")
    return {"ok": True}

@api_router.get("/admin/stats")
async def admin_stats(_: str = Depends(verify_admin)):
    orders = await db.orders.find({}, {"_id": 0}).to_list(10000)
    total_orders = len(orders)
    total_quantity = sum(o.get("total_quantity", 0) for o in orders)
    total_revenue = sum(o.get("total_amount", 0) for o in orders)
    pending = sum(1 for o in orders if o.get("status") == "Pending")
    delivered = sum(1 for o in orders if o.get("status") == "Delivered")
    return {
        "total_orders": total_orders,
        "total_quantity": total_quantity,
        "total_revenue": total_revenue,
        "pending_orders": pending,
        "delivered_orders": delivered,
    }

@api_router.post("/auth/login")
async def admin_login(payload: LoginRequest):
    if payload.username != ADMIN_USERNAME or payload.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token(payload.username)
    return {"token": token, "username": payload.username}

@api_router.get("/auth/me")
async def me(username: str = Depends(verify_admin)):
    return {"username": username}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "server:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    )