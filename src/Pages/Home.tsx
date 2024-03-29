import React, { useCallback } from 'react'
import qs from 'qs'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AnyAction, RootState, ThunkDispatch } from '@reduxjs/toolkit'
import { useWhyDidYouUpdate } from 'ahooks'
import { useNavigate } from 'react-router-dom'
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/FilterSlice'
// -----------------------------------------------
import { sortType } from '../Components/Sort'
import Sort from '../Components/Sort'
import Categories from '../Components/Categories'
import PizzaBlock from '../Components/PizzaBlock/PizzaBlock'
import PizzaBlockSkeleton from '../Components/PizzaBlock/PizzaBlockSkeleton'
import Paginator from '../Components/Paginator/Paginator'
import { PizzaItem, fetchPizzas } from '../redux/slices/PizzaSlice'
import NotFound from './NotFound/NotFound'

const Home = () => {
    const { pizzas, status } = useSelector((state: RootState) => state.pizza)
    const { categoryId, sort, currentPage, searchValue } = useSelector(
        (state: RootState) => state.filter,
    )
    const navigate = useNavigate()
    const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch()
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)
    const getPizzas = async () => {
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `search=${searchValue}` : ''
        const order = sort.sort.includes('-') ? 'desc' : 'asc'
        dispatch(fetchPizzas({ currentPage, search, order, category, sort }))
    }
    // если был первый рендер, то проверяем url параметры, и сохраняем их в редакс
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = sortType.find((obj) => obj.sort === params.sort)
            dispatch(setFilters({ ...params, sort }))
            isSearch.current = true
        }
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
        if (!isSearch.current) {
            getPizzas()
        }
        isSearch.current = false
    }, [searchValue, categoryId, sort, currentPage])

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                categoryId,
                sort: sort.sort,
                currentPage,
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sort])

    const skeletons = [...new Array(6)].map((_, index) => <PizzaBlockSkeleton key={index} />)

    const renderPizzaBlock = useCallback((pizza: PizzaItem) => {
        return <PizzaBlock key={pizza.id} {...pizza} />
    }, [])

    const PizzaItems = pizzas.map(renderPizzaBlock)

    const changeCategory = useCallback((id: number) => {
        dispatch(setCategoryId(id))
    }, [])
    const changePage = (page: number) => {
        dispatch(setCurrentPage(page))
    }
    useWhyDidYouUpdate('Categories', { categoryId, changeCategory })
    // useWhyDidYouUpdate('Sort', { sort })

    return (
        <div className="content">
            <div className="container">
                <div className="content__top">
                    <Categories value={categoryId} changeCategory={changeCategory} />
                    <Sort />
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                    {status === 'loading' ? (
                        skeletons
                    ) : status === 'error' ? (
                        <NotFound />
                    ) : (
                        PizzaItems
                    )}
                </div>
            </div>
            <Paginator changePage={changePage} />
        </div>
    )
}

export default Home
