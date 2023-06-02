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
            const findItem = state.items.find((obj) => obj.id === action.payload.id)
            if (findItem) {
                findItem.ammount++
            } else state.items = [...state.items, action.payload]
        },
        decrementItems(state, action) {
            const findItem = state.items.find((obj) => obj.id === action.payload)
            state.items.forEach((obj) => {
                if (findItem && findItem.id === obj.id) {
                    findItem.ammount--
                }
            })
        },
        removeItem(state, action) {
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
    },
})
export const { addItem, setTotalPrice, clearCart, checkAmmount, removeItem, decrementItems } =
    CartSlice.actions
export default CartSlice.reducer
