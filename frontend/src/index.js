import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/styles/index.css";
import App from "./App";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrderListScreen from "./screens/admin/OrderListScreen";
import ProductListScreen from "./screens/admin/ProductListScreen";
import ProductEditScreen from "./screens/admin/productEditScreen";
import UserListScreen from "./screens/admin/UserListScreen";
import UserEditScreen from "./screens/admin/UserEditScreen";
import DeliveryCollectScreen from "./screens/DeliveryCollectScreen";
import MyOrderScreen from "./screens/MyOrder";
import AboutMeScreen from "./screens/AboutMeScreen";
import ContactScreen from "./screens/ContactScreen";
import NewScreen from "./screens/NewScreen";
import SaleScreen from "./screens/SaleScreen";
import OfficeScreen from "./screens/OfficeScreen";
import GamingScreen from "./screens/GamingScreen";
import ProductsScreen from "./screens/ProductsScreen";
import WishlistScreen from "./screens/WishlistScreen";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index={true} path="/" element={<HomeScreen />} />
            <Route path="/sale/page/:pageNumber" element={<SaleScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/wish" element={<WishlistScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/about" element={<AboutMeScreen />} />
            <Route path="/new/page/:pageNumber" element={<NewScreen />} />
            <Route path="/office/page/:pageNumber" element={<OfficeScreen />} />
            <Route path="/gaming/page/:pageNumber" element={<GamingScreen />} />
            <Route
                path="/products/page/:pageNumber"
                element={<ProductsScreen />}
            />
            <Route path="/sale" element={<SaleScreen />} />
            <Route path="/contact" element={<ContactScreen />} />

            <Route path="" element={<PrivateRoute />}>
                <Route path="/delivery" element={<DeliveryCollectScreen />} />
                <Route path="/address" element={<ShippingScreen />} />
                <Route path="/payment" element={<PaymentScreen />} />
                <Route path="/order" element={<MyOrderScreen />} />
                <Route path="/placeorder" element={<PlaceOrderScreen />} />
                <Route path="/order/:id" element={<OrderScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
            </Route>
            <Route path="" element={<AdminRoute />}>
                <Route path="/admin/orderlist" element={<OrderListScreen />} />
                <Route
                    path="/admin/productlist"
                    element={<ProductListScreen />}
                />
                <Route
                    path="/admin/productlist/:pageNumber"
                    element={<ProductListScreen />}
                />
                <Route
                    path="/admin/product/:id/edit"
                    element={<ProductEditScreen />}
                />
                <Route path="/admin/userlist" element={<UserListScreen />} />
                <Route
                    path="/admin/user/:id/edit"
                    element={<UserEditScreen />}
                />
            </Route>
        </Route>,
    ),
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <HelmetProvider>
            <Provider store={store}>
                <PayPalScriptProvider deferLoading={true}>
                    <RouterProvider router={router} />
                </PayPalScriptProvider>
            </Provider>
        </HelmetProvider>
    </React.StrictMode>,
);
