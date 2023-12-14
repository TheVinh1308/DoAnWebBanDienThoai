import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Brand = () => {
    return (
        <section id="clients" className="clients section-bg" style={{ backgroundColor: 'white' }}>
            <Container>
                <Row data-aos="zoom-in">
                    <Col lg={2} md={4} col={6} className="d-flex align-items-center justify-content-center">
                        <a href="#product" data-filter=".filter-iphone">
                            <img src="../img/logo/logo-iphone.jpg" className="img-fluid" alt="" />
                        </a>
                    </Col>

                    <Col lg={2} md={4} col={6} className="d-flex align-items-center justify-content-center">
                        <img src="../img/logo/logo-samsung.jpg" className="img-fluid" alt="" />
                    </Col>

                    <Col lg={2} md={4} col={6} className="d-flex align-items-center justify-content-center">
                        <img src="../img/logo/logo-nokia.jpg" className="img-fluid" alt="" />
                    </Col>

                    <Col lg={2} md={4} col={6} className="d-flex align-items-center justify-content-center">
                        <img src="../img/logo/logo-xiaomi.jpg" className="img-fluid" alt="" />
                    </Col>

                    <Col lg={2} md={4} col={6} className="d-flex align-items-center justify-content-center">
                        <img src="../img/logo/logo-vivo.jpg" style={{ width: '150%' }} className="img-fluid" alt="" />
                    </Col>

                    <Col lg={2} md={4} col={6} className="d-flex align-items-center justify-content-center">
                        <img src="../img/logo/logo-oppo.jpg" className="img-fluid" alt="" />
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Brand;
