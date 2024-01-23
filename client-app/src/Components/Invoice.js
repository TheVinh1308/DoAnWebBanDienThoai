import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Accordion, Breadcrumb, Button, Card, Col, Form, Modal, Row, Table } from "react-bootstrap";
import Header from "./Navbar";
import { faCamera, faHouse, faL } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { faStar } from "@fortawesome/free-regular-svg-icons";

const Invoice = () => {

    const [invoice, setInvoice] = useState([]);
    const [invoiceDetail, setInvoiceDetail] = useState([[]]);


    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            const decoded = jwtDecode(token);
            setUserName(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"]);
            setUserId(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
            setIsAuthenticated(true);
        }
    }, []);
    useEffect(() => {
        axios.get(`https://localhost:7015/api/Invoices/GetInvoicesByUserId/${userId}`)
            .then(res => {
                setInvoice(res.data);

                const detailPromises = res.data.map(item => {
                    return axios.get(`https://localhost:7015/api/InvoiceDetails/GetInvoiceDetailForInvoice/${item.id}`)
                        .then(ress => ({ id: item.id, details: ress.data }));
                });

                // Wait for all promises to resolve
                Promise.all(detailPromises)
                    .then(invoiceDetailsArray => {
                        // Organize details based on invoice id
                        const detailsObject = {};
                        invoiceDetailsArray.forEach(item => {
                            detailsObject[item.id] = item.details;
                        });

                        setInvoiceDetail(detailsObject);

                        // Log a message if the returned value is empty
                        if (Object.keys(detailsObject).length === 0) {
                            console.log('Invoice details are empty.');
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching invoice details:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching invoices:', error);
            });
    }, [userId]);



    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:7015/api/Images/GetImgForInvoice/${userId}`)
            .then(res => {
                if (res.data.length === 0) {
                    console.log("API returned an empty array.");
                } else {
                    setImages(res.data);
                }
            })
            .catch(error => {
                console.error("Error fetching data from the API:", error);
            });
    }, [userId]);
    const [selectedRating, setSelectedRating] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalProduct, setModalProduct] = useState(null);
    const handleShowModal = (item, id) => {
        setModalProduct(item);
        setInvoiceId(id);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleStarClick = (value) => {
        setSelectedRating(value);
    };

    // Thêm review
    const navigate = useNavigate();
    const [image, setImage] = useState({ status: true, Files: [] });
    const [invoiceId, setInvoiceId] = useState([]);
    const handleImageChange = (e) => {
        let name = e.target.name;
        let files = e.target.files;

        const filesArray = Array.from(files);

        setImage(prev => ({ ...prev, [name]: filesArray }));
    }
    const handleDescription = (e) => {
        let name = e.target.name;
        let value = e.target.value
        setImage(prev => ({ ...prev, [name]: value }));
    }
    console.log(`userId`, userId);
    console.log(`modalProduct?.phoneId`, modalProduct?.phoneId);
    // console.log(`invoice`, invoice[1].id);
    console.log(`image.Description`, image.Description);
    console.log(`selectedRating`, selectedRating);
    const handleSubmit = (e, index) => {
        e.preventDefault();

        const formData = new FormData();

        // Append each file to form data
        image.Files.forEach(file => {
            formData.append('Files', file);
        });
        const dateObject = new Date();
        const nowAsDate = new Date(dateObject.toLocaleDateString());
        // Append other form data fields
        formData.append('UserId', userId);
        formData.append('Fullname', userName);
        formData.append('PhoneId', modalProduct?.phoneId);
        formData.append('InvoiceId', invoiceId);
        formData.append('Content', image.Description);
        formData.append('Rate', selectedRating);
        formData.append('Voteday', nowAsDate.toISOString());

        axios.post(`https://localhost:7015/api/Votes`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(() => {
                navigate("/");
            })
            .catch(() => {
                alert("Thêm thất bại!!!")
            })
    }

    return (
        <>
            <Header />
            <div style={{ transform: 'translateY(90px)', position: 'fixed', backgroundColor: 'white', zIndex: 2, width: '100vw', paddingTop: 20 }}>
                <Breadcrumb>

                    <Breadcrumb.Item href="/">  <FontAwesomeIcon icon={faHouse} style={{ padding: 2 }} />Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Lịch sử mua hàng</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            {
                invoice.length != 0 ? (
                    <Table>
                        <thead>
                            <tr>
                                <Row style={{ transform: 'translate(-35px, 150px)', position: 'fixed', zIndex: 3, backgroundColor: 'white', width: '90%', paddingTop: 20 }}>
                                    <Col xs={2} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}> <th>STT</th></Col>
                                    <Col xs={2}><th>Họ tên</th></Col>
                                    <Col xs={2} style={{ transform: 'translateX(-40px)' }}><th>Số điện thoại</th></Col>
                                    <Col xs={2} style={{ transform: 'translateX(-50px)' }}><th>Tổng tiền</th></Col>
                                    <Col xs={2} style={{ transform: 'translateX(-85px)' }}><th>Ngày giao hàng</th></Col>
                                    <Col xs={2} style={{ transform: 'translateX(-60px)' }}><th>Địa chỉ giao hàng</th></Col>
                                </Row>
                            </tr>
                        </thead>
                    </Table>
                ) : ""
            }


            <div style={{ transform: 'translateY(200px)' }}>

                {invoice.length != 0 ? (
                    invoice.map((item, index) => (
                        <>

                            <Accordion >

                                <Accordion.Item >
                                    <Accordion.Header>
                                        <Table>
                                            <tbody>

                                                <tr key={index}>
                                                    <Row style={{ backgroundColor: 'transparent' }} >
                                                        <Col xs={1} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>  <td>{index + 1}</td></Col>
                                                        <Col xs={2} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>  <td>{userName}</td></Col>
                                                        <Col xs={2} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}> <td>{item.shippingPhone}</td></Col>
                                                        <Col xs={2} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}> <td>{item.total}</td></Col>
                                                        <Col xs={2} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>   <td>{item.issuedDate}</td></Col>
                                                        <Col xs={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>     <td>{item.shippingAddress}</td></Col>
                                                    </Row>
                                                </tr>

                                            </tbody>
                                        </Table>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Row style={{ backgroundColor: 'transparent' }} >
                                            <Col xs={1}></Col>
                                            <Col xs={1} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>  <td>STT</td></Col>
                                            <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>  <td>Hình ảnh</td></Col>
                                            <Col xs={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}> <td>Tên sản phẩm</td></Col>
                                            <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}> <td>Đơn giá</td></Col>
                                            <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>  <td>Số lượng</td></Col>
                                            <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>     <td>Tổng tiến</td></Col>
                                        </Row>
                                        {invoiceDetail[item.id]?.map((i, j) => (
                                            <>


                                                <Row key={j} style={{ padding: '20px 0px' }}>
                                                    <Col xs={1}><Button onClick={() => { handleShowModal(i, item.id) }}>Đánh giá</Button></Col>
                                                    <Col xs={1} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>{j + 1}</Col>
                                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                        {images.map((itemImage, imageIndex) => {
                                                            if (i.phoneId === itemImage.phoneId) {
                                                                return (
                                                                    <img
                                                                        key={imageIndex}
                                                                        src={`https://localhost:7015/images/products/${JSON.parse(itemImage.path)[0]}`}
                                                                        style={{ width: 50 }}
                                                                        alt=""
                                                                    />
                                                                );
                                                            }
                                                            return null;
                                                        })}
                                                    </Col>
                                                    <Col xs={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>{i.phone.name}</Col>
                                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>{i.phone.price}</Col>
                                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>{i.quantity}</Col>
                                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>{i.phone.price * i.quantity}</Col>
                                                    <Modal key={j} show={showModal} onHide={handleCloseModal}>

                                                        <Modal.Body>
                                                            <div style={{ textAlign: 'center' }}>
                                                                <Modal.Title>Đánh giá sản phẩm</Modal.Title>
                                                                {images.map((itemImage, imageIndex) => {
                                                                    if (modalProduct?.phoneId === itemImage.phoneId) {
                                                                        return (
                                                                            <img
                                                                                key={imageIndex}
                                                                                src={`https://localhost:7015/images/products/${JSON.parse(itemImage.path)[0]}`}
                                                                                style={{ width: 100 }}
                                                                                alt=""
                                                                            />
                                                                        );
                                                                    }
                                                                    return null;
                                                                })}
                                                                <h3>{modalProduct?.phone.name}</h3>
                                                            </div>


                                                            <Form onSubmit={(e) => handleSubmit(e, j)}>
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
                                                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
                                                                    <Form.Control as="textarea" rows={3} placeholder='Mời bạn chia sẻ thêm cảm nhận...' name="Description" onChange={handleDescription} />
                                                                </Form.Group>
                                                                <Row>
                                                                    <Col>
                                                                        <label htmlFor='load-file-vote' style={{ padding: 10 }}>
                                                                            <FontAwesomeIcon icon={faCamera} style={{ paddingRight: 5 }} />
                                                                            <span>Tối đa 3 ảnh</span>
                                                                        </label>

                                                                        <Form.Control id='load-file-vote' type='file' rows={6} name="Files" onChange={handleImageChange} multiple
                                                                            style={{ display: 'none' }} />
                                                                    </Col>
                                                                </Row>
                                                                <Button type="submit" variant="primary">
                                                                    Đánh giá
                                                                </Button>
                                                            </Form>
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <Button variant="secondary" onClick={handleCloseModal}>
                                                                Đóng
                                                            </Button>

                                                        </Modal.Footer>
                                                    </Modal>
                                                </Row>
                                            </>
                                        ))}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>

                        </>
                    ))) : <p>Bạn chưa có hoá đơn nào hết. Hãy <Link to="/">mua sắm</Link></p>}
            </div >

        </>
    );
}

export default Invoice;