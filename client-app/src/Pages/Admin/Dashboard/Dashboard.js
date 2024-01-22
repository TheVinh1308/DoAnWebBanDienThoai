import { useEffect, useState } from "react";
import FooterAdmin from "../../../Components/Footer/FooterAdmin";
import HeaderAdmin from "../../../Components/Header/HeaderAdmin";
import SidebarAdmin from "../../../Components/Sidebar/SidebarAdmin";
import Chart from 'chart.js/auto';
import axios from "axios";

const Dashboard = () => {
  const [total, setTotal] = useState([]);
  const [users, setUsers] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`https://localhost:7015/api/Invoices`)
      .then((res) => {
        // Parse the date and aggregate total revenue for each unique date
        const aggregatedData = res.data.reduce((accumulator, row) => {
          const date = row.issuedDate.split("T")[0]; // Extract the date part
          if (!accumulator[date]) {
            accumulator[date] = {
              x: date,
              y: row.total
            };
          } else {
            accumulator[date].y += row.total;
          }
          return accumulator;
        }, {});
  
        // Extract the values from the aggregatedData object
        const chartData = Object.values(aggregatedData);
  
        new Chart(document.getElementById('chart'), {
          type: 'line',
          options: {
            scales: {
              y: {
                beginAtZero: true,
                min: 0 // Set the minimum value of y-axis to 0
              },
              x: {
                beginAtZero: true,
                min: 0 // Set the minimum value of x-axis to 0
              },
            }
          },
          data: {
            labels: chartData.map(entry => entry.x),
            datasets: [
              {
                label: 'Tổng tiền theo ngày',
                data: chartData
              }
            ]
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios.get(`https://localhost:7015/api/Users`).then((res) => setUsers(res.data)).catch(() => {alert("Lỗi lấy dữ liệu")})
  },[])
  useEffect(() => {
    axios.get(`https://localhost:7015/api/Invoices`).then((res) => setInvoices(res.data)).catch(() => {alert("Lỗi lấy dữ liệu")})
  },[])

  useEffect(() => {
    axios.get(`https://localhost:7015/api/Phones`).then((res) => setProducts(res.data)).catch(() => {alert("Lỗi lấy dữ liệu")})
  },[])

  return (

    <div id="main-wrapper">
      <HeaderAdmin />
      <SidebarAdmin />
      <div className="page-wrapper">
        <div className="page-breadcrumb">
          <div className="row">
            <div className="col-12 d-flex no-block align-items-center">
              <h4 className="page-title">Dashboard</h4>
              <div className="ml-auto text-right">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
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
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="d-md-flex align-items-center">
                    <div>
                      <h4 className="card-title"></h4>
                      <h5 className="card-subtitle">
                        Biểu đồ doanh thu hằng ngày
                      </h5>
                    </div>
                  </div>
                  <div className="row">
                    {/* column */}
                    <div className="col-lg-9">
                    <div style={{width: 1000}}>
                      <canvas id="chart">
                        </canvas>
                      </div>
                        <br/>
                    </div>
                    <div className="col-lg-3">
                      <div className="row">
                        <div className="col-12">
                          <div className="bg-dark p-10 text-white text-center">
                            <i className="mdi mdi-account m-b-5 font-16" />
                            <h5 className="m-b-0 m-t-5">{users.length}</h5>
                            <small className="font-light">Total Users</small>
                          </div>
                        </div>
                   
                       
                        <div className="col-12 m-t-15">
                          <div className="bg-dark p-10 text-white text-center">
                            <i className="mdi mdi-file m-b-5 font-16" />
                            <h5 className="m-b-0 m-t-5">{invoices.length}</h5>
                            <small className="font-light">Total Orders</small>
                          </div>
                        </div>

                        <div className="col-12 m-t-15">
                          <div className="bg-dark p-10 text-white text-center">
                            <i className="mdi mdi-cart m-b-5 font-16" />
                            <h5 className="m-b-0 m-t-5">{products.length}</h5>
                            <small className="font-light">Total Shop</small>
                          </div>
                        </div>
                       
                       
                      </div>
                    </div>
                    {/* column */}
                  </div>
                </div>
              </div>
            </div>
          </div>
       
          {/* ============================================================== */}
          {/* Recent comment and chats */}
          {/* ============================================================== */}
        </div>
  
      </div>

      <FooterAdmin />
    </div>
  );
};

export default Dashboard;
