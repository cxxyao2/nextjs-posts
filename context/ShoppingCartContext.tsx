import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react'
import useSWR from 'swr'
import { BACKEND_URL } from '../data/constants'
import ICartItem from '../models/cart-item'
import IProduct from '../models/product'

type ShoppingCardContextType = {
  openCart: () => void
  closeCart: () => void
  downloadProductList: () => void
  getItemQuantity: (id: string) => number
  increaseItemQuantity: (item: IProduct | ICartItem) => void
  decreaseItemQuantity: (id: string) => void
  removeFromCart: (id: string) => void
  cartQuantity: number
  cartAmount: number
  cartItems: ICartItem[]
  isVisibleSideBar: boolean
  setIsVisibleSideBar: Dispatch<SetStateAction<boolean>>
  products: IProduct[]
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

  // localStorage object doesnot exist in server side
  // const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
  //   'shopping-cart',
  //   []
  // )

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

  const downloadProductList = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}products`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      })
      const data = await response.json()
      console.log('products is', data)
      setProducts(
        data.map((item: any) => ({
          ...item,
          id: item._id,
          imageUrl: '/' + item.imageUrl + '.jpg'
        }))
      )
    } catch (error) {
      console.log('error is', JSON.stringify(error))
    }
  }

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
        downloadProductList,
        products
      }}>
      {children}
    </ShoppingCardContext.Provider>
  )
}
