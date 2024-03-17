import { create } from 'zustand'

type CommandMenuState = {
  showCommandMenu: boolean
  setShowCommandMenu: (show: boolean) => void
}

export const useCommandMenu = create<CommandMenuState>((set) => ({
  showCommandMenu: false,
  setShowCommandMenu: (show) => set({ showCommandMenu: show }),
}))
