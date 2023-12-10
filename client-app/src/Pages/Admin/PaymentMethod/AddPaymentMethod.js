import { useState } from "react";
import FooterAdmin from "../../../Components/Footer/FooterAdmin";
import HeaderAdmin from "../../../Components/Header/HeaderAdmin";
import SidebarAdmin from "../../../Components/Sidebar/SidebarAdmin";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
const AddPaymentMethod = () => {
  const [paymentMethod, setPaymentMethods] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      setPaymentMethods(prev => ({ ...prev, [name]: value }));
  }

  const handleCheck = (e) => {
      let name = e.target.name;
      let value = e.target.checked
      setPaymentMethods(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      axios.post(`https://localhost:7015/api/PaymentMethods`, paymentMethod)
          .then(() => {
              navigate("/admin/payment-method-list");
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
              <div className="col-md-6">
                <div className="card">
                <form className="form-horizontal" onSubmit={handleSubmit}>
                    <div className="card-body">
                      <h4 className="card-title">ADD PAYMENT METHOD</h4>
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

export default AddPaymentMethod;
