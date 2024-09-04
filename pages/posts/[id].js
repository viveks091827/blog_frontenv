import React from 'react';
import { useRouter } from 'next/router';
import getBlogById from '../../common/getBlogById';
import { useRef, useState, useEffect } from 'react';
import styles from '../../styles/PostStyles.module.css';
import axios from 'axios';
import getCookie from '../../common/getCookie';

const BlogPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const currentUserId = getCookie('uid')


  const [blog, setBlog] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState(null)


  useEffect(() => {
    const fetchBlog = async () => {
      const fetchedBlog = await getBlogById(id);
      console.log('blog content: ', fetchedBlog);
      if (fetchedBlog) {
        setBlog(fetchedBlog);
      }
    };

    fetchBlog();
  }, [id]);



  console.log('currentUserId: ', currentUserId)

  useEffect(() => {
    if (currentUserId?.length) {
      const user = axios.get(`http://${process.env.NEXT_PUBLIC_API_HOST}/profile/${currentUserId}`, {

      }, { headers: { "Content-Type": "application/json" } })
        .then((response) => {
          console.log('userProfile: ', response.data.data)
          setUser(response.data.data)
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [])

  const createPostComment = async (event) => {

    axios
      .post(`http://${process.env.NEXT_PUBLIC_API_HOST}/comment`, {
        userId: user.id,
        postId: blog.id,
        message: newComment,
      }, { headers: { "Content-Type": "application/json" } })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

  
  };



  if (!blog) {
    return <div>Loading...</div>;
  }

  console.log('user: ', user)


  return (
    <>
      {blog && (
        <div className={styles.container}>
          <div>
            <h1>{blog.title}</h1>
            <p dangerouslySetInnerHTML={{ __html: blog.body }}></p>
            <div className={styles.details}>
              <div className={styles.userDetails}>
                <span>Name: {blog.user.firstName}</span>
                <span>Email: {blog.user.email} </span>
              </div>
              <div className={styles.postDetails}>
                <span>
                  Upvotes: {blog.upvotes}
                </span>
                <span>
                  Downvotes: {blog.downvotes}
                </span>
              </div>
            </div>
            <hr />
            <h1>Comments</h1>
            <div className={styles.commentContainer}>
              {blog.comments.map((data, index) => (
                <div className={styles.commentCard} key={index}>
                  <h3>{data.message}</h3>
                  <h5>{data.user.email}</h5>
                </div>
              ))}
            </div>
          </div>

          <div>
            {user &&
              <form className={styles.form}>
                <textarea className={styles.textareaCard} value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                <button className={styles.button} onClick={createPostComment}>Post</button>
              </form>
            }
          </div>
        </div>
      )}
    </>
  );
};

export default BlogPage;
