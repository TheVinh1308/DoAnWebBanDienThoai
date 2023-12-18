import { faHeart, faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import NumericInput from "react-numeric-input";

const Cart = () => {
    const [userId, setUserId] = useState();
    const [cart, setCart] = useState([]);
    // const [phoneID, setPhoneID] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            const decoded = jwtDecode(token);
            setUserId(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
        }

    }, []);

    useEffect(() => {
        axios.get(`https://localhost:7015/api/Carts/GetCartByUser/${userId}`)
            .then(res => {
                setCart(res.data)
                // setPhoneID(res.data.phoneId)
            });
    }, [userId]);
    console.log(cart.phoneId);
    // const [phoneImg, setPhoneImg] = useState({ path: [] });
    // console.log(phoneID);
    // useEffect(() => {
    //     axios.get(`https://localhost:7015/api/Images/GetImgForPhone/${phoneID}`)
    //         .then(res => setPhoneImg(res.data));
    // }, [phoneID]);
    // console.log(JSON.parse(phoneImg.path)[0]);
    // console.log(`JSON.parse(phoneImg.path)[0]`, JSON.parse(phoneImg.path)[0]);
    return (
        <>
            <section className="h-100 gradient-custom">
                <div className="container py-5">
                    <div className="row d-flex justify-content-center my-4">
                        <div className="col-md-7">
                            <div className="card mb-4">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Cart - 2 items</h5>
                                </div>
                                <div className="card-body">
                                    {
                                        cart.map(item => {
                                            return (
                                                <>
                                                    <div className="row">
                                                        <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                                            <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                                                {/* <img src={`https://localhost:7015/images/products/${JSON.parse(phoneImg.path)[0]}`} className="w-100" alt="Blue Jeans Jacket" /> */}
                                                                <a href="#!">
                                                                    <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }} />
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <p><strong>{item.phone.name}</strong></p>
                                                            <p>Color: {item.phone.color} </p>
                                                            <p>Price: {(item.phone.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                                            <button type="button" className="btn btn-primary btn-sm me-1 mb-2" data-mdb-toggle="tooltip" title="Remove item">
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </button>
                                                            <button type="button" className="btn btn-danger btn-sm mb-2" data-mdb-toggle="tooltip" title="Move to the wish list">
                                                                <FontAwesomeIcon icon={faHeart} />
                                                            </button>
                                                        </div>
                                                        <div className="col-lg-4 d-flex align-items-center">
                                                            <div>
                                                                {/* <input type="number" style={{ width: 100, marginRight: 10 }} min={1} value={item.quantity} /> */}
                                                                <NumericInput
                                                                    size={5}
                                                                    min={1} // Giá trị tối thiểu
                                                                    value={item.quantity}
                                                                    step={1} // Bước nhảy
                                                                    mobile // Cho phép sử dụng trên thiết bị di động
                                                                />
                                                                <label>Giá tiền: {item.phone.price * item.quantity} </label>
                                                            </div>

                                                        </div>

                                                    </div>
                                                    <hr className="my-4" />
                                                </>
                                            )
                                        })
                                    }

                                    <hr className="my-4" />

                                    {/* Single item */}
                                </div>
                            </div>
                            <div className="card mb-4">
                                <div className="card-body">
                                    <p><strong>Expected shipping delivery</strong></p>
                                    <p className="mb-0">12.10.2020 - 14.10.2020</p>
                                </div>
                            </div>
                            <div className="card mb-4 mb-lg-0">
                                <div className="card-body">
                                    <p><strong>We accept</strong></p>
                                    <img className="me-2" width="45px" src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg" alt="Visa" />
                                    <img className="me-2" width="45px" src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg" alt="American Express" />
                                    <img className="me-2" width="45px" src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg" alt="Mastercard" />
                                    <img className="me-2" width="45px" src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.webp" alt="PayPal acceptance mark" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mb-4">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Thanh toán</h5>
                                </div>
                                <Table >
                                    <thead >
                                        <tr>
                                            <th>Loại</th>
                                            <th style={{ textAlign: 'right' }}>Số tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody >

                                        <tr className="px-2">
                                            <td>Sản phẩm</td>
                                            <td style={{ textAlign: 'right' }}>
                                                {cart.reduce((total, item) => total + item.phone.price * item.quantity, 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                            </td>

                                        </tr>
                                        <tr>
                                            <td>Vận chuyển</td>
                                            <td style={{ textAlign: 'right' }}>0 VND</td>
                                        </tr>
                                        <tr>
                                            <td>Khuyến mãi</td>
                                            <td style={{ textAlign: 'right' }}>200.000 VND</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <Row>
                                    <Col>
                                        <span className="ps-1">Tổng : </span><span>2.200.000 VND</span>
                                    </Col>
                                    <Col>
                                        <Button style={{ transform: 'translate(80px,-8px)', backgroundColor: 'orange', border: 'solid 1px black', color: 'black', right: 0 }} >Thanh toán</Button>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default Cart;