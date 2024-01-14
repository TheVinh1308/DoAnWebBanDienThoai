import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';

import 'swiper/swiper-bundle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faCaretLeft, faCaretRight, faCartPlus, faCirclePlus, faCoins, faCommentDots, faEye, faFilePen, faHandshake, faHeart, faShieldHalved, faTruck } from '@fortawesome/free-solid-svg-icons';
import { Button, Col, Form, InputGroup, Modal, Row, Tab, Tabs } from 'react-bootstrap';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, json, useNavigate, useParams } from 'react-router-dom';
import Vote from './Vote';
import Config from './Config';
import Policy from './Policy';
import Comment from './Comment';
import StarRatings from 'react-star-ratings';
import NumericInput from 'react-numeric-input';
import axiosClient from './axiosClient';
import { jwtDecode } from 'jwt-decode';
import Cart from '../Pages/Cart';
// Kích hoạt các modules bạn cần
SwiperCore.use([Navigation, Autoplay]);
const DetailProduct = () => {



    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [desc, setDesc] = useState({});
    const [test, settest] = useState();
    const [selectedPhoneId, setSelectedPhoneId] = useState(1);
    const phoneID = selectedPhoneId;
    console.log(`phoneID`, phoneID);
    useEffect(() => {
        axios.get(`https://localhost:7015/api/ModPhones/${id}`)
            .then(res => {
                setDesc(res.data);
                settest(res.data.p)
            });
    }, [id]);
    useEffect(() => {
        axios.get(`https://localhost:7015/api/Phones/GetListByModPhone/${id}`)
            .then(res => {
                setProducts(res.data);
                setSelectedColor(res.data[0].color);
                setSelectedRom(res.data[0].rom);
                // setSelectedPhoneId(res.data[0].id)
            });
    }, [id]);

    // lọc color
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedRom, setSelectedRom] = useState();
    const handleColorClick = (color, index) => {
        setSelectedColor(color);
        handleSelected(index);
    };

    const handleRomClick = (rom, index) => {
        setSelectedRom(rom);
        // handleSelected(index);
    };

    const handleSelected = (index) => {
        setSelectedPhoneId(index);
    }
    const filteredProducts = selectedColor && selectedRom
        ? products.filter((item) => item.color === selectedColor && item.rom === selectedRom)
        : selectedColor
            ? products.filter((item) => item.color === selectedColor)
            : selectedRom
                ? products.filter((item) => item.rom === selectedRom)
                : products;

    console.log(`filteredProducts`, filteredProducts.id);
    // filter color
    const [imgColor, setImgColor] = useState([]);
    // const [selectedImage, setSelectedImage] = useState({});
    useEffect(() => {
        axios.get(`https://localhost:7015/api/Images/GetImgForModPhone/${id}`)
            .then(res => {
                setImgColor(res.data)
            });
    }, [id]);

    // filter rom
    const [rom, setRom] = useState([]);
    useEffect(() => {
        axios.get(`https://localhost:7015/api/Phones/GetRomInModPhone/${id}`)
            .then(res => setRom(res.data));
    }, [id]);
    // TABS DETAIL PHONE
    const [key, setKey] = useState('home');

    // ICON LIKE
    const [phoneImg, setPhoneImg] = useState({});

    useEffect(() => {
        axios.get(`https://localhost:7015/api/Images/GetImgForPhone/${phoneID}`)
            .then(res => setPhoneImg(res.data));
    }, [phoneID]);

    // Add to cart 
    const [cart, setCart] = useState({})
    const [userId, setUserId] = useState();
    const [isTokenDecoded, setTokenDecoded] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            const decoded = jwtDecode(token);
            setUserId(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
            setTokenDecoded(true);
        }
        else {
            setTokenDecoded(false);
        }
    }, []);

    // kiem tra trong cart da co san pham chua 
    const [exCart, setExCart] = useState([]);
    useEffect(() => {
        axios.get(`https://localhost:7015/api/Carts/GetCartByUser/${userId}`)
            .then(res => setExCart(res.data));
    }, [userId]);

    const handleCart = (id, e) => {
        e.preventDefault();
        const selectedPhone = products.find(item => item.rom == selectedRom && item.color == selectedColor)
        const existingItem = exCart.find(item => item.phoneId === selectedPhone.id);
        if (isTokenDecoded) {
            if (existingItem) {
                // If the product exists, update the quantity
                const updatedCartItem = {
                    ...existingItem,
                    quantity: existingItem.quantity + 1
                };

                axiosClient.put(`/Carts/${existingItem.id}`, updatedCartItem)
                    .then(() => {
                        navigate("/cart");
                    });
            } else {
                // If the product doesn't exist, add it to the cart
                const newCartItem = {
                    userId: userId,
                    phoneId: selectedPhone.id,
                    quantity: quantityPhone
                };

                axiosClient.post(`/Carts`, newCartItem)
                    .then(() => {
                        navigate("/cart");
                    });
            }
        }
        else {
            navigate("/login");
        }

    }

    // value add to cart
    const [quantityPhone, setQuantity] = useState(1); // Initial value

    const handleQuantityChange = (value) => {
        setQuantity(value);
    };

    // Add to Favorites 
    // kiem tra trong Favorites da co san pham chua 
    const [ColorFavorite, setColorFavorite] = useState('gray');
    const [exFavorites, setExFavorites] = useState([]);
    useEffect(() => {
        axios.get(`https://localhost:7015/api/Favorites/GetFavoriteByUser/${userId}`)
            .then(res => setExFavorites(res.data));
    }, [userId]);
    const selectedPhone = products.find(item => item.rom == selectedRom && item.color == selectedColor)
    const existingItem = exFavorites.find(item => item.phoneId === selectedPhone.id);
    const handleFavorites = (id, e) => {
        e.preventDefault();
        const selectedPhone = products.find(item => item.rom == selectedRom && item.color == selectedColor)
        const existingItem = exFavorites.find(item => item.phoneId === selectedPhone.id);
        const iconlike = products.find(item => item.id == phoneID);
        console.log(`iconlike`, iconlike);
        if (iconlike) {
            setColorFavorite('red');
        }
        console.log(`existingItem`, existingItem);
        if (isTokenDecoded) {

            const newFavoritesItem = {
                userId: userId,
                phoneId: selectedPhone.id,
                quantity: 1
            };

            axiosClient.post(`/Favorites`, newFavoritesItem)
                .then(() => {
                    navigate("/favorites");
                });

        }
        else {
            navigate("/login");
        }
    }

    // kiem tra số lượng trong kho 
    const [stock, setStock] = useState();
    useEffect(() => {
        axios.get(`https://localhost:7015/api/Phones/GetAmounPhoneById/${phoneID}`)
            .then(res => setStock(res.data));
    }, [phoneID]);
    console.log(`stock`, stock);
    var Stock = "";
    if (stock == 0) {
        Stock = "( Hết hàng )";
    }

    return (
        <>

            <section className="py-5" style={{ margin: 100 }}>
                <div className="container">
                    <Row className='gx-5'>
                        <Col lg={6}>
                            {/* ================= Carousel Detail Product ==================== */}
                            <aside >
                                <Swiper
                                    className="swiper-container-sale"
                                    spaceBetween={15}
                                    slidesPerView={1}
                                    loop={true}
                                    navigation={{
                                        nextEl: '.swiper-button-next',
                                        prevEl: '.swiper-button-prev'
                                    }}
                                >


                                    {

                                        phoneImg.path && JSON.parse(phoneImg.path).map((path, pathIndex) => (
                                            <SwiperSlide key={pathIndex}>
                                                <img
                                                    className="d-block"
                                                    src={`https://localhost:7015/images/products/${path}`}
                                                    style={{ margin: '0 auto', height: 320, width: 'auto' }}
                                                    alt=""
                                                />
                                            </SwiperSlide>
                                        ))
                                    }

                                    <div className='button-navigation' ><FontAwesomeIcon className="swiper-button-next" icon={faCaretRight} /></div>
                                    <div className='button-navigation' ><FontAwesomeIcon className="swiper-button-prev" icon={faCaretLeft} style={{ padding: '15px' }} /></div>
                                </Swiper>
                                {/* Controls */}

                                <div className="d-flex justify-content-center mb-3" style={{ marginTop: '20px' }}>

                                    {
                                        Array.isArray(imgColor) &&
                                        imgColor.reduce((acc, item) => {
                                            const color = item.phone.color;
                                            if (!acc.colors[color]) {
                                                acc.colors[color] = true;

                                                const firstPath = JSON.parse(item.path)[0];

                                                const jsxElement = (
                                                    <span className="product-color" key={color}>
                                                        <label style={{ padding: 7 }}>
                                                            <input
                                                                type="radio"
                                                                checked={selectedColor === color}
                                                                onChange={() => handleColorClick(color, item.phone.id)}
                                                            />
                                                            <span>
                                                                <img
                                                                    className="radio-image"
                                                                    src={`https://localhost:7015/images/products/${firstPath}`}
                                                                    alt="Option 1"
                                                                    style={{ width: 50, height: 55 }}
                                                                />
                                                            </span>
                                                        </label>
                                                    </span>
                                                );

                                                acc.elements.push(jsxElement);
                                            }
                                            return acc;
                                        }, { colors: {}, elements: [] }).elements
                                    }

                                </div>
                            </aside>
                        </Col>
                        <Col lg={6}>
                            <main >

                                <div className="ps-lg-3">
                                    {
                                        filteredProducts.map(item => {
                                            return (

                                                <>
                                                    <p>{item.id}</p>
                                                    <h6>SKU:{item.sku}</h6>
                                                    <h4 className="title text-dark">
                                                        {item.name} <em style={{ color: 'red' }}>{Stock}</em>
                                                    </h4>
                                                    <Row sm='auto' className='d-flex justify-content-start'>
                                                        <Col style={{ marginTop: -4 }} >
                                                            <StarRatings className='list-vote-icon'
                                                                rating={5}
                                                                starRatedColor="orange"
                                                                // changeRating={onStarClick}
                                                                numberOfStars={5}
                                                                name='rating'
                                                                starDimension="20px"
                                                                starSpacing="2px"

                                                            />
                                                        </Col>
                                                        <Col>
                                                            <a href="">10 Review</a>
                                                        </Col>
                                                        <Col>
                                                            <a href=""> | Add Review</a>
                                                        </Col>
                                                    </Row>
                                                    <h5 style={{ marginTop: 10 }}><p>{(item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p></h5>
                                                    <p>{desc.description}</p>

                                                </>
                                            )
                                        })

                                    }

                                    <Row>

                                        <div className='mb-3' >
                                            <span style={{ marginRight: 30 }}>Color:      </span>
                                            {
                                                Array.isArray(imgColor) &&
                                                imgColor.reduce((acc, item) => {
                                                    const color = item.phone.color;
                                                    if (!acc.colors[color]) {
                                                        acc.colors[color] = true;

                                                        const firstPath = JSON.parse(item.path)[0];

                                                        const jsxElement = (
                                                            <span className="product-color" key={color}>
                                                                <label style={{ padding: 7 }} className={`${phoneID == item.phone.id ? 'border border-danger' : ''}`}>
                                                                    <input style={{ display: 'none' }}
                                                                        type="radio"
                                                                        checked={selectedColor === color}
                                                                        onChange={() => handleColorClick(color, item.phone.id)}
                                                                    />
                                                                    <span>
                                                                        <img
                                                                            className="radio-image"
                                                                            src={`https://localhost:7015/images/products/${firstPath}`}
                                                                            alt="Option 1"
                                                                            style={{ width: 50, height: 55 }}
                                                                        />
                                                                    </span>
                                                                </label>
                                                            </span>
                                                        );

                                                        acc.elements.push(jsxElement);
                                                    }
                                                    return acc;
                                                }, { colors: {}, elements: [] }).elements
                                            }
                                        </div ><br />
                                        <div>
                                            <span>Dung lượng:</span>
                                            {
                                                rom.map((item) => {
                                                    return (
                                                        <span className="product-color" key={item}>
                                                            <label style={{ padding: 7 }} className={`${selectedRom === item ? 'btn btn-warning' : ''}`}>
                                                                <input style={{ display: 'none' }}
                                                                    type="radio"
                                                                    checked={selectedRom === item}
                                                                    onChange={() => handleRomClick(item)}

                                                                />
                                                                <span>{item > 1000 ? "1 TB" : `${item} GB`}</span>
                                                            </label>
                                                        </span>
                                                    )
                                                })
                                            }
                                        </div>
                                    </Row>
                                    <hr />

                                    <Row className="mb-4" xs='auto'>
                                        <Col  >
                                            <Form.Group controlId="quantity" >
                                                <Form.Label style={{ marginRight: 10 }}>Số lượng: </Form.Label>
                                                <NumericInput
                                                    size={5}
                                                    min={1} // Giá trị tối thiểu
                                                    value={quantityPhone}
                                                    step={1} // Bước nhảy
                                                    mobile // Cho phép sử dụng trên thiết bị di động
                                                    onChange={handleQuantityChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Button disabled={stock === 0 || stock < quantityPhone} style={{ marginTop: -5, borderColor: '#4F200D', color: '#4F200D', backgroundColor: '#F6F1E9' }} onClick={(e) => handleCart(selectedPhoneId, e)} >
                                                {/* <div >
                                                    <Cart imgPath={imgPath} />
                                                </div> */}
                                                <FontAwesomeIcon icon={faCartPlus} size="xl" />
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button disabled={stock === 0 || stock < quantityPhone} style={{ marginTop: -5, backgroundColor: '#FFD93D', borderColor: '#4F200D', color: '#4F200D' }}>
                                                <FontAwesomeIcon icon={faCoins} /> Mua ngay
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row xs='auto'>
                                        <Col>
                                            <Button style={{ backgroundColor: '#F6F1E9', border: 'none' }} className={`${existingItem ? 'text-danger' : ''}`} >
                                                <FontAwesomeIcon icon={faHeart} onClick={(e) => handleFavorites(selectedPhoneId, e)} />
                                            </Button>
                                        </Col>

                                    </Row>

                                </div>

                            </main>
                        </Col>
                    </Row>
                    <hr />
                    <Row style={{ marginTop: 30 }}>
                        <Tabs id="controlled-tab-example"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            className="mb-3 d-flex justify-content-around" >
                            <Tab eventKey="home" className='tab-icon' title={<span><FontAwesomeIcon icon={faEye} />  Thông tin và cấu hình</span>}>
                                <Config phoneID={phoneID} />
                            </Tab>
                            <Tab eventKey="profile" className='tab-icon' title={<span><FontAwesomeIcon icon={faFilePen} />  Policy</span>}>
                                <Policy />

                            </Tab>
                            <Tab eventKey="contact" className='tab-icon' title={<span><FontAwesomeIcon icon={faCommentDots} />  Review</span>} >
                                <Vote />
                            </Tab>
                            <Tab eventKey="comment" className='tab-icon' title={<span><FontAwesomeIcon icon={faCommentDots} />  Comment</span>} >
                                <Comment selectedColor={selectedColor} selectedRom={selectedRom} products={products}/>
                            </Tab>
                        </Tabs>


                    </Row>
                </div>
            </section >

        </>
    );
}
export default DetailProduct;