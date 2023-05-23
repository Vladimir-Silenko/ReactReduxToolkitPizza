import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0,
    currentPage: 1,
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
            if (state.categoryId === action.payload) console.log('correct')
        },
        setSortType(state, action) {
            state.sort = action.payload
            console.log(action.payload)
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        setFilters(state, action) {
            state.categoryId = Number(action.payload.categoryId)
            state.currentPage = Number(action.payload.currentPage)
            state.sort = action.payload.sort
        },
    },
})

export const { setCategoryId, setSortType, setCurrentPage, setFilters } = FilterSlice.actions
export default FilterSlice.reducer
