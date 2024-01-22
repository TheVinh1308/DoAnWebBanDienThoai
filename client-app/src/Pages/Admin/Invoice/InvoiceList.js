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
const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

   const [invoiceDetails, setInvoiceDetails] = useState([]);
  const handleClose = () => setShow(false); 
  const [show,setShow] = useState(false);
  const [selectedInvoice,setSelectedInvoice] = useState({user: {}});
  const handleShow = (id) => {
      setSelectedInvoice(invoices.find(a => a.id === id))
      setShow(true);
    }


  useEffect(() => {
    axios.get(`https://localhost:7015/api/Invoices`)
      .then((res) => {
        setInvoices(res.data);
        setDataLoaded(true);
      });
  }, []);

  console.log(invoiceDetails);

  useEffect(() => {
    if(show){
      axios.get(`https://localhost:7015/api/InvoiceDetails/GetInvoiceDetailForInvoice/${selectedInvoice.id}`)
        .then((res) => {
          setInvoiceDetails(res.data)
        })
      }
    },[selectedInvoice])



    useEffect(() => {
      if (dataLoaded) {
        const dateTotalMap = {}; // Đối tượng để theo dõi tổng tiền theo ngày
        let overallTotal = 0; // Biến để lưu tổng tiền của tất cả các ngày
    
        invoices.forEach((invoiceDetail) => {
          const date = invoiceDetail.issuedDate;
          const total = parseFloat(invoiceDetail.total);
    
          // Nếu ngày đã tồn tại, cộng tổng tiền vào
          if (dateTotalMap[date]) {
            dateTotalMap[date] += total;
          } else {
            // Nếu ngày chưa tồn tại, tạo mới và gán tổng tiền
            dateTotalMap[date] = total;
          }
    
          // Cộng tổng tiền vào biến overallTotal
          overallTotal += total;
        });
    
        const customData = Object.entries(dateTotalMap).map(([date, total]) => ({
          date,
          total: total.toFixed(2), // Format lại số tiền với hai số thập phân
        }));
    
        const table = $('#example').DataTable({
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
              exportOptions: {
                columns: [0, 1,2,3], 
              },
            },
            {
              extend: 'pdf',
              className: 'btn bg-danger text-white',
              title: "",
              filename: function () {
                return 'data_' + Date.now();
              },
              customize: function (doc) {
               
                // Thêm tiêu đề tùy chỉnh vào PDF
                doc.content.unshift({
                  text: 'Danh sách hóa đơn và doanh thu',
                  fontSize: 16,
                  alignment: 'center',
                  margin: [0, 0, 0, 10],
                });
    
                // Thêm dữ liệu hóa đơn vào PDF
                doc.content.push({
                  table: {
                    headerRows: 1,
                    widths: ['auto', 'auto'], // Độ rộng của cột
                    body: [
                      ['Ngày', 'Tổng tiền'],
                      // Lặp qua danh sách hóa đơn để thêm vào PDF
                      ...customData.map(({ date, total }) => [date, total]),
                      // Thêm dòng tổng tiền của tất cả các ngày
                      ['Tổng cộng', overallTotal.toFixed(2)],
                    ],
                  },
                  layout: 'lightHorizontalLines', // Kiểu đường line giữa các ô
                });
                // Cài đặt thông tin tài liệu PDF
                doc.info = {
                  title: 'Danh sách hóa đơn',
                  subject: 'Danh sách hóa đơn',
                  creator: 'Your App Name',
                };
              },
              exportOptions: {
                columns: [0, 1,2,3], 
              },
            },
          ],
        });
      }
    }, [dataLoaded, invoiceDetails]);
    
    
  return (
    
    <div id="main-wrapper">
        <HeaderAdmin />
        <SidebarAdmin />
        <div className="page-wrapper">
  <div className="page-breadcrumb">
    <div className="row">
      <div className="col-12 d-flex no-block align-items-center">
        <h4 className="page-title">Invoice</h4>
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
                  <Link to="/admin/brand-list/add-brand">
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
                          <th>ShippingAdress</th>
                          <th>ShippingPHone</th>
                          <th>Total</th>
                          <th>PaymentMethod</th>
                          <th>Status</th>
                          <th>Functional</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                      {invoices.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.shippingAddress}</td>
                              <td>{item.shippingPhone}</td>
                              <td>{item.total}</td>
                              <td>{item.paymentMethodId}</td>
                              <td>
                              <Form.Group>
                                  <Form.Check type="switch" name="status"  checked={item.status} />
                              </Form.Group>
                              </td>
                              
                              <td>
                                <button className="btn btn-success" onClick={() => handleShow(item.id)} >
                                  <i className="mdi mdi-information"></i>
                                </button>
                                <Link to={`edit-brand/${item.id}`}>
                                  <button className="btn btn-warning mr-1 ml-1">
                                    <i className="mdi mdi-wrench"></i>
                                  </button>
                                </Link>
                                <button className="btn btn-danger" >
                                  <i className="mdi mdi-delete"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
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
                        <Modal.Title>Chi tiết hóa đơn</Modal.Title>
                    </Modal.Header> 
                    <Modal.Body>
                    <Row>
                     
                        <Col   md={4}>
                            <dl>
                                <dt>Code: </dt>
                                <dd>{selectedInvoice.code}</dd>

                                <dt>User: </dt>
                                <dd>{selectedInvoice.user.fullName}</dd>

                                <dt>IssuedDate: </dt>
                                <dd>{selectedInvoice.issuedDate}</dd>

                                <dt>ShippingAddress: </dt>
                                <dd>{selectedInvoice.shippingAddress}</dd>

                                <dt>ShippingAddress: </dt>
                                <dd>{selectedInvoice.shippingPhone}</dd>
                            </dl>
                        </Col>
                        <Col md={4}>
                              {
                                  invoiceDetails.map((item,index) => {
                                    return (
                                      <dl key={index}>
                                        <dt>PhoneName: </dt>
                                        <dd className="text-danger">{item.phone.name}</dd>

                                        <dt>Quantity: </dt>
                                        <dd>{item.quantity}</dd>

                                        <dt>Price: </dt>
                                        <dd>{item.unitPrice}</dd>
                                      </dl>
      
                                    )
                                  })
                                }
                        </Col>
                        <Col   md={4}>
                            <dl>
                                
                                <dt>Total: </dt>
                                <dd>{selectedInvoice.total}</dd>

                                <dt>PaymentMethod: </dt>
                                <dd>{selectedInvoice.paymentMethodId}</dd>

                                <dt>Status:</dt>
                                <dd>
                                <Form.Group>
                                  <Form.Check type="switch" name="status"  checked={selectedInvoice.status} />
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

export default InvoiceList;
