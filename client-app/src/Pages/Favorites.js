import { faCartPlus, faEye, faHeart, faL, faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Breadcrumb, Button, Col, Row, Table } from "react-bootstrap";
import NumericInput from "react-numeric-input";
import { Link, json, useNavigate } from "react-router-dom";
import Header from "../Components/Navbar";
import axiosClient from "../Components/axiosClient";

const Favorites = () => {
    const [userId, setUserId] = useState();
    const [favorites, setFavorites] = useState([]);
    const [images, setImages] = useState([]);
    const [decoded, setDecoded] = useState(false)
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            const decoded = jwtDecode(token);
            setUserId(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
            setDecoded(true)
        }
    }, []);

    useEffect(() => {
        if (decoded) {
            axios.get(`https://localhost:7015/api/Favorites/GetFavoriteByUser/${userId}`)
                .then(res => {
                    setFavorites(res.data)
                });
        }
    }, [userId]);

    useEffect(() => {
        if (decoded) {
            axios.get(`https://localhost:7015/api/Images/GetImgForFavorites/${userId}`)
                .then(res => {
                    setImages(res.data);
                })
                .catch(error => {
                    if (error.response && error.response.status === 404) {
                        console.log("Khong co san pham yeu thich");
                    }
                    else {
                        console.error("Error fetching data:", error);
                    }
                });
        }
    }, [userId]);

    // add to cart 
    const [cart, setCart] = useState({})
    const [isTokenDecoded, setTokenDecoded] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            const decoded = jwtDecode(token);
            setUserId(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
            setTokenDecoded(true);
        }
        else {
            setTokenDecoded(false);
        }
    }, []);

    // kiem tra trong cart da co san pham chua 
    const [exCart, setExCart] = useState([]);
    useEffect(() => {
        axios.get(`https://localhost:7015/api/Carts/GetCartByUser/${userId}`)
            .then(res => {
                // if(res.data.status === 404) {
                //     return(<h1>Khônng có sản phẩm yêu thích nào</h1>)
                // }
                setExCart(res.data)
            });
    }, [userId]);

    const handleCart = (id, e) => {
        e.preventDefault();
        const existingItem = exCart.find(item => item.phoneId === id);

        if (existingItem) {
            // If the product exists, update the quantity
            const updatedCartItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            };

            axiosClient.put(`/Carts/${existingItem.id}`, updatedCartItem)
                .then(() => {
                    navigate("/cart");
                });
        } else {
            // If the product doesn't exist, add it to the cart
            const newCartItem = {
                userId: userId,
                phoneId: id,
                quantity: 1
            };

            axiosClient.post(`/Carts`, newCartItem)
                .then(() => {
                    navigate("/cart");
                });
        }

    }

    const handleRemoveFavorite = (phoneid) => {
        if (decoded) {
            axios.delete(`https://localhost:7015/api/Favorites/RemoveFavoriteByPhoneId/${phoneid}`)
                .then(() => {
                    // After successful deletion, you may want to update the cart state
                    // or trigger a new request to get the updated cart data.
                    // For simplicity, let's navigate to the cart page.
                    navigate("/favorites");

                })
                .catch((error) => {
                    console.error("Error deleting item from the cart", error);
                });
        }
    };
    return (
        <>
            <Header />
            <div style={{ transform: 'translateY(120px)' }}>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Favorites</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <section className="h-100 gradient-custom">
                <div className="container py-5">
                    <div className="row d-flex justify-content-center my-4">
                        <div className="col-md-12">
                            <div className="card mb-4">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">`Favorites - {favorites.length} items</h5>
                                </div>
                                <div className="card-body">
                                    {
                                        favorites.length > 0 ? (
                                            favorites.map((item, favoriteIndex) => (
                                                <>

                                                    <Link to={`details/${item.phone.modPhoneId}`}>
                                                        <div className="row" key={favoriteIndex}>
                                                            <div className="col-lg-3 col-md-8 mb-4 mb-lg-0">
                                                                <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                                                    {

                                                                        images.map((itemImage, imageIndex) => (
                                                                            item.phoneId === itemImage.phoneId && (
                                                                                <img
                                                                                    key={favoriteIndex}
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
                                                            <div className="col-lg-4" style={{ color: 'black' }}>

                                                                <h4 ><strong>{item.phone.name}</strong></h4>
                                                                <p>Color: {item.phone.color} </p>
                                                                <p>Price: {(item.phone.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                                                <button type="button" className="btn btn-primary btn-sm me-1 mb-2" data-mdb-toggle="tooltip" title="Remove item" onClick={() => { handleRemoveFavorite(item.phone.id) }} >
                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                </button><br />
                                                            </div>
                                                            <div className="col-lg-4" style={{ color: 'black' }}>

                                                                <button type="button" className="btn btn-primary btn-sm me-1 mb-2" data-mdb-toggle="tooltip" title="Remove item" onClick={(e) => handleCart(item.phoneId, e)} >
                                                                    +   <FontAwesomeIcon icon={faCartPlus} />
                                                                </button>

                                                            </div>

                                                        </div>
                                                    </Link>
                                                    <hr className="my-4" />
                                                </>
                                            ))
                                        ) : (
                                            <p> Không có sản phẩm yêu thích</p>
                                        )
                                    }
                                    <hr className="my-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Favorites;