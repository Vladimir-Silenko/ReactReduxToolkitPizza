import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export type PizzaItem = {
    id: string
    imageUrl: string
    title: string
    types: Array<number>
    sizes: Array<number>
    price: number
    category: number
    rating: number
}

export type fetchPizzasParams = {
    currentPage: number
    search: string
    order: string
    category: number
    sort: any
}

export const fetchPizzas = createAsyncThunk<PizzaItem[], fetchPizzasParams>(
    'pizza/fetchPizzasStatus',
    async (params: fetchPizzasParams, thunkApi) => {
        const { currentPage, search, order, category, sort } = params
        const { data } = await axios.get(
            `https://6449088db88a78a8f0fb1930.mockapi.io/Items?page=${
                currentPage + 1
            }&limit=4&sortBy=${sort.sort.replace('-', '')}&order=${order}&${search}&${category}`,
        )
        if (data.length === 0) console.log(thunkApi.rejectWithValue('No pizzas'))
        return data
    },
)

export const fetchFullPizza = createAsyncThunk<any, number>('pizza/fetchFullPizza', async (id) => {
    const { data } = await axios.get(`https://6449088db88a78a8f0fb1930.mockapi.io/Items/${id}`)
    return data
})
export type pizzaStateType = {
    pizzas: Array<PizzaItem>
    status: string
    selectedItem: PizzaItem | null
}
export const initialState: pizzaStateType = {
    pizzas: [],
    status: '', // loading | success | error
    selectedItem: null,
}
export const PizzaSlice = createSlice({
    name: 'Pizza',
    initialState,
    reducers: {
        setPizzas: (state, action: PayloadAction<PizzaItem[]>) => {
            state.pizzas = action.payload
        },
        clearSelectedItem(state) {
            state.selectedItem = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = 'loading'
                state.pizzas = []
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.pizzas = action.payload
                state.status = 'success'
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = 'error'
                state.pizzas = []
            })
            .addCase(fetchFullPizza.fulfilled, (state, action) => {
                state.selectedItem = action.payload
                console.log(state.selectedItem)
            })
    },
})
export const { setPizzas, clearSelectedItem } = PizzaSlice.actions
export default PizzaSlice.reducer
