import axios from "axios";
import { useEffect, useState } from "react";
import FooterAdmin from "../../../Components/Footer/FooterAdmin";
import HeaderAdmin from "../../../Components/Header/HeaderAdmin";
import SidebarAdmin from "../../../Components/Sidebar/SidebarAdmin";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import "pdfmake";
import "datatables.net-bs5";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.html5.mjs";
import { Col, Form, Modal, Row } from "react-bootstrap";
const PaymentMethodList = () => {
  const [paymentMethod, setPaymentMethods] = useState([{status: true}]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const handleClose = () => setShow(false); 
  const [show,setShow] = useState(false);
  const [selectedPaymentMethod,setSelectedPaymentMethod] = useState({});
  const handleShow = (id) => {
      setSelectedPaymentMethod(paymentMethod.find(a => a.id === id))
      setShow(true);
  }
  useEffect(() => {
    axios.get(`https://localhost:7015/api/PaymentMethods`)
      .then((res) => {
        setPaymentMethods(res.data);
        setDataLoaded(true);
      });
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      $('#example').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        autoWidth: true,
        paging: [{
          className: 'p-0',
        }],
        buttons: [
          {
            extend: 'copy',
            className: 'btn bg-primary',
          },
          {
            extend: 'csv',
            className: 'btn bg-secondary',
          },
          {
            extend: 'excel',
            className: 'btn bg-success',
            filename: function () {
              return 'data_' + Date.now();
            },
          },
          {
            extend: 'pdf',
            className: 'btn bg-danger',
            filename: function () {
              return 'data_' + Date.now();
            },
          },
        ],
      });
    }
  }, [dataLoaded]);

  const handleDelete = (id) => {
    const shouldDelete = window.confirm("Bạn có chắc chắn muốn brand này?");
    if (shouldDelete) {
        axios.delete(`https://localhost:7015/api/PaymentMethods/${id}`,)
            .then(() => {
              setPaymentMethods(paymentMethod.filter(item => item.id !== id));
                // window.location.reload();

               
            })
            .catch(error => {
                console.error("Lỗi xóa: ", error);
            });
    }
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
                <h4 className="page-title">PaymentMethod</h4>
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
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <Link to="/admin/payment-method-list/add-payment-method">
                      <button className="btn btn-success mb-2">
                        <i className="mdi mdi-plus"></i>
                      </button>
                    </Link>

                    <div className="table">
                      <table
                        id="example"
                        className="display nowrap"
                        style={{ width: "100%" }}
                      >
                        <thead>
                          <tr>
                            <th>STT</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Functional</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paymentMethod.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>
                              <Form.Group>
                                  <Form.Check type="switch" name="status"  checked={item.status} />
                              </Form.Group>
                              </td>
                              
                              <td>
                                <button className="btn btn-success" onClick={() => handleShow(item.id)}>
                                  <i className="mdi mdi-information"></i>
                                </button>
                                <Link to={`edit-payment-method/${item.id}`}>
                                  <button className="btn btn-warning mr-1 ml-1">
                                    <i className="mdi mdi-wrench"></i>
                                  </button>
                                </Link>
                                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                                  <i className="mdi mdi-delete"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                          <th>STT</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Functional</th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FooterAdmin />

        <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Thông tin brand</Modal.Title>
                    </Modal.Header> 
                    <Modal.Body>
                    <Row>
                        <Col   md={6}>
                            <dl>

                                <dt>Name:</dt>
                                <dd>{selectedPaymentMethod.name}</dd>

                                <dt>Status:</dt>
                                <dd>
                                <Form.Group>
                                  <Form.Check type="switch" name="status"  checked={selectedPaymentMethod.status} />
                                </Form.Group>
                                </dd>


                            </dl>
                        </Col>
               
                    </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <button variant="secondary" onClick={handleClose}>
                         Close
                     </button>
                    </Modal.Footer>
                </Modal>
      </div>
    </>
  );
};

export default PaymentMethodList;
