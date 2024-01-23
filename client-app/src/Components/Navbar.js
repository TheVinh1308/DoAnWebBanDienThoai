import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Col, Row } from 'react-bootstrap';
// import '../assets/css/style.css';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping, faMagnifyingGlass, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'jwt-decode';
import { jwtDecode } from 'jwt-decode';

const Header = () => {

    // SREACH 
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate()
    const [userData, setUserData] = useState();
    const [countCart, setCountCart] = useState([])
    const [userId, setUserId] = useState();

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            const decoded = jwtDecode(token);
            setUserData(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
            setUserId(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
            setIsAuthenticated(true);
        }
    }, []);
    // console.log(userData);

    useEffect(() => {
        axios.get(`https://localhost:7015/api/Phones/GetDistinctPhone`)
            .then(res => setProducts(res.data));
    }, []);

    useEffect(() => {
        axios.get(`https://localhost:7015/api/Carts/GetCartByUser/${userId}`)
            .then(res => setCountCart(res.data));
    }, [userId]);

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
                            <Nav.Link href="#" style={{ marginRight: '30px', position: 'relative' }}>
                                <Link to={isAuthenticated ? '/cart' : '/login'} style={{ display: 'flex', alignItems: 'center' }}>
                                    <FontAwesomeIcon icon={faCartShopping} style={{ transform: 'scale(1.5)', paddingRight: '5px' }} />
                                    {countCart === null ? "" : <span style={{ position: 'absolute', top: '0', right: '0', background: 'red', color: 'white', borderRadius: '50%', padding: '1px 8px', fontSize: '13px' }}>{countCart.length}</span>}

                                </Link>
                            </Nav.Link>
                            <NavDropdown title={<FontAwesomeIcon icon={faBell} style={{ transform: 'scale(1.5)', paddingRight: '5px' }} />} id="basic-nav-dropdown" style={{ padding: '30px' }}>
                                <NavDropdown.Item href="#">Some news</NavDropdown.Item>
                                <NavDropdown.Item href="#">Another news</NavDropdown.Item>
                                <NavDropdown.Item href="#">Something else here</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title={
                                <div className="d-flex align-items-center hidden-arrow">
                                    {isAuthenticated ? `Xin chào, ${userData}` : 'Đăng nhập'}
                                </div>
                            } id="basic-nav-dropdown-avatar">
                                {isAuthenticated ? (
                                    <>
                                        <NavDropdown.Item ><Link to="/favorites" >Danh sách yêu thích</Link></NavDropdown.Item>
                                        <NavDropdown.Item><Link to={`/invoice/${userId}`} >Lịch sử mua hàng</Link></NavDropdown.Item>

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
