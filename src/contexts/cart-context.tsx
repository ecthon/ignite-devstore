'use client'
import { ReactNode, createContext, useContext, useState } from 'react'

interface ICartItem {
    productId: string
    quantity: number
}

interface ICartContextType {
    items: ICartItem[]
    addToCart: (productId: string) => void
}

const CartContext = createContext({} as ICartContextType)

export function CartProvider({ children }: {children: ReactNode}) {
    const [ cartItems, setCartItems ] = useState<ICartItem[]>([])

    function addToCart(productId: string) {
        setCartItems((state) => {
            const productInCart = state.some((item) => item.productId === productId)

            if (productInCart) {
                return state.map(item => {
                    if (item.productId === productId) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            } else {
                return [...state, {productId, quantity: 1 }]
            }
        })
    }

    return (
        <CartContext.Provider value={{ items: cartItems, addToCart}}>
            { children }
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);