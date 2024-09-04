import { useState } from 'react';
import styles from '../styles/ConfirmEmail.module.css'
import axios from 'axios'
import { useRouter } from 'next/router';

const resetPasswordDone= () => {
    const router = useRouter();



  return (
    <div className={styles.container}>
    
        <div className={styles.confirmationMessage}>
          <h1 className={styles.h1}>Check Your Email</h1>
          <p className={styles.p}>
            We have successfully updated your account password Go to login page and sign in.
          </p>
        </div>
     
    </div>
  );
};

export default resetPasswordDone;
