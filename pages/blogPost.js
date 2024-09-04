
import Image from 'next/image'
import styles from '../styles/BlogPost.module.css'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useState, useEffect } from 'react';



const BlogPost = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [imgUrl, setImgUrl] = useState('');



  useEffect(() => {

    const fetchProfilePicture = async (userId) => {
      axios.get(`http://${process.env.NEXT_PUBLIC_API_HOST}/user/profilePicture/${userId}`, { responseType: 'arraybuffer' })
        .then(response => {
          console.log('profilepic: ', response.data)
          const fileExtension = 'png'
          let mimeType;
          if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
            mimeType = 'image/jpeg';
          } else if (fileExtension === 'png') {
            mimeType = 'image/png';
          } else {
            console.error('Unsupported image format');
            return;
          }


          const blob = new Blob([response.data], { type: mimeType });
          console.log('blob: ', blob)

          const url = URL.createObjectURL(blob);

          console.log('url: ', url)

          setImgUrl(url)

          setIsLoading(false);
        })
        .catch(error => {
          console.error('error: ', error);
        });


    }

    fetchProfilePicture(data.userId);
  }, [])


  function extractSummary(html, maxLength) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    let summary = doc.body.textContent.trim().slice(0, maxLength);
    if (summary.length < doc.body.textContent.trim().length) {
      summary += '...';
    }
    return summary;
  }

  const getPost = (id) => {
    router.push(`/posts/${id}`);
  }


  return (
    <> { data && 
        <div className={styles.box}>
          <div className={styles.img_pod}>
            <Image src={imgUrl} height='80' width='80' alt="random image" className={styles.img} />
          </div>
          <div className={styles.container_content}>
            <h3 className={styles.h3Tag}>{data.createdAt}</h3>
            <h1 className={styles.h1Tag}>{data.title}</h1>
            <p className={styles.pTag} dangerouslySetInnerHTML={{ __html: extractSummary(data.body, 200) }}></p>
            <button className={styles.btn_primary} onClick={() => { getPost(data.id) }}>Read More</button>
          </div>
        </div> 
    }

    </>
  );
};


export default BlogPost