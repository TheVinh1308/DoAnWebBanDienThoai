import axios from "axios";
import FooterAdmin from "../../../Components/Footer/FooterAdmin";
import HeaderAdmin from "../../../Components/Header/HeaderAdmin";
import SidebarAdmin from "../../../Components/Sidebar/SidebarAdmin";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const EditModPhone = () => {
  const [modPhone, setModPhone] = useState({ status: true,promotionId: 1, ImageFile: null, brand: {name: ""} });
  const [image,setImage] = useState();
  const [brands, setBrands] = useState([]);
  const {id} = useParams();
  const navigate = useNavigate();


  useEffect(() => {
      return () => {
        image && URL.revokeObjectURL(image.preview)
        modPhone && URL.revokeObjectURL(modPhone.image)
      }
  })

  const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setModPhone(prev => ({ ...prev, [name]: value }));
  }

  const handleCheck = (e) => {
        let name = e.target.name;
        let value = e.target.checked
        setModPhone(prev => ({ ...prev, [name]: value }));
  }

  const handleSelect = (e) => {
    let name = e.target.name;
    let value = e.target.value
    setModPhone(prev => ({ ...prev, [name]: value }));
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setImage(file)
    setModPhone(prev => ({ ...prev, ImageFile:e.target.files[0] }));
}

    useEffect(() => {
        axios.get(`https://localhost:7015/api/ModPhones/${id}`).then((res) => {
            setModPhone(res.data)
        })
    },[id])

    useEffect(() => {
        axios.get(`https://localhost:7015/api/Brands`).then((res) => {
            setBrands(res.data)
        })
    },[id])
    console.log(modPhone);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Sử dụng FormData để xử lý dữ liệu và tệp tin
    const formData = new FormData();
    Object.entries(modPhone).forEach(([key, value]) => {
        formData.append(key, value);
    });
  
    axios.put(`https://localhost:7015/api/ModPhones/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data', // Header quan trọng khi sử dụng FormData
        },
    })
        .then(() => {
            navigate("/admin/mod-phone-list");
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
                  <form className="form-horizontal" onSubmit={handleSubmit}>
                    <input name="id" type="hidden" onChange={handleChange} value={modPhone.id}/>
                    <div className="card-body">
                      <h4 className="card-title">EDIT MOD PHONE</h4>
                      <div className="form-group row">
                        <label
                          htmlFor="fname"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                        Name
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            onChange={handleChange}
                            value={modPhone.name}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="lname"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                        ScreenSize(inch)
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control"
                            name="screenSize"
                            onChange={handleChange}
                            value={modPhone.screenSize}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="lname"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                          Description
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control"
                            name="description"
                            onChange={handleChange}
                            value={modPhone.description}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="email1"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                          Ram
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control"
                            name="ram"
                            onChange={handleChange}
                            value={modPhone.ram}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="cono1"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                          Brand
                        </label>
                        <div className="col-sm-9">
                          <Form.Control as="select" name="brandId" onChange={handleSelect}>
                            <option value={modPhone.brand.id} name="brandId">{modPhone.brand.name}</option>
                            {brands.map(brand => (
                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                            ))}
                            
                          </Form.Control>
                         
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="cono1"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                          OS
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control"
                            name="os"
                            onChange={handleChange}
                            value={modPhone.os}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="cono1"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                          CPU
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control"
                            name="cpu"
                            onChange={handleChange}
                            value={modPhone.cpu}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="cono1"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                          Battery
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="number"
                            className="form-control"
                            name="battery"
                            onChange={handleChange}
                            value={modPhone.battery}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="cono1"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                          Image
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="file"
                            className="form-control"
                            name="ImageFile"
                            onChange={handleImageChange}
                          />
                           {
                              image && (
                                  <img src={image.preview} alt="" width="500px"/>
                                  )
                                }
                           
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="cono1"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                          Promotion
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control"
                            name="promotionId"
                            onChange={handleChange}
                            value={modPhone.promotionId}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="cono1"
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
                            checked={modPhone.status}
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

export default EditModPhone;
