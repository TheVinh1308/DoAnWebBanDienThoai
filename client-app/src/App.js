import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import BrandList from "./Pages/Admin/Brand/BrandList";
import CartList from "./Pages/Admin/Cart/CartList";
import CommentList from "./Pages/Admin/Comment/CommentList";
import ImageList from "./Pages/Admin/Image/ImageList";
import InvoiceList from "./Pages/Admin/Invoice/InvoiceList";
import SlideShowList from "./Pages/Admin/SlideShow/SlideShow";
import ModPhoneList from "./Pages/Admin/ModPhone/ModPhoneList";
import PaymentMethodList from "./Pages/Admin/PaymentMethod/PaymentMethodList";
import PhoneList from "./Pages/Admin/Phone/PhoneList";
import PromotionList from "./Pages/Admin/Promotion/PromotionList";
import UserList from "./Pages/Admin/User/UserList";
import VoteList from "./Pages/Admin/Vote/VoteList";
import WishList from "./Pages/Admin/WishList/WishList";
import AddBrand from "./Pages/Admin/Brand/AddBrand";
import AddComment from "./Pages/Admin/Comment/AddComment";
import AddModPhone from "./Pages/Admin/ModPhone/AddModPhone";
import AddImage from "./Pages/Admin/Image/AddImage";
import AddInvoice from "./Pages/Admin/Invoice/AddInvoice";
import AddSlideShow from "./Pages/Admin/SlideShow/AddSlideshow";
import AddPaymentMethod from "./Pages/Admin/PaymentMethod/AddPaymentMethod";
import AddPhone from "./Pages/Admin/Phone/AddPhone";
import AddPromotion from "./Pages/Admin/Promotion/AddPromotion";
import AddUserAdmin from "./Pages/Admin/User/AddUserAdmin";
import AddWishList from "./Pages/Admin/WishList/AddWishList";
import AddVote from "./Pages/Admin/Vote/AddVote";
import EditBrand from "./Pages/Admin/Brand/EditBrand";
import Home from "./Pages/Home";
import Detail from "./Pages/Detail";
import Cart from "./Pages/Cart";
import Login from "./Pages/User/Login";
import EditPhone from "./Pages/Admin/Phone/EditPhone";
import EditModPhone from "./Pages/Admin/ModPhone/EditModPhone";
function App() {
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

          <Route path="cart-list">
            <Route index element={<CartList />}></Route>
            {/* <Route path="add-cart" element={<AddCart />}></Route> */}
          </Route>

          <Route path="comment-list">
            <Route index element={<CommentList />}></Route>
            <Route path="add-comment" element={<AddComment />}></Route>
          </Route>

          <Route path="image-list">
            <Route index element={<ImageList />}></Route>
            <Route path="add-image" element={<AddImage />}></Route>
          </Route>

          <Route path="invoice-list">
            <Route index element={<InvoiceList />}></Route>
            <Route path="add-invoice" element={<AddInvoice />}></Route>
          </Route>

          <Route path="slide-show-list">
            <Route index element={<SlideShowList />}></Route>
            <Route path="add-slide-show" element={<AddSlideShow />}></Route>
          </Route>

          <Route path="mod-phone-list">
            <Route index element={<ModPhoneList />}></Route>
            <Route path="add-mod-phone" element={<AddModPhone />}></Route>
            <Route path="edit-mod-phone/:id" element={<EditModPhone />}></Route>
          </Route>

          <Route path="payment-method-list">
            <Route index element={<PaymentMethodList />}></Route>
            <Route path="add-payment-method" element={<AddPaymentMethod />}></Route>
          </Route>

          <Route path="phone-list">
            <Route index element={<PhoneList />}></Route>
            <Route path="add-phone" element={<AddPhone />}></Route>
            <Route path="edit-phone/:id" element={<EditPhone />}></Route>
          </Route>

          <Route path="promotion-list">
            <Route index element={<PromotionList />}></Route>
            <Route path="add-promotion" element={<AddPromotion />}></Route>
          </Route>

          <Route path="user-list">
            <Route index element={<UserList />}></Route>
            <Route path="add-user" element={<AddUserAdmin />}></Route>
          </Route>

          <Route path="vote-list">
            <Route index element={<VoteList />}></Route>
            <Route path="add-vote" element={<AddVote />}></Route>
          </Route>

          <Route path="wish-list">
            <Route index element={<WishList />}></Route>
            <Route path="add-wish-list" element={<AddWishList />}></Route>
          </Route>
        </Route>
        <Route path="/">
          <Route index element={<Home />}></Route>
          <Route path="/details/:id" element={<Detail />} />
          {/* Set a default route */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Home />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
