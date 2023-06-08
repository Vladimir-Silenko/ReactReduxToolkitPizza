import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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
        setCategoryId(state, action) {
            state.categoryId = action.payload
            if (state.categoryId === action.payload) console.log(action.payload)
        },
        setSortType(state, action) {
            state.sort = action.payload
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        setFilters(state, action) {
            state.categoryId = Number(action.payload.categoryId)
            state.currentPage = Number(action.payload.currentPage)
            state.sort = action.payload.sort
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload
            console.log(state.searchValue)
        },
    },
})
export const filterSelector = (state) => state.filter
export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } =
    FilterSlice.actions
export default FilterSlice.reducer
