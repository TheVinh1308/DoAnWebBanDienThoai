import { faBatteryThreeQuarters, faCamera, faCameraRetro, faCircleQuestion, faGears, faGlobe, faHouse, faMemory, faMicrochip, faMobileScreen, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Accordion, Breadcrumb, Button, Card, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Header from '../Components/Navbar';

const Compare = () => {
    const { name1, name2, name3 } = useParams();

    const [modPhone1, setModPhone1] = useState({});
    const [modPhone2, setModPhone2] = useState({});
    const [modPhone3, setModPhone3] = useState({});

    const fetchModPhoneData = (name, setModPhone) => {
        if (name) {
            axios.get(`https://localhost:7015/api/ModPhones/GetModPhoneByName/${name.trim().replace(/\d+GB$/, '').replace(/\d+MB$/, '')}`)
                .then(res => setModPhone(res.data));
        }
    };

    useEffect(() => {
        fetchModPhoneData(name1, setModPhone1);
    }, [name1]);

    useEffect(() => {
        fetchModPhoneData(name2, setModPhone2);
    }, [name2]);

    useEffect(() => {
        fetchModPhoneData(name3, setModPhone3);
    }, [name3]);


    const [phone1, setPhone1] = useState({ thongTin: { manHinh: {}, cameraSau: { quayVideo: [], tinhNang: [] }, cameraTruoc: { tinhNang: [] }, heDieuHanhCPU: {}, pinSac: { congNghePin: [] }, ketNoi: { wifi: [] }, tienIch: { ngheNhac: [] }, thongTinChung: {}, ramLuuTru: {} } });
    useEffect(() => {
        axios.get(`http://localhost:3001/phoneConfig?tenDienThoai=${name1.trim().replace(/\d+GB$/, '').replace(/\+/g, '%2B').replace(/\d+MB$/, '').trim()}`)
            .then(res => setPhone1(res.data[0]));
    }, []);

    const [phone2, setPhone2] = useState({ thongTin: { manHinh: {}, cameraSau: { quayVideo: [], tinhNang: [] }, cameraTruoc: { tinhNang: [] }, heDieuHanhCPU: {}, pinSac: { congNghePin: [] }, ketNoi: { wifi: [] }, tienIch: { ngheNhac: [] }, thongTinChung: {}, ramLuuTru: {} } });
    useEffect(() => {
        axios.get(`http://localhost:3001/phoneConfig?tenDienThoai=${name2.trim().replace(/\d+GB$/, '').replace(/\+/g, '%2B').replace(/\d+MB$/, '').trim()}`)
            .then(res => setPhone2(res.data[0]));
    }, []);

    const [phone3, setPhone3] = useState({ thongTin: { manHinh: {}, cameraSau: { quayVideo: [], tinhNang: [] }, cameraTruoc: { tinhNang: [] }, heDieuHanhCPU: {}, pinSac: { congNghePin: [] }, ketNoi: { wifi: [] }, tienIch: { ngheNhac: [] }, thongTinChung: {}, ramLuuTru: {} } });
    useEffect(() => {
        if (name3 !== undefined) {

            axios.get(`http://localhost:3001/phoneConfig?tenDienThoai=${name3.trim().replace(/\d+GB$/, '').replace(/\+/g, '%2B').replace(/\d+MB$/, '').trim()}`)
                .then(res => setPhone3(res.data[0]));
        }
    }, []);
    console.log(`name2`, name2.trim().replace(/\d+GB$/, '').replace(/\+/g, '%2B').replace(/\d+MB$/, '').trim());
    return (
        <>
            <Header />
            <div style={{ transform: 'translateY(-60px)', position: 'fixed', backgroundColor: 'white', zIndex: 2, width: '100vw', paddingTop: 20 }}>
                <Breadcrumb>

                    <Breadcrumb.Item href="/">  <FontAwesomeIcon icon={faHouse} style={{ padding: 2 }} />Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Compare</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='container' style={{ marginTop: 150, zIndex: -1 }}>

                <Row>
                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

                    </Col>
                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Button style={{ transform: 'translate(120px, 20px)', marginTop: 5, backgroundColor: 'white', border: 'none' }}><FontAwesomeIcon icon={faXmark} style={{ color: 'gray' }} /></Button>
                        <Card.Img variant="top" src={`https://localhost:7015/images/products/${modPhone1.image}`} style={{ width: 250 }} />
                        <h5 style={{ textAlign: 'center' }}>{modPhone1.name}</h5>
                    </Col>
                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Button style={{ transform: 'translate(120px, 20px)', marginTop: 5, backgroundColor: 'white', border: 'none' }}><FontAwesomeIcon icon={faXmark} style={{ color: 'gray' }} /></Button>
                        <Card.Img variant="top" src={`https://localhost:7015/images/products/${modPhone2.image}`} style={{ width: 250 }} />
                        <h5 style={{ textAlign: 'center' }}>{modPhone2.name}</h5>
                    </Col>
                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        {name3 == undefined ? (
                            <Button style={{ width: 70, height: 70, backgroundColor: 'white', border: '2px dashed gray', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                <FontAwesomeIcon icon={faPlus} style={{ color: 'gray' }} />
                            </Button>)
                            : (<>
                                <Button style={{ transform: 'translate(120px, 20px)', marginTop: 5, backgroundColor: 'white', border: 'none' }}><FontAwesomeIcon icon={faXmark} style={{ color: 'gray' }} /></Button>
                                <Card.Img variant="top" src={`https://localhost:7015/images/products/${modPhone3.image}`} style={{ width: 250 }} />
                                <h5 style={{ textAlign: 'center' }}>{modPhone3.name}</h5>
                            </>)}
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header> <FontAwesomeIcon icon={faMobileScreen} style={{ paddingRight: 20 }} /> Màng hình </Accordion.Header>
                            <Accordion.Body className='Compare-item-list'>
                                <Row>
                                    <Col>
                                        <p>Công nghệ</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone1.thongTin.manHinh.congNghe == undefined ? "( Đang cập nhật )" : phone1.thongTin.manHinh.congNghe}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone2.thongTin.manHinh.congNghe == undefined ? "( Đang cập nhật )" : phone2.thongTin.manHinh.congNghe}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{name3 !== undefined ? (phone3.thongTin.manHinh.congNghe == undefined ? "( Đang cập nhật )" : phone3.thongTin.manHinh.congNghe) : ""}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Độ phân giải</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone1.thongTin.manHinh.doPhanGiai == undefined ? "( Đang cập nhật )" : phone1.thongTin.manHinh.doPhanGiai}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone2.thongTin.manHinh.doPhanGiai == undefined ? "( Đang cập nhật )" : phone2.thongTin.manHinh.doPhanGiai}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{name3 !== undefined ? (phone3.thongTin.manHinh.doPhanGiai == undefined ? "( Đang cập nhật )" : phone3.thongTin.manHinh.doPhanGiai) : ""}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Kích thước</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone1.thongTin.manHinh.kichThuoc == undefined ? "( Đang cập nhật )" : phone1.thongTin.manHinh.kichThuoc}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone2.thongTin.manHinh.kichThuoc == undefined ? "( Đang cập nhật )" : phone2.thongTin.manHinh.kichThuoc}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{name3 !== undefined ? (phone3.thongTin.manHinh.kichThuoc == undefined ? "( Đang cập nhật )" : phone3.thongTin.manHinh.kichThuoc) : ""}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Tần số quét</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone1.thongTin.manHinh.tanSoQuet == undefined ? "( Đang cập nhật )" : phone1.thongTin.manHinh.tanSoQuet}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone2.thongTin.manHinh.tanSoQuet == undefined ? "( Đang cập nhật )" : phone2.thongTin.manHinh.tanSoQuet}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{name3 !== undefined ? (phone3.thongTin.manHinh.tanSoQuet == undefined ? "( Đang cập nhật )" : phone3.thongTin.manHinh.tanSoQuet) : ""}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Độ sáng tối đa</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone1.thongTin.manHinh.doSangToiDa == undefined ? "( Đang cập nhật )" : phone1.thongTin.manHinh.doSangToiDa}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone2.thongTin.manHinh.doSangToiDa == undefined ? "( Đang cập nhật )" : phone2.thongTin.manHinh.doSangToiDa}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{name3 !== undefined ? (phone3.thongTin.manHinh.doSangToiDa == undefined ? "( Đang cập nhật )" : phone3.thongTin.manHinh.doSangToiDa) : ""}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Mặt kính cảm ứng</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone1.thongTin.manHinh.matKinhCamUng == undefined ? "( Đang cập nhật )" : phone1.thongTin.manHinh.matKinhCamUng}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone2.thongTin.manHinh.matKinhCamUng == undefined ? "( Đang cập nhật )" : phone2.thongTin.manHinh.matKinhCamUng}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{name3 !== undefined ? (phone3.thongTin.manHinh.matKinhCamUng == undefined ? "( Đang cập nhật )" : phone3.thongTin.manHinh.matKinhCamUng) : ""}</p>
                                    </Col>
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Row>
                <Row>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header> <FontAwesomeIcon icon={faCameraRetro} style={{ paddingRight: 20 }} /> Camera Sau </Accordion.Header>
                            <Accordion.Body className='Compare-item-list'>
                                <Row>
                                    <Col>
                                        <p>Độ phân giải</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone1.thongTin.cameraSau.doPhanGiai == undefined ? "( Đang cập nhật )" : phone1.thongTin.cameraSau.doPhanGiai}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone2.thongTin.cameraSau.doPhanGiai == undefined ? "( Đang cập nhật )" : phone2.thongTin.cameraSau.doPhanGiai}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{name3 !== undefined ? (phone3.thongTin.cameraSau.doPhanGiai == undefined ? "( Đang cập nhật )" : phone3.thongTin.cameraSau.doPhanGiai) : ""}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Quay video</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        {
                                            phone1.thongTin.cameraSau.quayVideo.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        }
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                                        {
                                            phone2.thongTin.cameraSau.quayVideo.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        }
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        {
                                            phone3.thongTin.cameraSau.quayVideo.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        }
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Đèn Flash</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <p>{phone1.thongTin.cameraSau.denFlash == undefined ? "( Đang cập nhật )" : phone1.thongTin.cameraSau.denFlash}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <p>{phone2.thongTin.cameraSau.denFlash == undefined ? "( Đang cập nhật )" : phone2.thongTin.cameraSau.denFlash}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <p>{name3 !== undefined ? (phone3.thongTin.cameraSau.denFlash == undefined ? "( Đang cập nhật )" : phone3.thongTin.cameraSau.denFlash) : ""}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Tính năng</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        {
                                            phone1.thongTin.cameraSau.tinhNang.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        }
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        {
                                            phone2.thongTin.cameraSau.tinhNang.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        }
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        {
                                            phone3.thongTin.cameraSau.tinhNang.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        }
                                    </Col>
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>

                    </Accordion>
                </Row>
                <Row>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header> <FontAwesomeIcon icon={faCamera} style={{ paddingRight: 20 }} /> Camera Trước </Accordion.Header>
                            <Accordion.Body className='Compare-item-list'>
                                <Row>
                                    <Col>
                                        <p>Độ phân giải</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone1.thongTin.cameraTruoc.doPhanGiai == undefined ? "( Đang cập nhật )" : phone1.thongTin.cameraTruoc.doPhanGiai}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone2.thongTin.cameraTruoc.doPhanGiai == undefined ? "( Đang cập nhật )" : phone2.thongTin.cameraTruoc.doPhanGiai}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{name3 !== undefined ? (phone3.thongTin.cameraTruoc.doPhanGiai == undefined ? "( Đang cập nhật )" : phone3.thongTin.cameraTruoc.doPhanGiai) : ""}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Tính năng</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        {
                                            phone1.thongTin.cameraTruoc.tinhNang.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        }
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        {
                                            phone2.thongTin.cameraTruoc.tinhNang.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        }
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        {
                                            phone3.thongTin.cameraTruoc.tinhNang.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        }
                                    </Col>
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Row>

                <Row>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header> <FontAwesomeIcon icon={faMicrochip} style={{ paddingRight: 20 }} /> Hệ điều hành (CPU) </Accordion.Header>
                            <Accordion.Body className='Compare-item-list'>
                                <Row>
                                    <Col>
                                        <p>Hệ điều hành</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone1.thongTin.heDieuHanhCPU.heDieuHanh == undefined ? "( Đang cập nhật )" : phone1.thongTin.heDieuHanhCPU.heDieuHanh}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone2.thongTin.heDieuHanhCPU.heDieuHanh == undefined ? "( Đang cập nhật )" : phone2.thongTin.heDieuHanhCPU.heDieuHanh}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{name3 !== undefined ? (phone3.thongTin.heDieuHanhCPU.heDieuHanh == undefined ? "( Đang cập nhật )" : phone3.thongTin.heDieuHanhCPU.heDieuHanh) : ""}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Chip xử lý</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <p>{phone1.thongTin.heDieuHanhCPU.chipXuLy == undefined ? "( Đang cập nhật )" : phone1.thongTin.heDieuHanhCPU.chipXuLy}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <p>{phone2.thongTin.heDieuHanhCPU.chipXuLy == undefined ? "( Đang cập nhật )" : phone2.thongTin.heDieuHanhCPU.chipXuLy}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <p>{name3 !== undefined ? (phone3.thongTin.heDieuHanhCPU.chipXuLy == undefined ? "( Đang cập nhật )" : phone3.thongTin.heDieuHanhCPU.chipXuLy) : ""}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Tốc độ CPU</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <p>{phone1.thongTin.heDieuHanhCPU.tocDoCPU == undefined ? "( Đang cập nhật )" : phone1.thongTin.heDieuHanhCPU.tocDoCPU}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <p>{phone2.thongTin.heDieuHanhCPU.tocDoCPU == undefined ? "( Đang cập nhật )" : phone2.thongTin.heDieuHanhCPU.tocDoCPU}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <p>{name3 !== undefined ? (phone3.thongTin.heDieuHanhCPU.tocDoCPU == undefined ? "( Đang cập nhật )" : phone3.thongTin.heDieuHanhCPU.tocDoCPU) : ""}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Chip đồ hoạ</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <p>{phone1.thongTin.heDieuHanhCPU.chipDoHoa == undefined ? "( Đang cập nhật )" : phone1.thongTin.heDieuHanhCPU.chipDoHoa}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <p>{phone2.thongTin.heDieuHanhCPU.chipDoHoa == undefined ? "( Đang cập nhật )" : phone2.thongTin.heDieuHanhCPU.chipDoHoa}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <p>{name3 !== undefined ? (phone3.thongTin.heDieuHanhCPU.chipDoHoa == undefined ? "( Đang cập nhật )" : phone3.thongTin.heDieuHanhCPU.chipDoHoa) : ""}</p>
                                    </Col>
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Row>
                <Row>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header> <FontAwesomeIcon icon={faMemory} style={{ paddingRight: 20 }} /> Ram lưu trữ </Accordion.Header>
                            <Accordion.Body className='Compare-item-list'>
                                <Row>
                                    <Col>
                                        <p>Ram</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone1.thongTin.ramLuuTru.ram == undefined ? "( Đang cập nhật )" : phone1.thongTin.ramLuuTru.ram}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone2.thongTin.ramLuuTru.ram == undefined ? "( Đang cập nhật )" : phone2.thongTin.ramLuuTru.ram}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{name3 !== undefined ? (phone3.thongTin.ramLuuTru.ram == undefined ? "( Đang cập nhật )" : phone3.thongTin.ramLuuTru.ram) : ""}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Dung lượng lưu trữ</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone1.thongTin.ramLuuTru.dungLuongLuuTru == undefined ? "( Đang cập nhật )" : phone1.thongTin.ramLuuTru.dungLuongLuuTru}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone2.thongTin.ramLuuTru.dungLuongLuuTru == undefined ? "( Đang cập nhật )" : phone2.thongTin.ramLuuTru.dungLuongLuuTru}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{name3 !== undefined ? (phone3.thongTin.ramLuuTru.dungLuongLuuTru == undefined ? "( Đang cập nhật )" : phone3.thongTin.ramLuuTru.dungLuongLuuTru) : ""}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Dung lượng còn lại</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone1.thongTin.ramLuuTru.dungLuongConLai == undefined ? "( Đang cập nhật )" : phone1.thongTin.ramLuuTru.dungLuongConLai}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone2.thongTin.ramLuuTru.dungLuongConLai == undefined ? "( Đang cập nhật )" : phone2.thongTin.ramLuuTru.dungLuongConLai}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{name3 !== undefined ? (phone3.thongTin.ramLuuTru.dungLuongConLai == undefined ? "( Đang cập nhật )" : phone3.thongTin.ramLuuTru.dungLuongConLai) : ""}</p>
                                    </Col>
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Row>
                <Row>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header> <FontAwesomeIcon icon={faGlobe} style={{ paddingRight: 20 }} /> Kết nối </Accordion.Header>
                            <Accordion.Body className='Compare-item-list'>
                                <Row>
                                    <Col>
                                        <p>Mạng di động</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone1.thongTin.ketNoi.mangDiDong == undefined ? "( Đang cập nhật )" : phone1.thongTin.ketNoi.mangDiDong}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone2.thongTin.ketNoi.mangDiDong == undefined ? "( Đang cập nhật )" : phone2.thongTin.ketNoi.mangDiDong}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{name3 !== undefined ? (phone3.thongTin.ketNoi.mangDiDong == undefined ? "( Đang cập nhật )" : phone3.thongTin.ketNoi.mangDiDong) : ""}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Sim</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone1.thongTin.ketNoi.sim == undefined ? "( Đang cập nhật )" : phone1.thongTin.ketNoi.sim}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone2.thongTin.ketNoi.sim == undefined ? "( Đang cập nhật )" : phone2.thongTin.ketNoi.sim}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{name3 !== undefined ? (phone3.thongTin.ketNoi.sim == undefined ? "( Đang cập nhật )" : phone3.thongTin.ketNoi.sim) : ""}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Wifi</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        {
                                            phone1.thongTin.ketNoi.wifi.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        }
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        {
                                            phone2.thongTin.ketNoi.wifi.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        }
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        {
                                            phone3.thongTin.ketNoi.wifi.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        }
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Bluetooth</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        {/* {
                                            phone1.thongTin.ketNoi.bluetooth.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        } */}
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        {/* {
                                            phone2.thongTin.ketNoi.bluetooth.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        } */}
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        {/* {
                                            phone3.thongTin.ketNoi.bluetooth.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        } */}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Cổng sạc</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone1.thongTin.ketNoi.congSac == undefined ? "( Đang cập nhật )" : phone1.thongTin.ketNoi.congSac}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone2.thongTin.ketNoi.congSac == undefined ? "( Đang cập nhật )" : phone2.thongTin.ketNoi.congSac}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{name3 !== undefined ? (phone3.thongTin.ketNoi.congSac == undefined ? "( Đang cập nhật )" : phone3.thongTin.ketNoi.congSac) : ""}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Jack tai nghe</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone1.thongTin.ketNoi.jackTaiNghe == undefined ? "( Đang cập nhật )" : phone1.thongTin.ketNoi.jackTaiNghe}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone2.thongTin.ketNoi.jackTaiNghe == undefined ? "( Đang cập nhật )" : phone2.thongTin.ketNoi.jackTaiNghe}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{name3 !== undefined ? (phone3.thongTin.ketNoi.jackTaiNghe == undefined ? "( Đang cập nhật )" : phone3.thongTin.ketNoi.jackTaiNghe) : ""}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Kết nối khác</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        {/* {
                                            phone1.thongTin.ketNoi.ketNoiKhac.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        } */}
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        {/* {
                                            phone2.thongTin.ketNoi.ketNoiKhac.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        } */}
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        {/* {
                                            phone3.thongTin.ketNoi.ketNoiKhac.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        } */}
                                    </Col>
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Row>
                <Row>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header> <FontAwesomeIcon icon={faBatteryThreeQuarters} style={{ paddingRight: 20 }} /> Pin & Sạc </Accordion.Header>
                            <Accordion.Body className='Compare-item-list'>
                                <Row>
                                    <Col>
                                        <p>Loại pin</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone1.thongTin.pinSac.loaiPin == undefined ? "( Đang cập nhật )" : phone1.thongTin.pinSac.loaiPin}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone2.thongTin.pinSac.loaiPin == undefined ? "( Đang cập nhật )" : phone2.thongTin.pinSac.loaiPin}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{name3 !== undefined ? (phone3.thongTin.pinSac.loaiPin == undefined ? "( Đang cập nhật )" : phone3.thongTin.pinSac.loaiPin) : ""}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Dung lượng pin</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone1.thongTin.pinSac.dungLuongPin == undefined ? "( Đang cập nhật )" : phone1.thongTin.pinSac.dungLuongPin}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone2.thongTin.pinSac.dungLuongPin == undefined ? "( Đang cập nhật )" : phone2.thongTin.pinSac.dungLuongPin}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{name3 !== undefined ? (phone3.thongTin.pinSac.dungLuongPin == undefined ? "( Đang cập nhật )" : phone3.thongTin.pinSac.dungLuongPin) : ""}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Hỗ trợ sạc tối đa</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone1.thongTin.pinSac.hoTroSacToiDa == undefined ? "( Đang cập nhật )" : phone1.thongTin.pinSac.hoTroSacToiDa}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone2.thongTin.pinSac.hoTroSacToiDa == undefined ? "( Đang cập nhật )" : phone2.thongTin.pinSac.hoTroSacToiDa}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{name3 !== undefined ? (phone3.thongTin.pinSac.hoTroSacToiDa == undefined ? "( Đang cập nhật )" : phone3.thongTin.pinSac.hoTroSacToiDa) : ""}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Công nghệ pin</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        {
                                            phone1.thongTin.pinSac.congNghePin.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        }
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        {
                                            phone2.thongTin.pinSac.congNghePin.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        }
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        {
                                            phone3.thongTin.pinSac.congNghePin.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        }
                                    </Col>
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Row>
                <Row>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header> <FontAwesomeIcon icon={faGears} style={{ paddingRight: 20 }} /> Tiện ích </Accordion.Header>
                            <Accordion.Body className='Compare-item-list'>
                                <Row>
                                    <Col>
                                        <p>Bảo mật nâng cao</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        {/* {
                                            phone1.thongTin.tienIch.baoMatNangCao.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        } */}
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        {/* {
                                            phone2.thongTin.tienIch.baoMatNangCao.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        } */}
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        {/* {
                                            phone3.thongTin.tienIch.baoMatNangCao.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        } */}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Tính năng đặc biệt</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        {/* {
                                            phone1.thongTin.tienIch.tinhNangDacBiet.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        } */}
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        {/* {
                                            phone2.thongTin.tienIch.tinhNangDacBiet.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        } */}
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        {/* {
                                            phone3.thongTin.tienIch.tinhNangDacBiet.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        } */}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Chống nước</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone1.thongTin.tienIch.khongGianNuocBui == undefined ? "( Đang cập nhật )" : phone1.thongTin.tienIch.khongGianNuocBui}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone2.thongTin.tienIch.khongGianNuocBui == undefined ? "( Đang cập nhật )" : phone2.thongTin.tienIch.khongGianNuocBui}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{name3 !== undefined ? (phone3.thongTin.tienIch.khongGianNuocBui == undefined ? "( Đang cập nhật )" : phone3.thongTin.tienIch.khongGianNuocBui) : ""}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Ghi âm</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        {/* {
                                            phone1.thongTin.tienIch.ghiAm.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        } */}
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        {/* {
                                            phone2.thongTin.tienIch.ghiAm.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        } */}
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        {/* {
                                            phone3.thongTin.tienIch.ghiAm.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        } */}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Xem phim</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        {/* {
                                            phone1.thongTin.tienIch.xemPhim.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        } */}
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        {/* {
                                            phone2.thongTin.tienIch.xemPhim.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        } */}
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        {/* {
                                            phone3.thongTin.tienIch.xemPhim.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        } */}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Nghe nhạc</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        {
                                            phone1.thongTin.tienIch.ngheNhac.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        }
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        {
                                            phone2.thongTin.tienIch.ngheNhac.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        }
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        {
                                            phone3.thongTin.tienIch.ngheNhac.map((item, index) => {
                                                return (
                                                    <p key={index}>{item}</p>
                                                )
                                            })
                                        }
                                    </Col>
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Row>
                <Row>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header> <FontAwesomeIcon icon={faCircleQuestion} style={{ paddingRight: 20 }} /> Thông tin chung </Accordion.Header>
                            <Accordion.Body className='Compare-item-list'>
                                <Row>
                                    <Col>
                                        <p>Thiết kế</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone1.thongTin.thongTinChung.thietKe == undefined ? "( Đang cập nhật )" : phone1.thongTin.thongTinChung.thietKe}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone2.thongTin.thongTinChung.thietKe == undefined ? "( Đang cập nhật )" : phone2.thongTin.thongTinChung.thietKe}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{name3 !== undefined ? (phone3.thongTin.thongTinChung.thietKe == undefined ? "( Đang cập nhật )" : phone3.thongTin.thongTinChung.thietKe) : ""}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Chất liệu</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone1.thongTin.thongTinChung.chatLieu == undefined ? "( Đang cập nhật )" : phone1.thongTin.thongTinChung.chatLieu}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone2.thongTin.thongTinChung.chatLieu == undefined ? "( Đang cập nhật )" : phone2.thongTin.thongTinChung.chatLieu}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{name3 !== undefined ? (phone3.thongTin.thongTinChung.chatLieu == undefined ? "( Đang cập nhật )" : phone3.thongTin.thongTinChung.chatLieu) : ""}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Kích thước & Trọng lượng</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone1.thongTin.thongTinChung.kichThuocTrongLuong == undefined ? "( Đang cập nhật )" : phone1.thongTin.thongTinChung.kichThuocTrongLuong}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone2.thongTin.thongTinChung.kichThuocTrongLuong == undefined ? "( Đang cập nhật )" : phone2.thongTin.thongTinChung.kichThuocTrongLuong}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{name3 !== undefined ? (phone3.thongTin.thongTinChung.kichThuocTrongLuong == undefined ? "( Đang cập nhật )" : phone3.thongTin.thongTinChung.kichThuocTrongLuong) : ""}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Thời điểm ra mắt</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone1.thongTin.thongTinChung.thoiDiemRaMat == undefined ? "( Đang cập nhật )" : phone1.thongTin.thongTinChung.thoiDiemRaMat}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone2.thongTin.thongTinChung.thoiDiemRaMat == undefined ? "( Đang cập nhật )" : phone2.thongTin.thongTinChung.thoiDiemRaMat}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{name3 !== undefined ? (phone3.thongTin.thongTinChung.thoiDiemRaMat == undefined ? "( Đang cập nhật )" : phone3.thongTin.thongTinChung.thoiDiemRaMat) : ""}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Hãng</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone1.thongTin.thongTinChung.hang == undefined ? "( Đang cập nhật )" : phone1.thongTin.thongTinChung.hang}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{phone2.thongTin.thongTinChung.hang == undefined ? "( Đang cập nhật )" : phone2.thongTin.thongTinChung.hang}</p>
                                    </Col>
                                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <p>{name3 !== undefined ? (phone3.thongTin.thongTinChung.hang == undefined ? "( Đang cập nhật )" : phone3.thongTin.thongTinChung.hang) : ""}</p>
                                    </Col>
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Row>
            </div>

        </>

    );
};

export default Compare;
