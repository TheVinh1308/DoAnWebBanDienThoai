import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
// import '../assets/css/style.css';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Header = () => {
    return (

        <header id="header" className="fixed-top" style={{ padding: 0 }}>
            <div className="container d me-auto d-flex justify-content-end">
                <a className="navbar-brand mt-2 mt-lg-0" href="#">
                    <h1 className="logobcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp" height="15" alt="MDB Logo" loading="lazy" />
                </a>

                <Navbar className="navbar-expand-lg navbar-light bg-light d-flex" style={{ padding: 0, backgroundColor: '#FFD93D' }}>
                    <Navbar.Toggle aria-controls="navbar" />
                    <Navbar.Collapse id="navbar" style={{ backgroundColor: '#FFD93D' }}>
                        <div style={{ transform: 'translateX(-150%)' }}>
                            <Form className="d-flex justify-content-start">
                                <FormControl type="search" placeholder="Search" className="me-2" style={{ border: 'solid 2px black' }} aria-label="Search" />
                                <Button variant="outline-dark" style={{ border: 'solid 2px black' }}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </Button>
                            </Form>
                        </div>

                        <Nav className="ml-auto align-items-center">
                            <Nav.Link href="#" style={{ marginRight: '30px' }}>
                                <Link to="/cart">    <FontAwesomeIcon icon={faCartShopping} style={{ transform: 'scale(1.5)', paddingRight: '5px' }} />
                                    Giỏ hàng</Link>

                            </Nav.Link>
                            <NavDropdown title={<FontAwesomeIcon icon={faBell} style={{ transform: 'scale(1.5)', paddingRight: '5px' }} />} id="basic-nav-dropdown" style={{ padding: '30px' }}>
                                <NavDropdown.Item href="#">Some news</NavDropdown.Item>
                                <NavDropdown.Item href="#">Another news</NavDropdown.Item>
                                <NavDropdown.Item href="#">Something else here</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown
                                title={
                                    <div className="d-flex align-items-center hidden-arrow">
                                        <img
                                            style={{ paddingRight: '5px' }}
                                            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                            className="rounded-circle"
                                            height="25"
                                            alt="Black and White Portrait of a Man"
                                            loading="lazy"
                                        />
                                        Đăng nhập
                                    </div>
                                }
                                id="basic-nav-dropdown-avatar"
                            >
                                <NavDropdown.Item href="#">My profile</NavDropdown.Item>
                                <NavDropdown.Item href="#">Ds yêu thích</NavDropdown.Item>
                                <NavDropdown.Item href="#">Đăng xuất</NavDropdown.Item>
                            </NavDropdown>
                            <div className="flex-column">
                                <a style={{ transform: 'translateY(20px)', margin: '0' }}>
                                    <img src="/img/clients/logo9.jpg" alt="" style={{ borderRadius: '50%', width: '20px', height: '20px' }} />
                                    vn
                                </a>
                                <br />
                                <a style={{ transform: 'translateY(-20px)' }}>
                                    <img
                                        src="/img/clients/logo8.jpg"
                                        alt=""
                                        style={{ borderRadius: '50%', width: '20px', height: '20px', marginRight: '5px' }}
                                    />
                                    en
                                </a>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </header>
    );
};

export default Header;
