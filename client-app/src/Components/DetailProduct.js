import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';

import 'swiper/swiper-bundle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faCaretLeft, faCaretRight, faCartPlus, faCirclePlus, faCoins, faCommentDots, faEye, faFilePen, faHandshake, faHeart, faShieldHalved, faTruck } from '@fortawesome/free-solid-svg-icons';
import { Button, Col, Form, InputGroup, Row, Tab, Tabs } from 'react-bootstrap';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, json, useNavigate, useParams } from 'react-router-dom';
import Vote from './Vote';
import Config from './Config';
import Policy from './Policy';
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

    const [selectedPhoneId, setSelectedPhoneId] = useState(1);
    const phoneID = selectedPhoneId;
    useEffect(() => {
        axios.get(`https://localhost:7015/api/ModPhones/${id}`)
            .then(res => {
                setDesc(res.data);
            });
    }, [id]);
    useEffect(() => {
        axios.get(`https://localhost:7015/api/Phones/GetListByModPhone/${id}`)
            .then(res => {
                setProducts(res.data);
                setSelectedColor(res.data[0].color);
                setSelectedRom(res.data[0].rom);
                setSelectedPhoneId(res.data[0].id)
            });
    }, [id]);
    // lọc color
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedRom, setSelectedRom] = useState();
    const handleColorClick = (color, index) => {
        setSelectedColor(color);
        setSelectedPhoneId(index);
    };

    const handleRomClick = (rom) => {
        setSelectedRom(rom);
    };
    const filteredProducts = selectedColor && selectedRom
        ? products.filter((item) => item.color === selectedColor && item.rom === selectedRom)
        : selectedColor
            ? products.filter((item) => item.color === selectedColor)
            : selectedRom
                ? products.filter((item) => item.rom === selectedRom)
                : products;
    // filter color
    const [imgColor, setImgColor] = useState([]);
    // const [selectedImage, setSelectedImage] = useState({});
    useEffect(() => {
        axios.get(`https://localhost:7015/api/Images/GetImgForModPhone/${id}`)
            .then(res => {
                setImgColor(res.data)
            });
    }, [id]);
    // console.log(`desc.image`, desc.image);
    // const selectedImage = imgColor.find(item => item.phone.color === selectedColor);
    // let imgPath = desc.image;
    // if (selectedImage) {
    //     console.log(`selectedImage`, selectedImage);

    //     const imgPathArray = JSON.parse(selectedImage.path);

    //     if (Array.isArray(imgPathArray) && imgPathArray.length > 0) {
    //         imgPath = imgPathArray[0];
    //         console.log(`imgPath`, imgPath);
    //     } else {
    //         console.error('Invalid or empty imgPathArray');
    //     }
    // } else {
    //     console.error('Selected image not found');
    // }
    // imgPath = imgPath || desc.image;
    // filter rom
    const [rom, setRom] = useState([]);
    useEffect(() => {
        axios.get(`https://localhost:7015/api/Phones/GetRomInModPhone/${id}`)
            .then(res => setRom(res.data));
    }, [id]);
    // TABS DETAIL PHONE
    const [key, setKey] = useState('home');

    // ICON LIKE
    const [likeColor, setLikeColor] = useState('gray');

    const handleLikeClick = () => {
        if (likeColor === 'gray') {
            setLikeColor('red');
        } else {
            setLikeColor('gray');
        }
    };



    const [phoneImg, setPhoneImg] = useState({});
    // console.log(`phoneImg.path`, phoneImg.path[1]);
    // const [image, setImage] = useState([]);
    // useEffect(() => {
    //     axios.get(`https://localhost:7015/api/Images/GetImgForPhone/${id}`)
    //         .then(res => setImage(res.data));
    // }, [id]);
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
        const existingItem = exCart.find(item => item.phoneId === id);

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
                phoneId: id,
                quantity: quantityPhone
            };

            axiosClient.post(`/Carts`, newCartItem)
                .then(() => {
                    navigate("/cart");
                });
        }

    }

    // value add to cart
    const [quantityPhone, setQuantity] = useState(1); // Initial value

    const handleQuantityChange = (value) => {
        setQuantity(value);
    };
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
                                        imgColor.map((item) => (
                                            <span className="product-color" key={item.phone.color}>
                                                <label style={{ padding: 7 }}>
                                                    <input
                                                        type="radio"
                                                        checked={selectedColor === item.phone.color}
                                                        onChange={() => handleColorClick(item.phone.color, item.phone.id)}
                                                    />
                                                    {
                                                        // Lấy chỉ một tấm hình từ mảng
                                                        <span>
                                                            <img
                                                                className="radio-image"
                                                                src={`https://localhost:7015/images/products/${JSON.parse(item.path)[0]}`}
                                                                alt="Option 1"
                                                                style={{ width: 50, height: 55 }}
                                                            />
                                                        </span>
                                                    }
                                                </label>
                                            </span>
                                        ))
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
                                                        {item.name}
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
                                                    <h5 style={{ marginTop: 10 }}><p>{item.price}VND</p></h5>
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
                                                imgColor.map((item) => (
                                                    <span className="product-color" key={item.phone.color}>
                                                        <label style={{ padding: 7 }}>
                                                            <input
                                                                type="radio"
                                                                checked={selectedColor === item.phone.color}
                                                                onChange={() => handleColorClick(item.phone.color, item.phone.id)}
                                                            />
                                                            {
                                                                // Lấy chỉ một tấm hình từ mảng
                                                                <span>
                                                                    <img
                                                                        className="radio-image"
                                                                        src={`https://localhost:7015/images/products/${JSON.parse(item.path)[0]}`}
                                                                        alt="Option 1"
                                                                        style={{ width: 50, height: 55 }}
                                                                    />
                                                                </span>
                                                            }
                                                        </label>
                                                    </span>
                                                ))

                                            }
                                        </div >


                                        <br />
                                        <div>
                                            <span>Dung lượng:</span>
                                            {
                                                rom.map((item) => {
                                                    return (
                                                        <span className="product-color" key={item}>
                                                            <label style={{ padding: 7 }}>
                                                                <input
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
                                                    max={10} // Giá trị tối đa
                                                    value={quantityPhone}
                                                    step={1} // Bước nhảy
                                                    mobile // Cho phép sử dụng trên thiết bị di động
                                                    onChange={handleQuantityChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Button style={{ marginTop: -5, borderColor: '#4F200D', color: '#4F200D', backgroundColor: '#F6F1E9' }} onClick={(e) => handleCart(phoneID, e)} >
                                                {/* <div >
                                                    <Cart imgPath={imgPath} />
                                                </div> */}
                                                <FontAwesomeIcon icon={faCartPlus} size="xl" />
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button style={{ marginTop: -5, backgroundColor: '#FFD93D', borderColor: '#4F200D', color: '#4F200D' }}>
                                                <FontAwesomeIcon icon={faCoins} /> Mua ngay
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row xs='auto'>
                                        <Col>
                                            <Button style={{ backgroundColor: '#F6F1E9', border: 'none' }} >
                                                <FontAwesomeIcon icon={faHeart} color={likeColor} onClick={handleLikeClick} />
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button style={{ backgroundColor: '#FFD93D', borderColor: '#4F200D', color: '#4F200D' }}>
                                                <FontAwesomeIcon icon={faCirclePlus} /><span style={{ paddingLeft: 10 }}>Thêm so sánh</span>
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
                        </Tabs>


                    </Row>
                </div>
            </section >
        </>
    );
}
export default DetailProduct;