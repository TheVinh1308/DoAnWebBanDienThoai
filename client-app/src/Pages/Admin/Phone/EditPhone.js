import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import FooterAdmin from "../../../Components/Footer/FooterAdmin";
import HeaderAdmin from "../../../Components/Header/HeaderAdmin";
import SidebarAdmin from "../../../Components/Sidebar/SidebarAdmin";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const EditPhone = () => {
  const [phone, setPhone] = useState({modPhone: {}});
  const [modPhones, setModPhones] = useState([]);
  const {id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setPhone(prev => ({ ...prev, [name]: value }));
  }

  const handleSelect = (e) => {
    let name = e.target.name;
    let value = e.target.value
    setPhone(prev => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    axios.get(`https://localhost:7015/api/Phones/${id}`)
    .then(res => setPhone(res.data))
  },[id])

  useEffect(() => {
    axios.get(`https://localhost:7015/api/ModPhones`)
    .then(res => setModPhones(res.data))
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.put(`https://localhost:7015/api/Phones/${id}`, phone)
        .then(() => {
            navigate("/admin/phone-list");
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
                        <Link to="/admin">Home</Link>
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
                      <h4 className="card-title">Edit Phone</h4>
                      <div className="form-group row">
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
                            value={phone.name}
                         
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="lname"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                          SKU
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control"
                            name="sku"
                            onChange={handleChange}
                            value={phone.sku}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="lname"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                          ModPhone
                        </label>
                        <div className="col-sm-9">
                        <Form.Select name="modPhoneId" onChange={handleSelect} >
                            <option value={phone.modPhone.id} name="modPhoneId">{phone.modPhone.name}</option>
                            {modPhones.map(modPhones => (
                            <option key={modPhones.id} value={modPhones.id}>{modPhones.name}</option>
                            ))}
                          </Form.Select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="email1"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                          Price
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="number"
                            className="form-control"
                            name="price"
                            onChange={handleChange}
                            value={phone.price}
                           
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="cono1"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                          Stock
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="number"
                            className="form-control"
                            name="stock"
                            onChange={handleChange}
                            value={phone.stock}
                           
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="cono1"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                          Color
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control"
                            name="color"
                            onChange={handleChange}
                            value={phone.color}
                           
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="cono1"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                          Rom
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="number"
                            className="form-control"
                            name="rom"
                            onChange={handleChange}
                            value={phone.rom}
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

export default EditPhone;
