import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface CartItemType {
    imageUrl: string
    price: number
    title: string
    id: string
    type: string
    sizes: Array<number>
    size: number
    ammount: number
}
interface CartStateType {
    totalPrice: any
    totalCount: any
    items: Array<CartItemType>
}
const initialState: CartStateType = {
    items: [],
    totalPrice: 0,
    totalCount: 0,
}
const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<any>) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id)
            if (findItem) {
                findItem.ammount++
            } else state.items = [...state.items, action.payload]
            // console.log(state.items)
        },
        setCartItems(state, action) {
            state.items = [...action.payload]
            // console.log(state.items)
        },
        decrementItems(state, action: PayloadAction<string>) {
            const findItem = state.items.find((obj) => obj.id === action.payload)
            state.items.forEach((obj) => {
                if (findItem && findItem.id === obj.id) {
                    findItem.ammount--
                }
            })
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = [...state.items.filter((item) => item.id != action.payload)]
        },
        clearCart(state) {
            state.items = []
        },
        setTotalPrice(state) {
            state.totalPrice = state.items.reduce((prev, curr) => {
                return prev + curr.price * curr.ammount
            }, 0)
        },
        setTotalCount(state) {
            state.totalCount = state.items.reduce((sum, item) => sum + item.ammount, 0)
        },
    },
})

export const {
    addItem,
    setTotalPrice,
    clearCart,
    removeItem,
    decrementItems,
    setTotalCount,
    setCartItems,
} = CartSlice.actions
export default CartSlice.reducer
