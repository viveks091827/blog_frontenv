import React from 'react';
import Head from 'next/head';
import Image from 'next/image'
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router'


const Home = () => {
  const router = useRouter();

  const handleClick = (event) => {
    router.push('/blog')
  }

  const handleClickAbout = (event) => {
    router.push('/aboutUs')
  }

  return (
    <div className={styles.container}>
        <div className={styles.imageContainer}>
          <div className={styles.contentOverlay}>
            <h4>The industry's best tactical asset allocation strategies, in one place.</h4>
            <button onClick={handleClick}>LEARN MORE</button>
          </div>
        </div>
        <div className={styles.about}>
          <div><h1>what we do </h1></div>
          <div className={styles.aboutContent}>
            <div className={styles.strategy}>
              <div> Builds bots to trade crypto, stocks, and futures </div>
              <div><button onClick={(e) => { handleClickAbout(e) }}>LEARN MORE</button></div>
            </div>
            <div className={styles.strategyImage}>
              <Image
                src="/strategy.png"
                alt="home"
                width={300}
                height={300}   
              />
            </div>
          </div>
        </div>
      </div>
  );
};

export default Home;
