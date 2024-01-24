import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faHouse, faPhone, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <div >
                <footer className="text-center text-lg-start text-dark" >
                    {/* <section className="d-flex justify-content-between p-4 text-dark" style={{ backgroundColor: '#FFD93D', width: "102%" }}>
                        <div className="me-5">
                            <span>Get connected with us on social networks:</span>
                        </div>
                        <div>
                            <a href className="text-white me-4">
                                <i className="fab fa-facebook-f" />
                            </a>
                            <a href className="text-white me-4">
                                <i className="fab fa-twitter" />
                            </a>
                            <a href className="text-white me-4">
                                <i className="fab fa-google" />
                            </a>
                            <a href className="text-white me-4">
                                <i className="fab fa-instagram" />
                            </a>
                            <a href className="text-white me-4">
                                <i className="fab fa-linkedin" />
                            </a>
                            <a href className="text-white me-4">
                                <i className="fab fa-github" />
                            </a>
                        </div>
                    </section> */}
                    {/* Section: Links  */}
                    <section className>
                        <div className=" text-center text-md-start mt-5">
                            {/* Grid row */}
                            <Row style={{ transform: 'translateX(50px)' }}>
                                {/* Grid column */}
                                <Col>
                                    {/* Content */}
                                    <h6 className="text-uppercase fw-bold">Company name</h6>
                                    <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: 60, backgroundColor: '#7c4dff', height: 2 }} />
                                    <p>
                                        Here you can use rows and columns to organize your footer
                                        content. Lorem ipsum dolor sit amet, consectetur adipisicing
                                        elit.
                                    </p>
                                </Col>
                                {/* Grid column */}
                                {/* Grid column */}
                                <Col>
                                    {/* Links */}
                                    <h6 className="text-uppercase fw-bold">Products</h6>
                                    <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: 60, backgroundColor: '#7c4dff', height: 2 }} />
                                    <p>
                                        <a href="#!" className="text-dark">MDBootstrap</a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-dark">MDWordPress</a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-dark">BrandFlow</a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-dark">Bootstrap Angular</a>
                                    </p>
                                </Col>
                                {/* Grid column */}
                                {/* Grid column */}
                                <Col>
                                    {/* Links */}
                                    <h6 className="text-uppercase fw-bold">Social links</h6>
                                    <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: 60, backgroundColor: '#7c4dff', height: 2 }} />
                                    <p>
                                        <Link to="" className="text-dark"><FontAwesomeIcon icon={faFacebook} />  Facebook</Link>
                                    </p>
                                    <p>
                                        <Link to="" className="text-dark"><FontAwesomeIcon icon={faEnvelope} />  Email</Link>
                                    </p>
                                    <p>
                                        <Link to="" className="text-dark"><FontAwesomeIcon icon={faTwitter} />  Twitter</Link>
                                    </p>
                                    <p>
                                        <Link to="" className="text-dark"><FontAwesomeIcon icon={faInstagram} />  Instagram</Link>
                                    </p>
                                </Col>
                                {/* Grid column */}
                                {/* Grid column */}
                                <Col>
                                    {/* Links */}
                                    <h6 className="text-uppercase fw-bold">Contact</h6>
                                    <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: 60, backgroundColor: '#7c4dff', height: 2 }} />
                                    <p><FontAwesomeIcon icon={faHouse} /> Bến Nghé, Q1, TP Hồ Chí Minh</p>
                                    <p><FontAwesomeIcon icon={faEnvelope} /> infor@webbandienthoai.com</p>
                                    <p><FontAwesomeIcon icon={faPhone} /> + 84 364 067 704</p>
                                    <p><FontAwesomeIcon icon={faPrint} /> + 84 234 567 89</p>
                                </Col>
                                {/* Grid column */}
                            </Row>
                            {/* Grid row */}
                        </div>
                    </section>
                    {/* Section: Links  */}
                    {/* Copyright */}
                    <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                        © 2023 Copyright:
                        <a className="text-dark" href="https://mdbootstrap.com/"> WebBanDienThoai.com</a>
                    </div>
                    {/* Copyright */}
                </footer>
                {/* Footer */}
            </div>
            {/* End of .container */}

        </>
    );
}

export default Footer;