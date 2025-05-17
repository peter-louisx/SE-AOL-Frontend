import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import ProductListing from "./pages/Products";
import BrandDetail from "./pages/BrandDetail";
import ScrollToTop from "./components/ScrollToTop";
import GreenGame from "./components/GreenGame";
import BuyerLayout from "./components/BuyerLayout";
import About from "./pages/About"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Register from "./pages/Register";
import CustomerAccount from "./pages/CustomerAcount";
import Order from "./pages/Order";

// seller's
import SellerLayout from "./components/seller/Layout";
import SDashboard from "./pages/seller/Dashboard";
import SProducts from "./pages/seller/Products";
import SOrders from "./pages/seller/Orders";
import SOrderDetail from "./pages/seller/OrderDetail";
import SAccount from "./pages/seller/Account";
import SWithdrawal from "./pages/seller/Withdrawal";
import { AppProvider } from "./context/AppContext";

// Blog
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";

// buyer
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
      <Route element={<BuyerLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/products" element={<ProductListing />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/brand/:id" element={<BrandDetail />} />
            <Route path="/green-game" element={<GreenGame />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<CustomerAccount />} />
            <Route path="/order" element={<Order />} />
          </Route>

        <Route path="/seller" element={<SellerLayout />}>
          <Route path="/seller/dashboard" element={<SDashboard />} />
          <Route path="/seller/products" element={<SProducts />} />
          <Route path="/seller/orders" element={<SOrders />} />
          <Route path="/seller/orders/:id" element={<SOrderDetail />} />
          <Route path="/seller/account" element={<SAccount />} />
          <Route path="/seller/withdrawal" element={<SWithdrawal />} />
        </Route>
      </Routes>
    </Router>
  );
}

{/* // seller
// function App() {
//   return (
//     <AppProvider>
//       <Router>
//         <Routes>
//           <Route path="/seller" element={<SellerLayout />}>
//             <Route path="/seller" element={<SDashboard />} />
//             <Route path="/seller/products" element={<SProducts />} />
//             <Route path="/seller/orders" element={<SOrders />} />
//             <Route path="/seller/orders/:id" element={<SOrderDetail />} />
//             <Route path="/seller/account" element={<SAccount />} />
//             <Route path="/seller/withdrawal" element={<SWithdrawal />} />
//           </Route>
//         </Routes>
//       </Router>
//     </AppProvider>
//   );
// } */}

export default App;
