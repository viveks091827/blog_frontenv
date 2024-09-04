import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';
import getCookie from '../common/getCookie';
import styles from '../styles/UserProfile.module.css';

const UserProfile = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [imgUrl, setImgUrl] = useState('')

    let userId = getCookie('uid')


    const getUser = async (userId) => {
        axios.get(`http://${process.env.NEXT_PUBLIC_API_HOST}/profile/${userId}`, {

        }, { headers: { "Content-Type": "application/json" } })
            .then((response) => {
                console.log('userProfile: ', response.data.data)
                setUser(response.data.data);
                setBlogs(response.data.data.posts);
            })
            .catch((error) => {
                console.error(error);
            });

    }



    const getProfilePicture = async (userId) => {
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

                const url = URL.createObjectURL(blob);

                console.log('url: ', url)

                setImgUrl(url)
            })
            .catch(error => {
                console.error(error);
            });
    }



    useEffect(() => {
        if (userId.length > 0) {
            getUser(userId)
            getProfilePicture(userId)
        }
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
        console.log('id: ', id)
        router.push(`/posts/${id}`);

    }

    if (!blogs) {
        return <p> loading... </p>
    }

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <h2 className={styles.sectionTitle}>User's Blog Posts</h2>
                <div className={styles.blogCard}>
                    {blogs.map((blog) => (
                        <div className={styles.blogPost} key={blog.id}>
                            <div className={styles.blogContent}>
                                <div className={styles.blogInfo}>
                                    <span>Title: {blog.title}</span>
                                    <span>{blog.createdAt}</span>
                                </div>

                                <p dangerouslySetInnerHTML={{ __html: extractSummary(blog.body, 200) }}></p>
                            </div>

                            <button onClick={() => { getPost(blog.id) }}>Read More</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.separator}></div>
            <div className={styles.right}>
                {/* User Profile */}
                {user && (
                    <div className={styles.profile}>
                        <div className={styles.profilePicture}>

                            <Image
                                src={imgUrl} // Replace with the URL or path of the user's profile picture
                                alt="Profile Picture"
                                width={100}
                                height={100}
                            />

                        </div>
                        <div className={styles.profileDetails}>
                            <h2>{user.firstName}</h2>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
