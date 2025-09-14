import { create } from "zustand";

export interface CartItem {
  productId: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()((set, get) => ({
  items: [],
  addItem: (item, quantity = 1) => {
    const { items } = get();
    const existing = items.find((i) => i.productId === item.productId);
    if (existing) {
      set({
        items: items.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + quantity }
            : i
        ),
      });
    } else {
      set({ items: [...items, { ...item, quantity }] });
    }
  },
  removeItem: (productId) => {
    const { items } = get();
    set({ items: items.filter((i) => i.productId !== productId) });
  },
  updateQuantity: (productId, quantity) => {
    const { items } = get();
    if (quantity <= 0) {
      set({ items: items.filter((i) => i.productId !== productId) });
      return;
    }
    set({
      items: items.map((i) =>
        i.productId === productId ? { ...i, quantity } : i
      ),
    });
  },
  clear: () => set({ items: [] }),
}));
