import { Col, Row } from "react-bootstrap";
import Brand from "../Components/Brand";
import ADV from "../Components/Carousel";
import Category from "../Components/Category";
import Header from "../Components/Navbar";
import Products from "../Components/Products";
import Sale from "../Components/Sale";
import AllProduct from "../Components/AllProduct";
import Footer from "../Components/Footer/Footer";
import HotTrend from "../Components/HotTrend";
const Home = () => {
    return (
        <>
            <Header />
            <ADV />
            <Brand />
            <hr style={{ margin: 0 }} />
            <Row>

                <Sale />
                <AllProduct />
                <HotTrend />
            </Row>
            <Footer />
        </>
    );
}

export default Home;