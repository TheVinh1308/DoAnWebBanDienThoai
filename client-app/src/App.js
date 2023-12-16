import { BrowserRouter , Route, Routes } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Unauthorize from "./Components/Unauthorize";
import PublicRoute from "./Components/Routes/PublicRoute";
import PrivateRoute from "./Components/Routes/PrivateRoute";
function App() {
  const [role, setRole] = useState();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      const decoded = jwtDecode(token);
      setRole(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
    }
  }, []);

  if (role === "Admin") {
    return (
      <>
        <PublicRoute />
        <PrivateRoute/>
      </>
    )
  } 
  else {
    // Nếu không phải là Admin
    if (window.location.pathname.startsWith("/admin")) {
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
}

export default App;
