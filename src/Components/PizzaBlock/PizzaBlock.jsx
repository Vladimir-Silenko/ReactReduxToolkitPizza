import React from 'react'
import { addItem, setTotalCount, setTotalPrice } from '../../redux/slices/CartSlice'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { clearSelectedItem, fetchFullPizza } from '../../redux/slices/PizzaSlice'

const PizzaBlock = ({ types, sizes, price, title, imageUrl, dispatch, id }) => {
    const [activeSize, setActiveSize] = React.useState(0)
    const [activeType, setActiveType] = React.useState(0)
    const doughTypes = ['Тонкое', 'Традиционное']
    const cartItem = useSelector((state) => state.cart.items.find((obj) => id === obj.id))
    const addedAmmount = cartItem ? cartItem.ammount : 0
    const onClickAddItem = () => {
        const item = {
            imageUrl,
            price,
            title,
            id,
            type: doughTypes[activeType],
            sizes,
            size: activeSize,
            ammount: 1,
        }
        dispatch(addItem(item))
        dispatch(setTotalPrice())
        dispatch(setTotalCount())
    }
    const onClickOpenPizza = (id) => {
        dispatch(clearSelectedItem())
        dispatch(fetchFullPizza(id))
    }
    return (
        <div className="pizza-block-wrapper">
            <div className="pizza-block">
                <NavLink onClick={() => onClickOpenPizza(id)} to={`fullPizza/${id}`}>
                    <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
                </NavLink>
                <h4 className="pizza-block__title">{title}</h4>
                <div className="pizza-block__selector">
                    <ul>
                        {types.map((type, index) => {
                            return (
                                <li
                                    key={index}
                                    onClick={() => setActiveType(type)}
                                    className={activeType === type ? 'active' : ''}>
                                    {doughTypes[type]}
                                </li>
                            )
                        })}
                    </ul>
                    <ul>
                        {sizes.map((size, index) => {
                            return (
                                <li
                                    key={index}
                                    onClick={() => setActiveSize(index)}
                                    className={activeSize === index ? 'active' : ''}>
                                    {size} см.
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {price} ₽</div>
                    <div
                        onClick={() => {
                            onClickAddItem()
                        }}
                        className="button button--outline button--add">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Добавить</span>
                        {addedAmmount > 0 && <i>{addedAmmount}</i>}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PizzaBlock
