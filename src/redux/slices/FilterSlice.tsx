import { PayloadAction, RootState, createSlice } from '@reduxjs/toolkit'
export type sortObjectType = {
    name: string
    sort: 'price' | 'title' | 'rating' | '-price' | '-title' | '-rating'
}
interface filterSliceStateType {
    searchValue: string
    categoryId: number
    currentPage: number
    sort: sortObjectType
}
const initialState: filterSliceStateType = {
    searchValue: '',
    categoryId: 0,
    currentPage: 0,
    sort: {
        name: 'Популярности',
        sort: 'rating',
    },
}
const FilterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload
            if (state.categoryId === action.payload) console.log(action.payload)
        },
        setSortType(state, action: PayloadAction<any>) {
            state.sort = action.payload
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setFilters(state, action: PayloadAction<any>) {
            state.categoryId = Number(action.payload.categoryId)
            state.currentPage = Number(action.payload.currentPage)
            state.sort = action.payload.sort
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
            console.log(state.searchValue)
        },
    },
})
export const filterSelector = (state: RootState) => state.filter
export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } =
    FilterSlice.actions
export default FilterSlice.reducer
