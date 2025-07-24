import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./Home";
import Cart from "./Cart";
import Login from "./Login";
import Signup from "./Register";
import Navbar from "./Navbar";
import Order from "./Order";
import Gift from "./Gift";
import Menu from "./Menu";
import Item from "./Item";
import OrderSuccess from "./OrderSuccess";
import axios from "axios";

const AppContent = ({ username, setUsername }) => {
  const [token, setToken] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();
  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (stored) {
      setToken(stored);
      const payload = JSON.parse(atob(stored.split(".")[1]));
      setUsername(payload.username);
    }
  }, [setUsername]);

  useEffect(() => {
    const fetchCartCount = async () => {
      if (token) {
        try {
          const res = await axios.get("http://localhost:3001/cart-count", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCartCount(res.data.count);
        } catch (err) {
          console.error("Cart count error:", err.message);
        }
      }
    };
    fetchCartCount();
  }, [token]);

  return (
    <>
      {!hideNavbar && (
        <Navbar
          username={username}
          setUsername={setUsername}
          cartCount={cartCount}
          setCartCount={setCartCount}
        />
      )}

      <Routes>
        <Route path="/" element={<Home token={token} setCartCount={setCartCount} />} />
        <Route path="/home" element={<Home token={token} setCartCount={setCartCount} />} />
        <Route path="/gift" element={<Gift token={token} setCartCount={setCartCount} />} />
        <Route path="/menu" element={<Menu token={token} setCartCount={setCartCount} />} />
        <Route path="/cart" element={<Cart token={token} setCartCount={setCartCount} />} />
        <Route path="/login" element={<Login setUsername={setUsername} />} />
        <Route path="/home" element={<Item token={token} setCartCount={setCartCount} />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/orders" element={<Order />} />
        <Route
          path="/order-success"
          element={
            <OrderSuccess
              message=" Order Successfully. Please Wait..."
              redirectUrl="/orders"
              seconds={3}
              setCartCount={setCartCount} // Reset count on success
            />
          }
        />
      </Routes>
    </>
  );
};

const App = () => {
  const [username, setUsername] = useState("");
  return (
    <Router>
      <AppContent username={username} setUsername={setUsername} />
    </Router>
  );
};

export default App;