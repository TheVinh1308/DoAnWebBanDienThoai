import { Link, NavLink, Outlet } from "react-router-dom";

const SidebarAdmin = () => {
  return (
    <>

    <aside className="left-sidebar position-fixed" data-sidebarbg="skin5">
      {/* Sidebar scroll*/}
      <div className="sidebar" >
        {/* Sidebar navigation*/}
        <nav className="sidebar-nav">
          <ul id="sidebarnav" className="p-t-30">
            <li className="sidebar-item nav-item">
              <NavLink to="/admin" 
                className="sidebar-link waves-effect waves-dark sidebar-link nav-link"
                aria-expanded="false"
              >
                <i className="mdi mdi-view-dashboard" />
                <span className="hide-menu">Dashboard</span>
              </NavLink>
            </li>

            <li className="sidebar-item nav-item">
              <NavLink to="/admin/brand-list"
                className="sidebar-link waves-effect waves-dark sidebar-link nav-link"
                aria-expanded="false"
              >
                <i className="mdi mdi-factory" />
                <span className="hide-menu">Brand</span>
              </NavLink>
            </li>

            <li className="sidebar-item nav-item">
              <NavLink to="/admin/mod-phone-list"
                className="sidebar-link waves-effect waves-dark sidebar-link nav-link"
                aria-expanded="false"
              >
                <i className="mdi mdi-cellphone-settings" />
                <span className="hide-menu">Mod Phone</span>
              </NavLink>
            </li>
            <li className="sidebar-item nav-item">
              <NavLink to="/admin/phone-list"
                className="sidebar-link waves-effect waves-dark sidebar-link nav-link"
                aria-expanded="false"
              >
                <i className="mdi mdi-cellphone-iphone" />
                <span className="hide-menu">Phone</span>
              </NavLink>
            </li>
          
          
         
            {/* <li className="sidebar-item nav-item">
              <NavLink to="/admin/comment-list"
                className="sidebar-link waves-effect waves-dark sidebar-link nav-link"
                aria-expanded="false"
              >
                <i className="mdi mdi-comment" />
                <span className="hide-menu">Comments</span>
              </NavLink>
            </li> */}
            {/* <li className="sidebar-item nav-item">
              <NavLink to="/admin/vote-list"
                className="sidebar-link waves-effect waves-dark sidebar-link nav-link"
                aria-expanded="false"
              >
                <i className="mdi mdi-star" />
                <span className="hide-menu">Votes</span>
              </NavLink>
            </li> */}
            <li className="sidebar-item nav-item">
              <NavLink to="/admin/payment-method-list"
                className="sidebar-link waves-effect waves-dark sidebar-link nav-link"
                aria-expanded="false"
              >
                <i className="mdi mdi-credit-card" />
                <span className="hide-menu">Payment Methods</span>
              </NavLink>
            </li>
            {/* <li className="sidebar-item nav-item">
              <NavLink to="/admin/wish-list"
                className="sidebar-link waves-effect waves-dark sidebar-link nav-link"
                aria-expanded="false"
              >
                <i className="mdi mdi-heart" />
                <span className="hide-menu">WishList</span>
              </NavLink>
            </li> */}
            <li className="sidebar-item nav-item">
              <NavLink to="/admin/image-list"
                className="sidebar-link waves-effect waves-dark sidebar-link nav-link"
                aria-expanded="false"
              >
                <i className="mdi mdi-image" />
                <span className="hide-menu">Image</span>
              </NavLink>
            </li>
            <li className="sidebar-item nav-item">
              <NavLink to="/admin/slide-show-list"
                className="sidebar-link waves-effect waves-dark sidebar-link nav-link"
                aria-expanded="false"
              >
                <i className="mdi mdi-image-multiple" />
                <span className="hide-menu">SlideShow</span>
              </NavLink>
            </li>
            <li className="sidebar-item nav-item">
              <NavLink to="/admin/promotion-list"
                className="sidebar-link waves-effect waves-dark sidebar-link nav-link"
                aria-expanded="false"
              >
                <i className="mdi mdi-tag" />
                <span className="hide-menu">Promotion</span>
              </NavLink>
            </li>
            {/* <li className="sidebar-item nav-item">
              <NavLink to="/admin/cart-list"
                className="sidebar-link waves-effect waves-dark sidebar-link nav-link "
                aria-expanded="false"
              >
                <i className="mdi mdi-cart" />
                <span className="hide-menu">Cart</span>
              </NavLink>
            </li> */}
            <li className="sidebar-item nav-item">
              <NavLink to="/admin/invoice-list"
                className="sidebar-link waves-effect waves-dark sidebar-link nav-link"
                aria-expanded="false"
              >
                <i className="mdi mdi-file" />
                <span className="hide-menu">Invoice</span>
              </NavLink>
            </li>

            <li className="sidebar-item nav-item">
              <NavLink to="/admin/user-list"
                className="sidebar-link waves-effect waves-dark sidebar-link nav-link"
                aria-expanded="false"
              >
                <i className="mdi mdi-account" />
                <span className="hide-menu">User</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        {/* End Sidebar navigation */}
      </div>
      {/* End Sidebar scroll*/}
    </aside>
      <Outlet />
    </>
  );
};

export default SidebarAdmin;
