import { faCamera, faStar, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Form, Modal, ProgressBar, Row } from "react-bootstrap";
import axios from 'axios';
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
const Vote = () => {
    // VOTE DIEN THOAI
    const [selectedRating, setSelectedRating] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleStarClick = (value) => {
        setSelectedRating(value);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };




    // LIST VOTE
    const rating = 4.7;
    //  LOAD FILE VOTES
    const handleFileChange = (e) => {
        // Handle file changes here
        const selectedFile = e.target.files[0];
        console.log(selectedFile);
    };

    const { id } = useParams();
    const [product, setProduct] = useState({ images: [] });
    useEffect(() => {
        axios.get(`https://dummyjson.com/products/${id}`)
            .then(res => setProduct(res.data));
    }, [id]);
    return (
        <>
            <Row style={{ marginTop: 50 }}>

                <Col xs={4} style={{ paddingRight: 0, marginRight: -30 }} >
                    <div >
                        {/* Danh sách đánh giá bình luận điện thoại */}
                        <aside style={{ marginLeft: 20 }}>
                            <div className='list-vote pt-3'>

                                <div className="box-star" >
                                    <div className="point" style={{ marginBottom: 30 }} >
                                        <span style={{ marginRight: 40, fontSize: 30 }}>{rating}</span>
                                        <p style={{ margin: '-40px 60px' }}>
                                            <StarRatings className='list-vote-icon'
                                                rating={rating}
                                                starRatedColor="orange"
                                                // changeRating={onStarClick}
                                                numberOfStars={5}
                                                name='rating'
                                                starDimension="30px"
                                                starSpacing="2px"

                                            />
                                        </p>





                                    </div>
                                    <div className='py-4 rating-list'>
                                        <Row >
                                            <Col xs='auto'>
                                                <p className="p-start" >
                                                    <span style={{ display: 'inline-block' }}> <StarRatings
                                                        rating={5}
                                                        starRatedColor="#FFC107"
                                                        // changeRating={onStarClick}
                                                        numberOfStars={5}
                                                        starDimension="15px"
                                                        starSpacing="1px"
                                                    /></span>
                                                </p>
                                            </Col>
                                            <Col><ProgressBar className="PB-start" variant="warning" max={100} now={40} style={{ height: '8px' }} /></Col>
                                            <Col>3</Col>
                                        </Row>
                                        <Row >
                                            <Col xs='auto'>
                                                <p className="p-start" >
                                                    <span style={{ display: 'inline-block' }}> <StarRatings
                                                        rating={4}
                                                        starRatedColor="#FFC107"
                                                        // changeRating={onStarClick}
                                                        numberOfStars={5}
                                                        starDimension="15px"
                                                        starSpacing="1px"
                                                    /></span>
                                                </p>
                                            </Col>
                                            <Col><ProgressBar className="PB-start" variant="warning" max={100} now={80} style={{ height: '8px' }} /></Col>
                                            <Col>3</Col>
                                        </Row>
                                        <Row >
                                            <Col xs='auto'>
                                                <p className="p-start" >
                                                    <span style={{ display: 'inline-block' }}> <StarRatings
                                                        rating={3}
                                                        starRatedColor="#FFC107"
                                                        // changeRating={onStarClick}
                                                        numberOfStars={5}
                                                        starDimension="15px"
                                                        starSpacing="1px"
                                                    /></span>
                                                </p>
                                            </Col>
                                            <Col><ProgressBar className="PB-start" variant="warning" max={100} now={40} style={{ height: '8px' }} /></Col>
                                            <Col>3</Col>
                                        </Row>
                                        <Row >
                                            <Col xs='auto'>
                                                <p className="p-start" >
                                                    <span style={{ display: 'inline-block' }}> <StarRatings
                                                        rating={2}
                                                        starRatedColor="#FFC107"
                                                        // changeRating={onStarClick}
                                                        numberOfStars={5}
                                                        starDimension="15px"
                                                        starSpacing="1px"
                                                    /></span>
                                                </p>
                                            </Col>
                                            <Col><ProgressBar className="PB-start" variant="warning" max={100} now={60} style={{ height: '8px' }} /></Col>
                                            <Col>3</Col>
                                        </Row>
                                        <Row >
                                            <Col xs='auto'>
                                                <p className="p-start" >
                                                    <span style={{ display: 'inline-block' }}> <StarRatings
                                                        rating={1}
                                                        starRatedColor="#FFC107"
                                                        // changeRating={onStarClick}
                                                        numberOfStars={5}
                                                        starDimension="15px"
                                                        starSpacing="1px"
                                                    /></span>
                                                </p>
                                            </Col>
                                            <Col ><ProgressBar className="PB-start" variant="warning" max={100} now={10} /></Col>
                                            <Col>3</Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </Col >
                <Col xs={5} style={{ padding: 0 }}>
                    <div >
                        {/* Danh sách đánh giá bình luận điện thoại */}
                        <aside style={{ marginLeft: 20 }}>
                            <div className='content-vote'>
                                <Row>
                                    <Col style={{ marginRight: 5 }}>
                                        <p style={{ marginBottom: 0, fontWeight: 'bold' }}>Bình Dương</p>
                                        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, marginBottom: 0, color: 'gray' }}>20 Dec 2023, 9:30 PM </p>
                                        <StarRatings className='list-vote-icon'
                                            rating={5}
                                            starRatedColor="orange"
                                            // changeRating={onStarClick}
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension="15px"
                                            starSpacing="2px"

                                        />
                                    </Col>
                                    <Col lg={8}>
                                        <div className='img-vote' >
                                            <img src="/img/carousel/ca4.jpg" alt="" style={{ width: 100, height: 70 }} />
                                            <img src="/img/carousel/ca1.jpg" alt="" style={{ width: 100, height: 70 }} />
                                            <img src="/img/carousel/ca3.jpg" alt="" style={{ width: 100, height: 70 }} />
                                        </div>
                                        <div>
                                            <p>Nói chung mọi thứ đều ổn chỉ mỗi cái là pin tụt hoi nhanh so với 14prm</p>

                                        </div>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col style={{ marginRight: 5 }}>
                                        <p style={{ marginBottom: 0, fontWeight: 'bold' }}>Hoan Vinh</p>
                                        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, marginBottom: 0, color: 'gray' }}>20 Dec 2023, 9:30 PM </p>
                                        <StarRatings className='list-vote-icon'
                                            rating={5}
                                            starRatedColor="orange"
                                            // changeRating={onStarClick}
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension="15px"
                                            starSpacing="2px"

                                        />
                                    </Col>
                                    <Col lg={8}>
                                        <div className='img-vote'>
                                            <img src="/img/carousel/ca2.jpg" alt="" style={{ width: 100, height: 70 }} />
                                        </div>
                                        <div>
                                            <p>Nói chung mọi thứ đều ổn chỉ mỗi cái là pin tụt hoi nhanh so với 14prm</p>

                                        </div>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col style={{ marginRight: 5 }}>
                                        <p style={{ marginBottom: 0, fontWeight: 'bold' }}>Thế Vinh</p>
                                        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 12, marginBottom: 0, color: 'gray' }}>20 Dec 2023, 9:30 PM </p>
                                        <StarRatings className='list-vote-icon'
                                            rating={5}
                                            starRatedColor="orange"
                                            // changeRating={onStarClick}
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension="15px"
                                            starSpacing="2px"

                                        />
                                    </Col>
                                    <Col lg={8}>
                                        <div className='img-vote'>
                                            <img src="/img/carousel/ca5.jpg" alt="" style={{ width: 100, height: 70 }} />
                                            <img src="/img/carousel/ca7.jpg" alt="" style={{ width: 100, height: 70 }} />
                                        </div>
                                        <div>
                                            <p>Nói chung mọi thứ đều ổn chỉ mỗi cái là pin tụt hoi nhanh so với 14prm</p>

                                        </div>
                                    </Col>

                                </Row>

                            </div>
                        </aside>
                    </div>
                </Col >
                <Col style={{ paddingLeft: 0 }}>
                    <div >
                        {/* Đánh giá điện thoại */}
                        <aside >

                            <Card style={{ border: 'none' }}>
                                <Card.Body>
                                    <div className="px-2" action="">
                                        <p className="text-center">
                                            <h3>Đánh giá sản phẩm này</h3>
                                        </p>
                                        <ul className="h2 rating justify-content-center pb-3" data-mdb-toggle="rating">
                                            {/* Include your star icons here */}
                                        </ul>
                                        <p className="text-center">
                                            Nếu đã mua sản phẩm này tại shop. Hãy đánh giá ngay để giúp hàng ngàn người chọn mua hàng tốt nhất bạn nhé!
                                        </p>
                                        <ul className="rating-topzonecr-star">
                                            {[1, 2, 3, 4, 5].map((value) => (
                                                <li
                                                    key={value}
                                                    data-val={value}
                                                    className={`click-openpopup ${selectedRating && value <= selectedRating ? 'checkRating' : ''}`}
                                                    onClick={() => handleStarClick(value)}
                                                >
                                                    <FontAwesomeIcon icon={faStar} />
                                                    <p data-val={value}>
                                                        {value === 1 ? 'Rất tệ' : value === 2 ? 'Tệ' : value === 3 ? 'Tạm ổn' : value === 4 ? 'Tốt' : 'Rất tốt'}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </Card.Body>

                            </Card>
                            <Modal show={showModal} onHide={handleCloseModal}>

                                <Modal.Body>
                                    <div style={{ textAlign: 'center' }}>
                                        <Modal.Title>Đánh giá sản phẩm</Modal.Title>
                                        <img width={60} height={60} className="rounded-2 my-3" style={{ maxHeight: '100%' }} src={product.thumbnail} />
                                        <h3>{product.title}</h3>
                                    </div>

                                    <ul className="rating-topzonecr-star">
                                        {[1, 2, 3, 4, 5].map((value) => (
                                            <li
                                                key={value}
                                                data-val={value}
                                                className={`click-openpopup ${selectedRating && value <= selectedRating ? 'checkRating' : ''}`}
                                                onClick={() => handleStarClick(value)}
                                            >
                                                <FontAwesomeIcon icon={faStar} />
                                                <p data-val={value}>
                                                    {value === 1 ? 'Rất tệ' : value === 2 ? 'Tệ' : value === 3 ? 'Tạm ổn' : value === 4 ? 'Tốt' : 'Rất tốt'}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
                                            <Form.Control as="textarea" rows={3} placeholder='Mời bạn chia sẻ thêm cảm nhận...' />
                                        </Form.Group>
                                        <Row>
                                            <Col>
                                                <label htmlFor='load-file-vote' style={{ padding: 10 }}>
                                                    <FontAwesomeIcon icon={faCamera} style={{ paddingRight: 5 }} />
                                                    <span>Tối đa 3 ảnh</span>
                                                </label>

                                                <Form.Control id='load-file-vote' type='file' rows={6} onChange={handleFileChange}
                                                    style={{ display: 'none' }} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Control type='text' rows={3} placeholder='Họ tên (Bắt buộc)' />
                                            </Col>
                                            <Col>
                                                <Form.Control type='text' rows={3} placeholder='Số điện thoại (Bắt buộc)' />
                                            </Col>
                                        </Row>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseModal}>
                                        Đóng
                                    </Button>
                                    <Button variant="primary">
                                        Đánh giá
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </aside>

                    </div>
                </Col>
            </Row >



        </>
    );
}

export default Vote;