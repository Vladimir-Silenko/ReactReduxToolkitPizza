// import axios from 'axios'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

const FullPizza: React.FC = () => {
    const { selectedItem } = useSelector((state: RootState) => state.pizza)
    console.log(selectedItem)
    useEffect(() => {}, [])
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
