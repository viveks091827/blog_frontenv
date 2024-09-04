import axios from 'axios';

const getBlogById = async (id) => {

    return new Promise((resolve, reject) => {
        axios.get(`http://${process.env.NEXT_PUBLIC_API_HOST}/post-details/postId/${id}`, {
        }, { headers: { "Content-Type": "application/json" } })
            .then((response) => {
                resolve(response.data.data[0]);
            })
            .catch((error) => {
                console.error('Error fetching blog:', error);
                reject(error);
            });
    });
};

export default getBlogById





