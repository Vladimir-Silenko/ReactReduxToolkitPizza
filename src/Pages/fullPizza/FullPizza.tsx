// import axios from 'axios'
import { RootState } from '@reduxjs/toolkit'
import React from 'react'
import { useSelector } from 'react-redux'

const FullPizza: React.FC = () => {
    const { selectedItem } = useSelector((state: RootState) => state.pizza)
    if (!selectedItem) return <div>Загрузка...</div>
    return (
        <div>
            <h2>{selectedItem.title}</h2>
            <img src={selectedItem.imageUrl} alt="" />
            <h3>{selectedItem.title}</h3>
        </div>
    )
}

export default FullPizza
