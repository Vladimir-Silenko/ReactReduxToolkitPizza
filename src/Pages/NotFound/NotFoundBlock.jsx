import React from 'react'
import styles from './NotFoundBlock.module.scss'
const NotFound = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.not_found}>404 NOT FOUND</h1>
            <p>К сожалению, данная страница отсутствует в нашем интернет-магазине</p>
        </div>
    )
}

export default NotFound
