import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function Navbar() {
  const { totalQuantity, setOpen } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState(false);

  const linkCls = (path) =>
    `label-tech transition-colors hover:text-brand-orange ${location.pathname === path ? "text-brand-orange" : "text-brand-jet"
    }`;

  const goToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    }

    setMobile(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-white/85 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link to="/" data-testid="nav-logo" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-brand-jet">
            <span className="font-heading text-lg font-black text-brand-orange">D</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-heading text-base font-bold tracking-tight">DIAMOND CHEM</span>
            <span className="label-tech text-[10px] text-muted-foreground">INDIA · B2B PORTAL</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          <Link to="/" data-testid="nav-home" className={linkCls("/")}>Home</Link>
          <Link to="/products" data-testid="nav-products" className={linkCls("/products")}>Catalog</Link>
          <button
            onClick={() => goToSection("about")}
            className="label-tech text-brand-jet transition-colors hover:text-brand-orange"
          >
            About
          </button>
          <button
            onClick={() => goToSection("contact")}
            className="label-tech text-brand-jet transition-colors hover:text-brand-orange"
          >
            Contact
          </button>
          <Link to="/admin/login" data-testid="nav-admin" className="label-tech text-muted-foreground transition-colors hover:text-brand-orange">Admin</Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            data-testid="open-cart-btn"
            onClick={() => setOpen(true)}
            className="relative flex h-10 items-center gap-2 rounded-sm border border-brand-jet bg-brand-jet px-4 text-white transition-all hover:bg-brand-orange hover:border-brand-orange"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="label-tech text-white">Cart</span>
            {totalQuantity > 0 && (
              <span
                data-testid="cart-count-badge"
                className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-orange px-1 text-xs font-bold text-white"
              >
                {totalQuantity}
              </span>
            )}
          </button>
          <button
            className="md:hidden h-10 w-10 rounded-sm border border-border flex items-center justify-center"
            onClick={() => setMobile((s) => !s)}
            data-testid="mobile-menu-btn"
          >
            {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobile && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="flex flex-col px-4 py-4 gap-4">
            <Link onClick={() => setMobile(false)} to="/" className={linkCls("/")}>Home</Link>
            <Link onClick={() => setMobile(false)} to="/products" className={linkCls("/products")}>Catalog</Link>
            <button
              onClick={() => goToSection("about")}
              className="label-tech text-left"
            >
              About
            </button>
            <button
              onClick={() => goToSection("contact")}
              className="label-tech text-left"
            >
              Contact
            </button>
            <Link onClick={() => setMobile(false)} to="/admin/login" className="label-tech">Admin</Link>
          </div>
        </div>
      )}
    </header>
  );
}