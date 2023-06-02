import './App.css'
import './scss/app.scss'
import Header from './Components/Header'

import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import NotFound from './Pages/NotFound/NotFoundBlock'
import Cart from './Pages/Cart/Cart'
import React from 'react'
import { useSelector } from 'react-redux'
export const searchContext = React.createContext()
function App() {
    const [searchValue, setSearchValue] = React.useState('')
    const { items, totalPrice } = useSelector((state) => state.cart)
    return (
        <searchContext.Provider value={{ searchValue, setSearchValue }}>
            <div className="App">
                <div className="wrapper">
                    <Header />
                    <Routes>
                        <Route path="*" element={<NotFound />} />
                        <Route
                            path="cart"
                            element={<Cart totalPrice={totalPrice} items={items} />}
                        />
                        <Route path={'/'} element={<Home searchValue={searchValue} />} />
                    </Routes>
                </div>
            </div>
        </searchContext.Provider>
    )
}

export default App
