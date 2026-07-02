import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { toast } from "sonner";
import { Check, ArrowLeft } from "lucide-react";

export default function Checkout() {
  const { items, totalAmount, totalQuantity, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ dealer_name: "", phone: "", address: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  const onChange = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.dealer_name || !form.phone || !form.address) {
      toast.error("Please fill all dealer details");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (items.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    setSubmitting(true);
    try {
      const res = await api.post("/orders", {
        dealer_name: form.dealer_name,
        phone: form.phone,
        address: form.address,
        products: items.map((i) => ({
          product_id: i.product_id,
          product_name: i.product_name,
          variant_size: i.variant_size,
          variant_price: i.variant_price,
          quantity: i.quantity,
        })),
      });
      setSuccess(res.data);
      clear();
      toast.success("Order placed successfully!");
    } catch (err) {
      toast.error("Failed to place order. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <CartDrawer />
        <section className="flex-1 container mx-auto px-4 md:px-8 py-24 flex flex-col items-center text-center">
          <div className="h-20 w-20 rounded-full bg-brand-orange/15 flex items-center justify-center mb-6">
            <Check className="h-10 w-10 text-brand-orange" />
          </div>
          <div className="label-tech text-brand-orange mb-2">Order Confirmed</div>
          <h1 className="font-heading text-4xl md:text-5xl font-black uppercase">Thank you, {success.dealer_name}!</h1>
          <p className="mt-3 text-muted-foreground max-w-lg">
            Your wholesale order has been received. Our team will contact you shortly for dispatch confirmation.
          </p>
          <div className="mt-8 border border-border rounded-sm p-6 w-full max-w-md text-left bg-secondary">
            <div className="flex justify-between mb-2">
              <span className="label-tech text-muted-foreground">Order ID</span>
              <span className="font-mono text-xs" data-testid="order-success-id">{success.id.slice(0, 12)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="label-tech text-muted-foreground">Total Items</span>
              <span className="font-semibold">{success.total_quantity}</span>
            </div>
            <div className="flex justify-between">
              <span className="label-tech text-muted-foreground">Total Amount</span>
              <span className="font-heading font-bold text-xl">₹{success.total_amount.toLocaleString()}</span>
            </div>
          </div>
          <Link
            to="/products"
            data-testid="continue-shopping-btn"
            className="mt-8 inline-flex items-center gap-2 bg-brand-jet text-white px-6 py-3 rounded-sm font-semibold hover:bg-brand-orange transition-all"
          >
            Continue Shopping
          </Link>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <CartDrawer />

      <section className="border-b border-border bg-secondary">
        <div className="container mx-auto px-4 md:px-8 py-10">
          <Link to="/products" className="inline-flex items-center gap-2 label-tech text-muted-foreground hover:text-brand-orange mb-3">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Catalog
          </Link>
          <h1 className="font-heading text-4xl md:text-5xl font-black uppercase">Dealer Checkout</h1>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-8 py-12 flex-1 grid lg:grid-cols-5 gap-8">
        {/* SUMMARY */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <div className="border border-border rounded-sm p-6 bg-secondary sticky top-24">
            <div className="label-tech text-brand-orange mb-4">Order Summary</div>
            {items.length === 0 ? (
              <p className="text-sm text-muted-foreground">Your cart is empty.</p>
            ) : (
              <>
                <ul className="divide-y divide-border">
                  {items.map((i) => (
                    <li key={i.key} className="py-3 flex justify-between gap-2">
                      <div>
                        <div className="font-semibold text-sm">{i.product_name}</div>
                        <div className="label-tech text-muted-foreground">{i.variant_size} × {i.quantity}</div>
                      </div>
                      <div className="font-semibold">₹{(i.variant_price * i.quantity).toLocaleString()}</div>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-border pt-4 mt-2 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Items</span>
                    <span className="font-semibold">{totalQuantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="label-tech">Grand Total</span>
                    <span className="font-heading text-2xl font-bold" data-testid="checkout-total">₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={submit} className="lg:col-span-3 order-1 lg:order-2 space-y-5">
          <div className="border border-border rounded-sm p-6">
            <div className="label-tech text-brand-orange mb-1">Step 1</div>
            <h2 className="font-heading text-2xl font-bold mb-6">Dealer Information</h2>

            <div className="grid gap-5">
              <div>
                <label className="label-tech text-muted-foreground mb-2 block">Dealer / Shop Name *</label>
                <input
                  data-testid="dealer-name-input"
                  required
                  value={form.dealer_name}
                  onChange={onChange("dealer_name")}
                  placeholder="e.g. Sharma Auto Detailing"
                  className="w-full rounded-sm border border-border px-4 py-3 focus:outline-none focus:border-brand-jet"
                />
              </div>
              <div>
                <label className="label-tech text-muted-foreground mb-2 block">Phone Number *</label>
                <input
                  data-testid="dealer-phone-input"
                  required
                  type="tel"
                  value={form.phone}
                  maxLength={10}
                  pattern="[6-9][0-9]{9}"
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");

                    if (value.length <= 10) {
                      setForm((prev) => ({
                        ...prev,
                        phone: value,
                      }));
                    }
                  }}
                  placeholder="Enter 10-digit mobile number"
                  className="w-full rounded-sm border border-border px-4 py-3 focus:outline-none focus:border-brand-jet"
                />
              </div>
              <div>
                <label className="label-tech text-muted-foreground mb-2 block">Delivery Address *</label>
                <textarea
                  data-testid="dealer-address-input"
                  required
                  rows={4}
                  value={form.address}
                  onChange={onChange("address")}
                  placeholder="Shop / Warehouse address with pincode"
                  className="w-full rounded-sm border border-border px-4 py-3 focus:outline-none focus:border-brand-jet resize-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            data-testid="place-order-btn"
            disabled={submitting || items.length === 0}
            className="w-full bg-brand-orange text-white py-4 rounded-sm font-bold uppercase tracking-wider hover:bg-brand-orangeDark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Placing Order..." : `Place Order · ₹${totalAmount.toLocaleString()}`}
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
}
