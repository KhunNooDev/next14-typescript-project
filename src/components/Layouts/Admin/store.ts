import { create } from 'zustand'

type Store = {
  isCollapsed: boolean
  toggleSidebarcollapse: () => void
}
// export const useSidebarStore = create<Store>()(set => ({
//   isCollapsed: false,
//   toggleSidebarcollapse: () => set(state => ({ isCollapsed: !state.isCollapsed })),
// }))
export const useSidebarStore = create<Store>((set, get) => ({
  isCollapsed: (() => {
    // Check if a value exists in local storage
    const storedIsCollapsed = localStorage.getItem('isCollapsed')
    // If a value exists, parse it to a boolean and return it, otherwise return false
    return storedIsCollapsed ? JSON.parse(storedIsCollapsed) : false
  })(),
  toggleSidebarcollapse: () =>
    set(state => {
      const newState = !state.isCollapsed
      // Update the value in local storage
      localStorage.setItem('isCollapsed', JSON.stringify(newState))
      return { isCollapsed: newState }
    }),
}))
