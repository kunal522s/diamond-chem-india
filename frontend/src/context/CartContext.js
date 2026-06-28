"import { createContext, useContext, useEffect, useState } from \"react\";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(\"dci_cart\");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(\"dci_cart\", JSON.stringify(items));
  }, [items]);

  const addItem = (product, variant) => {
    setItems((prev) => {
      const key = `${product.id}__${variant.size}`;
      const existing = prev.find((p) => p.key === key);
      if (existing) {
        return prev.map((p) =>
          p.key === key ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [
        ...prev,
        {
          key,
          product_id: product.id,
          product_name: product.name,
          image: product.image,
          variant_size: variant.size,
          variant_price: variant.price,
          quantity: 1,
        },
      ];
    });
    setOpen(true);
  };

  const inc = (key) =>
    setItems((p) => p.map((i) => (i.key === key ? { ...i, quantity: i.quantity + 1 } : i)));
  const dec = (key) =>
    setItems((p) =>
      p
        .map((i) => (i.key === key ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  const remove = (key) => setItems((p) => p.filter((i) => i.key !== key));
  const clear = () => setItems([]);

  const totalQuantity = items.reduce((s, i) => s + i.quantity, 0);
  const totalAmount = items.reduce((s, i) => s + i.quantity * i.variant_price, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, inc, dec, remove, clear, totalQuantity, totalAmount, open, setOpen }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
"