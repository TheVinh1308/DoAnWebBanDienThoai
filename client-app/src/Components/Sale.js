import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';

import 'swiper/swiper-bundle.css';
import StarRatings from 'react-star-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';

// Kích hoạt các modules bạn cần
SwiperCore.use([Navigation, Autoplay]);




const Sale = () => {

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
                                <SwiperSlide >
                                    <Card className="text-black" style={{ width: 250 }} >
                                        <i className="fab fa-apple fa-lg pt-3 pb-1 px-3"></i>
                                        <Card.Img variant="top" src="img/iphone/13_01.png" />
                                        <Card.Body>
                                            <div className="text-center">
                                                <Card.Title>Believing is seeing</Card.Title>
                                            </div>

                                            <div className="d-flex justify-content-center total font-weight-bold mt-4">
                                                <span>$7,197.00</span>
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <StarRatings className='list-vote-icon'

                                                    rating={5}
                                                    starRatedColor="orange"
                                                    // changeRating={onStarClick}
                                                    numberOfStars={5}
                                                    name='rating'
                                                    starDimension="15px"
                                                    starSpacing="2px"
                                                />
                                            </div>
                                        </Card.Body>
                                        <Card.Footer className='d-flex justify-content-around'>

                                            <a>
                                                <FontAwesomeIcon icon={faHeart} />
                                            </a>
                                            <a>
                                                <FontAwesomeIcon icon={faEye} />
                                            </a>
                                            <a>
                                                <FontAwesomeIcon icon={faCartPlus} />
                                            </a>
                                        </Card.Footer>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide >
                                    <Card className="text-black" style={{ width: 250 }} >
                                        <i className="fab fa-apple fa-lg pt-3 pb-1 px-3"></i>
                                        <Card.Img variant="top" src="img/iphone/13_02.png" />
                                        <Card.Body>
                                            <div className="text-center">
                                                <Card.Title>Believing is seeing</Card.Title>
                                            </div>

                                            <div className="d-flex justify-content-center total font-weight-bold mt-4">
                                                <span>$7,197.00</span>
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <StarRatings className='list-vote-icon'

                                                    rating={5}
                                                    starRatedColor="orange"
                                                    // changeRating={onStarClick}
                                                    numberOfStars={5}
                                                    name='rating'
                                                    starDimension="15px"
                                                    starSpacing="2px"
                                                />
                                            </div>
                                        </Card.Body>
                                        <Card.Footer className='d-flex justify-content-around'>

                                            <a>
                                                <FontAwesomeIcon icon={faHeart} />
                                            </a>
                                            <a>
                                                <FontAwesomeIcon icon={faEye} />
                                            </a>
                                            <a>
                                                <FontAwesomeIcon icon={faCartPlus} />
                                            </a>
                                        </Card.Footer>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide >
                                    <Card className="text-black" style={{ width: 250 }} >
                                        <i className="fab fa-apple fa-lg pt-3 pb-1 px-3"></i>
                                        <Card.Img variant="top" src="img/iphone/13_03.png" />
                                        <Card.Body>
                                            <div className="text-center">
                                                <Card.Title>Believing is seeing</Card.Title>
                                            </div>

                                            <div className="d-flex justify-content-center total font-weight-bold mt-4">
                                                <span>$7,197.00</span>
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <StarRatings className='list-vote-icon'

                                                    rating={5}
                                                    starRatedColor="orange"
                                                    // changeRating={onStarClick}
                                                    numberOfStars={5}
                                                    name='rating'
                                                    starDimension="15px"
                                                    starSpacing="2px"
                                                />
                                            </div>
                                        </Card.Body>
                                        <Card.Footer className='d-flex justify-content-around'>

                                            <a>
                                                <FontAwesomeIcon icon={faHeart} />
                                            </a>
                                            <a>
                                                <FontAwesomeIcon icon={faEye} />
                                            </a>
                                            <a>
                                                <FontAwesomeIcon icon={faCartPlus} />
                                            </a>
                                        </Card.Footer>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide >
                                    <Card className="text-black" style={{ width: 250 }} >
                                        <i className="fab fa-apple fa-lg pt-3 pb-1 px-3"></i>
                                        <Card.Img variant="top" src="img/iphone/13_04.png" />
                                        <Card.Body>
                                            <div className="text-center">
                                                <Card.Title>Believing is seeing</Card.Title>
                                            </div>

                                            <div className="d-flex justify-content-center total font-weight-bold mt-4">
                                                <span>$7,197.00</span>
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <StarRatings className='list-vote-icon'

                                                    rating={5}
                                                    starRatedColor="orange"
                                                    // changeRating={onStarClick}
                                                    numberOfStars={5}
                                                    name='rating'
                                                    starDimension="15px"
                                                    starSpacing="2px"
                                                />
                                            </div>
                                        </Card.Body>
                                        <Card.Footer className='d-flex justify-content-around'>

                                            <a>
                                                <FontAwesomeIcon icon={faHeart} />
                                            </a>
                                            <a>
                                                <FontAwesomeIcon icon={faEye} />
                                            </a>
                                            <a>
                                                <FontAwesomeIcon icon={faCartPlus} />
                                            </a>
                                        </Card.Footer>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide >
                                    <Card className="text-black" style={{ width: 250 }} >
                                        <i className="fab fa-apple fa-lg pt-3 pb-1 px-3"></i>
                                        <Card.Img variant="top" src="img/iphone/13_05.png" />
                                        <Card.Body>
                                            <div className="text-center">
                                                <Card.Title>Believing is seeing</Card.Title>
                                            </div>

                                            <div className="d-flex justify-content-center total font-weight-bold mt-4">
                                                <span>$7,197.00</span>
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <StarRatings className='list-vote-icon'

                                                    rating={5}
                                                    starRatedColor="orange"
                                                    // changeRating={onStarClick}
                                                    numberOfStars={5}
                                                    name='rating'
                                                    starDimension="15px"
                                                    starSpacing="2px"
                                                />
                                            </div>
                                        </Card.Body>
                                        <Card.Footer className='d-flex justify-content-around'>

                                            <a>
                                                <FontAwesomeIcon icon={faHeart} />
                                            </a>
                                            <a>
                                                <FontAwesomeIcon icon={faEye} />
                                            </a>
                                            <a>
                                                <FontAwesomeIcon icon={faCartPlus} />
                                            </a>
                                        </Card.Footer>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide >
                                    <Card className="text-black" style={{ width: 250 }} >
                                        <i className="fab fa-apple fa-lg pt-3 pb-1 px-3"></i>
                                        <Card.Img variant="top" src="img/iphone/13_06.png" />
                                        <Card.Body>
                                            <div className="text-center">
                                                <Card.Title>Believing is seeing</Card.Title>
                                            </div>

                                            <div className="d-flex justify-content-center total font-weight-bold mt-4">
                                                <span>$7,197.00</span>
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <StarRatings className='list-vote-icon'

                                                    rating={5}
                                                    starRatedColor="orange"
                                                    // changeRating={onStarClick}
                                                    numberOfStars={5}
                                                    name='rating'
                                                    starDimension="15px"
                                                    starSpacing="2px"
                                                />
                                            </div>
                                        </Card.Body>
                                        <Card.Footer className='d-flex justify-content-around'>

                                            <a>
                                                <FontAwesomeIcon icon={faHeart} />
                                            </a>
                                            <a>
                                                <FontAwesomeIcon icon={faEye} />
                                            </a>
                                            <a>
                                                <FontAwesomeIcon icon={faCartPlus} />
                                            </a>
                                        </Card.Footer>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide >
                                    <Card className="text-black" style={{ width: 250 }} >
                                        <i className="fab fa-apple fa-lg pt-3 pb-1 px-3"></i>
                                        <Card.Img variant="top" src="img/iphone/13_03.png" />
                                        <Card.Body>
                                            <div className="text-center">
                                                <Card.Title>Believing is seeing</Card.Title>
                                            </div>

                                            <div className="d-flex justify-content-center total font-weight-bold mt-4">
                                                <span>$7,197.00</span>
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <StarRatings className='list-vote-icon'

                                                    rating={5}
                                                    starRatedColor="orange"
                                                    // changeRating={onStarClick}
                                                    numberOfStars={5}
                                                    name='rating'
                                                    starDimension="15px"
                                                    starSpacing="2px"
                                                />
                                            </div>
                                        </Card.Body>
                                        <Card.Footer className='d-flex justify-content-around'>

                                            <a>
                                                <FontAwesomeIcon icon={faHeart} />
                                            </a>
                                            <a>
                                                <FontAwesomeIcon icon={faEye} />
                                            </a>
                                            <a>
                                                <FontAwesomeIcon icon={faCartPlus} />
                                            </a>
                                        </Card.Footer>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide >
                                    <Card className="text-black" style={{ width: 250 }}>
                                        <i className="fab fa-apple fa-lg pt-3 pb-1 px-3"></i>
                                        <Card.Img variant="top" src="img/iphone/13_05.png" />
                                        <Card.Body>
                                            <div className="text-center">
                                                <Card.Title>Believing is seeing</Card.Title>
                                            </div>

                                            <div className="d-flex justify-content-center total font-weight-bold mt-4">
                                                <span>$7,197.00</span>
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <StarRatings className='list-vote-icon'

                                                    rating={5}
                                                    starRatedColor="orange"
                                                    // changeRating={onStarClick}
                                                    numberOfStars={5}
                                                    name='rating'
                                                    starDimension="15px"
                                                    starSpacing="2px"
                                                />
                                            </div>
                                        </Card.Body>
                                        <Card.Footer className='d-flex justify-content-around'>

                                            <a>
                                                <FontAwesomeIcon icon={faHeart} />
                                            </a>
                                            <a>
                                                <FontAwesomeIcon icon={faEye} />
                                            </a>
                                            <a>
                                                <FontAwesomeIcon icon={faCartPlus} />
                                            </a>
                                        </Card.Footer>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide >
                                    <Card className="text-black" style={{ width: 250 }}>
                                        <i className="fab fa-apple fa-lg pt-3 pb-1 px-3"></i>
                                        <Card.Img variant="top" src="img/iphone/13_01.png" />
                                        <Card.Body>
                                            <div className="text-center">
                                                <Card.Title>Believing is seeing</Card.Title>
                                            </div>

                                            <div className="d-flex justify-content-center total font-weight-bold mt-4">
                                                <span>$7,197.00</span>
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <StarRatings className='list-vote-icon'

                                                    rating={5}
                                                    starRatedColor="orange"
                                                    // changeRating={onStarClick}
                                                    numberOfStars={5}
                                                    name='rating'
                                                    starDimension="15px"
                                                    starSpacing="2px"
                                                />
                                            </div>
                                        </Card.Body>
                                        <Card.Footer className='d-flex justify-content-around'>

                                            <a>
                                                <FontAwesomeIcon icon={faHeart} />
                                            </a>
                                            <a>
                                                <FontAwesomeIcon icon={faEye} />
                                            </a>
                                            <a>
                                                <FontAwesomeIcon icon={faCartPlus} />
                                            </a>
                                        </Card.Footer>
                                    </Card>
                                </SwiperSlide>
                                <SwiperSlide >
                                    <Card className="text-black" style={{ width: 250 }}  >
                                        <i className="fab fa-apple fa-lg pt-3 pb-1 px-3"></i>
                                        <Card.Img variant="top" src="img/iphone/13_04.png" />
                                        <Card.Body>
                                            <div className="text-center">
                                                <Card.Title>Believing is seeing</Card.Title>
                                            </div>

                                            <div className="d-flex justify-content-center total font-weight-bold mt-4">
                                                <span>$7,197.00</span>
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <StarRatings className='list-vote-icon'

                                                    rating={5}
                                                    starRatedColor="orange"
                                                    // changeRating={onStarClick}
                                                    numberOfStars={5}
                                                    name='rating'
                                                    starDimension="15px"
                                                    starSpacing="2px"
                                                />
                                            </div>

                                        </Card.Body>
                                        <Card.Footer className='d-flex justify-content-around'>

                                            <a>
                                                <FontAwesomeIcon icon={faHeart} />
                                            </a>
                                            <a>
                                                <FontAwesomeIcon icon={faEye} />
                                            </a>
                                            <a>
                                                <FontAwesomeIcon icon={faCartPlus} />
                                            </a>
                                        </Card.Footer>
                                    </Card>
                                </SwiperSlide>

                                {/* Thêm các SwiperSlide khác tương tự cho các sản phẩm khác */}

                            </Swiper>
                        </div>
                    </section>
                </Col>
            </Row>
        </>

    );
}

export default Sale;
