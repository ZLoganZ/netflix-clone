import { create } from "zustand";

export interface ModalStoreInterface {
  isOpen: boolean;
  movieId?: string;
  openModal: (movieId: string) => void;
  closeModal: () => void;
}

const useInfoModal = create<ModalStoreInterface>((set) => ({
  isOpen: false,
  movieId: undefined,
  openModal: (movieId: string) => set({ isOpen: true, movieId }),
  closeModal: () => set({ isOpen: false, movieId: undefined }),
}));

export default useInfoModal;
