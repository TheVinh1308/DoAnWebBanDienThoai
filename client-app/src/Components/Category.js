import { faFilter, faMemory, faMicrochip, faMinus, faMobileScreen, faTabletScreenButton } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Dropdown, DropdownButton, DropdownMenu, Form, InputGroup, Modal, NavDropdown, Row } from "react-bootstrap";
import NumericInput from "react-numeric-input";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
const Category = (buttonCheck) => {
    // price
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(1000);
    const [selectedButton, setSelectedButton] = useState(null);


    const handleButtonClick = (button) => {
        setSelectedButton(button);
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


    return (
        <>

            {/* <Row className="d-block">
                    <div style={{ marginTop: 150 }} >
                        <video width="250px" height="" src="./video/video01.mp4" controls>

                        </video>
                    </div>
                </Row> */}



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
                            <Button className={`btn-cat ${selectedButton === '2GB' ? 'selected' : ''}`}
                                onClick={() => handleButtonClick('2GB')} >
                                <FontAwesomeIcon icon={faMemory} size="2xs" style={{ "--fa-primary-opacity": "1", "--fa-secondary-opacity": "0.6", }} /><span className="span-icon" >2GB</span>
                            </Button>
                            <Button className={`btn-cat ${selectedButton === '4GB' ? 'selected' : ''}`}
                                onClick={() => handleButtonClick('4GB')}>
                                <FontAwesomeIcon icon={faMemory} size="2xs" style={{ "--fa-primary-opacity": "1", "--fa-secondary-opacity": "0.6", }} /><span className="span-icon" >4GB</span>
                            </Button>
                            <Button className={`btn-cat ${selectedButton === '6GB' ? 'selected' : ''}`}
                                onClick={() => handleButtonClick('6GB')}>
                                <FontAwesomeIcon icon={faMemory} size="2xs" style={{ "--fa-primary-opacity": "1", "--fa-secondary-opacity": "0.6", }} /><span className="span-icon">6GB</span>
                            </Button>
                            <Button className={`btn-cat ${selectedButton === '8GB' ? 'selected' : ''}`}
                                onClick={() => handleButtonClick('8GB')}>
                                <FontAwesomeIcon icon={faMemory} size="2xs" style={{ "--fa-primary-opacity": "1", "--fa-secondary-opacity": "0.6", }} /><span className="span-icon">8GB</span>
                            </Button>
                            <Button className={`btn-cat ${selectedButton === '12GB' ? 'selected' : ''}`}
                                onClick={() => handleButtonClick('12GB')}>
                                <FontAwesomeIcon icon={faMemory} size="2xs" style={{ "--fa-primary-opacity": "1", "--fa-secondary-opacity": "0.6", }} /><span className="span-icon">12GB</span>
                            </Button>
                            <Button className={`btn-cat ${selectedButton === '16GB' ? 'selected' : ''}`}
                                onClick={() => handleButtonClick('16GB')}>
                                <FontAwesomeIcon icon={faMemory} size="2xs" style={{ "--fa-primary-opacity": "1", "--fa-secondary-opacity": "0.6", }} /><span className="span-icon">16GB</span>
                            </Button>
                        </DropdownButton>
                        <DropdownButton id="dropdown-basic-button" className="rom" title="Dung lượng">
                            <Button className={`btn-cat ${selectedButton === '128GB' ? 'selected' : ''}`} onClick={() => handleButtonClick('128GB')} >
                                <FontAwesomeIcon icon={faMemory} size="2xs" /><span className="span-icon">128GB</span>
                            </Button>
                            <Button className={`btn-cat ${selectedButton === '265GB' ? 'selected' : ''}`} onClick={() => handleButtonClick('265GB')} >
                                <FontAwesomeIcon icon={faMemory} size="2xs" /><span className="span-icon">265GB</span>
                            </Button>
                            <Button className={`btn-cat ${selectedButton === '512GB' ? 'selected' : ''}`} onClick={() => handleButtonClick('512GB')} >
                                <FontAwesomeIcon icon={faMemory} size="2xs" /><span className="span-icon">512GB</span>
                            </Button>
                            <Button className={`btn-cat ${selectedButton === '1TB' ? 'selected' : ''}`} onClick={() => handleButtonClick('1TB')} >
                                <FontAwesomeIcon icon={faMemory} size="2xs" /><span className="span-icon">1TB</span>
                            </Button>
                        </DropdownButton>
                        <DropdownButton id="dropdown-basic-button" title="Màng hình">
                            <Button className={`btn-cat ${selectedButton === 'Dưới 6 Inch' ? 'selected' : ''}`} onClick={() => handleButtonClick('Dưới 6 Inch')} >
                                <FontAwesomeIcon icon={faMemory} size="2xs" /><span className="span-icon">Dưới 6 Inch</span>
                            </Button>
                            <Button className={`btn-cat ${selectedButton === 'Trên 6 Inch' ? 'selected' : ''}`} onClick={() => handleButtonClick('Trên 6 Inch')} >
                                <FontAwesomeIcon icon={faMemory} size="2xs" /><span className="span-icon">Trên 6 Inch</span>
                            </Button>
                            <Button className={`btn-cat ${selectedButton === 'Trên 7 Inch' ? 'selected' : ''}`} onClick={() => handleButtonClick('Trên 7 Inch')} >
                                <FontAwesomeIcon icon={faMemory} size="2xs" /><span className="span-icon">Trên 7 Inch</span>
                            </Button>
                        </DropdownButton>
                        <DropdownButton id="dropdown-basic-button" title="Bộ xử lý">
                            <Button className="btn-cat">
                                <FontAwesomeIcon icon={faMicrochip} size="xs" /><span className="span-icon">Snapdragon 8</span>
                            </Button>
                            <Button className="btn-cat">
                                <FontAwesomeIcon icon={faMicrochip} size="xs" /><span className="span-icon">A16 Bionic</span>
                            </Button>
                            <Button className="btn-cat">
                                <FontAwesomeIcon icon={faMicrochip} size="xs" /><span className="span-icon">A17 pro</span>
                            </Button>
                            <Button className="btn-cat">
                                <FontAwesomeIcon icon={faMicrochip} size="xs" /><span className="span-icon">Exynos 2100</span>
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
        </>
    );
}

export default Category;