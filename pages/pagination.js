import Pagination from 'react-bootstrap/Pagination';
import { useEffect, useState } from 'react';
import styles from '../styles/Pagination.module.css'


function paginate({ firstPage, lastPage, currentPage, setPage }) {

    const [pagination, setPagination] = useState([])

    function getPageNumbers(currentPage, totalPages) {
        const maxVisiblePages = 5;
        let startPage = 1;
        let endPage = totalPages;
        let middlePages = [];
    
        // Calculate start and end page numbers
        if (totalPages > maxVisiblePages) {
          const halfVisiblePages = Math.floor(maxVisiblePages / 2);
          if (currentPage > halfVisiblePages) {
            startPage = currentPage - halfVisiblePages;
          }
          if (currentPage <= totalPages - halfVisiblePages) {
            endPage = startPage + maxVisiblePages - 1;
          } else {
            endPage = totalPages;
            startPage = endPage - maxVisiblePages + 1;
          }
        }
    
        // Calculate middle page numbers
        for (let i = startPage + 1; i < endPage; i++) {
          middlePages.push(i);
        }
    
        // Add first and last page numbers
        if (startPage > 1) {
          middlePages.unshift(1);
        }
        if (endPage < totalPages) {
          middlePages.push(totalPages);
        }

        if (middlePages[middlePages.length - 1] === lastPage) {
            middlePages.pop();
          }
    
        return [...new Set([...middlePages])];
    }

    useEffect(()=> {
        console.log('last Page: ', lastPage)
        let p = getPageNumbers(currentPage, lastPage)
        setPagination(p)
        console.log('p: ', p)
        
    }, [currentPage])



    return (
        <Pagination className={styles.pagination} >
          
            <Pagination.Prev className = {styles.item} disabled={firstPage === currentPage}  onClick={() => { setPage(currentPage - 1) }} />
            {   ((lastPage - firstPage) > 0) &&
            <Pagination.Item className = {styles.item} active={firstPage === currentPage} onClick={() => { setPage(firstPage) }}>{firstPage}</Pagination.Item>
            }
            {   ((lastPage - firstPage) > 0) && (pagination[0] !== 2) &&
            <Pagination.Ellipsis />
            }
            {pagination?.length > 0 && pagination.map((item) => {
                if (item > firstPage) {
                    return <Pagination.Item className = {styles.item} active={item === currentPage}  onClick={() => { setPage(item) }}><span>{item}</span></Pagination.Item>
                }
            }) 
        
            }

            {   ((lastPage - firstPage) > 1) && (pagination[pagination.length-1] !== lastPage-1) &&
                <Pagination.Ellipsis />
            }
            <Pagination.Item active={lastPage === currentPage} onClick={() => { setPage(lastPage) }}><span>{lastPage}</span></Pagination.Item>
            <Pagination.Next disabled={lastPage === currentPage} onClick={() => { setPage(currentPage + 1) }} />
          
        </Pagination>
    );
}

export default paginate;