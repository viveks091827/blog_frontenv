import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Contact.module.css';
import axios from 'axios'
// import ReCAPTCHA from "react-google-recaptcha";
import { useCallback } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";



const Contact = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);


  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!executeRecaptcha) {
        console.log("Execute recaptcha not yet available");
        return;
      }
      executeRecaptcha("enquiryFormSubmit").then((gReCaptchaToken) => {
        console.log(gReCaptchaToken, "response Google reCaptcha server");

        console.log('before api call: ', name, email, message)

        axios.post(`http://${process.env.NEXT_PUBLIC_API_HOST}/user/message`, {
          name: name,
          email: email,
          message: message,
          gReCaptchaToken: gReCaptchaToken,
        }, { headers: { "Content-Type": "application/json" } })
          .then((response) => {
            console.log('data: ', response)
            setSubmitted(true)
          })
          .catch((error) => {
            console.error(error);
          });

      });
    },
    [executeRecaptcha, name, email, message]
  );



  const updateEmail = (email) => {
    setEmail(email)
  }

  const updateName = (name) => {
    setName(name)
  }

  const updateMessage = (message) => {
    setMessage(message)
  }


  const handleRecaptchaChange = (token) => {
    setIsVerified(true);
  };

  console.log('name, email, message: ', name, email, message)

  return (

    <div className={styles.container}>
      <Head>
        <title>Contact Us</title>
      </Head>
      <h1>Contact Us</h1>
      <p>
        We'd love to hear from you. Please use the form below to email us, and we will respond within 24 hours.
      </p>
      {submitted ? (
        <p className={styles.confirmation}>Thank you for your message. We will get back to you soon!</p>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => { updateName(e.target.value) }}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => { updateEmail(e.target.value) }}
            required
          />
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => { updateMessage(e.target.value) }}
            required
          ></textarea>

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default Contact;
