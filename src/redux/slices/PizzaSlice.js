import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
    const { currentPage, search, order, category, sort } = params
    const { data } = await axios.get(
        `https://6449088db88a78a8f0fb1930.mockapi.io/Items?page=${
            currentPage + 1
        }&limit=4&sortBy=${sort.sort.replace('-', '')}&order=${order}${search}&${category}`,
    )
    console.log(data)
    return data
})

const initialState = {
    pizzas: [],
    status: '', // loading | success | error
}

export const PizzaSlice = createSlice({
    name: 'Pizza',
    initialState,
    reducers: {
        setPizzas: (state, action) => {
            state.pizzas = action.payload
        },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.pizzas = action.payload
            state.status = 'success'
            console.log(state.status)
        },
        [fetchPizzas.rejected]: (state, action) => {
            state.status = 'error'
        },
    },
})
export const { setPizzas } = PizzaSlice.actions
export default PizzaSlice.reducer
