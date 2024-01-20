import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Accordion, Breadcrumb, Card, Col, Row, Table } from "react-bootstrap";
import Header from "./Navbar";
import { faHouse, faL } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Invoice = () => {

    const [invoice, setInvoice] = useState([]);
    const [invoiceDetail, setInvoiceDetail] = useState([[]]);
    const [invoiceId, setInvoiceId] = useState([]);

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
                    })
            })
    }, [userId]);


    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:7015/api/Images/GetImgForInvoice/${userId}`)
            .then(res => {
                setImages(res.data)
            })

    }, [userId]);
    console.log(`invoiceDetail`, invoiceDetail);
    return (
        <>
            <Header />
            <div style={{ transform: 'translateY(90px)', position: 'fixed', backgroundColor: 'white', zIndex: 2, width: '100vw', paddingTop: 20 }}>
                <Breadcrumb>

                    <Breadcrumb.Item href="/">  <FontAwesomeIcon icon={faHouse} style={{ padding: 2 }} />Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Lịch sử mua hàng</Breadcrumb.Item>
                </Breadcrumb>
            </div>

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
            <div style={{ transform: 'translateY(200px)' }}>

                {invoice.map((item, index) => (
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
                                    <Row key={j} style={{ padding: '20px 0px' }}>
                                        <Col xs={1}></Col>
                                        <Col xs={1} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>{j + 1}</Col>
                                        <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                            {images.map((itemImage, imageIndex) => {
                                                console.log("i.id:", i.phoneId);
                                                console.log("itemImage.phoneId:", itemImage.phoneId);
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
                                    </Row>
                                ))}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                ))}
            </div >
        </>
    );
}

export default Invoice;