import { Form } from "react-bootstrap";
import FooterAdmin from "../../../Components/Footer/FooterAdmin";
import HeaderAdmin from "../../../Components/Header/HeaderAdmin";
import SidebarAdmin from "../../../Components/Sidebar/SidebarAdmin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddImage = () => {
  const [image, setImage] = useState({ status: true, Files: [] });
  const navigate = useNavigate();
  const [phones, setPhones] = useState([]);

  const handleSelect = (e) => {
    let name = e.target.name;
    let value = e.target.value
    setImage(prev => ({ ...prev, [name]: value }));
  }

  const handleCheck = (e) => {
        let name = e.target.name;
        let value = e.target.checked
        setImage(prev => ({ ...prev, [name]: value }));
  }

  const handleImageChange = (e) => {
    let name = e.target.name;
    let files = e.target.files;
  
    // Convert FileList to an array
    const filesArray = Array.from(files);
  
    // Update state with the array of files
    setImage(prev => ({ ...prev, [name]: filesArray }));
  }
  useEffect(() => {
    axios.get(`https://localhost:7015/api/Phones/FirstByModel`)
    .then(res => setPhones(res.data))
  },[])
  console.log(phones);
  

const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData();

  // Append each file to form data
  image.Files.forEach(file => {
    formData.append('Files', file);
  });

  // Append other form data fields
  formData.append('status', image.status);
  formData.append('phoneId', image.phoneId);

  axios.post(`https://localhost:7015/api/Images`, formData, {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
  })
  .then(() => {
      navigate("/admin/image-list");
  });
}


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
                        <a>Home</a>
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
                  <form className="form-horizontal" onSubmit={handleSubmit}>
                    <div className="card-body">
                      <h4 className="card-title">ADD BRAND</h4>
                      <div className="form-group row">
                        <label
                          htmlFor="name"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                          Name
                        </label>
                        <div className="col-sm-9">
                            <Form.Control as="select" name="phoneId" onChange={handleSelect}>
                            <option name="phoneId">---Chọn điện thoại---</option>
                            {phones
  .filter(item => item !== null)
  .map((item, index) => (
    <option key={index} value={item.id || 'default'}>{item.name}</option>
))}

                          </Form.Control>
                       
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="logo"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                          Path
                        </label>
                        <div className="col-sm-9">
                            <input type="file" name="Files" onChange={handleImageChange} multiple />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="status"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                          Status
                        </label>
                        <div className="col-sm-9 mt-2">
                          <Form.Check
                            type="switch"
                            id="status"
                            name="status"
                            onChange={handleCheck}
                            
                          />
                        </div>
                      </div>
                    </div>
                    <div className="border-top">
                      <div className="card-body">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
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

export default AddImage;
