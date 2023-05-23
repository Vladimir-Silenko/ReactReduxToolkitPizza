import React from 'react'
import ReactPaginate from 'react-paginate'
import styles from './Paginator.module.scss'
const Paginator = ({ changePage }) => {
    return (
        <div>
            <ReactPaginate
                className={styles.paginator}
                breakLabel="..."
                nextLabel=">"
                onPageChange={(event) => changePage(event.selected)}
                pageRangeDisplayed={5}
                pageCount={3}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />
        </div>
    )
}

export default Paginator
