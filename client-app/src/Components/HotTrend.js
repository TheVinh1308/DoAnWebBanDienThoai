import React, { useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';

import 'swiper/swiper-bundle.css';
import StarRatings from 'react-star-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Kích hoạt các modules bạn cần
SwiperCore.use([Navigation, Autoplay]);




const HotTrend = () => {

    const [top5Phones, setTop5Phones] = useState([]);
    const [image, setImage] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:7015/api/Phones/GetTop5Phones`).then((res) => setTop5Phones(res.data)).catch(() => console.log("Loi lay du lieu"))
    }, [])

    useEffect(() => {
        axios.get(`https://localhost:7015/api/Images`).then((res) => setImage(res.data))
    }, [])




    return (
        <>
            <Row id='sale'>


                {/* <Col sm={4}>
                    <div>
                        <video width={300} controls autoPlay style={{ marginLeft: '20%', maxHeight: 400, marginTop: 200 }}>
                            <source src="./video/video02.mp4" type="video/mp4" />
                        </video>
                    </div>
                </Col> */}
                

                    <Col className='container' style={{ marginBottom: 50 }} >

                        <section id="portfolio" className="portfolio " style={{ padding: '20px' }}>
                            <div className="sale" >
                                <div className="d-flex justify-content-between section-title " style={{ padding: '30px' }}>
                                    <h2 className="flex-left">Sản phẩm mới ra mắt</h2>
                                    {/* <h4 id="TimeSale"></h4> */}
                                </div>
                             

                                <Swiper
                                    className="swiper-container-sale"
                                    spaceBetween={20}
                                    slidesPerView={4}
                                    loop={true}
                                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                                  
                                >
                                       {
                    top5Phones.map((item,index1) => (
                                    <SwiperSlide  key={index1} >
                                      
                                            <Card className="text-black" style={{ width: 250 }} >
                                                <i className="fab fa-apple fa-lg pt-3 pb-1 px-3"></i>
                                                <Link to={`details/${item.modPhone.id}`}>
                                                <Card.Body>
                                                {


                                                image.map((itemImage, imageIndex) => (
                                                    item.id === itemImage.phoneId && (
                                                        <Card.Img
                                                            variant="top"
                                                            key={index1}
                                                            src={`https://localhost:7015/images/products/${JSON.parse(itemImage.path)[0]}`}
                                                        
                                                            alt=""
                                                        />
                                                    )))
                                                }
                                                    <div className="text-center">
                                                        <Card.Title className='mt-3'>{item.name}</Card.Title>
                                                    </div>

                                                    <div className="d-flex justify-content-center total font-weight-bold mt-4">
                                                        <span className='text-danger'>{(item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                                    </div>
                                                    {/* <div className="d-flex justify-content-center">
                                                        <StarRatings className='list-vote-icon'

                                                            rating={5}
                                                            starRatedColor="orange"
                                                            // changeRating={onStarClick}
                                                            numberOfStars={5}
                                                            name='rating'
                                                            starDimension="15px"
                                                            starSpacing="2px"
                                                        />
                                                    </div> */}
                                                </Card.Body>
                                                </Link>
                                                <Card.Footer className='d-flex justify-content-around'>

                                                    {/* <a>
                                                        <FontAwesomeIcon icon={faHeart} />
                                                    </a>
                                                    <a>
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </a>
                                                    <a>
                                                        <FontAwesomeIcon icon={faCartPlus} />
                                                    </a> */}
                                                </Card.Footer>
                                            </Card>
                                        
                                    </SwiperSlide>
                                        ))
                                    }
                                  
                                

                                    {/* Thêm các SwiperSlide khác tương tự cho các sản phẩm khác */}

                                </Swiper>
                              
                            </div>
                        </section>
                    </Col>
                  
            </Row>
        </>

    );
}

export default HotTrend;
