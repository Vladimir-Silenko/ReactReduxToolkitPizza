// import axios from 'axios'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom'

const FullPizza = () => {
    // const { id } = useParams()
    const { selectedItem } = useSelector((state) => state.pizza)
    // const getFullPizza = async (id) => {
    //     const { data } = await axios.get(`https://6449088db88a78a8f0fb1930.mockapi.io/Items/${id}`)
    // }
    console.log(selectedItem)
    useEffect(() => {}, [])
    if (!selectedItem.id) return 'Загрузка...'
    return (
        <div>
            <h2>{selectedItem.title}</h2>
            <img src={selectedItem.imageUrl} alt="" />
            <h3>{selectedItem.title}</h3>
        </div>
    )
}

export default FullPizza
