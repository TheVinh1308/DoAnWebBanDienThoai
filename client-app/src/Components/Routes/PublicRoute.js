import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "../../Pages/Cart";
import Detail from "../../Pages/Detail";
import Home from "../../Pages/Home";
import Login from "../../Pages/User/Login";
import Register from "../../Pages/User/Register";
import Favorites from "../../Pages/Favorites";

const PublicRoute = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>

                    <Route path="/">
                        <Route index element={<Home />}></Route>
                        <Route path="/details/:id" element={<Detail />} />
                        <Route path="/favorites/details/:id" element={<Detail />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                    </Route>
                </Routes>
            </BrowserRouter>
        </>


    );
}

export default PublicRoute;