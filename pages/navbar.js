import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import BootstrapImage from 'react-bootstrap/Image';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Image from 'next/image'
import { useState, useEffect } from 'react';
import getCookie from '../common/getCookie';
import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.css'
import cookieCutter from 'cookie-cutter'
import axios from 'axios'

function NavbarWrapper(props) {
    const [isSignin, setIsSignin] = useState()
    const sessionId = getCookie('sid')
    const userId = getCookie('uid')
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [isOpen, updateIsOpen] = useState()
    const [show1, setShow1] = useState(false);
    const [isOpen1, updateIsOpen1] = useState()
    const [imgUrl, setImgUrl] = useState()
    const [user, setUser] = useState(null)



    const getUser = async (userId) => {
        axios.get(`http://${process.env.NEXT_PUBLIC_API_HOST}/profile/${userId}`, {

        }, { headers: { "Content-Type": "application/json" } })
            .then((response) => {
                console.log('userProfile: ', response.data.data)
                setUser(response.data.data);
            })
            .catch((error) => {
                console.error(error);
            });

    }


    const showDropdown = (e) => {
        setShow(!show);
    }
    const hideDropdown = e => {
        setShow(false);
    }

    const showDropdown1 = (e) => {
        setShow1(!show1);
    }
    const hideDropdown1 = e => {
        setShow1(false);
    }

    useEffect(() => {
        const getProfilePicture = async (id) => {

            axios.get(`http://${process.env.NEXT_PUBLIC_API_HOST}/user/profilePicture/${id}`, { responseType: 'arraybuffer' })
                .then(response => {
                    console.log('profilepic: ', response.data)
                    const fileExtension = 'png'
                    let mimeType;
                    if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
                        mimeType = 'image/jpeg';
                    } else if (fileExtension === 'png') {
                        mimeType = 'image/png';
                    } else {
                        console.error('Unsupported image format');
                        return;
                    }

                    // Create a blob from the binary data returned in the response
                    const blob = new Blob([response.data], { type: mimeType });
                    console.log('blob: ', blob)

                    const url = URL.createObjectURL(blob);

                    console.log('url: ', url)

                    setImgUrl(url)


                })
                .catch(error => {
                    console.error(error);
                });
        }


        if (userId?.length) {
            getProfilePicture(userId)
        }

    }, [userId])


    useEffect(() => {

        if (sessionId?.length) {
            setIsSignin(false)
            getUser(userId)
        }
        else {
            setIsSignin(true)
        }

    }, [sessionId])





    const signOut = () => {
        console.log('removing cookie')

        cookieCutter.set('sid', '', { expires: new Date(0), path: '/' });
        cookieCutter.set('uid', '', { expires: new Date(0), path: '/' });

        setIsSignin(true)
        router.push('/')

    }



    const signIn = () => {
        router.push('/signin')
    }

    const signUp = () => {
        router.push('/signup')
    }

    console.log('url: ', imgUrl)


    return (
        <>
            {['lg'].map((expand) => (
                <Navbar /*sticky="top"*/ bg="light" key={expand} expand='lg' className={`${styles.navbarStyle}`} >
                    <Container className='fluid'>
                        <Navbar.Brand href="/" className={styles.logo}>
                            <Image
                                src="/cryptogullLogo.png"
                                alt="logo"
                                width={135}
                                height={90}
                            />
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"

                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    <Image
                                        src="/cryptogullLogo.png"
                                        alt="logo"
                                        width={115}
                                        height={80}
                                    />
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className={`flex-grow-1 pe-3 justify-content-center ${styles.navbarMenu}`}>
                                    {/* <div className={styles.navContent}><NavDropdown
                                        title="About"
                                        menuVariant="dark"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                        onMouseOver={() => updateIsOpen1(true)}
                                        onFocus={() => updateIsOpen1(true)}

                                        onBlur={() => updateIsOpen1(false)}
                                        toggle={() => updateIsOpen1(!isOpen1)}

                                        show={show1}
                                        onMouseEnter={showDropdown1}
                                        onMouseLeave={hideDropdown1}

                                    >
                                        <NavDropdown.Item href="/ourStory">WHAT WE DO</NavDropdown.Item>
                                        <NavDropdown.Item href="/contactUs">FAQS</NavDropdown.Item>
                                    </NavDropdown>
                                    </div> */}
                                    <div className={styles.navContent}><Nav.Link href="/aboutUs">About Us</Nav.Link></div>
                                    <div className={styles.navContent}><Nav.Link href="/blog">Blog</Nav.Link></div>
                                    <div className={styles.navContent}><Nav.Link href="/contact">Contact</Nav.Link></div>
                                    {user && !isSignin && user.role === 'ADMIN' && (
                                        <>
                                        <div className={styles.navContent}><Nav.Link href="/write">Write</Nav.Link></div>
                                        <div className={styles.navContent}><Nav.Link href="/emailQuery">Mail</Nav.Link></div>
                                        <div className={styles.navContent}><Nav.Link href="/editor">Editor</Nav.Link></div>
                                        </>
                                    )}
                                    
                                    <div className={styles.separator}></div>


                                </Nav>


                                {
                                    isSignin ? <div className={styles.authButtons}><Button className={`${styles.navButtons}`} variant="outline-primary" onClick={() => { signIn() }}>Login</Button>
                                        <Button className={`${styles.navButtons}`} variant="outline-primary" onClick={() => { signUp() }}>Sign Up</Button></div>
                                        : <div>

                                            <NavDropdown className={`${styles.navContent}`}
                                                title={
                                                    <BootstrapImage
                                                        src={imgUrl}
                                                        alt=""
                                                        width={50}
                                                        height={50}
                                                        roundedCircle
                                                        className={`d-inline-block align-bottom ${styles.roundedBorder} `}

                                                    />
                                                }

                                                menuVariant="dark"
                                                id={`offcanvasNavbarDropdown-expand-${expand}`}
                                                onMouseOver={() => updateIsOpen(true)}
                                                onFocus={() => updateIsOpen(true)}

                                                onBlur={() => updateIsOpen(false)}
                                                toggle={() => updateIsOpen(!isOpen)}

                                                show={show}
                                                onMouseEnter={showDropdown}
                                                onMouseLeave={hideDropdown}
                                            >
                                                <NavDropdown.Item href="/profile" >Profile</NavDropdown.Item>
                                                <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item onClick={() => { signOut() }} >SignOut</NavDropdown.Item>
                                            </NavDropdown>


                                        </div>

                                }



                            </Offcanvas.Body>

                        </Navbar.Offcanvas>


                    </Container>
                </Navbar>
            ))}

        </>
    );
}

export default NavbarWrapper;