import { create } from 'zustand'

type Store = {
  isCollapsed: boolean
  toggleSidebarcollapse: () => void
}
export const useSidebarStore = create<Store>()(set => ({
  isCollapsed: false,
  toggleSidebarcollapse: () => set(state => ({ isCollapsed: !state.isCollapsed })),
}))
