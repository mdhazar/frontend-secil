import { create } from "zustand";

interface Collection {
  id: number;
  title: string;
  productConditions: string[];
  salesChannel: string;
}

interface CollectionState {
  collections: Collection[];
  setCollections: (collections: Collection[]) => void;
}

export const useCollectionStore = create<CollectionState>()((set) => ({
  collections: [],
  setCollections: (collections) => set({ collections }),
}));

// New store for edit mode and products
interface Product {
  imageUrl: string;
  name: string;
  productCode: string;
  id: string; // We'll generate this for drag/drop
}

interface EditModeState {
  isEditMode: boolean;
  availableProducts: Product[];
  selectedProducts: Product[];
  draggedProductIds: string[];
  setEditMode: (isEditMode: boolean) => void;
  setAvailableProducts: (products: Product[]) => void;
  addSelectedProduct: (product: Product) => void;
  removeSelectedProduct: (productId: string) => void;
  setDraggedProductId: (productId: string) => void;
  removeDraggedProductId: (productId: string) => void;
  resetEditState: () => void;
}

export const useEditModeStore = create<EditModeState>()((set, get) => ({
  isEditMode: false,
  availableProducts: [],
  selectedProducts: [],
  draggedProductIds: [],
  setEditMode: (isEditMode) => set({ isEditMode }),
  setAvailableProducts: (products) => {
    const productsWithIds = products.map((product, index) => ({
      ...product,
      id: `${product.productCode}-${index}`,
    }));
    set({ availableProducts: productsWithIds });
  },
  addSelectedProduct: (product) => {
    const { selectedProducts, draggedProductIds } = get();
    if (!selectedProducts.find((p) => p.id === product.id)) {
      set({
        selectedProducts: [...selectedProducts, product],
        draggedProductIds: [...draggedProductIds, product.id],
      });
    }
  },
  removeSelectedProduct: (productId) => {
    const { selectedProducts, draggedProductIds } = get();
    set({
      selectedProducts: selectedProducts.filter((p) => p.id !== productId),
      draggedProductIds: draggedProductIds.filter((id) => id !== productId),
    });
  },
  setDraggedProductId: (productId) => {
    const { draggedProductIds } = get();
    if (!draggedProductIds.includes(productId)) {
      set({ draggedProductIds: [...draggedProductIds, productId] });
    }
  },
  removeDraggedProductId: (productId) => {
    const { draggedProductIds } = get();
    set({
      draggedProductIds: draggedProductIds.filter((id) => id !== productId),
    });
  },
  resetEditState: () =>
    set({
      isEditMode: false,
      availableProducts: [],
      selectedProducts: [],
      draggedProductIds: [],
    }),
}));
