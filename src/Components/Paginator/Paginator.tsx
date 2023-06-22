import React from 'react'
import ReactPaginate from 'react-paginate'
import styles from './Paginator.module.scss'
type PaginatorPropsType = {
    changePage: (arg: number) => void
}
const Paginator: React.FC<PaginatorPropsType> = ({ changePage }) => {
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
