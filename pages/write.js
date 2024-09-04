import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router';
import cookieCutter from 'cookie-cutter'
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'
import { Form, Button, Card } from 'react-bootstrap';
import 'react-quill/dist/quill.snow.css'
import styles from '../styles/Write.module.css'
import getCookie from '../common/getCookie';
// import ImageResize from 'quill-image-resize-module';
import { v4 as uuidv4 } from 'uuid';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';



const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})

const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image', 'video'],
        ['clean'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
}

const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
]



const Write = () => {
    const router = useRouter()

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('');
    
    const userId = getCookie('uid')

    const postPost = (event) => {
        event.preventDefault();


        axios.post(`http://${process.env.NEXT_PUBLIC_API_HOST}/posts`, {
            userId: userId,
            title: title,
            body: body
        }, { headers: { "Content-Type": "application/json" } })
            .then((response) => {
                const id = response.data.data.id
                router.push(`/posts/${id}`);
            })
            .catch((error) => {
                console.error(error);
            });


    }

    const handleImageUpload = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const id = uuidv4();
            const data = { id, url: reader.result };
            resolve(data);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      };
      

    console.log('body: ', body)

    return (
            
            <div className={styles.container}>
                <label>Title</label>
                <input className={styles.blogTitle} type='text' onChange={(e) => { setTitle(e.target.value) }} />
                <lable>Body</lable>
                <QuillNoSSRWrapper
                    modules={modules}
                    placeholder='compose here'
                    value={body}
                    onChange={setBody}
                    formats={formats}
                    theme='snow'
                    onImageUpload={handleImageUpload}
                />
                <button className={styles.button} onClick={(e) => postPost(e)}>Save</button>

            </div>
    )
}



export default Write



