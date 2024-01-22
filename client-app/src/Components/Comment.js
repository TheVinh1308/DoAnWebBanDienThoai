import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axiosClient from "./axiosClient";
const Comment = ({ selectedColor, selectedRom, products }) => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState();
  const [isTokenDecoded, setTokenDecoded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [comment, setComment] = useState({
    status: true,
  });
  const [comments, setComments] = useState([]);

  const [showTextareaIndex, setShowTextareaIndex] = useState(null);
  const [showTextareaIndexChild, setShowTextareaChildIndex] = useState(null);
  const [replyTextareaState, setReplyTextareaState] = useState({});

  const showReply = (index) => {
    // Chỉ set showTextareaIndex nếu không phải là reply
    if (index !== showTextareaIndex) {
      setShowTextareaIndex(index);
    }
  };

  const showReplyChild = (index) => {
    // Chỉ set showTextareaIndex nếu không phải là reply
    if (index !== showTextareaIndexChild) {
        setShowTextareaChildIndex(index);
    }
  };

  const handleReply = (id) => {
    const selectedPhone = products.find(
      (item) => item.rom === selectedRom && item.color === selectedColor
    );
    const newComment = {
      ...comment,
      phoneId: selectedPhone.id,
      userId: userId,
      parentCommentId: id,
    };

    // Cập nhật state một lần duy nhất
    setComment(newComment);

    console.log(newComment);

    axios.post(`https://localhost:7015/api/Comments`, newComment).then(() => {
      setShowTextareaIndex(null); // Reset showTextareaIndex sau khi trả lời
      setReplyTextareaState({});
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(
        decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ]
      );
      setTokenDecoded(true);
      setIsAuthenticated(true);
    } else {
      setTokenDecoded(false);
    }
  }, []);

  const handleContent = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setComment((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentReply = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setComment((prev) => ({ ...prev, [name]: value }));
  };

  const handleComment = (e) => {
    e.preventDefault();

    const selectedPhone = products.find(
      (item) => item.rom === selectedRom && item.color === selectedColor
    );
    if (isTokenDecoded) {
      if (isAuthenticated) {
        // Tạo một đối tượng mới chứa tất cả các giá trị cần thiết
        const newComment = {
          ...comment,
          phoneId: selectedPhone.id,
          userId: userId,
          parentCommentId: null
        };

        // Cập nhật state một lần duy nhất
        setComment(newComment);

        console.log(newComment);

        axios
          .post(`https://localhost:7015/api/Comments`, newComment)
          .then(() => {
            alert("Đã thêm bình luận!");
          });
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const selectedPhone = products.find(
      (item) => item.rom === selectedRom && item.color === selectedColor
    );
    if (selectedPhone != undefined) {
      axios
        .get(
          `https://localhost:7015/api/Comments/GetCommentByPhone/${selectedPhone.id}`
        )
        .then((res) => setComments(res.data));
    }
  }, [products, comments]);
  console.log(comments);

  return (
    <>
      <Row
         style={{
            marginTop: 50,
            backgroundColor: "#f9fafb",
            width: 1000,
            margin: "auto", // Thêm margin: auto để căn giữa theo chiều ngang
          }}
      >
        <Col xs={4} style={{ padding: 0 }}>
            <h3 style={{margin: 15}}>Hỏi và đáp</h3>
          <div>
            {/* Danh sách đánh giá bình luận điện thoại */}
            <aside style={{ marginLeft: 20, display: "flex" }}>
              <div className="content-vote">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <form onSubmit={handleComment}>
                    <textarea
                      placeholder="Bình luận tại đây..."
                      style={{ width: 950, padding: 10 }}
                      onChange={handleContent}
                      name="content"
                    ></textarea>
                    <button
                      style={{marginBottom: 20 }}
                      type="submit"
                    >
                      Gửi
                    </button>
                  </form>
                </div>
                {comments.length > 0 &&
                   comments.filter(item => item.parentCommentId === null).map((item, index) => (
                  
                    <Row key={index}>
                      <Col style={{ marginRight: 5 }}>
                        <p style={{ marginBottom: 0, fontWeight: "bold" }}>
                          {item.user.fullName}
                        </p>
                        <p
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            fontSize: 12,
                            marginBottom: 0,
                            color: "gray",
                          }}
                        >
                          {item.postDate}
                        </p>

                    
                        <p style={{ flexGrow: 1, margin: 10, maxWidth: "850px", height: "70px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "normal", backgroundColor: "#fff", padding: "10px", display: "flex", flexDirection: "column", position: "relative" }}>
                          {item.content}
                        <button
                          style={{
                            alignSelf: "flex-end",
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            marginTop: "auto",  
                            border: "none",
                            color: "red",
                            backgroundColor: "#fff",
                           
                          }}
                          onClick={() => showReply(index)}
                        >
                          Trả lời
                        </button>
                        </p>

                      

                      
                        {showTextareaIndex === index && (
                          <div>
                            <textarea
                              placeholder={"Trả lời..."}
                              style={{ width: 850, padding: 10 }}
                              onChange={handleContent}
                              name="content"
                              className="mt-3"
                            ></textarea>
                            <button onClick={() => setShowTextareaIndex(null)}>
                              Đóng
                            </button>
                            <button onClick={() => handleReply(item.id)}>
                              Trả lời
                            </button>
                          </div>
                        )}

                        {/* Hiển thị các comment trả lời */}
                        {comments.filter((reply) => reply.parentCommentId === item.id)
                                 .map((reply, replyIndex) => (
                            <div key={replyIndex} style={{ marginLeft: 20 }}>
                              {/* Hiển thị thông tin trả lời */}
                              <p
                                style={{ marginBottom: 0, fontWeight: "bold" }}
                              >
                                {reply.user.fullName}
                              </p>
                              <p
                                style={{
                                  fontFamily: "Montserrat, sans-serif",
                                  fontSize: 12,
                                  marginBottom: 0,
                                  color: "gray",
                                }}
                              >
                                {reply.postDate}
                              </p>

                            
                              <p style={{ flexGrow: 1, margin: 10, maxWidth: "850px", height: "70px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "normal", backgroundColor: "#fff", padding: "10px", display: "flex", flexDirection: "column", position: "relative" }}>
                                {reply.content}
                              <button
                                style={{
                                    alignSelf: "flex-end",
                                    position: "absolute",
                                    bottom: 0,
                                    right: 0,
                                    marginTop: "auto",  
                                    border: "none",
                                    color: "red",
                                    backgroundColor: "#fff",
                                }}
                                onClick={() => setReplyTextareaState(prevState => ({
                                    ...prevState,
                                    [index]: replyIndex,
                                }))}
                              >
                                Trả lời
                              </button>
                              </p>

                           

                              {replyTextareaState[index] === replyIndex && (
                <div>
                    <textarea
                        placeholder={"Trả lời..."}
                        style={{ width: 700, padding: 15 }}
                        onChange={handleContent}
                        name="content"
                        className="mt-3"
                    ></textarea>
                    <button onClick={() => setReplyTextareaState({})}>
                        Đóng
                    </button>
                    <button onClick={() => handleReply(item.id)}>
                        Trả lời
                    </button>
                </div>
            )}

                              
                            </div>
                          ))}
                          
                      </Col>
                    </Row>
                  ))}
              </div>
            </aside>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Comment;
