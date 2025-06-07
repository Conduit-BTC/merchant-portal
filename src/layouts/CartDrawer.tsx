import { Minus, Plus, ShoppingCart, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn, formatPrice } from '@/lib/utils'
import Button from '@/components/Buttons/Button'
import Sidebar from '../components/Sidebar'
import { useCartStore } from '@/stores/useCartStore'

export const CartDrawer = () => {

  const {
    cart,
    isCartOpen,
    closeCart,
    toggleCart
  } = useCartStore()


  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 w-full z-50 transition-all duration-600 ease-bounce',
        isCartOpen ? 'translate-y-0 opacity-90' : 'translate-y-full  opacity-50'
      )}
    >
      <div className="inner-column cart-drawer px-10 relative">
        {/* close */}
        {/* close */}
        <div className="absolute top-[-40px] right-10 z-[-1] pb-2 bg-accent rounded-t-full from-primary-800 to-accent/80 bg-gradient-to-t">
          <Button variant="ghost" size="icon" onClick={toggleCart}>
            <X />
          </Button>
        </div>

        {/* cart items */}
        <div className="py-4">
          <Sidebar embedded />
        </div>
      </div>
    </div>
  )
}
