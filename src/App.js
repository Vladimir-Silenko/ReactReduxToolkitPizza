import './App.css'
import './scss/app.scss'
import Header from './Components/Header'

import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import NotFound from './Pages/NotFound/NotFoundBlock'
import Cart from './Pages/Cart/Cart'
import React from 'react'
import { useSelector } from 'react-redux'
import FullPizza from './Pages/fullPizza/FullPizza'
export const searchContext = React.createContext()
function App() {
    const { items, totalPrice } = useSelector((state) => state.cart)

    return (
        <div className="App">
            <div className="wrapper">
                <Header />
                <Routes>
                    <Route path="*" element={<NotFound />} />
                    <Route path="cart" element={<Cart totalPrice={totalPrice} items={items} />} />
                    <Route path={'/'} element={<Home />} />
                    <Route path={`fullPizza/:id`} element={<FullPizza />} />
                </Routes>
            </div>
        </div>
    )
}

export default App
