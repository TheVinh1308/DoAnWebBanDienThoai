import { Link, useNavigate } from "react-router-dom";

const Unauthorize = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Sử dụng hàm điều hướng để quay trở lại trang chủ
    window.location.href = ("/");
  };

  return (
    <>
        <div className="text-center">

            <h1 className="text-danger">You don't have permission to access this route!!!!</h1>
            <button onClick={handleBack}>Back</button>
        </div>
    </>
  );
};

export default Unauthorize;
