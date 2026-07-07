import { useState } from "react";
import ProductDetailsModal from "@/components/ProductDetailsModal";
import { Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export default function ProductCard({ product }) {
  const [variant, setVariant] = useState(product.variants[0]);
  const [openDetails, setOpenDetails] = useState(false);
  const { addItem } = useCart();

  return (
    <>
      <article
        data-testid={`product-card-${product.id}`}
        className="card-tech flex flex-col rounded-sm overflow-hidden"
      >
        <div className="relative aspect-square overflow-hidden border-b border-border bg-secondary">
          <img
            src={
              product.image?.startsWith("http")
                ? product.image
                : product.image?.startsWith("/uploads")
                  ? `http://127.0.0.1:8000${product.image}`
                  : product.image
            }
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 bg-brand-jet text-white px-2 py-1 label-tech rounded-sm">
            {product.category}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-heading text-lg font-bold leading-tight">{product.name}</h3>
          <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{product.description}</p>

          <div className="mt-4">
            <div className="label-tech text-muted-foreground mb-2">Select Variant</div>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.size}
                  data-testid={`variant-${product.id}-${v.size}`}
                  onClick={() => setVariant(v)}
                  className={`rounded-sm border px-3 py-1.5 text-xs font-semibold transition-all ${variant.size === v.size
                    ? "border-brand-jet bg-brand-jet text-white"
                    : "border-border bg-white text-brand-jet hover:border-brand-jet"
                    }`}
                >
                  {v.size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-end justify-between gap-3">
            {/* Price */}
            <div className="flex-1">
              <div className="label-tech text-muted-foreground">
                MRP
              </div>

              <div
                className="font-heading text-2xl font-bold text-brand-jet"
                data-testid={`price-${product.id}`}
              >
                ₹{variant.price}
              </div>
            </div>

            {/* View Details */}
            <button
              onClick={() => setOpenDetails(true)}
              className="h-11 w-32 rounded-sm border border-brand-jet text-brand-jet font-semibold hover:bg-brand-jet hover:text-white transition"
            >
              View Details
            </button>

            {/* Add */}
            <button
              data-testid={`add-to-cart-${product.id}`}
              onClick={() => {
                addItem(product, variant);
                toast.success(`${product.name} (${variant.size}) added`);
              }}
              className="h-11 w-24 bg-brand-orange hover:bg-brand-orangeDark text-white rounded-sm flex items-center justify-center gap-2 font-semibold transition"
            >
              <Plus className="h-4 w-4" />
              Add
            </button>
          </div>
          {product.name === "Diamond Car & Bike Polish" && (
            <>
              <a
                href="https://www.amazon.in/gp/product/B0H7Q4KYKB?smid=A3JSTQ0G59YXII&psc=1"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center w-full h-12 rounded-sm bg-brand-jet text-white font-semibold tracking-wide shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Buy on Amazon →
              </a>

              <p className="mt-2 text-center text-xs font-medium text-muted-foreground">
                ✓ Officially available on Amazon India
              </p>
            </>
          )}
        </div>
      </article>

      <ProductDetailsModal
        product={product}
        open={openDetails}
        onClose={() => setOpenDetails(false)}
      />
    </>
  );
}
