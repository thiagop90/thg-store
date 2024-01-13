import { create } from 'zustand'

type SearchBarState = {
  isOpen: boolean
  toggleSearchBar: () => void
}

export const useSearchBar = create<SearchBarState>((set, get) => ({
  isOpen: false,
  toggleSearchBar: () => set({ isOpen: !get().isOpen }),
}))
