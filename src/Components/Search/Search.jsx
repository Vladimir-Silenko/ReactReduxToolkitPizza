import React from 'react'
import styles from './Search.module.scss'
import { searchContext } from '../../App'
import debounce from 'lodash.debounce'
const Search = () => {
    const [value, setValue] = React.useState('')
    const { searchValue, setSearchValue } = React.useContext(searchContext)
    const inputRef = React.useRef()

    const onClear = () => {
        setValue('')
        setSearchValue('')
        inputRef.current.focus()
    }
    const updateSearchValue = React.useCallback(
        debounce((str) => {
            setSearchValue(str)
        }, 500),
        [],
    )
    const changeInput = (event) => {
        setValue(event.target.value)
        updateSearchValue(value)
    }
    return (
        <div className={styles.container}>
            <svg className={styles.icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <title />
                <g data-name="Layer 2" id="Layer_2">
                    <path d="M18,10a8,8,0,1,0-3.1,6.31l6.4,6.4,1.41-1.41-6.4-6.4A8,8,0,0,0,18,10Zm-8,6a6,6,0,1,1,6-6A6,6,0,0,1,10,16Z" />
                </g>
            </svg>
            <input
                ref={inputRef}
                onChange={(e) => {
                    changeInput(e)
                }}
                value={value}
                className={styles.search_input}
                type="text"
                placeholder="Ищем пиццу..."
            />
            {searchValue && (
                <svg
                    onClick={() => onClear()}
                    className={styles.closeIcon}
                    height="48"
                    viewBox="0 0 48 48"
                    width="48"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
                    <path d="M0 0h48v48h-48z" fill="none" />
                </svg>
            )}
        </div>
    )
}

export default Search
