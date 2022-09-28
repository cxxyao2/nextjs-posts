import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react'
import { BACKEND_URL } from '../data/constants'
import ICartItem from '../models/cart-item'
import { Customer } from '../models/customer'
import IProduct from '../models/product'

type ShoppingCardContextType = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: string) => number
  increaseItemQuantity: (item: IProduct | ICartItem) => void
  decreaseItemQuantity: (id: string) => void
  removeFromCart: (id: string) => void
  cartQuantity: number
  cartAmount: number
  cartItems: ICartItem[]
  customers: Customer[]
  setCustomers: Dispatch<SetStateAction<Customer[]>>
  isVisibleSideBar: boolean
  setIsVisibleSideBar: Dispatch<SetStateAction<boolean>>
  products: IProduct[]
  setProducts: Dispatch<SetStateAction<IProduct[]>>
}
const ShoppingCardContext = createContext({} as ShoppingCardContextType)

type ShoppingCartProviderProps = {
  children: React.ReactNode
}

export function useShoppingCart() {
  return useContext(ShoppingCardContext)
}

export function ShoppingCardProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisibleSideBar, setIsVisibleSideBar] = useState(false)

  const [cartItems, setCartItems] = useState<ICartItem[]>([])
  const [products, setProducts] = useState<IProduct[]>([])

  const [customers, setCustomers] = useState<Customer[]>([])

  // localStorage object doesnot exist in server side
  // const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
  //   'shopping-cart',
  //   []
  // )

  useEffect(() => {
    console.log('cartItems', cartItems)
  }, [cartItems])

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  const cartAmount = cartItems.reduce(
    (amount, item) => item.quantity * item.price + amount,
    0
  )

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(true)

  function getItemQuantity(id: string) {
    return cartItems.find((item) => item.id === id)?.quantity || 0
  }

  function increaseItemQuantity({
    id,
    name,
    imageUrl,
    price,
    description
  }: IProduct | ICartItem) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) === undefined) {
        return [
          ...currItems,
          { id, imageUrl, name, price, description, quantity: 1 }
        ]
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

  function decreaseItemQuantity(id: string) {
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

  function removeFromCart(id: string) {
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
        cartAmount,
        closeCart,
        openCart,
        isVisibleSideBar,
        setIsVisibleSideBar,
        setProducts,
        setCustomers,
        products,
        customers
      }}>
      {children}
    </ShoppingCardContext.Provider>
  )
}
