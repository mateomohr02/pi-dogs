import React from 'react'

import style from './styles/paginate.module.css';

const Paginate = ({pageCount, currentPage, changePage}) => {

    const handlePageChange = (page) =>{
        if (page >= 1 && page <= pageCount){
            changePage(page)
        }
    }

    const renderPageNumbers = () => {
        const pageNumbers = []

        for(let i = 1; i<= pageCount; i++){
            pageNumbers.push(
            <div
                key={i}
                className={`${style.buttonPaginate} ${i === currentPage ? style.active : ""}`}
                onClick={()=>handlePageChange(i)}
            >
            {i}    
            </div>)
        }

        return pageNumbers;
    }

  return (
    <div className={style.paginateConatiner}>
        {currentPage === 1 ? "" : <button className = {style.prevNextButton} onClick={() => handlePageChange(currentPage - 1)}>Previous</button> }
        
        {renderPageNumbers()}

        {currentPage === pageCount ? "" : <button className = {style.prevNextButton} onClick={() => handlePageChange(currentPage + 1)}>Next</button>}
    </div>);
};

export default Paginate;