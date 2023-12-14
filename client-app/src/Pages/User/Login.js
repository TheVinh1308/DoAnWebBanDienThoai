import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Form, FormGroup, FormLabel } from "react-bootstrap";
const Login = () => {


    const [account, setAccount] = useState({});
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setAccount(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`https://localhost:7015/api/Users/login`, account)
            .then(res => {
                localStorage.setItem("jwt", res.data.token);
                navigate("/");
            })
            .catch(error => {
                setError("Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại!");
                console.log(error);
            });
    }

    return (
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-8 col-lg-7 col-xl-6">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            className="img-fluid"
                            alt="Phone image"
                        />
                    </div>
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <div className="form-outline mb-4">
                                    <Form.Label className="form-label" htmlFor="form1Example13">
                                        Email address
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        id="form1Example13"
                                        className="form-control form-control-lg"
                                        onChange={handleChange}
                                    />

                                </div>
                            </FormGroup>
                            {/* Email input */}
                            <FormGroup>
                                <div className="form-outline mb-4">
                                    <Form.Label className="form-label" htmlFor="form1Example23">
                                        Password
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        id="form1Example23"
                                        className="form-control form-control-lg"
                                        onChange={handleChange}
                                    />

                                </div>
                            </FormGroup>

                            {/* Password input */}

                            <FormGroup>
                                <div className="d-flex justify-content-around align-items-center mb-4">
                                    {/* Checkbox */}
                                    <div className="form-check">

                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="form1Example3"
                                            defaultChecked
                                        />

                                    </div>
                                    <a href="#!">Forgot password?</a>
                                </div>
                            </FormGroup>

                            <p>{error}</p>
                            {/* Submit button */}
                            <div className="d-grid gap-2">
                                <Button
                                    className="btn btn-primary btn-lg"
                                    type="submit"
                                >
                                    Sign In
                                </Button>
                            </div>
                            <span>Tôi chưa có tài khoản.<Link to="/register" >Register</Link>  </span>
                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                            </div>

                            {/* Three wide buttons */}
                            <div className="d-grid gap-2">
                                <button
                                    className="btn btn-primary btn-lg"
                                    style={{ backgroundColor: '#3b5998' }}
                                    type="button"
                                >
                                    <FontAwesomeIcon icon={faFacebookF} style={{ paddingRight: 10 }} />Continue with Facebook
                                </button>
                                <button
                                    className="btn btn-primary btn-lg"
                                    style={{ backgroundColor: '#55acee' }}
                                    type="button"
                                >
                                    <FontAwesomeIcon icon={faTwitter} style={{ paddingRight: 10 }} />Continue with Twitter
                                </button>

                                {/* Additional button - Sign Up */}

                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
