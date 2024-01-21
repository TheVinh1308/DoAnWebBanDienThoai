import { Form } from "react-bootstrap";
import FooterAdmin from "../../../Components/Footer/FooterAdmin";
import HeaderAdmin from "../../../Components/Header/HeaderAdmin";
import SidebarAdmin from "../../../Components/Sidebar/SidebarAdmin";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from '../../../Components/axiosClient'
import axios from "axios";

const EditSlideShow = () => {
  const [slideshow, setSlideShow] = useState({ status: true, FilePath: null, modPhone: {} });
  const navigate = useNavigate();
  const [modPhones, setModPhones] = useState([]);
  const [image, setImage] = useState();
  const { id } = useParams();

  useEffect(() => {
    return () => {
      image && URL.revokeObjectURL(image.preview)
    }
  })

  const handleSelect = (e) => {
    let name = e.target.name;
    let value = e.target.value
    setSlideShow(prev => ({ ...prev, [name]: value }));
  }

  const handleCheck = (e) => {
    let name = e.target.name;
    let value = e.target.checked
    setSlideShow(prev => ({ ...prev, [name]: value }));
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setImage(file)
    setSlideShow(prev => ({ ...prev, FilePath: e.target.files[0] }));
  }

  useEffect(() => {
    axios.get(`https://localhost:7015/api/ModPhones`)
      .then((res) => {
        setModPhones(res.data);
      });
  }, []);

  useEffect(() => {
    axios.get(`https://localhost:7015/api/SlideShows/${id}`)
      .then((res) => {
        setSlideShow(res.data);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(slideshow).forEach(([key, value]) => {
      formData.append(key, value);
    });

    axios.put(`https://localhost:7015/api/SlideShows/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(() => {
        navigate("/admin/slide-show-list");
      })

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
                    <input type="hidden" name="id" value={slideshow.id} onChange={handleSelect} />
                    <div className="card-body">
                      <h4 className="card-title">EDIT SlideShow</h4>
                      <div className="form-group row">
                        <label
                          htmlFor="name"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                          Name
                        </label>
                        <div className="col-sm-9">
                          <Form.Select name="modPhoneId" onChange={handleSelect}>
                            {
                              modPhones.filter(item => item !== null)
                                .map((item, index) => (
                                  <option key={index} value={item.id || 'default'}>{item.name}</option>
                                ))}

                          </Form.Select>

                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="logo"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                          Tiêu đề
                        </label>
                        <div className="col-sm-9">
                          <input type="text" name="title" onChange={handleSelect} required value={slideshow.title}/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="logo"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                          FilePath
                        </label>
                        <div className="col-sm-9">
                          <input type="file" name="FilePath" onChange={handleImageChange} />
                          {
                            image ? (
                              <img src={image.preview} alt="" width="500px" />
                            ) : <img src={`https://localhost:7015/images/slideshows/${slideshow.path}`} style={{ width: 250 }} alt="" />
                          }
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="logo"
                          className="col-sm-3 text-right control-label col-form-label"
                        >
                          Mô tả
                        </label>
                        <div className="col-sm-9">
                          <textarea type="text" name="description" onChange={handleSelect} required value={slideshow.description}/>
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
                            checked={slideshow.status}

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

export default EditSlideShow