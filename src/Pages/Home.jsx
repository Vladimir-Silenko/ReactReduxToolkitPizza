import React from 'react'
import axios from 'axios'
import qs from 'qs'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/FilterSlice'

import { sortType } from '../Components/Sort'
import Sort from '../Components/Sort'
import Categories from '../Components/Categories'
import PizzaBlock from '../Components/PizzaBlock/PizzaBlock'
import PizzaBlockSkeleton from '../Components/PizzaBlock/PizzaBlockSkeleton'
import Paginator from '../Components/Paginator/Paginator'
import { searchContext } from '../App'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const [pizzas, setPizzas] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { searchValue } = React.useContext(searchContext)
    const { categoryId, sort, currentPage } = useSelector((state) => state.filter)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)
    const fetchPizzas = async () => {
        setIsLoading(true)
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''
        const order = sort.sort.includes('-') ? 'desc' : 'asc'
        const response = await axios
            .get(
                `https:// 6449088db88a78a8f0fb1930.mockapi.io/Items?page=${
                    currentPage + 1
                }&limit=4&sortBy=${sort.sort.replace('-', '')}&order=${order}${search}&${category}`,
            )
            .catch((err) => console.log(err, 'Axios error'))
        setPizzas(response.data)
        setIsLoading(false)
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
            fetchPizzas()
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
    }, [categoryId, sort, currentPage])

    const skeletons = [...new Array(6)].map((_, index) => <PizzaBlockSkeleton key={index} />)
    const PizzaItems = pizzas.map((pizza) => {
        // console.log(pizza)
        return <PizzaBlock pizza={pizza} dispatch={dispatch} key={pizza.id} {...pizza} />
    })

    const changeCategory = (id) => {
        dispatch(setCategoryId(id))
        console.log(id)
    }
    const changePage = (page) => {
        dispatch(setCurrentPage(page))
    }
    return (
        <div className="content">
            <div className="container">
                <div className="content__top">
                    <Categories value={categoryId} changeCategory={changeCategory} />
                    <Sort sort={sort} dispatch={dispatch} />
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">{isLoading ? skeletons : PizzaItems}</div>
            </div>
            <Paginator currentPage={currentPage} changePage={changePage} />
        </div>
    )
}

export default Home
