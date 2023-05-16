import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    pizzas: [],
}
export const PizzaSlice = createSlice({
    name: 'Pizzas',
    initialState,
    reducers: {
        getPizzas: (state) => {},
    },
})
