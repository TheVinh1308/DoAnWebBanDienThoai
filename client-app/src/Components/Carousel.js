import { faCirclePlay } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const ADV = () => {
    const [slideShows, setSlideShows] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:7015/api/SlideShows`).then((res) => setSlideShows(res.data))
    })
    return (


        <div id='carousel' >
            <Carousel>
                {
                    slideShows.map((item, index) => (
                        <Carousel.Item key={index} >

                            <section id="hero" className="d-flex align-items-center">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1"
                                        >
                                            <h1>{item.title}</h1>
                                            <h2>{item.description}</h2>
                                            <div className="d-flex justify-content-center justify-content-lg-start">
                                                <Link className="btn-get-started " to={`details/${item.modPhoneId}`} style={{ backgroundColor: 'black', zIndex: 2 }}> Get Started</Link>
                                                <a href="https://www.youtube.com/watch?v=jDDaplaOz7Q" className="glightbox btn-watch-video"
                                                    style={{ color: 'black' }}>
                                                    <FontAwesomeIcon icon={faCirclePlay} style={{ fontSize: '2rem', paddingRight: 10 }} /><span>Watch Video</span></a>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-in" data-aos-delay="200">
                                            <img src={`https://localhost:7015/images/slideshows/${item.path}`} style={{ width: "100%", height: "100%", objectFit: "fill" }} className="img-fluid animated" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </section>

                        </Carousel.Item>

                    ))
                }
            </Carousel>
        </div >

    );
}

export default ADV;
