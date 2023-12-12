import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Isotope, { data } from 'isotope-layout';
import AOS from 'aos';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import StarRatings from 'react-star-ratings';
import Category from './Category';
import Pagination from 'react-bootstrap/Pagination';



const Products = () => {
    const [products, setProducts] = useState([]);
    const [brand, setBrand] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:7015/api/Brands`)
            .then(ress => setBrand(ress.data));
    }, []);

    useEffect(() => {
        axios.get(`https://localhost:7015/api/Phones/FirstByModel`)
            .then(res => setProducts(res.data));
    }, [])
    useEffect(() => {
        // Xử lý Isotope và AOS.refresh() ở đây
        let portfolioContainer = document.querySelector('.portfolio-container');
        if (portfolioContainer) {
            let portfolioIsotope = new Isotope(portfolioContainer, {
                itemSelector: '.portfolio-item'
            });

            let portfolioFilters = document.querySelectorAll('#portfolio-flters li');

            portfolioFilters.forEach(filter => {
                filter.addEventListener('click', function (e) {
                    e.preventDefault();
                    portfolioFilters.forEach(el => {
                        el.classList.remove('filter-active');
                    });
                    this.classList.add('filter-active');

                    portfolioIsotope.arrange({
                        filter: this.getAttribute('data-filter')
                    });
                    portfolioIsotope.on('arrangeComplete', function () {
                        AOS.refresh();
                    });
                });
            });
        }
    }, [products]); // Thêm products vào dependency để cập nhật Isotope khi danh sách sản phẩm thay đổi
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const itemsPerPage = 6;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1); // Đặt trang hiện tại về 1 khi thay đổi loại
    };

    const filteredProducts = selectedCategory === 'All' ? products : products.filter(p => p.name.substring(0, 4).toUpperCase() === selectedCategory);
    let AllPage = Math.ceil(filteredProducts.length / itemsPerPage);
    const productsToDisplay = filteredProducts.slice(startIndex, endIndex);

    let NumberPages = [];

    if (AllPage > 0) {
        for (let i = 1; i <= AllPage; i++) {
            NumberPages.push(
                <Pagination.Item key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
                    {i}
                </Pagination.Item>
            );
        }
    }
    return (
        <>
            <Col sm={4} style={{ paddingLeft: '5%', marginTop: '10%' }} >
                <Category />
            </Col>
            <Col sm={8}>
                <main id="main" >
                    <section id="portfolio" className="portfolio" style={{ paddingTop: 0 }}>
                        <div data-aos="fade-up">
                            <div className="section-title " style={{ paddingTop: 50 }}>
                                <h2 className=' flex-left' style={{ transform: 'translateX(-20px)' }}>Điện thoại nổi bật</h2>
                                <ul id="portfolio-flters" className="d-flex flex-right justify-content-evenly" data-aos="fade-up" data-aos-delay={100}>
                                    <li onClick={() => handleCategoryChange('All')} data-filter="*" className="filter-active">All</li>
                                    {
                                        brand.map(item => {
                                            return (
                                                <li onClick={() => handleCategoryChange(item.name.substring(0, 4))} data-filter={`.filter-${item.name.substring(0, 4)}`}>{item.name}</li>
                                            )

                                        })
                                    }

                                    {/* <li data-filter=".filter-samsung">Samsung</li>
                                    <li data-filter=".filter-oppo">Oppo</li>
                                    <li data-filter=".filter-xiaomi">Xiaomi</li>
                                    <li data-filter=".filter-vivo">Vivo</li>
                                    <li data-filter=".filter-nokia">Nokia</li> */}
                                </ul>

                            </div>

                            <Row id="product" className="row portfolio-container " data-aos="fade-up" data-aos-delay="200">
                                {
                                    productsToDisplay.map(item => {
                                        return (

                                            <Col key={item.id} lg={4} className={`portfolio-item filter-${item.name.substring(0, 4).toUpperCase()} `}>
                                                <Card className="text-black" style={{ width: 250 }} >
                                                    <i className="fab fa-apple fa-lg pt-3 pb-1 px-3"></i>

                                                    <Card.Img variant="top" src={`https://localhost:7015/images/products/${item.modPhone.image}`} />

                                                    <Card.Body>
                                                        <div className="text-center">
                                                            <Card.Title style={{ height: 48 }}>{item.modPhone.name}</Card.Title>
                                                        </div>

                                                        <div className="d-flex justify-content-center total font-weight-bold mt-4">
                                                            <span>{item.price}</span>
                                                        </div>
                                                        <div className="d-flex justify-content-center">
                                                            <StarRatings className='list-vote-icon'

                                                                rating={5}
                                                                starRatedColor="orange"
                                                                // changeRating={onStarClick}
                                                                numberOfStars={5}
                                                                name='rating'
                                                                starDimension="15px"
                                                                starSpacing="2px"
                                                            />
                                                        </div>
                                                    </Card.Body>
                                                    <Card.Footer className='d-flex justify-content-around'>

                                                        <a>
                                                            <FontAwesomeIcon icon={faHeart} />
                                                        </a>
                                                        <a>
                                                            <Link to={`details/${item.modPhoneId}`}><FontAwesomeIcon icon={faEye} /></Link>

                                                        </a>
                                                        <a>
                                                            <FontAwesomeIcon icon={faCartPlus} />
                                                        </a>
                                                    </Card.Footer>
                                                </Card>
                                            </Col>

                                        )
                                    })
                                }

                            </Row>
                            <Pagination>
                                {NumberPages}
                            </Pagination>

                        </div>

                    </section>

                </main>
            </Col>
        </>
    );
};
export default Products;
