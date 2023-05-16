import React from 'react'

const Categories = ({ value, changeCategory }) => {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => {
                    return (
                        <li
                            onClick={() => changeCategory(index)}
                            className={value === index ? 'active' : ''}
                            key={category}>
                            {category}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Categories
