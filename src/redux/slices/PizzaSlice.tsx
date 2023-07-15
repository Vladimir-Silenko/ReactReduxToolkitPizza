import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { sortObjectType } from './FilterSlice'

export interface PizzaItem {
    id: string
    imageUrl: string
    title: string
    types: Array<any>
    sizes: Array<number>
    price: number
    category: number
    rating: number
}

export interface fetchPizzasParams {
    currentPage: number
    search: string
    order: string
    category: string
    sort: sortObjectType
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}
export const fetchPizzas = createAsyncThunk<PizzaItem[], fetchPizzasParams>(
    'pizza/fetchPizzasStatus',
    async (params, thunkApi) => {
        const { currentPage, search, order, category, sort } = params
        const { data } = await axios.get<Array<PizzaItem>>(
            `https://6449088db88a78a8f0fb1930.mockapi.io/Items?page=${
                currentPage + 1
            }&limit=4&sortBy=${sort.sort.replace('-', '')}&order=${order}&${search}&${category}`,
        )
        if (data.length === 0) console.log(thunkApi.rejectWithValue('No pizzas'))
        return data as Array<PizzaItem>
    },
)

export const fetchFullPizza = createAsyncThunk<any, string | null>(
    'pizza/fetchFullPizza',
    async (id) => {
        const { data } = await axios.get(`https://6449088db88a78a8f0fb1930.mockapi.io/Items/${id}`)
        return data as PizzaItem
    },
)
export type pizzaStateType = {
    pizzas: Array<PizzaItem>
    status: Status
    selectedItem: PizzaItem | null
}
export const initialState: pizzaStateType = {
    pizzas: [],
    status: Status.LOADING, // loading | success | error
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
                state.status = Status.LOADING
                state.pizzas = []
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.pizzas = action.payload
                state.status = Status.SUCCESS
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = Status.ERROR
                state.pizzas = []
            })
            .addCase(fetchFullPizza.fulfilled, (state, action) => {
                state.selectedItem = action.payload
            })
    },
})
export const { setPizzas, clearSelectedItem } = PizzaSlice.actions
export default PizzaSlice.reducer
