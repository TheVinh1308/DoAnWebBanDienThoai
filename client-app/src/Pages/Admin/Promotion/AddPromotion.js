import axios from "axios";
import FooterAdmin from "../../../Components/Footer/FooterAdmin";
import HeaderAdmin from "../../../Components/Header/HeaderAdmin";
import SidebarAdmin from "../../../Components/Sidebar/SidebarAdmin";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddPromotion = () => {
  const [promotion, setPromotion] = useState({ status: true });
  const navigate = useNavigate();
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setPromotion(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`https://localhost:7015/api/Promotions`, promotion)
      .then(() => {
        navigate("/admin/promotion-list");
      })
      .catch(() => {
        alert("Thêm thất bại")
      })
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
                    <div className="card-body">
                      <h4 className="card-title">Thông tin giảm giá</h4>
                      <div className="form-group row">
                        <label
                          htmlFor="fname"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                          Tên giảm giá
                        </label>
                        <div className="col-sm-9">
                          <input
                            onChange={handleChange}
                            type="text"
                            className="form-control"
                            id="fname"
                            placeholder="Tên loại giảm giá"
                            name="content"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="fname"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                          Phần trăm giảm giá
                        </label>
                        <div className="col-sm-9">
                          <input
                            onChange={handleChange}
                            type="number"
                            className="form-control"
                            id="fname"
                            placeholder="Phần trăm giảm giá"
                            name="discountpercent"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="fname"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                          số ngày giảm giá
                        </label>
                        <div className="col-sm-9">
                          <input
                            onChange={handleChange}
                            type="number"
                            className="form-control"
                            id="fname"
                            placeholder="Số ngày áp dụng giảm giá"
                            name="datepromotion"
                          />
                        </div>
                      </div>



                    </div>
                    <div className="border-top">
                      <div className="card-body">
                        <button type="submit" className="btn btn-primary" >
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
};

export default AddPromotion;
