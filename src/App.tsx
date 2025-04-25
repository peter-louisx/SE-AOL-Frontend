import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import ProductListing from "./pages/Products";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
