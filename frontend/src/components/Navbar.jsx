import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const { totalQuantity, setOpen } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {

    const handleScroll = () => {

      setScrolled(window.scrollY > 50);

    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  const linkCls = (path) =>
    `relative label-tech transition-all duration-300 hover:text-brand-orange after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:bg-brand-orange after:transition-all after:duration-300 ${location.pathname === path
      ? "text-brand-orange after:w-full"
      : "text-brand-jet after:w-0 hover:after:w-full"
    }`;

  const goToSection = (id) => {

    setMobile(false);

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
      return;
    }

    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300);

  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-xl transition-all duration-500 ${scrolled ? "shadow-lg" : ""
        }`}
    >
      <div
        className={`container mx-auto flex items-center justify-between px-4 md:px-8 transition-all duration-500 ${scrolled ? "h-16" : "h-[72px]"
          }`}
      >
        <Link to="/" data-testid="nav-logo" className="flex items-center gap-2">
          <div
            className={`flex items-center justify-center rounded-xl bg-brand-jet shadow-lg transition-all duration-500 hover:rotate-6 hover:scale-110 ${scrolled ? "h-9 w-9" : "h-11 w-11"
              }`}
          >
            <span className="font-heading text-xl font-black text-brand-orange">D</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-heading text-lg font-bold tracking-tight">DIAMOND CHEM</span>
            <span className="label-tech text-[11px] tracking-[0.25em] text-gray-500">INDIA · B2B PORTAL</span>
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
            className="relative flex h-11 items-center gap-2 rounded-xl border border-brand-jet bg-brand-jet px-5 text-white transition-all duration-500 hover:scale-105 hover:bg-brand-orange hover:border-brand-orange hover:shadow-[0_12px_35px_rgba(249,115,22,.45)]"
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
            className="md:hidden h-11 w-11 rounded-xl border border-gray-300 flex items-center justify-center transition-all duration-300 hover:bg-brand-orange hover:text-white"
            onClick={() => setMobile((s) => !s)}
            data-testid="mobile-menu-btn"
          >
            {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>

        {mobile && (

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="md:hidden overflow-hidden border-t border-gray-200 bg-white shadow-xl"
          >

            <motion.div
              initial={{ y: -25 }}
              animate={{ y: 0 }}
              exit={{ y: -25 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col px-6 py-6 gap-5"
            >

              <Link
                to="/"
                onClick={() => setMobile(false)}
                className={linkCls("/")}
              >
                Home
              </Link>

              <Link
                to="/products"
                onClick={() => setMobile(false)}
                className={linkCls("/products")}
              >
                Catalog
              </Link>

              <button
                onClick={() => goToSection("about")}
                className="label-tech text-left hover:text-brand-orange transition-colors"
              >
                About
              </button>

              <button
                onClick={() => goToSection("contact")}
                className="label-tech text-left hover:text-brand-orange transition-colors"
              >
                Contact
              </button>

              <Link
                to="/admin/login"
                onClick={() => setMobile(false)}
                className="label-tech hover:text-brand-orange transition-colors"
              >
                Admin
              </Link>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>
    </header>
  );
}