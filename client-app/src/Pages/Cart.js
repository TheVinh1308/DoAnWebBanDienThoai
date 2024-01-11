import { faHeart, faHouse, faL, faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Breadcrumb, Button, Col, Row, Table } from "react-bootstrap";
import NumericInput from "react-numeric-input";
import { json, useNavigate } from "react-router-dom";
import Header from "../Components/Navbar";
import axiosClient from "../Components/axiosClient";
const Cart = () => {
    const [userId, setUserId] = useState();
    const [cart, setCart] = useState([]);
    const [images, setImages] = useState([])
    const [decoded, setDecoded] = useState(false)
    const navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            const decoded = jwtDecode(token);
            setUserId(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
            setDecoded(true);
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (decoded) {
            axios.get(`https://localhost:7015/api/Carts/GetCartByUser/${userId}`)
                .then(res => {
                    setCart(res.data);
                })
                .catch(error => {
                    if (error.response && error.response.status === 404) {
                        return (<h1>Giỏ hàng không có sản phẩm nào !</h1>)
                    }
                    else {
                        console.error("Error fetching data:", error);
                    }
                });

        }
    }, [userId]);

    useEffect(() => {
        if (decoded) {
            axios.get(`https://localhost:7015/api/Images/GetImgForCart/${userId}`)
                .then(res => {
                    setImages(res.data)
                })
                .catch(error => {
                    if (error.response && error.response.status === 404) {
                        return (<h2>Giỏ hàng không có sản phẩm nào !</h2>)
                    }
                    else {
                        console.error("Error fetching data:", error);
                    }
                });

        }
    }, [userId]);
    console.log(cart.id);

    const handleRemoveCart = (phoneid) => {
        if (isAuthenticated) {
            axios.delete(`https://localhost:7015/api/Carts/RemoveCartByPhoneId/${phoneid}`)
                .then(() => {
                    // After successful deletion, you may want to update the cart state
                    // or trigger a new request to get the updated cart data.
                    // For simplicity, let's navigate to the cart page.
                    window.location.reload();
                    navigate("/cart");
                })
                .catch((error) => {
                    console.error("Error deleting item from the cart", error);
                });
        }
    };


    const [exCart, setExCart] = useState([]);
    useEffect(() => {
        axios.get(`https://localhost:7015/api/Carts/GetCartByUser/${userId}`)
            .then(res => setExCart(res.data));
    }, [userId]);
    const handleChangeQuantity = (id, amount) => {

        const existingItem = exCart.find(item => item.phoneId === id);
        const updatedCartItem = {
            ...existingItem,
            quantity: amount
        };

        axiosClient.put(`/Carts/${existingItem.id}`, updatedCartItem)
            .then(() => {
                window.location.reload();
                navigate("/cart");
            });




    }

    /// thanh toán
    // ngày giao hàng 
    const [currentDate, setCurrentDate] = useState('');
    const [nextThreeDays, setNextThreeDays] = useState('');

    useEffect(() => {
        const dateObject = new Date();

        // Ngày hiện tại
        dateObject.setDate(dateObject.getDate() + 2);
        setCurrentDate(dateObject.toLocaleDateString());

        // Ngày sau 3 ngày
        dateObject.setDate(dateObject.getDate() + 3);
        setNextThreeDays(dateObject.toLocaleDateString());
    }, []);

    // xu ly chon dien thoai muon mua 
    const [selectedItems, setSelectedItems] = useState([]);

    const handleCheckboxChange = (phoneId) => {
        const selectedItemIndex = selectedItems.indexOf(phoneId);
        if (selectedItemIndex === -1) {
            setSelectedItems([...selectedItems, phoneId]);
        } else {
            const updatedSelectedItems = [...selectedItems];
            updatedSelectedItems.splice(selectedItemIndex, 1);
            setSelectedItems(updatedSelectedItems);
        }
    };

    // tinh tong tien cac dien thoai da duoc chon
    const calculateTotalPrice = () => {
        const totalPrice = cart
            .filter(item => selectedItems.includes(item.phone.id))
            .reduce((total, item) => total + item.phone.price * item.quantity, 0);

        return totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };
    return (
        <>
            <Header />
            <div style={{ transform: 'translateY(120px)' }}>
                <Breadcrumb>

                    <Breadcrumb.Item href="/">  <FontAwesomeIcon icon={faHouse} style={{ padding: 2 }} />Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Favorites</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <section className="h-100 gradient-custom">
                <div className="container py-5">
                    <div className="row d-flex justify-content-center my-4">
                        <div className="col-md-7">
                            <div className="card mb-4">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Cart - {cart.length} items</h5>
                                </div>
                                <div className="card-body">
                                    {
                                        cart.length > 0 ? cart.map((item, cartIndex) => (

                                            <>
                                                <div className="row" key={cartIndex}>
                                                    <div className="col-lg-1" >
                                                        <input type="checkbox" name="" value="" style={{ width: '50px ', transform: 'translateY(65px)', height: 30 }}
                                                            onChange={() => handleCheckboxChange(item.phone.id)}
                                                            checked={selectedItems.includes(item.phone.id)}
                                                        />
                                                    </div>
                                                    <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">

                                                        <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                                            {

                                                                images.map((itemImage, imageIndex) => (
                                                                    item.phoneId === itemImage.phoneId && (
                                                                        <img
                                                                            key={cartIndex}
                                                                            src={`https://localhost:7015/images/products/${JSON.parse(itemImage.path)[0]}`}
                                                                            style={{ width: 150 }}
                                                                            alt=""
                                                                        />
                                                                    )))
                                                            }

                                                            <a href="#!">
                                                                <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }} />
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">

                                                        <p><strong>{item.phone.name}</strong></p>
                                                        <p>Color: {item.phone.color} </p>
                                                        <p>Rom: {item.phone.rom}GB </p>
                                                        <p>Price: {(item.phone.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                                        <button type="button" className="btn btn-primary btn-sm me-1 mb-2" data-mdb-toggle="tooltip" title="Remove item" onClick={() => { handleRemoveCart(item.phone.id) }}>
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
                                                                onChange={(value) => { handleChangeQuantity(item.phone.id, value) }}
                                                            />
                                                            <label>Giá tiền: {(item.phone.price * item.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} </label>
                                                        </div>

                                                    </div>

                                                </div>
                                                <hr className="my-4" />
                                            </>




                                        )) : <p>Giỏ hàng trống</p>
                                    }

                                    <hr className="my-4" />

                                    {/* Single item */}
                                </div>
                            </div>
                            <div className="card mb-4">
                                <div className="card-body">
                                    <p><strong>Expected shipping delivery</strong></p>
                                    <p className="mb-0">{currentDate} - {nextThreeDays}</p>
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
                                                {/* {cart.reduce((total, item) => total + item.phone.price * item.quantity, 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} */}
                                                {calculateTotalPrice()}
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
                                        <Row>
                                            <Button style={{ width: '90%', backgroundColor: 'orange', border: 'solid 1px black', color: 'black' }} >Thanh toán sau khi nhận hàng </Button>

                                        </Row>
                                        <Row>
                                            <Button style={{ width: '90%', backgroundColor: 'orange', border: 'solid 1px black', color: 'black' }} >Thanh toán VnPay</Button>

                                        </Row>

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