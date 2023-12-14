import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [user, setUser] = useState({});

  const navigate = useNavigate(); 
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`https://localhost:7015/api/Users/Register`, user).then(() => {
      navigate("/login");
      alert("Successful!!!!")
    });
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={handleSubmit}>
              {/* Username input */}
              <div className="form-outline mb-4">
                <input
                  type="text"
                  name="username"
                  className="form-control form-control-lg"
                  onChange={handleChange}
                />
                <label className="form-label" htmlFor="form1Example13">
                  Username
                </label>
              </div>

              {/* Password input */}
              <div className="form-outline mb-4">
                <input
                  type="password"
                  name="password"
                  className="form-control form-control-lg"
                  onChange={handleChange}
                />
                <label className="form-label" htmlFor="form1Example23">
                  Password
                </label>
              </div>

              <div className="form-outline mb-4">
                <input
                  type="text"
                  name="fullname"
                  className="form-control form-control-lg"
                  onChange={handleChange}
                />
                <label className="form-label" htmlFor="form1Example23">
                  FullName
                </label>
              </div>

              <div className="form-outline mb-4">
                <input
                  type="email"
                  name="phone"
                  className="form-control form-control-lg"
                  onChange={handleChange}
                />
                <label className="form-label" htmlFor="form1Example23">
                  Email
                </label>
              </div>
              <div className="form-outline mb-4">
                <input
                  type="number"
                  name="phone"
                  className="form-control form-control-lg"
                  onChange={handleChange}
                />
                <label className="form-label" htmlFor="form1Example23">
                  Phone Number
                </label>
              </div>

              {/* Submit button */}
              <div className="d-grid gap-2">
                <button className="btn btn-primary btn-lg" type="submit">
                  Sign In
                </button>
              </div>
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
              </div>

              {/* Three wide buttons */}
              <div className="d-grid gap-2">
                <button
                  className="btn btn-primary btn-lg"
                  style={{ backgroundColor: "#3b5998" }}
                  type="button"
                >
                  <FontAwesomeIcon
                    icon={faFacebookF}
                    style={{ paddingRight: 10 }}
                  />
                  Continue with Facebook
                </button>
                <button
                  className="btn btn-primary btn-lg"
                  style={{ backgroundColor: "#55acee" }}
                  type="button"
                >
                  <FontAwesomeIcon
                    icon={faTwitter}
                    style={{ paddingRight: 10 }}
                  />
                  Continue with Twitter
                </button>

                {/* Additional button - Sign Up */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;