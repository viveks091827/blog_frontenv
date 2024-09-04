import { useState } from 'react';
import styles from '../styles/ConfirmEmail.module.css'
import axios from 'axios'
import { useRouter } from 'next/router';

const resetPasswordEmailSent= () => {
    const router = useRouter();



  return (
    <div className={styles.container}>
    
        <div className={styles.confirmationMessage}>
          <h1 className={styles.h1}>Check Your Email</h1>
          <p className={styles.p}>
            We have sent a reset password email to your email address. Please check your inbox and follow the instructions to reset your account password.
          </p>
        </div>
     
    </div>
  );
};

export default resetPasswordEmailSent;
