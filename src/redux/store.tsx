import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/FilterSlice'
import cart from './slices/CartSlice'
import pizza from './slices/PizzaSlice'

export const store = configureStore({
    reducer: {
        filter,
        cart,
        pizza,
    },
})
