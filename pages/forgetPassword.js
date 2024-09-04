import { useState } from 'react';
import styles from '../styles/ForgetPassword.module.css';
import axios from 'axios'
import resetPasswordEmailSent from './resetPasswordEmailSent';
import { useRouter } from 'next/router';

const ForgotPassword = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [emailExists, setEmailExists] = useState(true)

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios.post(`http://${process.env.NEXT_PUBLIC_API_HOST}/user/resetPasswordEmail`, {
      email: email,
    }, { headers: { "Content-Type": "application/json" } })
      .then((response) => {
        console.log('data: ', response.data.data) 
        router.push('./resetPasswordEmailSent')
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
      <h2 className={styles.h2}>Forgot Password</h2>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <label className={styles.label}>
          Email:
          <input className={styles.input} type="email" value={email} onChange={handleEmailChange}
          onBlur={(e)=> {
              checkEmailExists(e)
              }} required />
            { !emailExists ? 
                <p className={styles.errorMessage}> Email doesn't exist </p>: ''  
            }
        </label>
        <button className={styles.button} type="submit">Send</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
