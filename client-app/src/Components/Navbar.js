import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Col, Row } from 'react-bootstrap';
// import '../assets/css/style.css';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping, faMagnifyingGlass, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'jwt-decode';
import { jwtDecode } from 'jwt-decode';

const Header = () => {

    // SREACH 
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [userData, setUserData] = useState();

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            const decoded = jwtDecode(token);
            setUserData(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
            setIsAuthenticated(true);
        }
    }, []);
    // console.log(userData);

    useEffect(() => {
        axios.get(`https://localhost:7015/api/Phones`)
            .then(res => setProducts(res.data));
    }, []);
    const handleSearch = () => {
        const results = products.filter(item => item.name.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()));
        setSearchResults(results);
    };


    const handleChange = (e) => {
        // handleSearch();
        const value = e.target.value;

        setSearchTerm(value);


        // Gọi hàm tìm kiếm ngay khi có sự thay đổi trong ô tìm kiếm

    };
    const handleLogout = () => {
        // Xóa token khỏi cookie
        localStorage.removeItem("jwt")

        // Cập nhật trạng thái đăng nhập
        setIsAuthenticated(false);

    };
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
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    style={{ border: 'solid 2px black' }}
                                    aria-label="Search"
                                    value={searchTerm}
                                    onChange={handleChange}
                                />
                                <Button variant="outline-dark" style={{ border: 'solid 2px black' }} onClick={handleSearch}>
                                    <FontAwesomeIcon icon={faSearch} />
                                </Button>
                            </Form>
                            <div style={{ position: 'absolute', maxHeight: '250px', width: '400px', overflowY: 'auto', overflowX: 'hidden', backgroundColor: 'white', marginTop: 10 }}>

                                {searchTerm && (
                                    searchResults.length > 0 ? (
                                        <>
                                            <p className='pt-2' style={{ paddingLeft: 10, backgroundColor: '#F6F1E9', paddingBottom: 3 }}>Sản phẩm gợi ý</p>
                                            <ul style={{ display: 'inline-block', margin: 2 }}>
                                                {searchResults.map((result) => (
                                                    <a key={result.id} style={{ textDecoration: 'none' }} >
                                                        <Link to={`details/${result.modPhoneId}`}>
                                                            <Col xs={4}>
                                                                <img src={`https://localhost:7015/images/products/${result.modPhone.image}`} style={{ width: 70, height: 70, maxHeight: '100%' }} />
                                                            </Col>
                                                            <Col xs={8}>
                                                                <Row>
                                                                    <p style={{ marginBottom: 0 }}>{result.name}</p>
                                                                </Row>
                                                                <Row>
                                                                    <p>{result.price}</p>
                                                                </Row>
                                                            </Col>
                                                        </Link>


                                                    </a>
                                                ))}
                                            </ul>
                                        </>

                                    ) : (
                                        searchTerm ? " " :
                                            <img src='/img/404.png' style={{ width: 400, height: 250 }} />
                                    )
                                )}
                            </div>
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

                            <NavDropdown title={
                                <div className="d-flex align-items-center hidden-arrow">
                                    <img
                                        style={{ paddingRight: '5px' }}
                                        src={userData?.avatarUrl || "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"}
                                        className="rounded-circle"
                                        height="25"
                                        alt="Avatar"
                                        loading="lazy"
                                    />
                                    {isAuthenticated ? `Xin chào, ${userData}` : 'Đăng nhập'}
                                </div>
                            } id="basic-nav-dropdown-avatar">
                                {isAuthenticated ? (
                                    <>
                                        {/* <NavDropdown.Item href="#">My profile</NavDropdown.Item>*/}
                                        <NavDropdown.Item href="#">Ds yêu thích</NavDropdown.Item>
                                        <NavDropdown.Item onClick={handleLogout}>Đăng xuất</NavDropdown.Item>
                                    </>
                                ) : (
                                    <NavDropdown.Item>
                                        <Link to="/login">Đăng nhập</Link>
                                    </NavDropdown.Item>
                                )}
                            </NavDropdown>

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </header>
    );
};

export default Header;
