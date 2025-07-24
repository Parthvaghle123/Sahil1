import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Added navigate hook
import axios from "axios";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    address: "",
    paymentMethod: "COD",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:3001/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCartItems(res.data.cart);
    const total = res.data.cart.reduce((sum, item) => sum + item.total, 0);
    setTotalAmount(total);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateQuantity = async (productId, action) => {
    const token = localStorage.getItem("token");
    await axios.put(
      `http://localhost:3001/update-quantity/${productId}`,
      { action },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchCart();
  };

  const removeFromCart = async (productId) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:3001/remove-from-cart/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCart();
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:3001/order", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/order-success"); // ✅ Navigate to loader route
    } catch (err) {
      console.error("Order failed", err);
      alert("❌ Order failed");
    }
  };
  return (
    <div className="container mt-5">
      {cartItems.length === 0 ? (
        <div className="alert alert-warning text-center">
          🛒 Your cart is empty.
        </div>
      ) : (
        <div className="row g-4">
          {/* Cart Table */}
          <div className="col-lg-8">
            <div className="table-responsive card-custom">
              <table className="table table-bordered align-middle text-center">
                <thead className="table-dark">
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.productId}>
                      <td>
                        <img
                          src={item.image}
                          alt={item.title}
                          width="60"
                          className="img-fluid rounded"
                        />
                      </td>
                      <td>{item.title}</td>
                      <td>₹{item.price}</td>
                      <td>
                        <div className="d-flex justify-content-center align-items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, "decrease")
                            }
                            className="btn btn-outline-danger btn-sm"
                          >
                            −
                          </button>
                          <span className="fw-bold">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, "increase")
                            }
                            className="btn btn-outline-success btn-sm"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>₹{item.total}</td>
                      <td>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="btn btn-danger btn-sm w-75"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Form */}
          <div className="col-lg-4 mb-3">
            <div className="card p-4 shadow card-custom">
              <h5 className="mb-3 text-center h5">Order Summary</h5>
              <div className="d-flex justify-content-between mb-3 fs-5">
                <span>Total:</span>
                <span>₹{totalAmount}</span>
              </div>
              <hr />
              <form onSubmit={placeOrder}>
                <div className="mb-3">
                  <label className="form-label">Email ID</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <div className="input-group">
                    <select className="form-select" style={{ maxWidth: "100px" }} required>
                      <option value="+91">+91 🇮🇳</option>
                      <option value="+1">+1 🇺🇸</option>
                      <option value="+44">+44 🇬🇧</option>
                      <option value="+81">+81 🇯🇵</option>
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control"placeholder="1234567890"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Shipping Address</label>
                  <textarea
                    name="address"
                    className="form-control"
                    placeholder="Enter your address"
                    rows="2"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Payment Method</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={formData.paymentMethod === "COD"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Cash on Delivery</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      value="Card"
                      checked={formData.paymentMethod === "Card"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Card Payment</label>
                  </div>
                </div>

                {/* Card Fields */}
                {formData.paymentMethod === "Card" && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        className="form-control"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Expiry</label>
                      <input
                        type="text"
                        name="expiry"
                        className="form-control"
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">CVV</label>
                      <input
                        type="password"
                        name="cvv"
                        className="form-control"
                        placeholder="***"
                        maxLength="4"
                        value={formData.cvv}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </>
                )}

                <button type="submit" className="btn6 rounded fw-bold w-100">
                  Order Now
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
