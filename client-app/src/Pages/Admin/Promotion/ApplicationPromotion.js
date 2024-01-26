import { useEffect, useState } from "react";
import FooterAdmin from "../../../Components/Footer/FooterAdmin";
import HeaderAdmin from "../../../Components/Header/HeaderAdmin";
import SidebarAdmin from "../../../Components/Sidebar/SidebarAdmin";
import axios from "axios";
import { Form } from "react-bootstrap";
import axiosClient from "../../../Components/axiosClient";
import { useNavigate } from "react-router-dom";
import { data } from "isotope-layout";

const ApplicationPromotion = () => {
    const navigate = useNavigate();
    const [modPhones, setModPhones] = useState([]);
    const [promotion, setPromotion] = useState([]);
    const [editModPhones, setEditModPhones] = useState({});
    const [inforModPhones, setInforModPhones] = useState({ brand: { name: "" } });
    const [brands, setBrands] = useState([]);
    const [image, setImage] = useState();
    const [date, setDate] = useState(0);
    const [promotionDetail, setPromotionDetail] = useState({});
    useEffect(() => {
        axios.get(`https://localhost:7015/api/ModPhones`)
            .then((res) => {
                setModPhones(res.data);
            });
    }, []);
    useEffect(() => {
        if (editModPhones.modPhoneId == undefined) {

        }
        else {
            axios.get(`https://localhost:7015/api/Brands`).then((res) => {
                setBrands(res.data)
            })
        }
    }, [editModPhones.modPhoneId])
    useEffect(() => {
        if (editModPhones.modPhoneId == undefined) {

        }
        else {
            axios.get(`https://localhost:7015/api/ModPhones/${editModPhones.modPhoneId}`)
                .then((res) => {
                    setInforModPhones(res.data);
                });
        }

    }, [editModPhones.modPhoneId]);
    console.log(`inforModPhones`, inforModPhones);
    useEffect(() => {
        axios.get(`https://localhost:7015/api/Promotions`)
            .then((res) => {
                setPromotion(res.data);
            });
    }, []);
    const handleSelect = (e) => {
        let name = e.target.name;
        let value = e.target.value
        if (name === 'promotionId') {
            value = parseInt(value, 10);
        }
        setEditModPhones(prev => ({ ...prev, [name]: value }));
    }

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setEditModPhones(prev => ({ ...prev, [name]: value }));
    }

    const handleCheck = (e) => {
        let name = e.target.name;
        let value = e.target.checked
        setEditModPhones(prev => ({ ...prev, [name]: value }));
    }
    console.log(`promotion`, promotion);

    const handleChangeDate = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setDate(prev => ({ ...prev, [name]: value }));
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setImage(file)
        setEditModPhones(prev => ({ ...prev, ImageFile: e.target.files[0] }));
    }
    console.log(`editModPhones`, editModPhones);



    useEffect(() => {
        if (editModPhones.promotionId == undefined) {

        }
        else {
            axios.get(`https://localhost:7015/api/Promotions/${editModPhones.promotionId}`)
                .then(res => setPromotionDetail(res.data))
        }
    }, [editModPhones.promotionId])
    console.log(`promotionDetail`, date);
    const handleSubmit = (e) => {
        e.preventDefault();

        // Sử dụng FormData để xử lý dữ liệu và tệp tin
        const formData = new FormData();
        Object.entries(inforModPhones).forEach(([key, value]) => {
            formData.append(key, value);
            formData.append("promotionId", editModPhones.promotionId);
        });

        const ngayGiam = {
            Id: promotionDetail.id,
            Content: promotionDetail.content,
            DatePromotion: date.datePromotion,
            DiscountPercent: promotionDetail.discountPercent,
            Status: promotionDetail.status
        }


        axios.put(`https://localhost:7015/api/ModPhones/${parseInt(editModPhones.modPhoneId, 10)}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Header quan trọng khi sử dụng FormData
            },
        })
            .then(() => {
                if (editModPhones.promotionId == undefined) {

                }
                else {
                    axios.put(`https://localhost:7015/api/Promotions/${editModPhones.promotionId}`, ngayGiam)
                        .then(() => {
                            navigate("/admin/promotion-list");
                        })
                }

            })
            .catch(() => {
                alert("Sửa thất bại");
            });
    }


    return (
        <>
            <div id="main-wrapper">
                <HeaderAdmin />
                <SidebarAdmin />
                <div className="page-wrapper">
                    <div className="page-breadcrumb">
                        <div className="row">
                            <div className="col-12 d-flex no-block align-items-center">
                                <h4 className="page-title">Form Basic</h4>
                                <div className="ml-auto text-right">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                <a href="#">Home</a>
                                            </li>
                                            <li
                                                className="breadcrumb-item active"
                                                aria-current="page"
                                            >
                                                Library
                                            </li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-9">
                                <div className="card">
                                    <form className="form-horizontal" onSubmit={handleSubmit}>
                                        <input name="id" type="hidden" onChange={handleChange} value={inforModPhones.id} />
                                        <div className="card-body">
                                            <h4 className="card-title">ÁP DỤNG MÃ GIẢM GIÁ</h4>
                                            <div className="form-group row">
                                                <label
                                                    htmlFor="fname"
                                                    className="col-sm-3 text-right control-label col-form-label"
                                                >
                                                    Danh sách điện thoại
                                                </label>
                                                <div className="col-sm-9">
                                                    <Form.Select name="modPhoneId" onChange={handleSelect}>
                                                        <option name="modPhoneId">---Chọn điện thoại---</option>

                                                        {
                                                            modPhones.filter(item => item !== null)
                                                                .map((item, index) => (
                                                                    <option key={index} value={item.id || 'default'}>{item.name}</option>
                                                                ))}

                                                    </Form.Select>

                                                </div>
                                            </div>


                                            <div className="form-group row" style={{ display: "none" }} >
                                                <label
                                                    htmlFor="lname"
                                                    className="col-sm-3 text-right control-label col-form-label"
                                                >
                                                    Description
                                                </label>
                                                <div className="col-sm-9">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="description"
                                                        onChange={handleChange}
                                                        value={inforModPhones.description}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row" style={{ display: "none" }} >
                                                <label
                                                    htmlFor="lname"
                                                    className="col-sm-3 text-right control-label col-form-label"
                                                >
                                                    OS
                                                </label>
                                                <div className="col-sm-9">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="description"
                                                        onChange={handleChange}
                                                        value={inforModPhones.os}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row" style={{ display: "none" }}>
                                                <label
                                                    htmlFor="email1"
                                                    className="col-sm-3 text-right control-label col-form-label"
                                                >
                                                    Ram
                                                </label>
                                                <div className="col-sm-9">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="ram"
                                                        onChange={handleChange}
                                                        value={inforModPhones.ram}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row" style={{ display: "none" }} >
                                                <label
                                                    htmlFor="cono1"
                                                    className="col-sm-3 text-right control-label col-form-label"
                                                >
                                                    Brand
                                                </label>
                                                <div className="col-sm-9">
                                                    <Form.Select name="brandId" onChange={handleSelect}>
                                                        <option value={inforModPhones.brand.id} name="brandId">{inforModPhones.brand.name}</option>
                                                        {brands.map(brand => (
                                                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                                                        ))}

                                                    </Form.Select>

                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label
                                                    htmlFor="fname"
                                                    className="col-sm-3 text-right control-label col-form-label"
                                                >
                                                    Danh sách giảm giá
                                                </label>
                                                <div className="col-sm-9">
                                                    <Form.Select name="promotionId" onChange={handleSelect}>
                                                        <option name="promotionId">---Chọn loại giảm giá---</option>

                                                        {
                                                            promotion.filter(item => item !== null)
                                                                .map((item, index) => (
                                                                    <option key={index} value={item.id || 'default'}>{item.content}</option>
                                                                ))}

                                                    </Form.Select>

                                                </div>
                                            </div>
                                            <div className="form-group row" >
                                                <label
                                                    htmlFor="cono1"
                                                    className="col-sm-3 text-right control-label col-form-label"
                                                >
                                                    Số ngày giảm giá
                                                </label>
                                                <div className="col-sm-9">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="datePromotion"
                                                        onChange={handleChangeDate}
                                                    />

                                                </div>
                                            </div>
                                            <div className="form-group row" style={{ display: "none" }} >
                                                <label
                                                    htmlFor="lname"
                                                    className="col-sm-3 text-right control-label col-form-label"
                                                >
                                                    ScreenSize(inch)
                                                </label>
                                                <div className="col-sm-9">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="screenSize"
                                                        onChange={handleChange}
                                                        value={inforModPhones.screenSize}
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group row" style={{ display: "none" }} >
                                                <label
                                                    htmlFor="lname"
                                                    className="col-sm-3 text-right control-label col-form-label"
                                                >
                                                    promotionId
                                                </label>
                                                <div className="col-sm-9">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="promotionId"
                                                        onChange={handleChange}
                                                        value={editModPhones.promotionId}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row" style={{ display: "none" }} >
                                                <label
                                                    htmlFor="cono1"
                                                    className="col-sm-3 text-right control-label col-form-label"
                                                >
                                                    CPU
                                                </label>
                                                <div className="col-sm-9">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="cpu"
                                                        onChange={handleChange}
                                                        value={inforModPhones.cpu}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row" style={{ display: "none" }}>
                                                <label
                                                    htmlFor="cono1"
                                                    className="col-sm-3 text-right control-label col-form-label"
                                                >
                                                    Battery
                                                </label>
                                                <div className="col-sm-9">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="battery"
                                                        onChange={handleChange}
                                                        value={inforModPhones.battery}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row" style={{ display: "none" }} >
                                                <label
                                                    htmlFor="cono1"
                                                    className="col-sm-3 text-right control-label col-form-label"
                                                >
                                                    Image
                                                </label>
                                                <div className="col-sm-9">
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        name="ImageFile"
                                                        onChange={handleImageChange}
                                                    />
                                                    {
                                                        image ? (
                                                            <img src={image.preview} alt="" width="500px" />
                                                        ) : <img src={`https://localhost:7015/images/products/${inforModPhones.image}`} style={{ width: 250 }} alt="" />
                                                    }

                                                </div>
                                            </div>

                                            <div className="form-group row" style={{ display: "none" }} >
                                                <label
                                                    htmlFor="fname"
                                                    className="col-sm-3 text-right control-label col-form-label"
                                                >
                                                    Name
                                                </label>
                                                <div className="col-sm-9">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="name"
                                                        onChange={handleChange}
                                                        value={inforModPhones.name}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row" style={{ display: "none" }} >
                                                <label
                                                    htmlFor="cono1"
                                                    className="col-sm-3 text-right control-label col-form-label"
                                                >
                                                    Status
                                                </label>
                                                <div className="col-sm-9 mt-2">
                                                    <Form.Check
                                                        type="switch"
                                                        id="status"
                                                        name="status"
                                                        onChange={handleCheck}
                                                        checked={inforModPhones.status}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border-top">
                                            <div className="card-body">
                                                <button type="submit" className="btn btn-primary">
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FooterAdmin />
        </>
    );
}

export default ApplicationPromotion;














