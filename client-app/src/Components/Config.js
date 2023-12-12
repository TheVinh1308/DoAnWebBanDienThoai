import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Form, ListGroup, ListGroupItem, Modal, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
const Config = ({ phoneID }) => {
    const [product, setProduct] = useState({ modPhone: {} });
    useEffect(() => {
        axios.get(`https://localhost:7015/api/Phones/GetPhoneWithModPhone/${phoneID}`)
            .then(res => {
                setProduct(res.data)
            });
    }, [phoneID]);
    const { id } = useParams();
    const [config, setConfig] = useState({ thongTin: { manHinh: {}, cameraSau: { quayVideo: [], tinhNang: [] }, cameraTruoc: { tinhNang: [] }, heDieuHanhCPU: {}, pinSac: { congNghePin: [] }, ketNoi: { wifi: [] }, tienIch: { ngheNhac: [] }, thongTinChung: {}, ramLuuTru: {} } });
    useEffect(() => {
        axios.get(`http://localhost:3001/phoneConfig/${id}`)
            .then(res => setConfig(res.data));
    }, [id]);

    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    return (


        <>

            <div paddingTop={-10} >
                <aside style={{ marginTop: 44, marginLeft: 80 }} >
                    <Row>
                        {/* <Col lg={6}>
                            <h3>Thông tin điện thoại {product.title}</h3>
                            <ListGroup>
                                <ListGroupItem>
                                    <img src={product.thumbnail}></img>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <p>Samsung đã cho ra mắt mẫu máy tính bảng mang tên Samsung Galaxy Tab A9 4G, đặc điểm nổi bật của máy bao gồm cấu hình ổn trong tầm giá, màn hình lớn và viên pin 5100 mAh tích hợp bên trong. Điều này cải thiện hiệu suất làm việc mà vẫn giữ tính di động tối ưu.</p>
                                </ListGroupItem>
                                <ListGroupItem>

                                </ListGroupItem>
                                <ListGroupItem>

                                </ListGroupItem>

                            </ListGroup>
                        </Col> */}


                        <Col >
                            <h3 style={{ padding: 15, textAlign: 'center' }}>Cấu hình điện thoại {product.name}</h3>
                            <ListGroup>
                                <ListGroupItem>
                                    <Row>

                                    </Row>
                                    <Row>
                                        <Col lg={4}>
                                            <p>Màn hình:</p>
                                        </Col>
                                        <Col>
                                            <p>{config.thongTin.manHinh.congNghe}</p>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>

                                    <Row>
                                        <Col lg={4}>
                                            <p>Hệ điều hành:</p>
                                        </Col>
                                        <Col>
                                            <p>{product.modPhone.os}</p>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col lg={4}>
                                            <p>Camera sau:</p>
                                        </Col>
                                        <Col>
                                            <p>{config.thongTin.cameraSau.doPhanGiai}</p>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col lg={4}>
                                            <p>Camera trước:</p>
                                        </Col>
                                        <Col>
                                            <p>{config.thongTin.cameraTruoc.doPhanGiai}</p>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col lg={4}>
                                            <p>Pin:</p>
                                        </Col>
                                        <Col>
                                            <p>{config.thongTin.pinSac.dungLuongPin}</p>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col lg={4}>
                                            <p>Chip:</p>
                                        </Col>
                                        <Col>
                                            <p>{config.thongTin.heDieuHanhCPU.chipXuLy}</p>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col lg={4}>
                                            <p>Ram:</p>
                                        </Col>
                                        <Col>
                                            <p>{product.modPhone.ram}</p>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col lg={4}>
                                            <p>Dung lượng:</p>
                                        </Col>
                                        <Col>
                                            <p>{product.rom}</p>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col lg={4}>
                                            <p>Hãng:</p>
                                        </Col>
                                        <Col>
                                            <p>{config.thongTin.thongTinChung.hang}</p>
                                        </Col>
                                    </Row>
                                </ListGroupItem>

                            </ListGroup>
                            <div className="d-flex justify-content-center" style={{ padding: 10 }}>
                                <Button className='mx-2' variant="light" style={{ border: '1px solid gray' }} onClick={handleShowModal} >Xem thêm cấu hình chi tiết<small><FontAwesomeIcon style={{ paddingLeft: 10, fontSize: 10, marginBottom: 2 }} icon={faPlay} /></small></Button>

                            </div>

                            <div>
                                <Modal show={showModal} onHide={handleCloseModal} dialogClassName="custom-modal">

                                    <Modal.Body style={{ padding: '20px 100px' }}>
                                        <Row>
                                            <img src={product.thumbnail} alt="" style={{ paddingBottom: 20 }} />
                                        </Row>
                                        <ListGroup>
                                            <div>
                                                <ListGroupItem>  <h6>Màng hình</h6></ListGroupItem>
                                                <ListGroupItem>

                                                    <Row>
                                                        <Col lg={4}>
                                                            <p>Màn hình rộng:</p>
                                                        </Col>
                                                        <Col>
                                                            <p>{product.modPhone.screenSize}</p>
                                                        </Col>
                                                    </Row>
                                                </ListGroupItem>
                                            </div>

                                            <div>
                                                <ListGroupItem>  <h6>Hệ điều hành & CPU</h6></ListGroupItem>
                                                <ListGroupItem>
                                                    <Row>
                                                        <Col lg={4}>
                                                            <p>Hệ điều hành:</p>
                                                        </Col>
                                                        <Col>
                                                            <p>{config.thongTin.heDieuHanhCPU.heDieuHanh}</p>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={4}>
                                                            <p>Chip xử lý (CPU):</p>
                                                        </Col>
                                                        <Col>
                                                            <p>{config.thongTin.heDieuHanhCPU.chipXuLy}</p>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={4}>
                                                            <p>Tốc độ xử lý:</p>
                                                        </Col>
                                                        <Col>
                                                            <p>{config.thongTin.heDieuHanhCPU.tocDoCPU}</p>

                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={4}>
                                                            <p>Chip đồ hoạ (PU):</p>
                                                        </Col>
                                                        <Col>
                                                            <p>{config.thongTin.heDieuHanhCPU.tocDoCPU}</p>
                                                        </Col>
                                                    </Row>
                                                </ListGroupItem>
                                            </div>
                                            <div>
                                                <ListGroupItem>  <h6>Camera sau</h6></ListGroupItem>
                                                <ListGroupItem>
                                                    <Row>
                                                        <Col lg={4}>
                                                            <p>Độ phân giải:</p>
                                                        </Col>
                                                        <Col>
                                                            <p>{config.thongTin.cameraSau.doPhanGiai}</p>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={4}>
                                                            <p>Quay phim:</p>
                                                        </Col>
                                                        <Col>
                                                            {
                                                                config.thongTin.cameraSau.quayVideo.map((item, index) => {
                                                                    return (
                                                                        <p key={index}>{item}</p>
                                                                    )
                                                                })
                                                            }

                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={4}>
                                                            <p>Đèn Flash:</p>
                                                        </Col>
                                                        <Col>
                                                            <p>{config.thongTin.cameraSau.denFlash}</p>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={4}>
                                                            <p>Tính năng:</p>
                                                        </Col>
                                                        <Col>
                                                            {
                                                                config.thongTin.cameraSau.tinhNang.map((item, index) => {
                                                                    return (
                                                                        <p key={index}>{item}</p>
                                                                    )
                                                                })
                                                            }
                                                        </Col>
                                                    </Row>
                                                </ListGroupItem>
                                            </div>
                                            <div>
                                                <ListGroupItem>  <h6>Camera trước</h6></ListGroupItem>
                                                <ListGroupItem>
                                                    <Row>
                                                        <Col lg={4}>
                                                            <p>Độ phân giải:</p>
                                                        </Col>
                                                        <Col>
                                                            <p>{config.thongTin.cameraTruoc.doPhanGiai}</p>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={4}>
                                                            <p>Tính năng:</p>
                                                        </Col>
                                                        <Col>
                                                            {
                                                                config.thongTin.cameraTruoc.tinhNang.map((item, index) => {
                                                                    return (
                                                                        <p key={index}>{item}</p>
                                                                    )
                                                                })
                                                            }
                                                        </Col>
                                                    </Row>
                                                </ListGroupItem>
                                            </div>
                                            <div>
                                                <ListGroupItem>  <h6>Dung lượng</h6></ListGroupItem>
                                                <ListGroupItem>
                                                    <Row>
                                                        <Col lg={4}>
                                                            <p>Ram:</p>
                                                        </Col>
                                                        <Col>
                                                            <p>{config.thongTin.ramLuuTru.ram}</p>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={4}>
                                                            <p>Rom:</p>
                                                        </Col>
                                                        <Col>
                                                            <p>{product.rom}</p>
                                                        </Col>
                                                    </Row>
                                                </ListGroupItem>
                                            </div>
                                            <div>
                                                <ListGroupItem>  <h6>Kết nối</h6></ListGroupItem>
                                                <ListGroupItem>
                                                    <Row>
                                                        <Col lg={4}>
                                                            <p>Mạng di động:</p>
                                                        </Col>
                                                        <Col>
                                                            <p>{config.thongTin.ketNoi.mangDiDong}</p>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={4}>
                                                            <p>SIM:</p>
                                                        </Col>
                                                        <Col>
                                                            <p>{config.thongTin.ketNoi.sim}</p>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={4}>
                                                            <p>Wifi:</p>
                                                        </Col>
                                                        <Col>
                                                            {
                                                                config.thongTin.ketNoi.wifi.map((item, index) => {

                                                                    return (
                                                                        <p key={index}>{item}</p>
                                                                    )
                                                                })
                                                            }
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={4}>
                                                            <p>Bluetooth:</p>
                                                        </Col>
                                                        <Col>
                                                            <p>{config.thongTin.ketNoi.bluetooth}</p>
                                                        </Col>
                                                    </Row>

                                                </ListGroupItem>
                                            </div>
                                            <div>
                                                <ListGroupItem>  <h6>PIN</h6></ListGroupItem>
                                                <ListGroupItem>
                                                    <Row>
                                                        <Col lg={4}>
                                                            <p>Dung lượng pin:</p>
                                                        </Col>
                                                        <Col>
                                                            <p>{config.thongTin.pinSac.dungLuongPin}</p>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={4}>
                                                            <p>Hỗ trợ sạc tối đa:</p>
                                                        </Col>
                                                        <Col>
                                                            <p>{config.thongTin.pinSac.hoTroSacToiDa}</p>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={4}>
                                                            <p>Công nghệ pin:</p>
                                                        </Col>
                                                        <Col>
                                                            {
                                                                config.thongTin.pinSac.congNghePin.map((item, index) => {

                                                                    return (
                                                                        <p key={index}>{item}</p>
                                                                    )
                                                                })
                                                            }
                                                        </Col>
                                                    </Row>
                                                </ListGroupItem>
                                            </div>
                                            <div>
                                                <ListGroupItem>  <h6>Tiện ích</h6></ListGroupItem>
                                                <ListGroupItem>
                                                    <Row>
                                                        <Col lg={4}>
                                                            <p>Bảo mật cao:</p>
                                                        </Col>
                                                        <Col>
                                                            <p>{config.thongTin.tienIch.baoMatNangCao}</p>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={4}>
                                                            <p>Tính năng đặc biệt:</p>
                                                        </Col>
                                                        <Col>
                                                            <p>{config.thongTin.tienIch.tinhNangDacBiet}</p>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={4}>
                                                            <p>Ghi âm:</p>
                                                        </Col>
                                                        <Col>
                                                            <p>{config.thongTin.tienIch.ghiAm}</p>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={4}>
                                                            <p>Xem phim:</p>
                                                        </Col>
                                                        <Col>
                                                            <p>{config.thongTin.tienIch.xemPhim}</p>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={4}>
                                                            <p>Âm thanh:</p>
                                                        </Col>
                                                        <Col>
                                                            {
                                                                config.thongTin.tienIch.ngheNhac.map((item, index) => {

                                                                    return (
                                                                        <p key={index}>{item}</p>
                                                                    )
                                                                })
                                                            }
                                                        </Col>
                                                    </Row>
                                                </ListGroupItem>
                                            </div>
                                            <div>
                                                <ListGroupItem>  <h6>Thông tin chung</h6></ListGroupItem>
                                                <ListGroupItem>
                                                    <Row>
                                                        <Col lg={4}>
                                                            <p>Chất liệu:</p>
                                                        </Col>
                                                        <Col>
                                                            <p>{config.thongTin.thongTinChung.chatLieu}</p>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={4}>
                                                            <p>Kích thước - khối lượng:</p>
                                                        </Col>
                                                        <Col>
                                                            <p>{config.thongTin.thongTinChung.kichThuocTrongLuong}</p>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={4}>
                                                            <p>Thời điểm ra mắt:</p>
                                                        </Col>
                                                        <Col>
                                                            <p>{config.thongTin.thongTinChung.thoiDiemRaMat}</p>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={4}>
                                                            <p>Màu:</p>
                                                        </Col>
                                                        <Col>
                                                            <p>{product.color}</p>
                                                        </Col>
                                                    </Row>
                                                </ListGroupItem>
                                            </div>

                                        </ListGroup>

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
                        </Col>
                    </Row>
                </aside>
            </div>
        </>
    );
}

export default Config;