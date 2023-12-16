import { BrowserRouter, Route, Routes,  } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Unauthorize from "./Components/Unauthorize";
import PublicRoute from "./Components/Routes/PublicRoute";
import PrivateRoute from "./Components/Routes/PrivateRoute";
function App() {
  const [role, setRole] = useState();
  const [isTokenDecoded, setTokenDecoded] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      const decoded = jwtDecode(token);
      setRole(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
      setTokenDecoded(true);
    }
  }, []);
  if (!isTokenDecoded) {
    // Nếu token chưa được decode, có thể hiển thị một loader hoặc thông báo chờ đợi
    return <div>Loading...</div>;
  }

  if (role === "Admin") {
    return (
      <>
        <PrivateRoute/>
        <PublicRoute />
      </>
    );
  } else if (window.location.pathname.startsWith("/admin")) { 
      return (
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Unauthorize />} />
        </Routes>
      </BrowserRouter>
      )
    }
  return (
    <PublicRoute />
  );
}

export default App;
