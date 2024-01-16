import { faArrowsRotate, faClipboardList, faHandshake, faListCheck, faShieldHalved, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion, Col, Row } from "react-bootstrap";

const Policy = () => {
    return (
        <>

            <Accordion className="container" alwaysOpen style={{ marginTop: 50 }}>
                <Row>
                    <Col lang={6}>
                        <Accordion.Item eventKey="0" >
                            <Accordion.Header> <FontAwesomeIcon icon={faArrowsRotate} className='police-icon' /> Chính sách đổi trả</Accordion.Header>
                            <Accordion.Body>

                                Chính Sách Đổi Trả cho Trang Web Bán Điện Thoại

                                Chào mừng quý khách đến với trang web bán điện thoại của chúng tôi. Để đảm bảo quý khách có trải nghiệm mua sắm trực tuyến thoải mái và hài lòng, chúng tôi xin trình bày chính sách đổi trả của mình như sau:

                                1. Thời Hạn Đổi Trả:

                                Quý khách có thể đổi trả sản phẩm trong vòng 15 ngày kể từ ngày nhận hàng.
                                2. Điều Kiện Đổi Trả:

                                Sản phẩm cần được giữ nguyên trạng và chưa qua sử dụng.
                                Bảo đảm sản phẩm đầy đủ phụ kiện và hộp đựng.
                                Hóa đơn mua hàng hoặc chứng từ mua sắm cần được kèm theo.
                                3. Quy Trình Đổi Trả:

                                Quý khách vui lòng liên hệ với bộ phận chăm sóc khách hàng để thông báo về việc đổi trả sản phẩm.
                                Chúng tôi sẽ hỗ trợ hướng dẫn và cung cấp thông tin cần thiết về quy trình đổi trả.
                                Sản phẩm sẽ được kiểm tra khi nhận lại và chúng tôi sẽ thông báo kết quả đổi trả trong thời gian ngắn nhất.
                                4. Phí Đổi Trả:

                                Nếu đổi trả do lỗi của chúng tôi, phí đổi trả sẽ được chúng tôi chịu.
                                Trong trường hợp khác, phí đổi trả có thể áp dụng tùy thuộc vào nguyên nhân cụ thể của việc đổi trả.
                                5. Chính Sách Bảo Hành:

                                Chúng tôi cam kết cung cấp dịch vụ bảo hành chất lượng, và thông tin chi tiết về chính sách bảo hành sẽ được cung cấp kèm theo sản phẩm.
                                Chúng tôi mong rằng quý khách sẽ hài lòng với sản phẩm mua sắm tại trang web của chúng tôi. Đối với mọi thắc mắc hoặc hỗ trợ, vui lòng liên hệ với bộ phận chăm sóc khách hàng của chúng tôi.

                                Trân trọng,
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header > <FontAwesomeIcon icon={faTruck} className='police-icon' />Chính sách vận chuyển</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header > <FontAwesomeIcon icon={faClipboardList} className='police-icon' />Quy định đánh giá</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Col>
                    <Col lg={6}>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header><FontAwesomeIcon icon={faShieldHalved} className='police-icon' />Chính sách bảo mật</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>  <FontAwesomeIcon icon={faHandshake} className='police-icon' />Chính sách nghiệp vụ</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="5">
                            <Accordion.Header>  <FontAwesomeIcon icon={faListCheck} className='police-icon' />Chính sách nghiệp vụ</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Col>
                </Row>


            </Accordion>
        </>
    );
}

export default Policy;