import React from 'react'
import ReactPaginate from 'react-paginate'
import styles from './Paginator.module.scss'
const Paginator = ({ setCurrentPage }) => {
    return (
        <div>
            <ReactPaginate
                className={styles.paginator}
                breakLabel="..."
                nextLabel=">"
                onPageChange={(event) => setCurrentPage(event.selected)}
                pageRangeDisplayed={5}
                pageCount={3}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />
        </div>
    )
}

export default Paginator
