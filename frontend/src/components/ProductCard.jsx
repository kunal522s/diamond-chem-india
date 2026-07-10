import { useState } from "react";
import ProductDetailsModal from "@/components/ProductDetailsModal";
import {
  Plus,
  ShoppingCart,
  ShoppingBag,
  ArrowUpRight,
} from "lucide-react";
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
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/8 bg-white transition-all duration-500 hover:-translate-y-2 hover:border-black/15 hover:shadow-[0_22px_60px_rgba(0,0,0,.12)]"
      >
        <div className="relative aspect-square overflow-hidden border-b border-black/5 bg-[#fafafa]">
          <img
            src={
              product.image?.startsWith("http")
                ? product.image
                : product.image?.startsWith("/uploads")
                  ? `http://127.0.0.1:8000${product.image}`
                  : product.image
            }
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
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
              className="h-11 w-32 rounded-md border border-brand-jet text-brand-jet font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-jet hover:text-white hover:shadow-lg"
            >
              View Detail
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
          {(product.amazon_url || product.flipkart_url) && (
            <div className="mt-5 border-t border-border pt-5">

              {product.amazon_url && (
                <a
                  href={product.amazon_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mb-3 flex h-14 w-full items-center justify-between rounded-md border border-brand-jet bg-brand-jet px-6 text-white font-semibold tracking-wide shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-black hover:shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="h-5 w-5" />
                    <span>Buy on Amazon</span>
                  </div>

                  <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              )}

              {product.flipkart_url && (
                <a
                  href={product.flipkart_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-3 flex h-14 w-full items-center justify-between rounded-md bg-[#FACC15] px-6 text-black font-semibold shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#EAB308] hover:shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="h-5 w-5" />
                    <span>Buy on Flipkart</span>
                  </div>

                  <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              )}

            </div>
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
