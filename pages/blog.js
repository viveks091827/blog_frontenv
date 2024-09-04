import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '../styles/Blog.module.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Paginate from './pagination';
import BlogPost from './blogPost';



export default function Blog() {
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [firstPageNumber, setFirstPageNumber] = useState(1)
  const [lastPageNumber, setLastPageNumber] = useState(1)
  const [currentPageNumber, setCurrentPageNumber] = useState(1)


  const pageHandler = (pageNumber) => {
    console.log('page: ', pageNumber)
    setCurrentPageNumber(pageNumber)
  }

  const getPosts = async () => {
    let pageSize = 4
    let orderBy = JSON.stringify({ createdAt: 'desc' })
    let filters

    axios.get(`http://${process.env.NEXT_PUBLIC_API_HOST}/posts?pageNumber=${currentPageNumber}&pageSize=${pageSize}&filters=${filters}&orderBy=${orderBy}`, {
    }, { headers: { "Content-Type": "application/json" } })
      .then((response) => {

        setPosts(response.data.data.posts);
        setLastPageNumber(response.data.data.paginationData.totalPages)
        setCurrentPageNumber(currentPageNumber)
      })
      .catch((error) => {
        console.error('error yaha h: ', error);
      });

  }

  useEffect(() => {
    getPosts();
  }, [currentPageNumber]);

  console.log('post: ', posts)
  return (
    <div className={styles.container}>
      {posts?.length > 0 &&
        <Container fluid>
          <Row>
            <Col lg={12} xl={12} className={styles.blogContainer}>
                  {posts.map((data, idx) => {

                    return <BlogPost data={data} />
                  })}
            </Col>
          </Row>
          <Paginate firstPage={firstPageNumber} lastPage={lastPageNumber} currentPage={currentPageNumber} setPage={pageHandler} />

        </Container>
      }
    </div>

  )
}
