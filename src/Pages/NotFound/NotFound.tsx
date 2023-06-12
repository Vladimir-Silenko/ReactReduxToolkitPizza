import React from 'react'
import styles from './NotFound.module.scss'
const NotFound = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.NotFound}>404 NOT FOUND</h1>
            <p className={styles.message}>
                К сожалению, данная страница отсутствует в нашем интернет-магазине
            </p>
        </div>
    )
}

export default NotFound
