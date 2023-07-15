import './App.css'
import './scss/app.scss'

import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import NotFound from './Pages/NotFound/NotFound'
import Cart from './Pages/Cart/Cart'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FullPizza from './Pages/fullPizza/FullPizza'
import MainLayout from './Components/MainLayout'
import { CartItemType, setCartItems, setTotalCount, setTotalPrice } from './redux/slices/CartSlice'
function App() {
    const { items, totalPrice } = useSelector((state: any) => state.cart)
    const cartData = localStorage.getItem('cart') as string
    const dispatch = useDispatch()
    useEffect(() => {
        const items = JSON.parse(cartData)
        dispatch(setCartItems(items))
        dispatch(setTotalPrice())
        dispatch(setTotalCount())
    }, [null])
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route path="*" element={<NotFound />} />
                    <Route path="cart" element={<Cart totalPrice={totalPrice} items={items} />} />
                    <Route path="" element={<Home />} />
                    <Route path={`fullPizza/:id`} element={<FullPizza />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App
