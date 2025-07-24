import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import axios from "axios";

// Static Products List
const products1 = [
  { id: 0, image: "https://starbucksstatic.cognizantorderserv.com/Items/Small/webP/104997.webp", title: "Cold Brew Black", price: 299 },
  { id: 1, image: "https://starbucksstatic.cognizantorderserv.com/Items/Small/webP/100447.webp", title: "Signature Chocolate", price: 309 },
  { id: 2, image: "https://starbucksstatic.cognizantorderserv.com/Items/Small/webP/112573.webp", title: "Vanilla Milkshake", price: 378 },
  { id: 3, image: "https://starbucksstatic.cognizantorderserv.com/Items/Small/100109.jpg", title: "Murgh Kathi Wrap", price: 383 },
  { id: 4, image: "https://starbucksstatic.cognizantorderserv.com/Items/Small/100096_1.png", title: "Tomato Cheese Sandwich", price: 399 },
  { id: 5, image: "https://starbucksstatic.cognizantorderserv.com/Items/Small/107566.png", title: "Avocado Salsa Sandwich", price: 462 },
];

const Item = ({ setCartCount }) => {
  const [filteredProducts, setFilteredProducts] = useState(products1);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const query =
      new URLSearchParams(location.search).get("q")?.toLowerCase() || "";
    if (query) {
      setLoading(true);
      setTimeout(() => {
        const filtered = products1.filter((item) =>
          item.title.toLowerCase().includes(query)
        );
        setFilteredProducts(filtered);
        setLoading(false);
      }, 1000);
    } else {
      setFilteredProducts(products1);
    }
  }, [location.search]);

  const addToCart = async (product) => {
    if (!token) {
      alert("Please login to add items to cart.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3001/add-to-cart",
        {
          productId: product.id,
          image: product.image,
          title: product.title,
          price: product.price,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Item added to cart!");

      if (typeof setCartCount === "function") {
        const res = await axios.get("http://localhost:3001/cart-count", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartCount(res.data.count); // ✅ update from backend
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add item");
    }
  };

  return (
    <div className="container mt-4">
      {loading ? (
        <div className="alert alert-info text-center">🔄 Searching...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="alert alert-warning text-center">
          ❌ No products found.
        </div>
      ) : (
        <div className="container" id="products1">
          {filteredProducts.map((item) => (
            <div key={item.id} className="box">
              <div className="img-box">
                <img className="img" src={item.image} alt={item.title} />
              </div>
              <div className="bottom">
                <h2>{item.title}</h2>
                <h4 className="h4">₹{item.price}.00</h4>
                <button className="btn3" onClick={() => addToCart(item)}>
                  Add Item
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Item;
