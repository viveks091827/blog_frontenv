import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from '../styles/Signup.module.css'
import { setRevalidateHeaders } from 'next/dist/server/send-payload';
import { alert } from 'react-alert';

const Signup = (props) => {
  const router = useRouter();
  

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("");
  const [user, setUser] = useState({})
  const [inputValue, setInputValue] = useState("")
  const [alertMessage, setAlertMessage] = useState("")
  const [emailExists, setEmailExists] = useState(true)
  const [userExits, setUserExists] = useState(true)
  const [isDataLoading, setIsDataLoading] = useState(true)


  const signup = (event) => {
    event.preventDefault();
    console.log('inside sign up first name and second name: ', firstName, lastName)

    console.log('before submission: password and repeate password: ', password, repeatPassword)

    if (password !== repeatPassword) {
      setAlertMessage('Please add same password')
    }
    else {  
      setAlertMessage('')
    }

    axios.post(`http://${process.env.NEXT_PUBLIC_API_HOST}/user/signup`, {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName
    }, { headers: { "Content-Type": "application/json" } })
      .then((response) => {
        setUser(response.data);
        if (response.data.data === 'user exist please verify your email and login') {
          router.push('userExistsConfirmEmail')
        }
        else {
        router.push('/confirmEmail')
        }
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  

  const updateFirstName = (event) => {
    console.log('firstname: ', event.target.value)
    setFirstName(event.target.value)
  }

  const updateLastName = (event) => {
    console.log('lastname: ', event.target.value)
    setLastName(event.target.value)
  }

  const updateEmail = (event) => {
    setEmail(event.target.value)
    console.log('email: ', event.target.value)
  }

  const updatePassword = (event) => {
   
    setPassword(event.target.value)
    console.log('password: ', event.target.value)
    
  }

  const updateRepeatPassword = (event) => {
    setRepeatPassword(event.target.value)
    console.log('repeat Passwor: ', event.target.value)
    console.log('pass and rep pass: ', password, event.target.value)
    if (password !== event.target.value) {
      console.log('inside password not matching')
      setInputValue('Password is not matching');
    }
    else {
      setInputValue('')
    }
  }


  const signIn = () => {
    router.push('/signin')
}

const checkEmailExists = async (event) => {
  console.log('send http request: ', email)

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

const checkUserExists = async (event) => {
  console.log('send http request: ', email)

  axios.get(`http://${process.env.NEXT_PUBLIC_API_HOST}/user/userExists?email=${email}`, {}, { headers: { "Content-Type": "application/json" } })
      .then((response) => {
        console.log(typeof response.data.status)

        if (response.data.status === true) {
          setUserExists(true)
          console.log('user true')
        }
        else {
          setUserExists(false)
          console.log('user false')
        }
      })
      .catch((error) => {
        console.error(error);
      });
}

const getUserData = async (event) => {
              setIsDataLoading(true)
              await checkEmailExists(event); 
              await checkUserExists(event)
              setIsDataLoading(false)
}
  

  return (
    <>
      <div className={`${styles.container} ${styles.rightPanelActive}`} >
        <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
          <form action="#" className={`${styles.form}`} onSubmit={signup}>
            <h2 className={styles.h2}>Create Account</h2>
            {/* <div className={styles.socialContainer}>
              <a className={styles.a} href="#" class="social"><i class="fab fa-facebook-f"></i></a>
              <a className={styles.a} href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
              <a className={styles.a} href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
            </div> */}
            {/* <span className={styles.span}>or use your email for registration</span> */}
            <input className={styles.input} type="text" placeholder="First Name" onChange={(e)=> {updateFirstName(e)}}  required />
            <input className={styles.input} type="text" placeholder="Last Name" onChange={(e)=> {updateLastName(e)}} required />
            <input className={`${styles.input} ${emailExists ? '' : `${styles.error}`}`} type="email" placeholder="Email" onBlur={(e)=> {
              getUserData(e)
              }} onChange={(e)=> {updateEmail(e)}} required />
            { isDataLoading ? '' :
              (emailExists && userExits) ? <p className={styles.errorMessage}> Email exists please login </p>
              : !emailExists ? 
                <p className={styles.errorMessage}> Email doesn't exist </p>: ''  
            }
            <input className={styles.input} type="password" placeholder="Password" onChange={(e)=> {updatePassword(e)}} required />
            <input className={styles.input} type="password" placeholder="Repeat Password" onChange={(e)=> {updateRepeatPassword(e)}} required />
            {inputValue && <p>{inputValue} {alertMessage}</p>}
            <button className={`${styles.button}`} type="submit" disabled={!emailExists && userExits || !emailExists} >Sign Up</button>
           
          </form>
        </div>
       
        <div className={styles.overlayContainer}>
          <div className={styles.overlay}>
            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
              <h1 className={styles.h1} >Welcome Back!</h1>
              <p className={styles.p}>To keep connected with us please login with your personal info</p>
              <button className={`${styles.button}`} onClick={()=> {signIn()}}>Sign In</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Signup