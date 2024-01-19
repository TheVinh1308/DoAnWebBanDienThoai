import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Accordion, Breadcrumb, Col, Row, Table } from "react-bootstrap";
import Header from "./Navbar";
import { faHouse, faL } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Invoice = () => {

    const [invoice, setInvoice] = useState([]);
    const [invoiceDetail, setInvoiceDetail] = useState({});

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
            })
    }, [userId]);


    return (
        <>
            <Header />
            <div style={{ transform: 'translateY(110px)', position: 'fixed', backgroundColor: 'white', zIndex: 2, width: '100vw', paddingTop: 20 }}>
                <Breadcrumb>

                    <Breadcrumb.Item href="/">  <FontAwesomeIcon icon={faHouse} style={{ padding: 2 }} />Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Lịch sử mua hàng</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div style={{ transform: 'translateY(200px)' }}>
                <Row style={{ transform: 'translate(35px, -20px)', margin: '10 auto' }}>
                    <Col xs={1} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}> <th>STT</th></Col>
                    <Col xs={2}><th>Họ tên</th></Col>
                    <Col xs={2}><th>Số điện thoại</th></Col>
                    <Col xs={2}><th>Tổng tiền</th></Col>
                    <Col xs={2}><th>Ngày giao hàng</th></Col>
                    <Col xs={3}><th>Địa chỉ giao hàng</th></Col>
                </Row>
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
                                <p>Accordion Body Content</p>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                ))}
            </div >
        </>
    );
}

export default Invoice;