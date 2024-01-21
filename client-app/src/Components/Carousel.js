import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const ADV = () => {
    const [slideShows, setSlideShows] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:7015/api/SlideShows`).then((res) => setSlideShows(res.data))
    })
    console.log(`slideShows`, slideShows);
    return (


        <div id='carousel'>
            <Carousel>
                {
                    slideShows.map((item, index) => (
                        <>

                            {/* <Carousel.Item key={index}>
                                <Link to={`details/${item.modPhoneId}`}>
                                    <section id="hero" className="d-flex align-items-center">
                                        <div className="container">
                                            <div className="row">
                                                <div className="hero-img" data-aos="zoom-in" data-aos-delay="200">
                                                    <img src={`https://localhost:7015/images/slideshows/${item.path}`} style={{ width: "100%", height: "100%", objectFit: "fill" }} className="img-fluid animated" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </Link>
                            </Carousel.Item> */}
                            <Carousel.Item key={index} style={{ display: 'block' }}>
                                <Link to={`details/${item.modPhoneId}`}>
                                    <section id="hero" className="d-flex align-items-center">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1"
                                                >
                                                    <h1>{item.Title}</h1>
                                                    <h2>{item.Description}</h2>
                                                    <div className="d-flex justify-content-center justify-content-lg-start">
                                                        <a href="#about" className="btn-get-started scrollto " style={{ backgroundColor: 'black' }}>Get Started</a>
                                                        <a href="https://www.youtube.com/watch?v=jDDaplaOz7Q" className="glightbox btn-watch-video"
                                                            style={{ color: 'black' }}>
                                                            <i className="bi bi-play-circle text-black"></i><span>Watch Video</span></a>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 order-1 order-lg-2 hero-img" >
                                                    <img src={`https://localhost:7015/images/slideshows/${item.path}`} className="img-fluid animated" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </Link>
                            </Carousel.Item>
                        </>
                    ))
                }
            </Carousel>
        </div>

    );
}

export default ADV;
