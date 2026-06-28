"import { useState } from \"react\";
import { Plus } from \"lucide-react\";
import { useCart } from \"@/context/CartContext\";
import { toast } from \"sonner\";

export default function ProductCard({ product }) {
  const [variant, setVariant] = useState(product.variants[0]);
  const { addItem } = useCart();

  return (
    <article
      data-testid={`product-card-${product.id}`}
      className=\"card-tech flex flex-col rounded-sm overflow-hidden\"
    >
      <div className=\"relative aspect-square overflow-hidden border-b border-border bg-secondary\">
        <img
          src={product.image}
          alt={product.name}
          className=\"h-full w-full object-cover transition-transform duration-500 hover:scale-105\"
          loading=\"lazy\"
        />
        <div className=\"absolute top-3 left-3 bg-brand-jet text-white px-2 py-1 label-tech rounded-sm\">
          {product.category}
        </div>
      </div>

      <div className=\"flex flex-1 flex-col p-5\">
        <h3 className=\"font-heading text-lg font-bold leading-tight\">{product.name}</h3>
        <p className=\"mt-2 text-xs text-muted-foreground line-clamp-2\">{product.description}</p>

        <div className=\"mt-4\">
          <div className=\"label-tech text-muted-foreground mb-2\">Select Variant</div>
          <div className=\"flex flex-wrap gap-2\">
            {product.variants.map((v) => (
              <button
                key={v.size}
                data-testid={`variant-${product.id}-${v.size}`}
                onClick={() => setVariant(v)}
                className={`rounded-sm border px-3 py-1.5 text-xs font-semibold transition-all ${
                  variant.size === v.size
                    ? \"border-brand-jet bg-brand-jet text-white\"
                    : \"border-border bg-white text-brand-jet hover:border-brand-jet\"
                }`}
              >
                {v.size}
              </button>
            ))}
          </div>
        </div>

        <div className=\"mt-5 flex items-end justify-between gap-3\">
          <div>
            <div className=\"label-tech text-muted-foreground\">Dealer Price</div>
            <div className=\"font-heading text-2xl font-bold text-brand-jet\" data-testid={`price-${product.id}`}>
              ₹{variant.price}
            </div>
          </div>
          <button
            data-testid={`add-to-cart-${product.id}`}
            onClick={() => {
              addItem(product, variant);
              toast.success(`${product.name} (${variant.size}) added`);
            }}
            className=\"group flex items-center gap-2 rounded-sm bg-brand-orange px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-orangeDark\"
          >
            <Plus className=\"h-4 w-4\" />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
"