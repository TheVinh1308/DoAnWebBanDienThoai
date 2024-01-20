import { useEffect, useState } from "react";
import FooterAdmin from "../../../Components/Footer/FooterAdmin";
import HeaderAdmin from "../../../Components/Header/HeaderAdmin";
import SidebarAdmin from "../../../Components/Sidebar/SidebarAdmin";
import { Link } from "react-router-dom";
import $ from "jquery"
import 'pdfmake';
import "datatables.net-bs5";
import "datatables.net-buttons-bs5"
import "datatables.net-buttons/js/buttons.html5.mjs"
import axios from "axios";
import { Col, Form, Modal, Row } from "react-bootstrap";
const SlideShowList = () => {
  const [slideShows, setSlideShow] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const handleClose = () => setShow(false); 
  const [show,setShow] = useState(false);
  const [selectedSlide,setSelectedSlide] = useState({modPhone: {}});

  const handleShow = (id) => {
    setSelectedSlide(slideShows.find(a => a.id === id))
    setShow(true);
  }

  useEffect(() => {
    axios.get(`https://localhost:7015/api/SlideShows`)
      .then((res) => {
        setSlideShow(res.data);
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
        axios.delete(`https://localhost:7015/api/SlideShows/${id}`,)
            .then(() => {
                setSlideShow(slideShows.filter(item => item.id !== id));
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
  <div className="page-breadcrumb">
    <div className="row">
      <div className="col-12 d-flex no-block align-items-center">
        <h4 className="page-title">SlideShow</h4>
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
                  <Link to="/admin/slide-show-list/add-slide-show">
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
                          <th>ModPhone</th>
                          <th>Image</th>
                          <th>Status</th>
                          <th>Functional</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                          slideShows.map((item,index) => (
                            <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.modPhone.name}</td>
                            <td>
                                <img src={`https://localhost:7015/images/slideshows/${item.path }`} style={{width: 100}} alt=""/>
                            </td>
                            <td>
                            <Form.Group>
                                  <Form.Check type="switch" name="status"  checked={item.status} />
                              </Form.Group>
                            </td>
                            <td>
                              <button className="btn btn-success" onClick={() => handleShow(item.id)}>
                                  <i className="mdi mdi-information"></i>
                              </button>
                              <Link to={`edit-slide-show/${item.id}`}>
                                  <button className="btn btn-warning mr-1 ml-1">
                                    <i className="mdi mdi-wrench"></i>
                                  </button>
                                </Link>
                              <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                                  <i className="mdi mdi-delete"></i>
                              </button>
                            </td>
                          </tr>
                          ))
                      }
                        
                      </tbody>
                     
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
                        <Modal.Title>Thông tin SlideShow</Modal.Title>
                    </Modal.Header> 
                    <Modal.Body>
                    <Row>
                        <Col   md={6}>
                            <dl>

                                <dt>Name:</dt>
                                <dd>{selectedSlide.modPhone.name}</dd>

                                <dt>Logo:</dt>
                                <dd>
                                <img src={`https://localhost:7015/images/slideshows/${selectedSlide.path }`} style={{width: 500}} alt=""/>
                                </dd>

                                <dt>Status:</dt>
                                <dd>
                                <Form.Group>
                                  <Form.Check type="switch" name="status"  checked={selectedSlide.status} />
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
  );
};

export default SlideShowList;
