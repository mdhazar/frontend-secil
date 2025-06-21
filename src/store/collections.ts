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
