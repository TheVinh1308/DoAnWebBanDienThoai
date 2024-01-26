import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddBrand from "../../Pages/Admin/Brand/AddBrand";
import BrandList from "../../Pages/Admin/Brand/BrandList";
import EditBrand from "../../Pages/Admin/Brand/EditBrand";
import Dashboard from "../../Pages/Admin/Dashboard/Dashboard";
import ImageList from "../../Pages/Admin/Image/ImageList";
import AddImage from "../../Pages/Admin/Image/AddImage";
import AddInvoice from "../../Pages/Admin/Invoice/AddInvoice";
import InvoiceList from "../../Pages/Admin/Invoice/InvoiceList";
import AddSlideShow from "../../Pages/Admin/SlideShow/AddSlideshow";
import SlideShowList from "../../Pages/Admin/SlideShow/SlideShow";
import ModPhoneList from "../../Pages/Admin/ModPhone/ModPhoneList";
import EditModPhone from "../../Pages/Admin/ModPhone/EditModPhone";
import AddModPhone from "../../Pages/Admin/ModPhone/AddModPhone";
import UserList from "../../Pages/Admin/User/UserList";
import AddUserAdmin from "../../Pages/Admin/User/AddUserAdmin";
import PromotionList from "../../Pages/Admin/Promotion/PromotionList";
import AddPromotion from "../../Pages/Admin/Promotion/AddPromotion";
import EditPhone from "../../Pages/Admin/Phone/EditPhone";
import AddPhone from "../../Pages/Admin/Phone/AddPhone";
import PhoneList from "../../Pages/Admin/Phone/PhoneList";
import AddPaymentMethod from "../../Pages/Admin/PaymentMethod/AddPaymentMethod";
import PaymentMethodList from "../../Pages/Admin/PaymentMethod/PaymentMethodList";
import EditImage from "../../Pages/Admin/Image/EditImage";
import EditSlideShow from "../../Pages/Admin/SlideShow/EditSlideShow";
import EditPaymentMethod from "../../Pages/Admin/PaymentMethod/EditPaymentMethod";
import RegisterAdmin from "../../Pages/Admin/User/AddUserAdmin";
import ApplicationPromotion from "../../Pages/Admin/Promotion/ApplicationPromotion";
import EditPromotion from "../../Pages/Admin/Promotion/EditPromotion";

const PrivateRoute = () => {
    return (
        <BrowserRouter>

            <Routes>
                <Route path="/admin">
                    <Route index element={<Dashboard />} />

                    <Route path="brand-list">
                        <Route index element={<BrandList />}></Route>
                        <Route path="add-brand" element={<AddBrand />}></Route>
                        <Route path="edit-brand/:id" element={<EditBrand />}></Route>
                    </Route>



                    <Route path="image-list">
                        <Route index element={<ImageList />}></Route>
                        <Route path="add-image" element={<AddImage />}></Route>
                        <Route path="edit-image/:id" element={<EditImage />}></Route>
                    </Route>

                    <Route path="invoice-list">
                        <Route index element={<InvoiceList />}></Route>
                        <Route path="add-invoice" element={<AddInvoice />}></Route>
                    </Route>

                    <Route path="slide-show-list">
                        <Route index element={<SlideShowList />}></Route>
                        <Route path="add-slide-show" element={<AddSlideShow />}></Route>
                        <Route path="edit-slide-show/:id" element={<EditSlideShow />}></Route>
                    </Route>

                    <Route path="mod-phone-list">
                        <Route index element={<ModPhoneList />}></Route>
                        <Route path="add-mod-phone" element={<AddModPhone />}></Route>
                        <Route path="edit-mod-phone/:id" element={<EditModPhone />}></Route>
                    </Route>

                    <Route path="payment-method-list">
                        <Route index element={<PaymentMethodList />}></Route>
                        <Route path="add-payment-method" element={<AddPaymentMethod />}></Route>
                        <Route path="edit-payment-method/:id" element={<EditPaymentMethod />}></Route>
                    </Route>

                    <Route path="phone-list">
                        <Route index element={<PhoneList />}></Route>
                        <Route path="add-phone" element={<AddPhone />}></Route>
                        <Route path="edit-phone/:id" element={<EditPhone />}></Route>
                    </Route>

                    <Route path="promotion-list">
                        <Route index element={<PromotionList />}></Route>
                        <Route path="add-promotion" element={<AddPromotion />}></Route>
                        <Route path="application-promotion" element={<ApplicationPromotion />}></Route>
                        <Route path="edit-promotion/:id" element={<EditPromotion />}></Route>
                    </Route>

                    <Route path="user-list">
                        <Route index element={<UserList />}></Route>
                        <Route path="add-user-admin" element={<RegisterAdmin />}></Route>
                    </Route>


                </Route>
            </Routes>
        </BrowserRouter>


    );
}

export default PrivateRoute;