import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Order.css"; // Optional custom styles

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3001/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data.orders || res.data))
      .catch((err) => console.error("Error fetching orders", err));
  };

const handleCancel = async () => {
  const token = localStorage.getItem("token");
  const reasonToSend = cancelReason === "Other" ? customReason : cancelReason;

  if (!reasonToSend.trim()) {
    alert("Please enter a reason");
    return;
  }

  try {
    await axios.put(
      `http://localhost:3001/api/cancel-order/${cancelOrderId}`,
      { reason: reasonToSend },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    alert("Order cancelled successfully");
    setCancelOrderId(null);
    setCancelReason("");
    setCustomReason("");
    fetchOrders();
  } catch (err) {
    console.error(err);
    alert("Cancel failed");
  }
};


  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 text-primary fw-bold">🧾 My Orders</h2>

      {orders.length === 0 ? (
        <div className="alert alert-info text-center">
          <i className="fas fa-box-open me-1"></i> No orders found!
        </div>
      ) : (
        orders.map((order, index) => {
          const grandTotal = order.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );

          return (
            <div
              key={order._id || index}
              className={`card shadow-sm mb-4 border-start border-4 border-${
                order.status === "Cancelled"
                  ? "danger"
                  : order.status === "Approved"
                  ? "success"
                  : "warning"
              }`}
            >
              {/* Header */}
              <div className="card-header bg-light d-flex justify-content-between align-items-center flex-wrap">
                <div className="d-flex align-items-center mb-2 mb-md-0">
                  <i className="fas fa-hashtag me-1 text-secondary"></i>
                  <strong>Order ID:</strong>&nbsp;{order._id}
                </div>
                <div className="d-flex align-items-center mb-2 mb-md-0">
                  <i className="fas fa-calendar-alt me-1 text-secondary"></i>
                  <strong>Date:</strong>&nbsp;
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>
                <div className="d-flex align-items-center">
                  <strong>Status:</strong>&nbsp;
                  <span className={`badge bg-${
                    order.status === "Cancelled"
                      ? "danger"
                      : order.status === "Approved"
                      ? "success"
                      : "warning"
                  }`}>
                    {order.status}
                  </span>
                  {order.status === "Approved" && (
                    <button
                      className="btn btn-sm btn-outline-danger ms-2 fw-bold"
                      data-bs-toggle="modal"
                      data-bs-target="#cancelModal"
                      onClick={() => {
                        setCancelOrderId(order._id);
                        setCancelReason("");
                        setCustomReason("");
                      }}
                    >
                      <i className="fas fa-ban me-1"></i>Cancel
                    </button>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-md-6 mb-2">
                    <i className="fas fa-envelope me-1 "></i>
                    <strong>Email:</strong> {order.email}
                  </div>
                  <div className="col-md-6 mb-2">
                    <i className="fas fa-phone me-1 "></i>
                    <strong>Phone:</strong> {order.phone}
                  </div>
                  <div className="col-md-6 mb-2">
                    <i className="fas fa-map-marker-alt me-1 "></i>
                    <strong>Address:</strong> {order.address}
                  </div>
                  <div className="col-md-6 mb-2">
                    <i className="fas fa-credit-card me-1"></i>
                    <strong>Payment Mode:</strong> {order.paymentMethod}
                  </div>
                </div>

                {order.status === "Cancelled" && order.cancelReason && (
                  <div className="text-danger mt-2 fw-semibold">
                    <i className="fas fa-times-circle me-1"></i>
                    <strong>Cancel Reason:</strong> {order.cancelReason}
                  </div>
                )}

                {/* Items Table */}
                <div className="table-responsive mt-3">
                  <table className="table table-bordered text-center align-middle">
                    <thead className="table-dark">
                      <tr>
                        <th>Item</th>
                        <th>Price (₹)</th>
                        <th>Qty</th>
                        <th>Status</th>
                        <th>Total (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, i) => (
                        <tr key={i}>
                          <td>{item.title}</td>
                          <td>₹{item.price.toFixed(2)}</td>
                          <td>{item.quantity}</td>
                          <td>
                            <span className={`badge bg-${
                              item.status === "Cancelled" ? "danger" : "success"
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                      <tr className="table-secondary fw-bold">
                        <td colSpan="4" className="text-end">Grand Total</td>
                        <td className="fs-5 text-success">₹{grandTotal.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })
      )}

      {/* Cancel Modal */}
      <div className="modal fade" id="cancelModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <form onSubmit={handleCancel} className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Cancel Order</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              {[
                "Wrong contact number entered",
                "Wrong address selected",
                "Ordered by mistake",
                "Expected delivery time is too long",
                "Other"
              ].map((reason) => (
                <div className="form-check" key={reason}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="cancel_reason"
                    value={reason}
                    checked={cancelReason === reason}
                    onChange={(e) => setCancelReason(e.target.value)}
                  />
                  <label className="form-check-label">{reason}</label>
                </div>
              ))}
              {cancelReason === "Other" && (
                <textarea
                  className="form-control mt-2"
                  placeholder="Write your reason..."
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                />
              )}
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-danger fw-bold">
                Submit Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Orders;
