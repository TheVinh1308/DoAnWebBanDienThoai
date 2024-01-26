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
const PromotionList = () => {
  const [promotions, setPromotions] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    axios.get(`https://localhost:7015/api/Promotions`)
      .then((res) => {
        setPromotions(res.data);
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
      axios.delete(`https://localhost:7015/api/Promotions/${id}`,)
        .then(() => {
          setPromotions(promotions.filter(item => item.id !== id));
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
              <h4 className="page-title">Promotion</h4>
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
                  <Link to="/admin/promotion-list/add-promotion">
                    <button className="btn btn-success mb-2">
                      <i className="mdi mdi-plus"></i>
                    </button>
                  </Link>
                  <Link to="/admin/promotion-list/application-promotion">
                    <button className="btn btn-success mb-2" style={{ marginLeft: 20 }}>
                      Áp dụng
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
                          <th>Tên giảm giá</th>
                          <th>Phần trăm giảm</th>
                          <th>ngày giảm giá</th>
                          <th>Chức năng</th>

                        </tr>
                      </thead>
                      <tbody>
                        {promotions.map((item, index) => (
                          <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.content}</td>
                            <td>{item.discountPercent}%</td>
                            <td>{item.datePromotion}</td>
                            <td>
                              <button className="btn btn-cyan">
                                <i className="mdi mdi-information"></i>
                              </button>
                              <Link to={`edit-promotion/${item.id}`}>
                                <button className="btn btn-success mr-1 ml-1">
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

                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ============================================================== */}
        {/* End Container fluid  */}
        {/* ============================================================== */}
        {/* ============================================================== */}
        {/* footer */}
        {/* ============================================================== */}
        {/* ============================================================== */}
        {/* End footer */}
        {/* ============================================================== */}
      </div>

      <FooterAdmin />
    </div>
  );
};

export default PromotionList;
