import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';

import 'swiper/swiper-bundle.css';
import StarRatings from 'react-star-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

// Kích hoạt các modules bạn cần
SwiperCore.use([Navigation, Autoplay]);


const CountdownTimer = ({ initialDays }) => {
    // Calculate the total seconds remaining between now and the specified date
    const now = new Date();
    const timeDifference = initialDays.getTime() - now.getTime();
    const initialSeconds = Math.floor(timeDifference / 1000);

    const [timeRemaining, setTimeRemaining] = useState(initialSeconds);
    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        // Cleanup function to clear the interval when the component is unmounted
        return () => clearInterval(countdownInterval);
    }, []);

    // Calculate days, hours, minutes, and seconds from the total seconds remaining
    const days = Math.floor(timeRemaining / (24 * 60 * 60));
    const hours = Math.floor((timeRemaining % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((timeRemaining % (60 * 60)) / 60);
    const seconds = timeRemaining % 60;

    if (timeRemaining <= 0) {
        return <p>Kết thúc khuyến mãi</p>;
    }

    return (
        <div>
            <p>{`Còn ${days} ngày ${hours}:${minutes}:${seconds}`}</p>
        </div>
    );
};

const Sale = () => {

    const [sale, setSale] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:7015/api/Phones/GetPhonePromotion/1`)
            .then(res => setSale(res.data))
    }, [])
    console.log(`sale`, sale);



    return (
        <>
            <Row id='sale'>



                <Col className='container' style={{ marginBottom: 50 }}>

                    <section id="portfolio" className="portfolio " style={{ padding: '20px' }}>
                        <div className="sale" >
                            <div className="d-flex justify-content-between section-title " style={{ padding: '30px' }}>
                                <h2 className="flex-left">Hot sale cuối tuần</h2>
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
                                    sale.map((item, index) => {
                                        return (
                                            < SwiperSlide key={index} >

                                                <Card className="text-black" style={{ width: 250 }} >
                                                    <p style={{ display: 'flex', justifyContent: 'end', padding: 10 }}>
                                                        <CountdownTimer initialDays={new Date(item.modPhone.promotion.datePromotion)} />
                                                    </p>
                                                    <Card.Img variant="top" src={`https://localhost:7015/images/products/${item.modPhone.image}`} />
                                                    <Card.Body>
                                                        <div className="text-center">
                                                            <Card.Title style={{ fontSize: '1rem' }}>{item.modPhone.name}</Card.Title>
                                                        </div>
                                                        <Row>
                                                            <Col><span className='afterPrice' >{(item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></Col>
                                                            <Col>-{item.modPhone.promotion.discountPercent}%</Col>
                                                        </Row>
                                                        <div className="d-flex justify-content-center total font-weight-bold ">

                                                            <br />
                                                            <Row> <span style={{ fontSize: '1.25rem', color: 'red' }}>{(item.price - (item.price * item.modPhone.promotion.discountPercent / 100)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></Row>

                                                        </div>

                                                    </Card.Body>

                                                </Card>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>

                        </div>
                    </section>
                </Col>
            </Row >
        </>

    );
}

export default Sale;
