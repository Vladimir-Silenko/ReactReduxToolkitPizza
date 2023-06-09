import './App.css'
import './scss/app.scss'

import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import NotFound from './Pages/NotFound/NotFoundBlock'
import Cart from './Pages/Cart/Cart'
import React from 'react'
import { useSelector } from 'react-redux'
import FullPizza from './Pages/fullPizza/FullPizza'
import MainLayout from './Components/MainLayout'
function App() {
    const { items, totalPrice } = useSelector((state: any) => state.cart)

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
