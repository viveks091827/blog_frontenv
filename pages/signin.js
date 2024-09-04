import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'
import cookieCutter from 'cookie-cutter'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from '../styles/Login.module.css'

const Signin = (props) => {


  console.log('loginStatushandler: ', props.setUserLoginHandler)
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState({})
  const [isAuthFailed, setIsAuthFailed] = useState(false)
  const [emailExists, setEmailExists] = useState(true)

  console.log('email: ', email)
  console.log('password: ', password)

  const signin = (event) => {
    event.preventDefault();
    console.log('inside sign in ')

    axios.post(`http://${process.env.NEXT_PUBLIC_API_HOST}/user/signin`, {
      email: email,
      password: password
    }, { headers: { "Content-Type": "application/json" } })
      .then((response) => {
        console.log('data: ', response.data.data)

        if (response.data.data.data === 'Email or Password is wrong') {
          setIsAuthFailed(true)
        }
        else {
          setUser(response.data.data.user);
          console.log('userid: ', response.data.data)
          cookieCutter.set('uid', response.data.data.user.id)
          console.log('cookie setting')
          cookieCutter.set('sid', response.data.data.token)
          router.push('/')
          setIsAuthFailed(false)
        }     
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const signup = async () => {
    router.push('/signup');
  }

  const checkEmailExists = async (event) => {
    console.log('send http request: ', process.env.NEXT_PUBLIC_API_HOST, process.env.NEXT_PUBLIC_API_PATH)
  
    axios.get(`http://${process.env.NEXT_PUBLIC_API_HOST}/user/emailValidator?email=${email}`, {}, { headers: { "Content-Type": "application/json" } })
        .then((response) => {
          console.log(typeof response.data.status)
  
          if (response.data.status === true) {
            setEmailExists(true)
            console.log('email true')
          }
          else {
            setEmailExists(false)
            console.log('email false')
          }
        })
        .catch((error) => {
          console.error(error);
        });
  }
  


  return (
    <>
      <div className={`${styles.container}`}  >
        <div className={`${styles.formContainer} ${styles.signInContainer}`}>
          <form className={styles.form} onSubmit={signin}>
            <h2 className={styles.h2}>Sign in</h2>
            {/* <div className={styles.socialContainer} >
              <a className={styles.a} href="#" class="social"><i class="fab fa-facebook-f"></i></a>
              <a className={styles.a} href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
              <a className={styles.a} href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
            </div>
            <span className={styles.span}>or use your account</span> */}
            <input className={styles.input} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}
            onBlur={(e)=> {
              checkEmailExists(e)
              }} required />
            { !emailExists ? 
                <p className={styles.errorMessage}> Email doesn't exist </p>: ''  
            }
            <input className={styles.input} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
            { isAuthFailed && <p> Email or Password is wrong </p>}
            <a className={styles.a} href='./forgetPassword'>Forgot your password?</a>
            <button className={styles.button} type="submit" >Sign In</button>
          </form>
        </div>
        <div className={`${styles.overlayContainer}`}>
          <div className={`${styles.overlay}`}>
            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
              <h1 className={`${styles.h1}`}>Hello, Friend!</h1>
              <p className={`${styles.p}`}>Enter your personal details and start journey with us</p>
              <button className={`${styles.ghost} ${styles.button}`} onClick={() => { signup() }}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Signin