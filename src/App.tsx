import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import ProductListing from "./pages/Products";
import BrandDetail from "./pages/BrandDetail";
import ScrollToTop from "./components/ScrollToTop";
import GreenGame from "./components/GreenGame";

// seller's
import Layout from './components/seller/Layout';
import SDashboard from './pages/seller/Dashboard';
import SProducts from './pages/seller/Products';
import SOrders from './pages/seller/Orders';
import SAddProduct from './pages/seller/AddProduct';
import { AppProvider } from './context/AppContext';

// Blog
import Blog from "./pages/Blog";
import BlogDetail from './pages/BlogDetail';

// buyer
function App() {
  return (
    <Router>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/brand/:id" element={<BrandDetail />} />
        <Route path="/green-game" element={<GreenGame />} />
        
      </Routes>
      <Footer />
    </Router>
  );
}

// seller
// function App() {
//   return (
//     <AppProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Layout />}>
//             <Route index element={<SDashboard />} />
//             <Route path="products" element={<SProducts />} />
//             <Route path="products/add" element={<SAddProduct />} />
//             <Route path="orders" element={<SOrders />} />
//           </Route>
//         </Routes>
//       </Router>
//     </AppProvider>
//   );
// }

// Blog
// function App() {
//   return (
//     <Router>
//       <Header />
//       <Routes>
//       <Route path="/" element={<Landing />} />
//         <Route path="/blog" element={<Blog />} />
//         <Route path="/blog/:id" element={<BlogDetail />} />
//       </Routes>
//       <Footer />
//     </Router>
//   );
// }

export default App;
