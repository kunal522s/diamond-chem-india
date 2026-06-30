import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CartDrawer() {
  const { items, open, setOpen, inc, dec, remove, totalAmount, totalQuantity } = useCart();
  const navigate = useNavigate();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="border-b border-border px-6 py-5">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-heading text-2xl">
              Your Cart
            </SheetTitle>

            <div className="flex items-center gap-4">
              <span className="label-tech text-muted-foreground">
                {totalQuantity} items
              </span>

              <button
                onClick={() => setOpen(false)}
                className="rounded-sm p-1 hover:bg-gray-100 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4" data-testid="cart-items-container">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="label-tech text-muted-foreground">Cart is empty</div>
              <p className="mt-2 text-sm text-muted-foreground">Add products from the catalog to get started.</p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((i) => (
                <li key={i.key} className="flex gap-3 py-4" data-testid={`cart-item-${i.key}`}>
                  <img
                    src={
                      i.image?.startsWith("http")
                        ? i.image
                        : i.image?.startsWith("/uploads")
                          ? `http://127.0.0.1:8000${i.image}`
                          : i.image
                    }
                    alt={i.product_name}
                    className="h-16 w-16 rounded-sm object-cover border border-border"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{i.product_name}</div>
                    <div className="label-tech text-muted-foreground mt-0.5">{i.variant_size} · ₹{i.variant_price}</div>
                    <div className="mt-2 flex items-center gap-1">
                      <button data-testid={`cart-dec-${i.key}`} onClick={() => dec(i.key)} className="h-7 w-7 flex items-center justify-center rounded-sm border border-border hover:border-brand-jet">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{i.quantity}</span>
                      <button data-testid={`cart-inc-${i.key}`} onClick={() => inc(i.key)} className="h-7 w-7 flex items-center justify-center rounded-sm border border-border hover:border-brand-jet">
                        <Plus className="h-3 w-3" />
                      </button>
                      <button data-testid={`cart-remove-${i.key}`} onClick={() => remove(i.key)} className="ml-2 h-7 w-7 flex items-center justify-center rounded-sm text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="font-heading font-bold">₹{i.quantity * i.variant_price}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border px-6 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="label-tech text-muted-foreground">Total</span>
              <span className="font-heading text-2xl font-bold" data-testid="cart-total-amount">₹{totalAmount.toLocaleString()}</span>
            </div>
            <button
              data-testid="proceed-checkout-btn"
              onClick={() => {
                setOpen(false);
                navigate("/checkout");
              }}
              className="w-full rounded-sm bg-brand-orange py-3 text-white font-semibold hover:bg-brand-orangeDark transition-all"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
