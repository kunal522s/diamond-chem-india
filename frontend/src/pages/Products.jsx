import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ProductCard from "@/components/ProductCard";

const CATEGORIES = [
  { key: "all", label: "All Products" },
  { key: "Car Care", label: "Car Care" },
  { key: "Bike Care", label: "Bike Care" },
  { key: "Interior", label: "Interior" },
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState("all");
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);

    api
      .get("/products")
      .then((r) => {
        setProducts(r.data);
      })
      .finally(() => {
        setLoading(false);
      });

    const category = searchParams.get("category");

    if (category) {
      setCat(category);
    } else {
      setCat("all");
    }

  }, [searchParams]);

  const filtered = products
    .filter((p) => cat === "all" || p.category === cat)
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const banners = {
    "Car Care": "/images/car-care-banner.png",
    "Bike Care": "/images/bike-care-banner.png",
    "Interior": "/images/interior-care-banner.png",
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <CartDrawer />

      <section className="border-b border-border bg-secondary">
        <div className="container mx-auto px-4 md:px-8 py-12">
          <div className="label-tech text-brand-orange mb-2">Full Catalog</div>
          <h1 className="font-heading text-4xl md:text-6xl font-black uppercase tracking-tight">Products</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">Browse our complete range of automotive care chemicals. Select your variant and add to cart for instant wholesale pricing.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-8 py-10 flex-1">
        {cat !== "all" && (
          <div className="mb-8 overflow-hidden rounded-2xl shadow-xl border border-border aspect-[1920/450]">
            <img
              src={banners[cat]}
              alt={cat}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex flex-wrap items-center gap-3 mb-8 justify-between">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                data-testid={`filter-${c.key}`}
                onClick={() => setCat(c.key)}
                className={`label-tech rounded-sm border px-4 py-2 transition-all ${cat === c.key
                  ? "bg-brand-jet text-white border-brand-jet"
                  : "bg-white text-brand-jet border-border hover:border-brand-jet"
                  }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <input
            data-testid="product-search-input"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-sm border border-border px-4 py-2 text-sm w-full sm:w-72 focus:outline-none focus:border-brand-jet"
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-brand-orange animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="py-20 text-center text-muted-foreground">
                No products match your filters.
              </div>
            )}
          </>
        )}
        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">No products match your filters.</div>
        )}
      </section>

      <Footer />
    </div>
  );
}
