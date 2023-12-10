import FooterAdmin from "../../../Components/Footer/FooterAdmin";
import HeaderAdmin from "../../../Components/Header/HeaderAdmin";
import SidebarAdmin from "../../../Components/Sidebar/SidebarAdmin";

const AddVote = () => {
  return (
    <>
      <div id="main-wrapper">
        <HeaderAdmin />
        <SidebarAdmin />
        <div className="page-wrapper">
          <div className="page-breadcrumb">
            <div className="row">
              <div className="col-12 d-flex no-block align-items-center">
                <h4 className="page-title">Form Basic</h4>
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
                  <form className="form-horizontal">
                    <div className="card-body">
                      <h4 className="card-title">Personal Info</h4>
                      <div className="form-group row">
                        <label
                          htmlFor="fname"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                          First Name
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control"
                            id="fname"
                            placeholder="First Name Here"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="lname"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                          Last Name
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control"
                            id="lname"
                            placeholder="Last Name Here"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="lname"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                          Password
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="password"
                            className="form-control"
                            id="lname"
                            placeholder="Password Here"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="email1"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                          Company
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control"
                            id="email1"
                            placeholder="Company Name Here"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="cono1"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                          Contact No
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control"
                            id="cono1"
                            placeholder="Contact No Here"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="cono1"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                          Message
                        </label>
                        <div className="col-sm-9">
                          <textarea
                            className="form-control"
                            defaultValue={""}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="border-top">
                      <div className="card-body">
                        <button type="button" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="card-body">
                  <h4 className="card-title">Forms Control</h4>
                  <div className="form-group">
                    <label htmlFor="hue-demo">Hue</label>
                    <input
                      type="text"
                      id="hue-demo"
                      className="form-control demo"
                      data-control="hue"
                      defaultValue="#ff6161"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="position-bottom-left">
                      Bottom left (default)
                    </label>
                    <input
                      type="text"
                      id="position-bottom-left"
                      className="form-control demo"
                      data-position="bottom left"
                      defaultValue="#0088cc"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="position-top-right">Top right</label>
                    <input
                      type="text"
                      id="position-top-right"
                      className="form-control demo"
                      data-position="top right"
                      defaultValue="#0088cc"
                    />
                  </div>
                  <label>Datepicker</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control mydatepicker"
                      placeholder="mm/dd/yyyy"
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fa fa-calendar" />
                      </span>
                    </div>
                  </div>
                  <label className="m-t-15">Autoclose Datepicker</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      id="datepicker-autoclose"
                      placeholder="mm/dd/yyyy"
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fa fa-calendar" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border-top">
                  <div className="card-body">
                    <button type="submit" className="btn btn-success">
                      Save
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Reset
                    </button>
                    <button type="submit" className="btn btn-info">
                      Edit
                    </button>
                    <button type="submit" className="btn btn-danger">
                      Cancel
                    </button>
                  </div>
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

export default AddVote;
