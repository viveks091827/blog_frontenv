import { useState } from 'react';
import styles from '../styles/ConfirmEmail.module.css'
import axios from 'axios'
import { useRouter } from 'next/router';

const confirmEmail= () => {
    const router = useRouter();

    const [email, setEmail] = useState('')
    const [emailExists, setEmailExists] = useState(true)

  const sendVerificationEmail = () => {
    axios.get(`http://${process.env.NEXT_PUBLIC_API_HOST}/user/verificationEmail?email=${email}`, {
      }, { headers: { "Content-Type": "application/json" } })
        .then((response) => {
          console.log(response.data)
         
          router.push('/')
        })
        .catch((error) => {
          console.error(error);
        });
    
  };
  

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

  return (
    <div className={styles.container}>
    
        <div className={styles.confirmationMessage}>
          <h1 className={styles.h1}>Check Your Email</h1>
          <p className={styles.p}>
            We have sent a confirmation email to your email address. Please check your inbox and follow the instructions to create your account.
          </p>
          <p className={styles.p}>
            If you don't see the email in your inbox, please check your spam folder.
          </p>

          <p> Send verification email again </p>
          
          <form action="#" className={`${styles.form}`} onSubmit={sendVerificationEmail}>
          <input className={`${styles.input} ${emailExists ? '' : `${styles.error}`}`} type="email" placeholder="Email" onBlur={(e)=> {
              checkEmailExists(e)
              }} onChange={(e)=> {setEmail(e.target.value)}} required />
            { 
              !emailExists ? 
                <p className={styles.errorMessage}> Email doesn't exist </p>: ''  
            }
            <div>
                <button className={styles.button} type='submit' disabled={!emailExists}> Send it again</button>
            </div>

            </form>

        </div>
     
    </div>
  );
};

export default confirmEmail;
