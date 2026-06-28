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


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

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
    category: str  # car, bike, interior, etc.
    description: str
    image: str
    variants: List[Variant]
    featured: bool = False

class OrderItem(BaseModel):
    product_id: str
    product_name: str
    variant_size: str
    variant_price: float
    quantity: int

class OrderCreate(BaseModel):
    dealer_name: str
    phone: str
    address: str
    products: List[OrderItem]

class Order(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    dealer_name: str
    phone: str
    address: str
    products: List[OrderItem]
    total_quantity: int
    total_amount: float
    status: str = "Pending"  # Pending, Packed, Dispatched, Delivered
    date: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

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


# ---------- Seed Products ----------
SEED_PRODUCTS = [
    {
        "name": "Premium Dashboard Polish",
        "category": "interior",
        "description": "High-gloss silicone-based dashboard polish that restores shine and protects against UV damage. Long-lasting formula for showroom finish.",
        "image": "/images/dashboard-polish.jpg",
        "variants": [{"size": "500ml", "price": 180}, {"size": "2L", "price": 650}, {"size": "5L", "price": 1500}],
        "featured": True,
    },
    {
        "name": "Heavy Duty Tyre Polish",
        "category": "car",
        "description": "Industrial-strength tyre shine that delivers deep black gloss and rubber protection. Water-resistant, ideal for fleet and dealer use.",
        "image": "/images/tyre-shiner.jpg",
        "variants": [{"size": "500ml", "price": 220}, {"size": "2L", "price": 800}, {"size": "5L", "price": 1850}],
        "featured": True,
    },
    {
        "name": "Diamond Car Polish",
        "category": "car",
        "description": "Premium cutting compound polish that removes swirl marks and oxidation. Restores paint clarity with showroom-grade results.",
        "image": "/images/car-bike-polish.jpg",
        "variants": [{"size": "500ml", "price": 350}, {"size": "2L", "price": 1250}, {"size": "5L", "price": 2900}],
        "featured": True,
    },
   {
    "name": "Super Clean Detergent",
    "category": "Detergent",
    "description": "Premium washing machine detergent formulated to remove tough stains, dirt and odours from clothes. Provides deep cleaning, fabric care and a long-lasting fresh fragrance while being suitable for both top-load and front-load washing machines.",
    "image": "/images/super-clean-detergent.jpg",
    "variants": [
        {"size": "500ml", "price": 200},
        {"size": "2L", "price": 720},
        {"size": "5L", "price": 1650}
    ],
    "featured": True,
},
    {
    "name": "Spray Polish",
    "category": "car",
    "description": "Premium spray polish that delivers instant shine and long-lasting protection for car and bike surfaces. Enhances gloss, repels dust, and leaves a smooth, streak-free finish.",
    "image": "/images/spray-polish.jpg",
    "variants": [
        {"size": "500ml", "price": 240},
        {"size": "2L", "price": 880},
        {"size": "5L", "price": 2050}
    ],
    "featured": False,
},
    {
    "name": "Throttle Body Cleaner",
    "category": "car",
    "description": "Professional throttle body cleaner that quickly removes carbon deposits, oil residue and dirt from throttle bodies, carburetors and air intake systems. Restores smooth throttle response, improves engine performance and enhances fuel efficiency.",
    "image": "/images/throttle-body-cleaner.jpg",
    "variants": [
        {"size": "500ml", "price": 280},
        {"size": "2L", "price": 1020},
        {"size": "5L", "price": 2380}
    ],
    "featured": False,
},
    {
        "name": "Engine Degreaser",
        "category": "car",
        "description": "Heavy-duty engine bay degreaser. Cuts through grease, oil and grime in seconds. Safe on all engine surfaces.",
        "image": "https://images.pexels.com/photos/6873088/pexels-photo-6873088.jpeg",
        "variants": [{"size": "500ml", "price": 280}, {"size": "2L", "price": 1020}, {"size": "5L", "price": 2380}],
        "featured": False,
    },
    {
        "name": "Leather Conditioner",
        "category": "interior",
        "description": "Nutrient-rich leather conditioner that softens, protects and restores natural leather. Prevents cracking and fading.",
        "image": "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg",
        "variants": [{"size": "500ml", "price": 380}, {"size": "2L", "price": 1380}, {"size": "5L", "price": 3200}],
        "featured": False,
    },
    {
    "name": "Product 1",
    "category": "car",
    "description": "Premium quality product designed for professional use. Delivers reliable performance, long-lasting protection and excellent results for everyday applications.",
    "image": "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg",
    "variants": [{"size": "500ml", "price": 380}, {"size": "2L", "price": 1380}, {"size": "5L", "price": 3200}],
    "featured": False,
},
{
    "name": "Product 2",
    "category": "interior",
    "description": "High-performance cleaning and protection solution suitable for multiple surfaces. Easy to use and provides a professional-quality finish.",
    "image": "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg",
    "variants": [{"size": "500ml", "price": 380}, {"size": "2L", "price": 1380}, {"size": "5L", "price": 3200}],
    "featured": False,
},
{
    "name": "Product 3",
    "category": "car",
    "description": "Advanced formula developed for effective cleaning, protection and long-lasting shine. Ideal for regular maintenance and professional applications.",
    "image": "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg",
    "variants": [{"size": "500ml", "price": 380}, {"size": "2L", "price": 1380}, {"size": "5L", "price": 3200}],
    "featured": False,
},
{
    "name": "Product 4",
    "category": "bike",
    "description": "Professional-grade product that enhances appearance, protects surfaces and delivers consistent performance with every use.",
    "image": "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg",
    "variants": [{"size": "500ml", "price": 380}, {"size": "2L", "price": 1380}, {"size": "5L", "price": 3200}],
    "featured": False,
}
]


@app.on_event("startup")
async def seed_db():
    count = await db.products.count_documents({})
    if count == 0:
        docs = []
        for p in SEED_PRODUCTS:
            prod = Product(**p)
            docs.append(prod.model_dump())
        await db.products.insert_many(docs)
        logger.info(f"Seeded {len(docs)} products")


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

@api_router.post("/orders", response_model=Order)
async def create_order(payload: OrderCreate):
    total_quantity = sum(p.quantity for p in payload.products)
    total_amount = sum(p.quantity * p.variant_price for p in payload.products)
    order = Order(
        dealer_name=payload.dealer_name,
        phone=payload.phone,
        address=payload.address,
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