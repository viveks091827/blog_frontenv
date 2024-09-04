import React from 'react';
import Head from 'next/head';
import styles from '../styles/About.module.css';

const About = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>About Us</title>
      </Head>
      <h1>About Us</h1>
      <p>
        Cryptogull builds bots to trade crypto, stocks, and futures. We utilize tech, data, and economic intuition to find trends and automate profits.
      </p>
      <h2>Team</h2>
      <ul className={styles.teamList}>
        <li>
          <span className={styles.name}>Gull</span> — Trader and Quant.
        </li>
        <li>
          <span className={styles.name}>Narender</span> — Algorithmic Trading Software Developer
        </li>
        <li>
          <span className={styles.name}>Vivek</span> — Full Stack Developer
        </li>
      </ul>
      <h2>Contact Us</h2>
      <p>
        Email: <a href="mailto:gull@cryptogull.io">gull@cryptogull.io</a><br />
        Twitter: <a href="https://twitter.com/cryptogull_io">@cryptogull_io</a>
      </p>
    </div>
  );
};

export default About;
