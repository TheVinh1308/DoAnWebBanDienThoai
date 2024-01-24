import { faCamera, faStar, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Form, Modal, ProgressBar, Row } from "react-bootstrap";
import axios from 'axios';
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
const Vote = ({ VoteID }) => {



    const [votes, setVotes] = useState([]);
    const [sumRate, setSumRate] = useState();
    const [Rate1, setRate1] = useState(0);
    const [Rate2, setRate2] = useState(0);
    const [Rate3, setRate3] = useState(0);
    const [Rate4, setRate4] = useState(0);
    const [Rate5, setRate5] = useState(0);

    useEffect(() => {
        if (VoteID == undefined) {

        }
        else {

            axios.get(`https://localhost:7015/api/Votes/GetInvoiceByPhoneId/${VoteID}`)
                .then(res => {
                    setVotes(res.data);

                    const sum = res.data.reduce((accumulator, currentVote) => {
                        // Count occurrences for each rating
                        switch (currentVote.rate) {
                            case 1:
                                setRate1(prevRate1 => prevRate1 + 1);
                                break;
                            case 2:
                                setRate2(prevRate2 => prevRate2 + 1);
                                break;
                            case 3:
                                setRate3(prevRate3 => prevRate3 + 1);
                                break;
                            case 4:
                                setRate4(prevRate4 => prevRate4 + 1);
                                break;
                            case 5:
                                setRate5(prevRate5 => prevRate5 + 1);
                                break;
                            default:
                                break;
                        }

                        return accumulator + currentVote.rate;
                    }, 0);

                    setSumRate(sum);
                });
        }
    }, [VoteID]);

    console.log(`votes`, votes);
    // console.log(`sumRate`, sumRate);

    // LIST VOTE
    let rating;
    if (votes.length == 0) {
        rating = 0;
    }
    else {
        rating = parseFloat((sumRate / votes.length).toFixed(1));
    }





    return (
        <>
            {

                votes.length > 0 ? (

                    <Row style={{ marginTop: 50 }} className="fill-container">

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
                                                    <Col><ProgressBar className="PB-start" variant="warning" max={votes.length} now={Rate5} style={{ height: '8px' }} /></Col>
                                                    <Col>{Rate5}</Col>
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
                                                    <Col><ProgressBar className="PB-start" variant="warning" max={votes.length} now={Rate4} style={{ height: '8px' }} /></Col>
                                                    <Col>{Rate4}</Col>
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
                                                    <Col><ProgressBar className="PB-start" variant="warning" max={votes.length} now={Rate3} style={{ height: '8px' }} /></Col>
                                                    <Col>{Rate3}</Col>
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
                                                    <Col><ProgressBar className="PB-start" variant="warning" max={votes.length} now={Rate2} style={{ height: '8px' }} /></Col>
                                                    <Col>{Rate2}</Col>
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
                                                    <Col ><ProgressBar className="PB-start" variant="warning" max={votes.length} now={Rate1} style={{ height: '8px' }} /></Col>
                                                    <Col>{Rate1}</Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </Col >

                        <Col xs={8} style={{ padding: 0 }}>
                            <div >
                                {/* Danh sách đánh giá bình luận điện thoại */}
                                <aside style={{ marginLeft: 20 }}>
                                    <div className='content-vote'>
                                        {
                                            votes.map((item, index) => {
                                                return (
                                                    <>

                                                        <Row key={index}>
                                                            <Col style={{ marginRight: 5 }}>
                                                                <p style={{ marginBottom: 0, fontWeight: 'bold' }}>{item.fullname}</p>
                                                                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 15, marginBottom: 0, color: 'gray' }}>{item.voteday}</p>
                                                                <StarRatings className='list-vote-icon'
                                                                    rating={item.rate}
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

                                                                    <img
                                                                        src={`https://localhost:7015/images/review/${JSON.parse(item.path)[0]}`}
                                                                        alt=""
                                                                        style={{
                                                                            width: 70,
                                                                            height: 50,
                                                                            display: JSON.parse(item.path)[0] === undefined ? 'none' : '',
                                                                        }}
                                                                    />
                                                                    <img
                                                                        src={`https://localhost:7015/images/review/${JSON.parse(item.path)[1]}`}
                                                                        alt=""
                                                                        style={{
                                                                            width: 70,
                                                                            height: 50,
                                                                            display: JSON.parse(item.path)[1] === undefined ? 'none' : '',
                                                                        }}
                                                                    />
                                                                    <img
                                                                        src={`https://localhost:7015/images/review/${JSON.parse(item.path)[2]}`}
                                                                        alt=""
                                                                        style={{
                                                                            width: 70,
                                                                            height: 50,
                                                                            display: JSON.parse(item.path)[2] === undefined ? 'none' : '',
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <p>{item.content}</p>

                                                                </div>
                                                            </Col>

                                                        </Row>

                                                    </>
                                                )
                                            })
                                        }

                                    </div>
                                </aside>
                            </div>
                        </Col >



                    </Row >

                ) : <h5 style={{ textAlign: 'center', paddingTop: 20, paddingBottom: 20, border: 'solid 1px gray', backgroundColor: 'antiquewhite' }}>Sản phẩm chưa có đáng giá nào!</h5>
            }

        </>
    );
}

export default Vote;