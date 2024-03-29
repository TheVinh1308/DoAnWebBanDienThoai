import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HeaderAdmin = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
      const token = localStorage.getItem('jwt');
      if (token) {
          const decoded = jwtDecode(token);
          setUserData(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
          setIsAuthenticated(true);
      }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt")
    setIsAuthenticated(false);
    window.location.href = "/"
  }
  return (
    <header className="topbar" data-navbarbg="skin5">
      <nav className="navbar top-navbar navbar-expand-md navbar-dark fixed-top">
        <div className="navbar-header" data-logobg="skin5">
          {/* This is for the sidebar toggle which is visible on mobile only */}
          <a
            className="nav-toggler waves-effect waves-light d-block d-md-none"
            href="javascript:void(0)"
          >
            <i className="ti-menu ti-close" />
          </a>
          {/* ============================================================== */}
          {/* Logo */}
          {/* ============================================================== */}
          <a className="navbar-brand" href="index.html">
            {/* Logo icon */}
            <b className="logo-icon p-l-10">
              {/*You can put here icon as well // <i class="wi wi-sunset"></i> //*/}
              {/* Dark Logo icon */}
              <img
                src="/assets/images/logo-icon.png"
                alt="homepage"
                className="light-logo"
              />
            </b>
            {/*End Logo icon */}
            {/* Logo text */}
            <span className="logo-text">
              {/* dark Logo text */}
              <img
                src="/assets/images/logo-text.png"
                alt="homepage"
                className="light-logo"
              />
            </span>
            {/* Logo icon */}
            {/* <b class="logo-icon"> */}
            {/*You can put here icon as well // <i class="wi wi-sunset"></i> //*/}
            {/* Dark Logo icon */}
            {/* <img src="assets/images/logo-text.png" alt="homepage" class="light-logo" /> */}
            {/* </b> */}
            {/*End Logo icon */}
          </a>
          {/* ============================================================== */}
          {/* End Logo */}
          {/* ============================================================== */}
          {/* ============================================================== */}
          {/* Toggle which is visible on mobile only */}
          {/* ============================================================== */}
          <a
            className="topbartoggler d-block d-md-none waves-effect waves-light"
            href="javascript:void(0)"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="ti-more" />
          </a>
        </div>
        {/* ============================================================== */}
        {/* End Logo */}
        {/* ============================================================== */}
        <div
          className="navbar-collapse collapse"
          id="navbarSupportedContent"
          data-navbarbg="skin5"
        >
          {/* ============================================================== */}
          {/* toggle and nav items */}
          {/* ============================================================== */}
          <ul className="navbar-nav float-left mr-auto">
            <li className="nav-item d-none d-md-block">
              <a
                className="nav-link sidebartoggler waves-effect waves-light"
                href="javascript:void(0)"
                data-sidebartype="mini-sidebar"
              >
                <i className="mdi mdi-menu font-24" />
              </a>
            </li>
            {/* ============================================================== */}
            {/* create new */}
            {/* ============================================================== */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="d-none d-md-block">
                  Create New <i className="fa fa-angle-down" />
                </span>
                <span className="d-block d-md-none">
                  <i className="fa fa-plus" />
                </span>
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>
            {/* ============================================================== */}
            {/* Search */}
            {/* ============================================================== */}
            <li className="nav-item search-box">
              {" "}
              <a
                className="nav-link waves-effect waves-dark"
                href="javascript:void(0)"
              >
                <i className="ti-search" />
              </a>
              <form className="app-search position-absolute">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search & enter"
                />{" "}
                <a className="srh-btn">
                  <i className="ti-close" />
                </a>
              </form>
            </li>
          </ul>
          {/* ============================================================== */}
          {/* Right side toggle and nav items */}
          {/* ============================================================== */}
          <ul className="navbar-nav float-right">
            {/* ============================================================== */}
            {/* Comment */}
            {/* ============================================================== */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle waves-effect waves-dark"
                href
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {" "}
                <i className="mdi mdi-bell font-24" />
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>
            {/* ============================================================== */}
            {/* End Comment */}
            {/* ============================================================== */}
            {/* ============================================================== */}
            {/* Messages */}
            {/* ============================================================== */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle waves-effect waves-dark"
                href
                id={2}
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {" "}
                <i className="font-24 mdi mdi-comment-processing" />
              </a>
              <div
                className="dropdown-menu dropdown-menu-right mailbox animated bounceInDown"
                aria-labelledby={2}
              >
                <ul className="list-style-none">
                  <li>
                    <div className>
                      {/* Message */}
                      <a href="javascript:void(0)" className="link border-top">
                        <div className="d-flex no-block align-items-center p-10">
                          <span className="btn btn-success btn-circle">
                            <i className="ti-calendar" />
                          </span>
                          <div className="m-l-10">
                            <h5 className="m-b-0">Event today</h5>
                            <span className="mail-desc">
                              Just a reminder that event
                            </span>
                          </div>
                        </div>
                      </a>
                      {/* Message */}
                      <a href="javascript:void(0)" className="link border-top">
                        <div className="d-flex no-block align-items-center p-10">
                          <span className="btn btn-info btn-circle">
                            <i className="ti-settings" />
                          </span>
                          <div className="m-l-10">
                            <h5 className="m-b-0">Settings</h5>
                            <span className="mail-desc">
                              You can customize this template
                            </span>
                          </div>
                        </div>
                      </a>
                      {/* Message */}
                      <a href="javascript:void(0)" className="link border-top">
                        <div className="d-flex no-block align-items-center p-10">
                          <span className="btn btn-primary btn-circle">
                            <i className="ti-user" />
                          </span>
                          <div className="m-l-10">
                            <h5 className="m-b-0">Pavan kumar</h5>
                            <span className="mail-desc">
                              Just see the my admin!
                            </span>
                          </div>
                        </div>
                      </a>
                      {/* Message */}
                      <a href="javascript:void(0)" className="link border-top">
                        <div className="d-flex no-block align-items-center p-10">
                          <span className="btn btn-danger btn-circle">
                            <i className="fa fa-link" />
                          </span>
                          <div className="m-l-10">
                            <h5 className="m-b-0">Luanch Admin</h5>
                            <span className="mail-desc">
                              Just see the my new admin!
                            </span>
                          </div>
                        </div>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            {/* ============================================================== */}
            {/* End Messages */}
            {/* ============================================================== */}
            {/* ============================================================== */}
            {/* User profile and search */}
            {/* ============================================================== */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-muted waves-effect waves-dark pro-pic"
                href
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
               
                {isAuthenticated ? <span className="text-white">Xin chào admin, {userData}</span> : ""}
               
              </a>
                
              
               
               

            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-muted waves-effect waves-dark pro-pic"
                href
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
               
               {isAuthenticated && <button className="btn btn-danger" onClick={handleLogout}>Đăng xuất</button>}
               
              </a>
                
              
               
               

            </li>
            {/* ============================================================== */}
            {/* User profile and search */}
            {/* ============================================================== */}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default HeaderAdmin;
