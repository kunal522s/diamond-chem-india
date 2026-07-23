import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { toast } from "sonner";
import {
  Check,
  ArrowLeft,
  Wallet,
  Building2,
  CreditCard,
} from "lucide-react";
import Select from "react-select";
import { State, City } from "country-state-city";

export default function Checkout() {
  const { items, totalAmount, totalQuantity, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    dealer_name: "",
    phone: "",
    email: "",
    address: "",

    state: null,
    city: null,
    pincode: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  const onChange = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();

    if (!form.dealer_name || !form.phone || !form.address || !form.city || !form.state || !form.pincode) {
      toast.error("Please fill all dealer details");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!/^\d{6}$/.test(form.pincode)) {
      toast.error("Please enter a valid 6-digit pincode.");
      return;
    }

    if (items.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    setSubmitting(true);

    try {
      const { data } = await api.post("/payment/create-order", {
        dealer_name: form.dealer_name,
        phone: form.phone,
        email: form.email,
        address: `${form.address}, ${form.city.label}, ${form.state.label} - ${form.pincode}`,

        products: items.map((i) => ({
          product_id: i.product_id,
          product_name: i.product_name,
          product_image: i.image,
          variant_size: i.variant_size,
          variant_price: i.variant_price,
          quantity: i.quantity,
        })),
      });

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "Diamond Chem India",
        description: "Order Payment",
        order_id: data.order_id,

        handler: async function (response) {
          try {
            const verify = await api.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,

              dealer_name: form.dealer_name,
              phone: form.phone,
              email: form.email,
              address: `${form.address}, ${form.city.label}, ${form.state.label} - ${form.pincode}`,

              products: items.map((i) => ({
                product_id: i.product_id,
                product_name: i.product_name,
                product_image: i.image,
                variant_size: i.variant_size,
                variant_price: i.variant_price,
                quantity: i.quantity,
              })),
            });

            localStorage.setItem("customerPhone", form.phone);

            setSuccess(verify.data);

            clear();

            toast.success("Payment Successful");
          } catch (err) {
            console.error(err);
            toast.error("Payment verification failed.");
          }
        },

        prefill: {
          name: form.dealer_name,
          contact: form.phone,
          ...(form.email && { email: form.email }),
        },

        theme: {
          color: "#f97316",
        },
      };

      const razor = new window.Razorpay(options);

      razor.on("payment.failed", function () {
        toast.error("Payment Failed");
      });

      razor.open();
    } catch (err) {
      console.error(err);
      toast.error("Unable to start payment.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (success) {
      window.scrollTo(0, 0);
    }
  }, [success]);

  if (success) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <CartDrawer />
        <section className="flex-1 container mx-auto px-4 md:px-8 py-24 flex flex-col items-center text-center">
          <div className="h-20 w-20 rounded-full bg-brand-orange/15 flex items-center justify-center mb-6">
            <Check className="h-10 w-10 text-brand-orange" />
          </div>
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            ✅ Payment Successful
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-black uppercase">Thank you, {success.dealer_name}!</h1>
          <p className="mt-4 text-muted-foreground max-w-xl leading-7">
            Thank you for placing your order with <strong>Diamond Chem India</strong>.
            Your payment has been received successfully and our sales team will
            verify your order before dispatch.
          </p>
          <div className="mt-10 border border-border rounded-xl shadow-sm p-6 w-full max-w-lg text-left bg-white">
            <div className="flex justify-between mb-2">
              <span className="label-tech text-muted-foreground">Order ID</span>
              <span className="font-mono text-xs" data-testid="order-success-id">{success.id.slice(0, 12)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="label-tech text-muted-foreground">Total Items</span>
              <span className="font-semibold">{success.total_quantity}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="label-tech text-muted-foreground">
                Total Amount
              </span>

              <span className="font-heading font-bold text-xl">
                ₹{success.total_amount.toLocaleString()}
              </span>
            </div>

            <hr className="my-4" />

            <div className="space-y-2 text-sm">

              <div className="flex justify-between">
                <span className="text-muted-foreground">Dealer</span>
                <span>{success.dealer_name}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment</span>
                <span className="text-green-600 font-semibold">
                  Successful
                </span>
              </div>

            </div>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

            <Link
              to="/products"
              data-testid="continue-shopping-btn"
              className="inline-flex items-center justify-center gap-2 bg-brand-jet text-white px-6 py-3 rounded-sm font-semibold hover:bg-brand-orange transition-all"
            >
              Continue Shopping →
            </Link>

            <Link
              to="/my-orders"
              className="inline-flex items-center justify-center gap-2 border border-brand-orange text-brand-orange px-6 py-3 rounded-sm font-semibold hover:bg-brand-orange hover:text-white transition-all"
            >
              📦 View My Orders
            </Link>

            <a
              href={`/api/invoice/${success.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-sm font-semibold hover:bg-green-700 transition-all"
            >
              📄 Download Invoice
            </a>

          </div>
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
                    <li
                      key={i.key}
                      className="py-4 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">

                        <img
                          src={
                            i.image?.startsWith("http")
                              ? i.image
                              : i.image?.startsWith("/uploads")
                                ? `http://127.0.0.1:8000${i.image}`
                                : i.image
                          }
                          alt={i.product_name}
                          className="w-16 h-16 rounded-lg border object-contain bg-white p-1"
                        />

                        <div>
                          <div className="font-semibold text-sm">
                            {i.product_name}
                          </div>

                          <div className="text-xs text-gray-500">
                            {i.variant_size}
                          </div>

                          <div className="text-sm text-gray-500 mt-1">
                            Qty : {i.quantity}
                          </div>
                        </div>

                      </div>

                      <div className="font-bold text-green-600">
                        ₹{(i.variant_price * i.quantity).toLocaleString()}
                      </div>
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
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="label-tech text-brand-orange mb-1">
                  Step 1
                </div>

                <h2 className="font-heading text-2xl font-bold">
                  Dealer Information
                </h2>
              </div>

              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-md text-sm font-semibold">
                🔒 100% Secure Checkout
              </div>
            </div>

            <div className="grid gap-5">
              <div>
                <label className="label-tech text-muted-foreground mb-2 block">Dealer / Shop Name *</label>
                <input
                  data-testid="dealer-name-input"
                  required
                  value={form.dealer_name}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      dealer_name: e.target.value.toUpperCase(),
                    }))
                  }
                  placeholder="e.g. SHARMA AUTO DETAILING"
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
                <label className="label-tech text-muted-foreground mb-2 block">
                  Email Address <span className="text-gray-400">(Optional)</span>
                </label>

                <input
                  type="email"
                  value={form.email}
                  onChange={onChange("email")}
                  placeholder="dealer@example.com"
                  className="w-full rounded-sm border border-border px-4 py-3 focus:outline-none focus:border-brand-jet"
                />
              </div>
              <div>
                <label className="label-tech text-muted-foreground mb-2 block">
                  Delivery Address *
                </label>

                <p className="text-xs text-muted-foreground mb-2">
                  Enter complete shop or warehouse address for delivery.
                </p>
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
              <div className="grid md:grid-cols-2 gap-5">

                <div>
                  <label className="label-tech text-muted-foreground mb-2 block">
                    State *
                  </label>

                  <Select
                    placeholder="Select State"
                    options={State.getStatesOfCountry("IN").map((s) => ({
                      value: s.isoCode,
                      label: s.name,
                    }))}

                    value={form.state}

                    onChange={(value) =>
                      setForm((prev) => ({
                        ...prev,
                        state: value,
                        city: null,
                      }))
                    }

                    isSearchable
                  />
                </div>

                <div>
                  <label className="label-tech text-muted-foreground mb-2 block">
                    City *
                  </label>

                  <Select
                    placeholder="Select City"

                    options={
                      form.state
                        ? City.getCitiesOfState("IN", form.state.value).map((c) => ({
                          value: c.name,
                          label: c.name,
                        }))
                        : []
                    }

                    value={form.city}

                    onChange={(value) =>
                      setForm((prev) => ({
                        ...prev,
                        city: value,
                      }))
                    }

                    isDisabled={!form.state}
                    isSearchable
                  />
                </div>


              </div>

              <div>
                <label className="label-tech text-muted-foreground mb-2 block">
                  Pincode *
                </label>

                <>
                  <input
                    required
                    inputMode="numeric"
                    maxLength={6}
                    value={form.pincode}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        pincode: e.target.value.replace(/\D/g, ""),
                      }))
                    }
                    placeholder="e.g. 245101"
                    className="w-full rounded-sm border border-border px-4 py-3 focus:outline-none focus:border-brand-jet"
                  />

                  <p className="text-xs text-muted-foreground mt-2">
                    We currently deliver across India.
                  </p>
                </>
              </div>
            </div>
          </div>

          <div className="border border-border rounded-sm p-5 bg-secondary">
            <h3 className="font-semibold mb-3">
              Accepted Payment Methods
            </h3>

            <div className="flex flex-wrap gap-3">
              <span className="border rounded-md px-3 py-2 text-sm">
                💳 Cards
              </span>

              <span className="border rounded-md px-3 py-2 text-sm">
                <Wallet className="h-4 w-4 inline mr-2" /> UPI
              </span>

              <span className="border rounded-md px-3 py-2 text-sm">
                <Building2 className="h-4 w-4 inline mr-2" /> Net Banking
              </span>

              <span className="border rounded-md px-3 py-2 text-sm">
                <CreditCard className="h-4 w-4 inline mr-2" /> Wallets
              </span>
            </div>
          </div>

          <button
            type="submit"
            data-testid="place-order-btn"
            disabled={submitting || items.length === 0}
            className="w-full bg-brand-orange text-white py-4 rounded-sm font-bold uppercase tracking-wider hover:bg-brand-orangeDark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting
              ? "Redirecting to Secure Payment..."
              : `Proceed to Pay ₹${totalAmount.toLocaleString()}`}
          </button>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            🔒 Secure payment powered by Razorpay. Your payment details are encrypted and protected.
          </p>
        </form>
      </section>

      <Footer />
    </div>
  );
}
