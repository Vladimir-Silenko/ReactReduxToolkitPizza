import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    totalPrice: 0,
    items: [],
}
const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            state.items = [...state.items, action.payload]
            console.log(state.items)
        },
        removeItem(state, action) {
            state.items.filter((item) => item.id !== action.payload)
        },
        setTotalPrice(state) {
            state.totalPrice = state.items.reduce((prev, curr) => {
                return prev + curr.price
            }, 0)
            console.log(state.totalPrice)
        },
    },
})
export const { addItem, setTotalPrice } = CartSlice.actions
export default CartSlice.reducer
