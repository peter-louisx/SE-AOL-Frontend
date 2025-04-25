import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import ProtectedRoute from "./auth/ProtectedRoute";
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
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/products" element={<ProductListing />} />
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
