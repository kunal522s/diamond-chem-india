import { useEffect, useState } from "react";
import { X, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export default function ProductDetailsModal({
  product,
  open,
  onClose,
}) {
  const { addItem } = useCart();
  const [variant, setVariant] = useState(null);

  useEffect(() => {
    if (product) {
      setVariant(product.variants[0]);
    }
  }, [product]);

  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", close);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", close);
    };
  }, [open]);

  if (!open || !product || !variant) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 md:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-white rounded-xl shadow-2xl max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in duration-300"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-50 h-10 w-10 rounded-full bg-white shadow-md hover:bg-gray-100 flex items-center justify-center"
        >
          <X size={22} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* Image */}

          <div className="bg-gray-100 flex items-center justify-center p-6">
            <img
              src={
                product.image?.startsWith("http")
                  ? product.image
                  : product.image?.startsWith("/uploads")
                    ? `http://127.0.0.1:8000${product.image}`
                    : product.image
              }
              alt={product.name}
              className="w-full max-h-[260px] md:max-h-[520px] object-contain transition duration-300 hover:scale-105"
            />
          </div>

          {/* Details */}

          <div className="p-6 md:p-8 flex flex-col">

            <span className="inline-block w-fit bg-brand-orange text-white text-xs uppercase tracking-wider px-3 py-1 rounded">
              {product.category}
            </span>

            <h2 className="text-2xl md:text-4xl font-bold mt-4">
              {product.name}
            </h2>

            <p className="text-gray-600 mt-5 leading-7 text-sm md:text-base whitespace-pre-line">
              {product.description}
            </p>

            {/* Variants */}

            <div className="mt-8">
              <h4 className="font-semibold mb-3">
                Available Sizes
              </h4>

              <div className="flex flex-wrap gap-3">
                {product.variants.map((v) => (
                  <button
                    key={v.size}
                    onClick={() => setVariant(v)}
                    className={`px-5 py-2 rounded border transition font-semibold ${variant.size === v.size
                      ? "bg-brand-jet text-white border-brand-jet"
                      : "border-gray-300 hover:border-brand-jet"
                      }`}
                  >
                    {v.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}

            <div className="mt-8">
              <p className="text-gray-500 uppercase text-xs tracking-widest">
                MRP
              </p>

              <h3 className="text-3xl md:text-5xl font-black text-brand-jet mt-2">
                ₹{variant.price}
              </h3>
            </div>

            {/* Button */}

            <button
              onClick={() => {
                addItem(product, variant);
                toast.success(
                  `${product.name} (${variant.size}) added`
                );
                onClose();
              }}
              className="mt-8 w-full bg-brand-orange hover:bg-brand-orangeDark text-white rounded-lg py-4 font-semibold text-lg flex items-center justify-center gap-3 transition"
            >
              <Plus size={20} />
              Add To Cart
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}