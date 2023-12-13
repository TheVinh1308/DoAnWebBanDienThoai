import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';
const Login = () => {
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
                        <form>
                            {/* Email input */}
                            <div className="form-outline mb-4">
                                <input
                                    type="email"
                                    id="form1Example13"
                                    className="form-control form-control-lg"
                                />
                                <label className="form-label" htmlFor="form1Example13">
                                    Email address
                                </label>
                            </div>

                            {/* Password input */}
                            <div className="form-outline mb-4">
                                <input
                                    type="password"
                                    id="form1Example23"
                                    className="form-control form-control-lg"
                                />
                                <label className="form-label" htmlFor="form1Example23">
                                    Password
                                </label>
                            </div>

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
                                    <label className="form-check-label" htmlFor="form1Example3">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#!">Forgot password?</a>
                            </div>

                            {/* Submit button */}
                            <div className="d-grid gap-2">
                                <button
                                    className="btn btn-primary btn-lg"
                                    type="button"
                                >
                                    Sign In
                                </button>
                            </div>
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
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
