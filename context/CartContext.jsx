import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    try {
      const c = localStorage.getItem('noux-cart')
      const w = localStorage.getItem('noux-wishlist')
      if (c) setCart(JSON.parse(c))
      if (w) setWishlist(JSON.parse(w))
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem('noux-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('noux-wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  function addToCart(product, quantity = 1) {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id)
      if (existing) return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i)
      return [...prev, { product, quantity }]
    })
    setDrawerOpen(true)
  }

  function removeFromCart(productId) {
    setCart(prev => prev.filter(i => i.product.id !== productId))
  }

  function updateQuantity(productId, quantity) {
    if (quantity < 1) { removeFromCart(productId); return }
    setCart(prev => prev.map(i => i.product.id === productId ? { ...i, quantity } : i))
  }

  function clearCart() { setCart([]) }

  function toggleWishlist(productId) {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId])
  }

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0)
  const cartTotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, wishlist, drawerOpen, setDrawerOpen, addToCart, removeFromCart, updateQuantity, clearCart, toggleWishlist, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
