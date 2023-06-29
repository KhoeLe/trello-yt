import { databases, storage } from '@/appwrite';
import { getBoardTodo } from '@/lib/getBoardTodo'
import { create } from 'zustand'

interface BoardState {
    isOpen: boolean;
    closeModal: () => void;
    openModal: () => void;

}

export const useModalStore = create<BoardState>( (set, get) => ({
    isOpen :  false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),

}))
