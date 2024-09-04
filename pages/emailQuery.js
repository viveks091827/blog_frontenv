import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/EmailQuery.module.css';
import Paginate from './pagination';


const EmailQueries = () => {
    const [queries, setQueries] = useState([]);
    const [firstPageNumber, setFirstPageNumber] = useState(1)
    const [lastPageNumber, setLastPageNumber] = useState(1)
    const [currentPageNumber, setCurrentPageNumber] = useState(1)


    const pageHandler = (pageNumber) => {
        console.log('page: ', pageNumber)
        setCurrentPageNumber(pageNumber)
    }

    const getPosts = async () => {
        let pageSize = 5
        let orderBy = JSON.stringify({ createdAt: 'desc' })
        let filters

        axios.get(`http://${process.env.NEXT_PUBLIC_API_HOST}/queries?pageNumber=${currentPageNumber}&pageSize=${pageSize}&filters=${filters}&orderBy=${orderBy}`, {
        }, { headers: { "Content-Type": "application/json" } })
            .then((response) => {
                console.log('res: ', response.data.data)
                setQueries(response.data.data.queries);
                setLastPageNumber(response.data.data.paginationData.totalPages)
                setCurrentPageNumber(currentPageNumber)
            })
            .catch((error) => {
                console.error(error);
            });

    }

    useEffect(() => {
        getPosts();
    }, [currentPageNumber]);

    return (
        <div classname={styles.container}>
            <h1 className={styles.h1}>Email Queries</h1>
            <ul className={styles.ul}>
                {queries.map((query) => (
                    <li className={styles.li} key={query.email}>
                        <div className={styles.card}>
                            <div className={styles.header}>
                                <span>Email: {query.email}</span> 
                                <span className={styles.createdAt}>Created at: {query.createdAt}</span>
                            </div>

        
                            <div className={styles.body}>{query.message}</div>
                            <div className={styles.footer}>Name: <strong>{query.name}</strong></div>
                            
                        </div>
                    </li>
                ))}
            </ul>

            <Paginate firstPage={firstPageNumber} lastPage={lastPageNumber} currentPage={currentPageNumber} setPage={pageHandler} />

        </div>
    );
};

export default EmailQueries;
