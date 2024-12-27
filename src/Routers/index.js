import { Route, Routes, BrowserRouter } from "react-router-dom";

import AdminLogin from "../Screens/Auth/Login";
import ForgetPassword from "../Screens/Auth/ForgetPassword";
import ForgetPassword2 from "../Screens/Auth/ForgetPassword2";
import ForgetPassword3 from "../Screens/Auth/ForgetPassword3";
import { Dashboard } from "../Screens/Dashboard";

// import { BookManagement } from "../Screens/BookManagement";
// import { AddBook } from "../Screens/BookManagement/AddBook";
// import { BookDetails } from "../Screens/BookManagement/BookDetail";
// import { EditBook } from "../Screens/BookManagement/EditBook";

import { ProductManagement } from "../Screens/ProductManagement";
import { GalleryManagement } from "../Screens/GalleryManagement";
import { AddProduct } from "../Screens/ProductManagement/AddProduct";
import { EditProduct } from "../Screens/ProductManagement/EditProduct";
import { ProductDetails } from "../Screens/ProductManagement/ProductDetail";

import { OrderManagement } from "../Screens/OrderManagement";

// import { MenuManagement } from "../Screens/MenuManagement";
// import { AddMenu } from "../Screens/MenuManagement/AddMenu";
// import { EditMenu } from "../Screens/MenuManagement/EditMenu";

import { CustomiseMenu } from "../Screens/CustomiseMenu";
import { AddMenu } from "../Screens/CustomiseMenu/AddMenu";
import { EditMenu } from "../Screens/CustomiseMenu/EditMenu";
import { CustomerSupport } from "../Screens/CustomerSupport";
import { CurrencyManagement } from "../Screens/CurrencyManagement";
import { ZipCode } from "../Screens/ZipCode";

// end

import Profile from "../Screens/Profile";
import EditProfile from "../Screens/Profile/EditProfile";
import ChangePassword from "../Screens/Profile/ChangePassword";
import { ProtectedRoutes } from "./ProtectedRoutes";
import Error from "../Screens/Error";
import { BlogManagement } from "../Screens/BlogManagement";
import { AddBlog } from "../Screens/BlogManagement/AddProduct";
import { PortfolioManagement } from "../Screens/PortfolioManagement";
import { AddPortfolio } from "../Screens/PortfolioManagement/AddProduct";
import { CategoryManagement } from "../Screens/CategoryManagement";
import { ColorManagement } from "../Screens/ColorManagement";
import { AddCategory } from "../Screens/CategoryManagement/AddProduct";
import { AddColor } from "../Screens/ColorManagement/AddProduct";
import { EditColor } from "../Screens/ColorManagement/EditProduct";

export default function AdminRouter() {
  return (
    <BrowserRouter basename="/flairis-admin">
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/forget-password2" element={<ForgetPassword2 />} />
        <Route path="/forget-password3" element={<ForgetPassword3 />} />

        {/* <Route path="/dashboard" element={<ProtectedRoutes Components={Dashboard} />} /> */}
        <Route
          path="/dashboard"
          element={<ProtectedRoutes Components={Dashboard} />}
        />
        <Route
          path="/product-management"
          element={<ProtectedRoutes Components={ProductManagement} />}
        />

        <Route
          path="/category-management"
          element={<ProtectedRoutes Components={CategoryManagement} />}
        />
        <Route
          path="/add-category"
          element={<ProtectedRoutes Components={AddCategory} />}
        />
        <Route
          path="/add-color"
          element={<ProtectedRoutes Components={AddColor} />}
        />
        <Route
          path="/color-management"
          element={<ProtectedRoutes Components={ColorManagement} />}
        />
        <Route
          path="/edit-color/:id"
          element={<ProtectedRoutes Components={EditColor} />}
        />

        <Route
          path="/portfolio-management"
          element={<ProtectedRoutes Components={PortfolioManagement} />}
        />

        <Route
          path="/add-portfolio"
          element={<ProtectedRoutes Components={AddPortfolio} />}
        />
        <Route
          path="/blogs-management"
          element={<ProtectedRoutes Components={BlogManagement} />}
        />
        <Route
          path="/add-blog"
          element={<ProtectedRoutes Components={AddBlog} />}
        />
        <Route
          path="/gallery-management"
          element={<ProtectedRoutes Components={GalleryManagement} />}
        />
        <Route
          path="/add-product"
          element={<ProtectedRoutes Components={AddProduct} />}
        />

        <Route
          path="/product-management"
          element={<ProtectedRoutes Components={ProductDetails} />}
        />
        <Route
          path="/product-management/edit-product/:id"
          element={<ProtectedRoutes Components={EditProduct} />}
        />

        <Route
          path="/order-management"
          element={<ProtectedRoutes Components={OrderManagement} />}
        />

        <Route
          path="/customise-menu"
          element={<ProtectedRoutes Components={CustomiseMenu} />}
        />
        <Route
          path="/add-menu"
          element={<ProtectedRoutes Components={AddMenu} />}
        />
        {/* <Route path="/menu-management/menu-details/:id" element={<ProtectedRoutes Components={menuDetails} />} /> */}
        <Route
          path="/customise-menu/edit-menu/:id"
          element={<ProtectedRoutes Components={EditMenu} />}
        />

        <Route
          path="/zipcode-list"
          element={<ProtectedRoutes Components={ZipCode} />}
        />

        <Route
          path="/customer-support"
          element={<ProtectedRoutes Components={CustomerSupport} />}
        />
        <Route
          path="/currency-management"
          element={<ProtectedRoutes Components={CurrencyManagement} />}
        />

        <Route
          path="/profile"
          element={<ProtectedRoutes Components={Profile} />}
        />
        <Route
          path="/profile/edit-profile"
          element={<ProtectedRoutes Components={EditProfile} />}
        />
        <Route path="/profile/change-password" element={<ChangePassword />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
