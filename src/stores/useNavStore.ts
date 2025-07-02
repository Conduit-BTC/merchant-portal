import { create } from 'zustand'

export interface NavItem {
  productId: string
  name: string
  price: number
  image: string
  quantity: number
}

interface NavState {
  cart: NavItem[]
  isNavOpen: boolean
  openNav: () => void
  closeNav: () => void
  toggleNav: () => void
}

export const useNavStore = create<NavState>()((set) => ({
  cart: [],
  isNavOpen: true,
  openNav: () => set({ isNavOpen: true }),
  closeNav: () => set({ isNavOpen: false }),
  toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen }))
}))
