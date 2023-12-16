import axios from "axios";

const axiosClient = axios.create({
    baseURL: `https://localhost:7015/api`,
    headers: {
        "Accept": 'application/json',
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
    }
});

axiosClient.interceptors.response.use(
    res => res,
    error => {
        if (error.response.status === 401) {
            window.location.href = `http://localhost:3000/login`;
        }
        //console.error(`Error! Status Code: ` + error.response.status);
        return Promise.reject( alert('Bạn không có thẩm quyền truy cập vào trang này!!!'));
    }
);

export default axiosClient;