import React from 'react'
import Sort from '../Components/Sort'
import Categories from '../Components/Categories'
import PizzaBlock from '../Components/PizzaBlock/PizzaBlock'
import { useEffect, useState } from 'react'
import PizzaBlockSkeleton from '../Components/PizzaBlock/PizzaBlockSkeleton'
import Paginator from '../Components/Paginator/Paginator'
import { searchContext } from '../App'
import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId } from '../redux/slices/FilterSlice'
import axios from 'axios'
const Home = () => {
    const [pizzas, setPizzas] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(0)
    const { searchValue } = React.useContext(searchContext)
    const { categoryId, sort } = useSelector((state) => state.filter)
    const dispatch = useDispatch()

    useEffect(() => {
        setIsLoading(true)
        const order = sort.sort.includes('-') ? 'desc' : 'asc'
        const category = categoryId === 0 ? '' : '&category=' + categoryId
        const search = searchValue ? `&search=${searchValue}` : ''

        axios
            .get(
                `https://6449088db88a78a8f0fb1930.mockapi.io/Items?page=${
                    currentPage + 1
                }&limit=4${category}&sortBy=${sort.sort.replace('-', '')}&order=${order}${search}`,
            )
            .then((res) => {
                setPizzas(res.data)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [searchValue, categoryId, sort, currentPage])

    const skeletons = [...new Array(6)].map((_, index) => <PizzaBlockSkeleton key={index} />)
    const PizzaItems = pizzas.map((pizza) => {
        return <PizzaBlock key={pizza.id} {...pizza} />
    })

    const changeCategory = (id) => {
        dispatch(setCategoryId(id))
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
            <Paginator setCurrentPage={setCurrentPage} />
        </div>
    )
}

export default Home
