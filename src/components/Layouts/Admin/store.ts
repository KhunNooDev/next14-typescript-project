import { create } from 'zustand'

type Store = {
  sidebarOpen: boolean
  setSidebarOpen: (arg: boolean) => void
}

export const useSidebarOpen = create<Store>()(set => ({
  sidebarOpen: false,
  setSidebarOpen: () => set(state => ({ sidebarOpen: !state.sidebarOpen })),
}))
