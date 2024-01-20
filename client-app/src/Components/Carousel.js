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


        <div id='carousel'>
            <Carousel>
                {
                    slideShows.map((item,index) => (
                        <Carousel.Item key={index}>
                                <Link to={`details/${item.modPhoneId}`}>
                                <section id="hero" className="d-flex align-items-center">
                                    <div className="container">
                                        <div className="row">
                                            <div className="hero-img" data-aos="zoom-in" data-aos-delay="200">
                                                <img src={`https://localhost:7015/images/slideshows/${item.path }`} style={{width: "100%",height: "100%", objectFit: "fill"}} className="img-fluid animated" alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                        </Link>
                            </Carousel.Item>

                ))
                }
        </Carousel>
        </div>

    );
}

export default ADV;
