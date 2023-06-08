import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkApi) => {
    const { currentPage, search, order, category, sort } = params
    const { data } = await axios.get(
        `https://6449088db88a78a8f0fb1930.mockapi.io/Items?page=${
            currentPage + 1
        }&limit=4&sortBy=${sort.sort.replace('-', '')}&order=${order}&${search}&${category}`,
    )
    if (data.length === 0) console.log(thunkApi.rejectWithValue('No pizzas'))
    return data
})

export const fetchFullPizza = createAsyncThunk('pizza/fetchFullPizza', async (id) => {
    const { data } = await axios.get(`https://6449088db88a78a8f0fb1930.mockapi.io/Items/${id}`)
    return data
})
const initialState = {
    pizzas: [],
    status: '', // loading | success | error
    selectedItem: {},
}
export const PizzaSlice = createSlice({
    name: 'Pizza',
    initialState,
    reducers: {
        setPizzas: (state, action) => {
            state.pizzas = action.payload
        },
        clearSelectedItem(state) {
            state.selectedItem = {}
        },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading'
            state.items = []
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.pizzas = action.payload
            state.status = 'success'
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error'
            state.items = []
        },
        [fetchFullPizza.fulfilled]: (state, action) => {
            state.selectedItem = action.payload
            console.log(state.selectedItem)
        },
    },
})
export const { setPizzas, setSelectedItem, clearSelectedItem } = PizzaSlice.actions
export default PizzaSlice.reducer
