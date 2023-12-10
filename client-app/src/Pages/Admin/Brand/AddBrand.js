import { Form } from "react-bootstrap";
import FooterAdmin from "../../../Components/Footer/FooterAdmin";
import HeaderAdmin from "../../../Components/Header/HeaderAdmin";
import SidebarAdmin from "../../../Components/Sidebar/SidebarAdmin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddBrand = () => {
  const [brand, setBrand] = useState({ status: true, LogoFile: null });
  const navigate = useNavigate();

  const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setBrand(prev => ({ ...prev, [name]: value }));
  }

  const handleCheck = (e) => {
        let name = e.target.name;
        let value = e.target.checked
        setBrand(prev => ({ ...prev, [name]: value }));
  }

  const handleImageChange = (e) => {
    setBrand(prev => ({ ...prev, LogoFile:e.target.files[0] }));
}

const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData();
  Object.entries(brand).forEach(([key, value]) => {
      formData.append(key, value);
  });

  axios.post(`https://localhost:7015/api/Brands`, formData, {
      headers: {
          'Content-Type': 'multipart/form-data', // Header quan trọng khi sử dụng FormData
      },
  })
      .then(() => {
          navigate("/admin/brand-list");
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
                        <a>Home</a>
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
              <div className="col-md-6">
                <div className="card">
                  <form className="form-horizontal" onSubmit={handleSubmit}>
                    <div className="card-body">
                      <h4 className="card-title">ADD BRAND</h4>
                      <div className="form-group row">
                        <label
                          htmlFor="name"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                          Name
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="logo"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                          Logo
                        </label>
                        <div className="col-sm-9">
                        <input type="file" name="LogoFile" onChange={handleImageChange} />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="status"
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
};

export default AddBrand;
