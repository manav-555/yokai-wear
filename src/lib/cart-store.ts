import { create } from "zustand";
import { CartItem, Product } from "@/types/product";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, size: "S" | "M" | "L" | "XL" | "XXL") => void;
  removeItem: (productId: string, size: string) => void;
  clearCart: () => void;
  totalPrice: () => number;
  totalCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  addItem: (product, size) => {
    const existing = get().items.find(
      (item) => item.product.id === product.id && item.size === size
    );

    const reservationLimit = Date.now() + 10 * 60 * 1000; // 10 minutes lock

    if (existing) {
      set({
        items: get().items.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1, reservedUntil: reservationLimit }
            : item
        ),
        isOpen: true
      });
    } else {
      set({
        items: [
          ...get().items,
          { product, size, quantity: 1, reservedUntil: reservationLimit }
        ],
        isOpen: true
      });
    }
  },
  removeItem: (productId, size) => {
    set({
      items: get().items.filter(
        (item) => !(item.product.id === productId && item.size === size)
      )
    });
  },
  clearCart: () => set({ items: [] }),
  totalPrice: () => {
    return get().items.reduce(
      (acc, item) => acc + item.product.basePrice * item.quantity,
      0
    );
  },
  totalCount: () => {
    return get().items.reduce((acc, item) => acc + item.quantity, 0);
  }
}));
