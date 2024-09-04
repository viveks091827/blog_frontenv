
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';

import styles from '../styles/Footer.module.css';

const Footer = () => {
    return (
        <footer className={`page-footer ${styles.footer}`}>
            <Container fluid className={`${styles.container}`}>
                <Row className={styles.rowFirst}>
                    <Col md={3} className={`${styles.listStyle}`}>
                        <div className={`${styles.list} ${styles.box}`}>
                            <div><h5 className="text-uppercase">About Us</h5></div>
                            <div>
                                <p>Cryptogull builds bots to trade crypto, stocks, and futures. We utilize tech, data, and economic intuition to find trends and automate profits.</p>
                            </div>
                        </div>
                    </Col>

                    <Col md={3} className={`${styles.listStyle}`}>
                        <div className={`${styles.list} ${styles.box}`}>
                            <div><h5 className="text-uppercase">Menu</h5></div>

                            <div><a href="/blog">Blogs</a></div>
                            <div><a href="/aboutUs">About Us</a></div>
                            <div><a href="">Terms & Conditions</a></div>
                            <div><a href="">Privacy Policy</a></div>
                        </div>


                    </Col>

                    <Col md={3} className={`${styles.listStyle}`}>

                        <div className={`${styles.list} ${styles.box}`}>
                            <div><h5 className="text-uppercase">Contact Us</h5></div>
                            <div><a href="/contact">Email</a></div>
                            <div><a href="#!">F&Q</a></div>
                        </div>
                    </Col>

                </Row>

                <Row className={styles.rowSecond}>
                    <Col md={3} className={`${styles.listStyle}`}>
                        <div className={styles.socialLinks}>
                            <a href="#"><Image src="/twitter.png" alt="twitter" width={32} height={32} /></a>
                            <a href="#"><Image src="/fb.png" alt="facebook" width={28} height={28} /></a>
                        </div>
                    </Col>
                </Row>
            </Container>

            <div className={`container-fluid ${styles.mobileContainer}`}>
                <div className="text-center py-3">
                    <p>&copy; 2023 cryptogull.io. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
