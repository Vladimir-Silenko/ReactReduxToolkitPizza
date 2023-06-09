import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/FilterSlice'
import cart from './slices/CartSlice'
import pizza, { pizzaStateType } from './slices/PizzaSlice'

export interface RootState {
    filter: any
    cart: any
    pizza: pizzaStateType
}
export const store = configureStore({
    reducer: {
        filter,
        cart,
        pizza,
    },
})
