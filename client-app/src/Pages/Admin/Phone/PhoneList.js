import { useEffect, useState } from "react";
import FooterAdmin from "../../../Components/Footer/FooterAdmin";
import HeaderAdmin from "../../../Components/Header/HeaderAdmin";
import SidebarAdmin from "../../../Components/Sidebar/SidebarAdmin";
import { Form, Link } from "react-router-dom";
import $ from "jquery"
import 'pdfmake';
import "datatables.net-bs5";
import "datatables.net-buttons-bs5"
import "datatables.net-buttons/js/buttons.html5.mjs"
import axios from "axios";
import { Col, Modal, Row } from "react-bootstrap";
const PhoneList = () => {

  const [phones, setPhones] = useState([{modPhone: {}}]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [image, setImage] = useState({path: []});
  const handleClose = () => setShow(false); 
  const [show,setShow] = useState(false);
  const [selectedPhone,setSelectedPhone] = useState({modPhone: {},image: {}});
  const handleShow = (id) => {
      setSelectedPhone(phones.find(a => a.id === id))
      setShow(true);
    }

    useEffect(() => {
      if(show){
        axios.get(`https://localhost:7015/api/Images/${selectedPhone.id}`)
          .then((res) => {
             setImage(JSON.parse(res.data.path))
          })
          .catch(() => {
            alert("Chưa có hình ảnh của sản phẩm")
          })
        }
      },[selectedPhone])
      console.log(image);
   useEffect(() => {
    axios.get(`https://localhost:7015/api/Phones`)
      .then((res) => {
        setPhones(res.data);
        setDataLoaded(true);
      });
  }, []);
  console.log(phones);


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
            className: 'btn bg-primary text-white',
          },
          {
            extend: 'csv',
            className: 'btn bg-secondary text-white',
          },
          {
            extend: 'excel',
            className: 'btn bg-success text-white',
            filename: function () {
              return 'data_' + Date.now();
            },
          },
          {
            extend: 'pdf',
            className: 'btn bg-danger text-white',
            filename: function () {
              return 'data_' + Date.now();
            },
          },
        ],
      });
    }
  }, [dataLoaded]);

  
  const handleDelete = (id) => {
    const shouldDelete = window.confirm("Bạn có chắc chắn muốn điện thoại này?");
    if (shouldDelete) {
        axios.delete(`https://localhost:7015/api/Phones/${id}`,)
            .then(() => {
                setPhones(phones.filter(item => item.id !== id));
                // window.location.reload();
               
            })
            .catch(error => {
                console.error("Lỗi xóa: ", error);
            });
    }
}
  return (
    
    <div id="main-wrapper">
        <HeaderAdmin />
        <SidebarAdmin />
        <div className="page-wrapper">
  {/* ============================================================== */}
  {/* Bread crumb and right sidebar toggle */}
  {/* ============================================================== */}
  <div className="page-breadcrumb">
    <div className="row">
      <div className="col-12 d-flex no-block align-items-center">
        <h4 className="page-title">Phone</h4>
        <div className="ml-auto text-right">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Library</li>
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
                  <Link to="/admin/phone-list/add-phone">
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
                          <th>SKU</th>
                          <th>ModPhone</th>
                          <th>Price</th>
                          <th>Stock</th>
                          <th>Functional</th>
                        </tr>
                      </thead>
                      <tbody>
                      {phones.filter(item => item !== null).map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.sku}</td>
                              <td>{item.modPhone.name}</td>
                              <td>{(item.price)}</td>
                              <td>{item.stock}</td>
                              
                              <td>
                                <button className="btn btn-success" onClick={() => handleShow(item.id)}>
                                  <i className="mdi mdi-information"></i>
                                </button>
                                <Link to={`edit-phone/${item.id}`}>
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
                          <th>SKU</th>
                          <th>ModPhone</th>
                          <th>Price</th>
                          <th>Stock</th>
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
                        <Col   md={4}>
                           

                            <img src={`https://localhost:7015/images/products/${image[0] }`} style={{width: 250}} alt=""/> 
                             
                        </Col>
                        <Col   md={4}>
                            <dl>
                                <dt>Name: </dt>
                                <dd>{selectedPhone.name}</dd>

                                <dt>SKU: </dt>
                                <dd>{selectedPhone.sku} inches</dd>

                                <dt>ModPhone: </dt>
                                <dd>{selectedPhone.modPhone.name} GB</dd>

                                <dt>Price: </dt>
                                <dd>{selectedPhone.price}</dd>

                            </dl>
                        </Col>
                        <Col   md={4}>
                            <dl>
                                <dt>Stock: </dt>
                                <dd>{selectedPhone.stock}</dd>

                                <dt>Color: </dt>
                                <dd>{selectedPhone.color}</dd>

                                <dt>Rom: </dt>
                                <dd>{selectedPhone.rom}</dd>

                               
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
  );
};

export default PhoneList;
