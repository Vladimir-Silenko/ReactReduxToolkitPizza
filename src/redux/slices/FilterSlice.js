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
            console.log(action)
            state.categoryId = action.payload
            console.log(state.categoryId)
        },
        setSortType(state, action) {
            state.sort = action.payload
            console.log(action.payload)
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
    },
})

export const { setCategoryId, setSortType, setCurrentPage } = FilterSlice.actions
export default FilterSlice.reducer
