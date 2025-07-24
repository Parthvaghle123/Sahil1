const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Cart = require("./models/Cart");
const Order = require("./models/Order");
const app = express();
const SECRET_KEY = "your_secret_key";

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));

// Connect MongoDB
mongoose.connect("mongodb://localhost:27017/Parth2")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error", err));

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token required" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) return res.json({ message: "No user found" });
  if (user.password !== password) return res.json({ message: "Password incorrect" });

  const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, {
    expiresIn: "365d",
  });

  res.json({ message: "Success", token, username: user.username });
});

// Register
app.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const newUser = await User.create(req.body);
    res.status(200).json({ success: true, user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
});

// Add to cart
app.post("/add-to-cart", authenticateToken, async (req, res) => {
  const { productId, image, title, price } = req.body;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find((item) => item.productId === productId);

    if (existingItem) {
      return res.status(400).json({ message: "Item already in cart" });
    } else {
      cart.items.push({ productId, image, title, price, quantity: 1 });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart" });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
});

// Get cart
app.get("/cart", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.json({ cart: [] });

    const fullCart = cart.items.map(item => ({
      ...item._doc,
      total: item.price * item.quantity
    }));

    res.json({ cart: fullCart });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
});

// Cart count route
app.get("/cart-count", authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });
    const count = cart ? cart.items.length : 0;
    res.status(200).json({ count });
  } catch (err) {
    console.error("Cart count error:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// Update quantity
app.put("/update-quantity/:productId", authenticateToken, async (req, res) => {
  const { productId } = req.params;
  const { action } = req.body;
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });
    const item = cart.items.find((item) => item.productId === productId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (action === "increase") item.quantity += 1;
    if (action === "decrease") item.quantity -= 1;

    if (item.quantity <= 0) {
      cart.items = cart.items.filter((i) => i.productId !== productId);
    }

    await cart.save();
    res.status(200).json({ message: "Quantity updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove from cart
app.delete("/remove-from-cart/:productId", authenticateToken, async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });
    cart.items = cart.items.filter((item) => item.productId !== productId);
    await cart.save();
    res.status(200).json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Place order
app.post("/order", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { email, phone, address, paymentMethod, cardNumber, expiry } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const user = await User.findById(userId);
    const order = new Order({
      username: user.username,
      email,
      phone,
      address,
      paymentMethod,
      payment_details: {
        cardNumber: paymentMethod === "Card" ? cardNumber : null,
        expiry: paymentMethod === "Card" ? expiry : null,
      },
      items: cart.items,
    });

    await order.save();
    await Cart.findOneAndUpdate({ userId }, { items: [] });

    res.status(200).json({ message: "Order placed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Order error", error: err.message });
  }
});

// Fetch orders
app.get("/orders", authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find({ username: req.user.username }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// Cancel order
app.put("/api/cancel-order/:orderId", authenticateToken, async (req, res) => {
  const { orderId } = req.params;
  const { reason } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.username !== req.user.username) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (order.status === "Cancelled") {
      return res.status(400).json({ message: "Order already cancelled" });
    }

    order.status = "Cancelled";
    order.cancelReason = reason;
    order.items.forEach(item => item.status = "Cancelled");

    await order.save();
    res.status(200).json({ message: "Order cancelled successfully" });
  } catch (err) {
    res.status(500).json({ message: "Cancel error", error: err.message });
  }
});

// Start server
app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});