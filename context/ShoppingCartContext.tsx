import { createContext, useContext, useState } from 'react'

type ShoppingCardContextType = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: number) => number
  increaseItemQuantity: (id: number) => void
  decreaseItemQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  cartQuantity: number
  cartItems: CartItem[]
}
const ShoppingCardContext = createContext({} as ShoppingCardContextType)

type ShoppingCartProviderProps = {
  children: React.ReactNode
}

type CartItem = {
  id: number
  quantity: number
}

export function useShoppingCart() {
  return useContext(ShoppingCardContext)
}

export function ShoppingCardProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // localStorage object doesnot exist in server side
  // const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
  //   'shopping-cart',
  //   []
  // )

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0
  }

  function increaseItemQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) === undefined) {
        return [...currItems, { id, quantity: 1 }]
      }
      return currItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 }
        } else {
          return item
        }
      })
    })
  }

  function decreaseItemQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id)
      }
      return currItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 }
        } else {
          return item
        }
      })
    })
  }

  function removeFromCart(id: number) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id)
    })
  }

  return (
    <ShoppingCardContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        closeCart,
        openCart
      }}>
      {children}
    </ShoppingCardContext.Provider>
  )
}
