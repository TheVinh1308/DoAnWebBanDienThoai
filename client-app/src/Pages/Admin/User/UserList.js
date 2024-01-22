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
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    axios.get(`https://localhost:7015/api/Users`)
      .then((res) => {
        setUsers(res.data);
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
        <h4 className="page-title">User</h4>
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
                  <Link to="/admin/user-list/add-user-admin">
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
                          <th>Username</th>
                          <th>FullName</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Functional</th>
                        </tr>
                      </thead>
                      <tbody>
                      {users.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.userName}</td>
                              <td>{item.fullName}</td>
                              <td>{item.email}</td>
                              <td>{item.phoneNumber}</td>
                              
                              <td>
                               
                                <Link to={`edit-brand/${item.id}`}>
                                  <button className="btn btn-warning mr-1 ml-1">
                                    <i className="mdi mdi-wrench"></i>
                                  </button>
                                </Link>
                                
                              </td>
                            </tr>
                          ))}
                      </tbody>
                      <tfoot>
                        <tr>
                        <th>STT</th>
                          <th>Username</th>
                          <th>FullName</th>
                          <th>Email</th>
                          <th>Phone</th>
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

export default UserList;
