import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Modal, DropdownButton } from 'react-bootstrap';
import Isotope, { data } from 'isotope-layout';
import AOS from 'aos';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faCheck, faCirclePlus, faEye, faFilter, faHeart, faMemory, faMicrochip, faMinus, faPlus, faRectangleXmark, faXmark } from '@fortawesome/free-solid-svg-icons';
import StarRatings from 'react-star-ratings';
import Pagination from 'react-bootstrap/Pagination';
import NumericInput from 'react-numeric-input';
import RangeSlider from 'react-range-slider-input';
import { jwtDecode } from 'jwt-decode';
import axiosClient from './axiosClient';
import ComparisonModal from '../Pages/Compare';

const AllProducts = () => {
    // CATEGORY
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(1000);
    const [selectedButton, setSelectedButton] = useState(null);
    const [selectedRam, setSelectedRam] = useState(null);
    const [selectedRom, setSelectedRom] = useState(null);
    const [selectedScreen, setSelectedScreen] = useState(null);
    const [selectedPin, setSelectedPin] = useState(null);
    const [checkButton, setcheckButton] = useState(false);

    const handleRamButtonClick = (ram) => {
        setSelectedRam(ram);
        setcheckButton(true);
    };

    const handleRomButtonClick = (rom) => {
        setSelectedRom(rom);
        setcheckButton(true);
    };

    const handleScreenButtonClick = (inch) => {
        setSelectedScreen(inch);
        setcheckButton(true);
    };

    const handlePinButtonClick = (value) => {
        setSelectedPin(value);
        setcheckButton(true);
    };


    const handleSliderChange = (values) => {
        const [newMinValue, newMaxValue] = values;
        setMinValue(newMinValue);
        setMaxValue(newMaxValue);
    };

    const handleMinInputChange = (value) => {
        if (value <= maxValue) {
            setMinValue(value);
        }
    };

    const handleMaxInputChange = (value) => {
        if (value >= minValue) {
            setMaxValue(value);
        }
    };

    useEffect(() => {
        if (minValue > maxValue) {
            setMinValue(maxValue);
        }
        if (maxValue < minValue) {
            setMaxValue(minValue);
        }
    }, [minValue, maxValue]);


    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };


    // LIST PRODUCT
    const [products, setProducts] = useState([]);
    const [productsFillter, setProductsFillter] = useState([]);
    const [brand, setBrand] = useState([]);
    const [All, setAll] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:7015/api/Brands`)
            .then(ress => setBrand(ress.data));
    }, []);

    useEffect(() => {
        axios.get(`https://localhost:7015/api/Phones/FirstByModel`)
            .then(res => setProducts(res.data));
    }, [])
    useEffect(() => {
        axios.get(`https://localhost:7015/api/Phones`)
            .then(res => setAll(res.data));
    }, [])
    useEffect(() => {
        axios.get(`https://localhost:7015/api/Phones/GetDistinctPhone`)
            .then(res => setProductsFillter(res.data));
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
    const [checkProduct, setCheckProduct] = useState(products);

    const startChoice = (currentPage - 1) * 4;
    const endChoice = startChoice + 4;
    useEffect(() => {
        const filterProducts = (p) => {
            return (
                (!selectedRam || p.modPhone.ram.toString() === selectedRam.replace("GB", "")) &&
                (!selectedRom || p.rom.toString() === selectedRom.replace("GB", "")) &&
                (!selectedScreen || p.modPhone.screenSize < selectedScreen) &&
                (!selectedPin ||
                    (selectedPin === "under3000" && p.modPhone.battery < 3000) ||
                    (selectedPin === "under4000" && p.modPhone.battery < 4000 && p.modPhone.battery >= 3000) ||
                    (selectedPin === "under5000" && p.modPhone.battery < 5000 && p.modPhone.battery >= 4000) ||
                    (selectedPin === "above5000" && p.modPhone.battery >= 5000))
            );
        };

        // Kiểm tra xem có bất kỳ lựa chọn nào không
        const hasSelection = selectedRam || selectedRom || selectedScreen || selectedPin;

        setCheckProduct(hasSelection ? productsFillter.filter(filterProducts) : products);
    }, [selectedRam, selectedRom, selectedScreen, selectedPin, productsFillter]);

    // Sử dụng checkProduct trong giao diện của bạn

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1); // Đặt trang hiện tại về 1 khi thay đổi loại
    };
    const filteredProducts = selectedCategory === 'All' ? checkProduct : checkProduct.filter(p => p.name.substring(0, 4).toUpperCase() === selectedCategory);
    let AllPage = Math.ceil(filteredProducts.length / itemsPerPage);
    const productsToDisplay = filteredProducts.slice(startIndex, endIndex);

    const ChoicePhone = selectedCategory === 'All' ? productsFillter : productsFillter.filter(p => p.name.substring(0, 4).toUpperCase() === selectedCategory);
    let AllPageChoice = Math.ceil(ChoicePhone.length / 4);
    const ChoicePage = ChoicePhone.slice(startChoice, endChoice);

    let NumberPages = [];
    let ChoicePages = [];

    if (AllPage > 0) {
        for (let i = 1; i <= AllPage; i++) {
            NumberPages.push(
                <Pagination.Item key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
                    {i}
                </Pagination.Item>
            );
        }
    }

    if (AllPageChoice > 0) {
        for (let i = 1; i <= AllPageChoice; i++) {
            ChoicePages.push(
                <Pagination.Item key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
                    {i}
                </Pagination.Item>
            );
        }
    }


    const [cart, setCart] = useState({})
    const [userId, setUserId] = useState();
    const [isTokenDecoded, setTokenDecoded] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            const decoded = jwtDecode(token);
            setUserId(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
            setTokenDecoded(true);
            setIsAuthenticated(true);
        }
        else {
            setTokenDecoded(false);
        }
    }, []);

    // kiem tra trong cart da co san pham chua 
    const [exCart, setExCart] = useState([]);
    useEffect(() => {
        axios.get(`https://localhost:7015/api/Carts/GetCartByUser/${userId}`)
            .then(res => setExCart(res.data));
    }, [userId]);

    const [showStickyDiv, setShowStickyDiv] = useState(false);
    const [stickyDivContent, setStickyDivContent] = useState('');
    const [stickyDivContent2, setStickyDivContent2] = useState('');
    const [stickyDivContent3, setStickyDivContent3] = useState('');
    const [StickyDivImage, setStickyDivImage] = useState('');
    const [StickyDivImage2, setStickyDivImage2] = useState('');
    const [StickyDivImage3, setStickyDivImage3] = useState('');
    // Function to set the content of the sticky div
    const setStickyDivName = (itemName) => {
        setStickyDivContent(itemName);
    };

    const toggleStickyDiv = (item) => {
        setStickyDivName(item.name);
        setStickyDivImage(item.modPhone.image);
        setShowStickyDiv(true);
    };

    const setStickyDivName2 = (itemName) => {
        setStickyDivContent2(itemName);
    };
    const [check2v3, setcheck2v3] = useState(true);
    const toggleStickyDiv2 = (item) => {
        setcheck2v3(true);
        setStickyDivName2(item.name);
        setStickyDivImage2(item.modPhone.image);
        setCheckTich(true);
        setCheckTich2(false);
        handleCloseChoice();

    };

    const setStickyDivName3 = (itemName) => {
        setStickyDivContent3(itemName);
    };

    const toggleStickyDiv3 = (item) => {
        setStickyDivName3(item.name);
        setStickyDivImage3(item.modPhone.image);
        setCheckTich2(true);
        setcheck2v3(true);
        setshowChoice(false);
    };
    const handleCloseCompare = () => {
        setShowStickyDiv(false)
        setCheckTich(false);
        setCheckTich2(false);
    }
    const handleCompareButtonClick = (item) => {
        // Logic to handle the compare button click
        // ...

        // Toggle the sticky div with the item's name
        toggleStickyDiv(item);
    };
    console.log(`stickyDivContent`, StickyDivImage);
    // lua chon so sanh
    const [CheckTich, setCheckTich] = useState(false);
    const [CheckTich2, setCheckTich2] = useState(false);
    const [showChoice, setshowChoice] = useState(false);
    const handleChoice = () => {
        setshowChoice(true);

    }
    const handleCloseChoice = () => {
        setcheck2v3(false);
        setshowChoice(false);
    }

    // huỷ chọn so sánh
    const handleCloseCheck = () => {
        setCheckTich(false);
        setcheck2v3(true);
    }
    const handleCloseCheck2 = () => {
        setCheckTich2(false);
    }

    return (

        <>
            <Col sm={4} style={{ paddingLeft: '5%', marginTop: '10%' }} >
                <Row >
                    <div className="aside" >
                        <h2 className="aside-title my-4">Price</h2>
                        <div className="aside">
                            <div style={{ width: 300 }}>
                                <RangeSlider
                                    min={0}
                                    max={1000}
                                    value={[minValue, maxValue]}
                                    onChange={handleSliderChange}
                                />
                            </div>

                            <div className="d-flex justify-content-evenly m-4" style={{ transform: 'translateX(-16%)' }}>
                                <NumericInput

                                    size={5}
                                    min={0}
                                    max={maxValue} // Sử dụng biến tạm maxValue
                                    value={minValue}
                                    step={1}
                                    mobile
                                    onChange={handleMinInputChange}
                                />
                                <FontAwesomeIcon icon={faMinus} style={{ transform: 'translateY(5px)' }} />
                                <NumericInput
                                    size={4}
                                    min={minValue} // Sử dụng biến tạm minValue
                                    max={1000}
                                    value={maxValue}
                                    step={1}
                                    mobile
                                    onChange={handleMaxInputChange}
                                />
                            </div>
                        </div>
                    </div>
                    <hr />

                    <div className="aside" >
                        <h3 className="aside-title my-4">Điện thoại theo yêu cầu</h3>
                        <div className="aside d-flex flex-wrap" >
                            <Button className="btn-cat" onClick={handleShowModal} >
                                <FontAwesomeIcon icon={faFilter} /><span className="ps-2">Bộ lọc</span>
                            </Button>
                            <DropdownButton id="dropdown-basic-button" cla title="Ram" >
                                <Button className={`btn-cat ${selectedRam === '2GB' ? 'selected' : ''}`}
                                    onClick={() => handleRamButtonClick('2GB')} >
                                    <FontAwesomeIcon icon={faMemory} size="2xs" style={{ "--fa-primary-opacity": "1", "--fa-secondary-opacity": "0.6", }} /><span className="span-icon" >2GB</span>
                                </Button>
                                <Button className={`btn-cat ${selectedRam === '4GB' ? 'selected' : ''}`}
                                    onClick={() => handleRamButtonClick('4GB')}>
                                    <FontAwesomeIcon icon={faMemory} size="2xs" style={{ "--fa-primary-opacity": "1", "--fa-secondary-opacity": "0.6", }} /><span className="span-icon" >4GB</span>
                                </Button>
                                <Button className={`btn-cat ${selectedRam === '6GB' ? 'selected' : ''}`}
                                    onClick={() => handleRamButtonClick('6GB')}>
                                    <FontAwesomeIcon icon={faMemory} size="2xs" style={{ "--fa-primary-opacity": "1", "--fa-secondary-opacity": "0.6", }} /><span className="span-icon">6GB</span>
                                </Button>
                                <Button className={`btn-cat ${selectedRam === '8GB' ? 'selected' : ''}`}
                                    onClick={() => handleRamButtonClick('8GB')}>
                                    <FontAwesomeIcon icon={faMemory} size="2xs" style={{ "--fa-primary-opacity": "1", "--fa-secondary-opacity": "0.6", }} /><span className="span-icon">8GB</span>
                                </Button>
                                <Button className={`btn-cat ${selectedRam === '12GB' ? 'selected' : ''}`}
                                    onClick={() => handleRamButtonClick('12GB')}>
                                    <FontAwesomeIcon icon={faMemory} size="2xs" style={{ "--fa-primary-opacity": "1", "--fa-secondary-opacity": "0.6", }} /><span className="span-icon">12GB</span>
                                </Button>
                                <Button className={`btn-cat ${selectedRam === '16GB' ? 'selected' : ''}`}
                                    onClick={() => handleRamButtonClick('16GB')}>
                                    <FontAwesomeIcon icon={faMemory} size="2xs" style={{ "--fa-primary-opacity": "1", "--fa-secondary-opacity": "0.6", }} /><span className="span-icon">16GB</span>
                                </Button>
                            </DropdownButton>
                            <DropdownButton id="dropdown-basic-button" className="rom" title="Dung lượng">
                                <Button className={`btn-cat ${selectedRom === '128GB' ? 'selected' : ''}`} onClick={() => handleRomButtonClick('128GB')} >
                                    <FontAwesomeIcon icon={faMemory} size="2xs" /><span className="span-icon">128GB</span>
                                </Button>
                                <Button className={`btn-cat ${selectedRom === '256GB' ? 'selected' : ''}`} onClick={() => handleRomButtonClick('256GB')} >
                                    <FontAwesomeIcon icon={faMemory} size="2xs" /><span className="span-icon">256GB</span>
                                </Button>
                                <Button className={`btn-cat ${selectedRom === '512GB' ? 'selected' : ''}`} onClick={() => handleRomButtonClick('512GB')} >
                                    <FontAwesomeIcon icon={faMemory} size="2xs" /><span className="span-icon">512GB</span>
                                </Button>
                                <Button className={`btn-cat ${selectedRom === '1024GB' ? 'selected' : ''}`} onClick={() => handleRomButtonClick('1024GB')} >
                                    <FontAwesomeIcon icon={faMemory} size="2xs" /><span className="span-icon">1TB</span>
                                </Button>
                            </DropdownButton>
                            <DropdownButton id="dropdown-basic-button" title="Màng hình">
                                <Button className={`btn-cat ${selectedScreen === 6 ? 'selected' : ''}`} onClick={() => handleScreenButtonClick(6)} >
                                    <FontAwesomeIcon icon={faMemory} size="2xs" /><span className="span-icon">Dưới 6 Inch</span>
                                </Button>
                                <Button className={`btn-cat ${selectedScreen === 9 ? 'selected' : ''}`} onClick={() => handleScreenButtonClick(9)} >
                                    <FontAwesomeIcon icon={faMemory} size="2xs" /><span className="span-icon">Trên 6 Inch</span>
                                </Button>
                            </DropdownButton>
                            <DropdownButton id="dropdown-basic-button" title="Bộ xử lý">
                                <Button className={`btn-cat ${selectedPin === "under3000" ? 'selected' : ''}`} onClick={() => handlePinButtonClick("under3000")} >
                                    <FontAwesomeIcon icon={faMemory} size="2xs" /><span className="span-icon">Dưới 3000</span>
                                </Button>
                                <Button className={`btn-cat ${selectedPin === "under4000" ? 'selected' : ''}`} onClick={() => handlePinButtonClick("under4000")} >
                                    <FontAwesomeIcon icon={faMemory} size="2xs" /><span className="span-icon">Dưới 4000</span>
                                </Button>
                                <Button className={`btn-cat ${selectedPin === "under5000" ? 'selected' : ''}`} onClick={() => handlePinButtonClick("under5000")} >
                                    <FontAwesomeIcon icon={faMemory} size="2xs" /><span className="span-icon">Dưới 5000</span>
                                </Button>
                                <Button className={`btn-cat ${selectedPin === "above5000" ? 'selected' : ''}`} onClick={() => handlePinButtonClick("above5000")} >
                                    <FontAwesomeIcon icon={faMemory} size="2xs" /><span className="span-icon">Trên 5000</span>
                                </Button>
                            </DropdownButton>
                        </div>
                        <Modal show={showModal} onHide={handleCloseModal} dialogClassName="custom-modal">

                            <Modal.Body style={{ padding: '20px 100px' }}>
                                <Row className="d-flex" >
                                    <Col className="filler-col">
                                        <Row>

                                            <h5 className="fil-title">Nhu cầu sử dụng</h5>
                                            <Button className="btn-fil-cofig">Chơi game/ Cấu hình cao</Button>
                                            <Button className="btn-fil-cofig">Pin khủng trên 5000mAh</Button>
                                            <Button className="btn-fil-cofig">Chụp ảnh, quay phim</Button>
                                            <Button className="btn-fil-cofig">Livestream</Button>
                                            <Button className="btn-fil-cofig">Mỏng nhẹ </Button>
                                        </Row>
                                        <Row>
                                            <h5 className="fil-title">Màng hình</h5>
                                            <Button className="btn-fil-cofig">Trên 6 inch</Button>
                                            <Button className="btn-fil-cofig">Dưới 6 inch</Button>
                                        </Row>
                                    </Col>

                                    <Col className="filler-col">
                                        <Row>

                                            <h5 className="fil-title">Loại điện thoại</h5>
                                            <Button className="btn-fil-cofig">Android</Button>
                                            <Button className="btn-fil-cofig">IOS</Button>
                                            <Button className="btn-fil-cofig">Các loại điện thoại thông dụng</Button>
                                        </Row>

                                        <Row>
                                            <h5 className="fil-title">Dung lượng lưu trữ</h5>
                                            <Button className="btn-fil-cofig">128GB</Button>
                                            <Button className="btn-fil-cofig">256GB</Button>
                                            <Button className="btn-fil-cofig">512GB</Button>
                                            <Button className="btn-fil-cofig">1TB</Button>
                                        </Row>
                                    </Col>
                                    <Col className="filler-col p-0 " style={{ marginRight: 0 }}>

                                        <h5 className="fil-title" >Dung lượng Ram</h5>
                                        <Button className="btn-fil-cofig">2GB</Button>
                                        <Button className="btn-fil-cofig">3GB</Button>
                                        <Button className="btn-fil-cofig">4GB</Button>
                                        <Button className="btn-fil-cofig">6GB</Button>
                                        <Button className="btn-fil-cofig">8GB</Button>
                                        <Button className="btn-fil-cofig">12GB</Button>
                                        <Button className="btn-fil-cofig">16GB</Button>
                                        <h5 className="fil-title">Bộ xử lý</h5>
                                        <Button className="btn-fil-cofig">2GB</Button>
                                        <Button className="btn-fil-cofig">3GB</Button>
                                        <Button className="btn-fil-cofig">4GB</Button>
                                        <Button className="btn-fil-cofig">6GB</Button>
                                        <Button className="btn-fil-cofig">8GB</Button>
                                        <Button className="btn-fil-cofig">12GB</Button>
                                        <Button className="btn-fil-cofig">16GB</Button>


                                    </Col>
                                </Row>


                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseModal} >
                                    Đóng
                                </Button>
                                <Button variant="primary">
                                    Đánh giá
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </Row >
            </Col>
            <Col sm={8}>
                <main id="main">
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
                                </ul>
                            </div>
                            <Row id="product" className="row portfolio-container " data-aos="fade-up" data-aos-delay="200">
                                {
                                    productsToDisplay.map(item => {
                                        return (
                                            <>
                                                <Col key={item.id} lg={4} className={`portfolio-item filter-${item.name.substring(0, 4).toUpperCase()} `}>
                                                    <Card className="text-black" style={{ width: 250 }} >
                                                        <Link to={`details/${item.modPhoneId}`}>
                                                            <Card.Img variant="top" src={`https://localhost:7015/images/products/${item.modPhone.image}`} />
                                                            <Card.Body>
                                                                <div className="text-center">
                                                                    <Card.Title style={{ height: 48 }}>{item.name}</Card.Title>
                                                                </div>
                                                                <div className="d-flex justify-content-center total font-weight-bold mt-4">
                                                                    <span>{(item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
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
                                                        </Link>
                                                        <Card.Footer className='d-flex justify-content-around'>
                                                            <a>
                                                                <Button onClick={() => toggleStickyDiv(item)}><FontAwesomeIcon icon={faCirclePlus} /> So sánh</Button>
                                                            </a>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                            </>
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

            <div className="sticky-div" style={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 1000, display: showStickyDiv ? 'block' : 'none', backgroundColor: 'white' }}>
                {/* Add your content inside this div */}
                <Row>
                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Button style={{ transform: 'translate(65px, 20px)', marginTop: 5, backgroundColor: 'white', border: 'none' }}><FontAwesomeIcon icon={faXmark} style={{ color: 'white' }} /></Button>
                        <Card.Img variant="top" src={`https://localhost:7015/images/products/${StickyDivImage}`} style={{ width: 100 }} />
                        <h5 style={{ textAlign: 'center' }}>{stickyDivContent}</h5>
                    </Col>
                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        {CheckTich == false ? (
                            <Button onClick={handleChoice} style={{ width: 70, height: 70, backgroundColor: 'white', border: '2px dashed gray', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                <FontAwesomeIcon icon={faPlus} style={{ color: 'gray' }} />
                            </Button>)
                            : (<>
                                <Button onClick={handleCloseCheck} style={{ transform: 'translate(65px, 20px)', marginTop: 5, backgroundColor: 'white', border: 'none' }}><FontAwesomeIcon icon={faXmark} style={{ color: 'gray' }} /></Button>
                                <Card.Img variant="top" src={`https://localhost:7015/images/products/${StickyDivImage2}`} style={{ width: 100 }} />
                                <h5 style={{ textAlign: 'center' }}>{stickyDivContent2}</h5>
                            </>)}
                    </Col>
                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        {CheckTich2 == false ? (
                            <Button onClick={handleChoice} style={{ width: 70, height: 70, backgroundColor: 'white', border: '2px dashed gray', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                <FontAwesomeIcon icon={faPlus} style={{ color: 'gray' }} />
                            </Button>)
                            : (<>
                                <Button onClick={handleCloseCheck2} style={{ transform: 'translate(65px, 20px)', marginTop: 5, backgroundColor: 'white', border: 'none' }}><FontAwesomeIcon icon={faXmark} style={{ color: 'gray' }} /></Button>
                                <Card.Img variant="top" src={`https://localhost:7015/images/products/${StickyDivImage3}`} style={{ width: 100 }} />
                                <h5 style={{ textAlign: 'center' }}>{stickyDivContent3}</h5>
                            </>)}
                    </Col>
                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Button onClick={handleCloseCompare} variant='secondary'>
                            <FontAwesomeIcon icon={faRectangleXmark} /> Cancel
                        </Button>
                        <Link to={`/compare/${stickyDivContent}/${stickyDivContent2}/${stickyDivContent3}`}>
                            <Button style={{ marginTop: 2, display: CheckTich || CheckTich2 ? 'block' : 'none' }}>Compare</Button></Link>
                    </Col>
                </Row>
            </div>
            <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60%',
                backgroundColor: 'white',
                zIndex: 1000,
                display: showChoice ? 'block' : 'none',
                border: 'solid 2px gray'
            }}>

                <section id="portfolio" className="portfolio" style={{ padding: 0 }}>
                    <Button onClick={handleCloseChoice} style={{ transform: 'translateX(845px)', marginTop: 5, backgroundColor: 'white', border: 'none' }}><FontAwesomeIcon icon={faXmark} style={{ color: 'gray' }} /></Button>
                    <div data-aos="fade-up">
                        <div className="section-title">
                            <ul id="portfolio-flters" className="d-flex flex-right justify-content-evenly" data-aos="fade-up" data-aos-delay={100}>
                                <li onClick={() => handleCategoryChange('All')} data-filter="*" className="filter-active">All</li>
                                {brand.map(item => (
                                    <li key={item.name} onClick={() => handleCategoryChange(item.name.substring(0, 4))} data-filter={`.filter-${item.name.substring(0, 4)}`}>
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Row id="product" className="row portfolio-container" data-aos="fade-up" data-aos-delay="200" style={{ transform: 'translateX(25px)' }}>
                            {ChoicePage.map(item => (
                                <Col key={item.id} lg={3} className={`portfolio-item filter-${item.name.substring(0, 4).toUpperCase()} `}>
                                    <Card className="text-black" style={{ width: 150, border: 'none' }}>
                                        <Card.Img variant="top" src={`https://localhost:7015/images/products/${item.modPhone.image}`} />
                                        <Card.Body>
                                            <div className="text-center">
                                                <Card.Title style={{ fontSize: 14, height: 15 }}>{item.name}</Card.Title>
                                            </div>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Button onClick={() => check2v3 ? toggleStickyDiv2(item) : toggleStickyDiv3(item)} style={{ fontSize: 10, bottom: 0 }}>Thêm so sánh</Button>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        <Pagination>{ChoicePages}</Pagination>
                    </div>
                </section>
            </div>
        </>
    );
};
export default AllProducts;

