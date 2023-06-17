import React, { useEffect } from 'react'
import { setSortType } from '../redux/slices/FilterSlice'
import { AnyAction, RootState, ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
type typeOfSort = {
    sort: { name: string; sort: string }
}
export const sortType = [
    { name: 'Популярности', sort: 'rating' },
    { name: 'Цена по возрастанию', sort: 'price' },
    { name: 'Цена по убыванию', sort: '-price' },
    { name: 'Алфавиту', sort: 'title' },
]

const Sort: React.FC<typeOfSort> = ({ sort }) => {
    const [visible, setVisible] = React.useState(false)
    const sortRef = React.useRef<HTMLDivElement>(null)
    const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch()
    const Sorter = (i: number) => {
        dispatch(setSortType(sortType[i]))
        setVisible(false)
    }
    useEffect(() => {
        const handleOuterClick = (event: MouseEvent) => {
            if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
                setVisible(false)
            }
        }
        document.body.addEventListener('click', handleOuterClick)
        return () => document.body.removeEventListener('click', handleOuterClick)
    }, [])
    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    transform={visible ? 'rotate(180)' : ''}
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={() => setVisible(!visible)}>{sort.name}</span>
            </div>
            {visible && (
                <div className="sort__popup">
                    <ul>
                        {sortType.map((item, index) => {
                            return (
                                <li
                                    key={item.name}
                                    onClick={() => Sorter(index)}
                                    className={sort.name === item.name ? 'active' : ''}>
                                    {item.name}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Sort
