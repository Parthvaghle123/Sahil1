import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // IMPORT કરો
import "bootstrap/dist/css/bootstrap.min.css";
import "./Menu.css";
import axios from "axios";

const products = [
  {
    id: 0,
    image:
      "https://starbucksstatic.cognizantorderserv.com/Items/Small/105468.jpg",
    title: "Cold Drink",
    per: "Our signature rich in flavour espresso blended with delicate...",
    price: 299,
  },
  {
    id: 1,
    image:
      "https://starbucksstatic.cognizantorderserv.com/Items/Small/101729.png",
    title: "Smoked Chicken",
    per: " A hearty Smoked Chicken & Salami Sandwich with tender smoked...",
    price: 399,
  },
  {
    id: 2,
    image:
      "https://starbucksstatic.cognizantorderserv.com/Items/Small/100433.jpg",
    title: "Cold Coffee",
    per: "  Captivating, cosy, coffee. Gift your loved ones this Starbucks Gift Card.",
    price: 278,
  },
  {
    id: 3,
    image:
      "https://starbucksstatic.cognizantorderserv.com/Items/Small/114059.jpg",
    title: "Kosha Mangsho Wrap",
    per: "A traditional mutton preparation packed in a parantha...",
    price: 367,
  },
  {
    id: 4,
    image:
      "https://starbucksstatic.cognizantorderserv.com/Items/Small/103515.jpg",
    title: "Double Frappuccino",
    per: "  Rich mocha-flavored sauce meets up with chocolaty chips, mil...",
    price: 420,
  },
  {
    id: 5,
    image:
      "https://starbucksstatic.cognizantorderserv.com/Items/Small/100100_1.png",
    title: "Chicken  Sandwich",
    per: " Marinated tandoori paneer filling, sliced cheese, and whole...",
    price: 283,
  },
  {
    id: 6,
    image:
      "https://starbucksstatic.cognizantorderserv.com/Items/Small/115751_1.png",
    title: "Cookie Creme Latte",
    per: " Handcrafted espresso from the world's top 3% Arabica with st...",
    price: 430,
  },
  {
    id: 7,
    image:
      "https://starbucksstatic.cognizantorderserv.com/Items/Small/115838.png",
    title: "Tandoori Paneer sandwich",
    per: "  A fusion of tandoori paneer in a deliciously grilled sourdou...",
    price: 446,
  },
  {
    id: 8,
    image:
      "https://starbucksstatic.cognizantorderserv.com/Items/Small/115986.png",
    title: "Classic Hot Coffee",
    per: "Savour our premium coffee made with top 3% Arabica beans in ...",
    price: 157,
  },
  {
    id: 9,
    image:
      "https://starbucksstatic.cognizantorderserv.com/Items/Small/100075.jpg",
    title: "Blueberry Muffin",
    per: " Buttery vanilla cake with berries dusted with granulated sug...",
    price: 330,
  },
  {
    id: 10,
    image:
      "https://starbucksstatic.cognizantorderserv.com/Items/Small/103973.jpg",
    title: "Flat White",
    per: "Expertly steamed milk poured over shots of ristretto and fin...",
    price: 330,
  },
  {
    id: 11,
    image:
      "https://starbucksstatic.cognizantorderserv.com/Items/Small/103689.jpg",
    title: "Banana Chocolate Loaf Cake",
    per: "English tea cake with rich taste of banana and chocolate...",
    price: 351,
  },
];

const Item = ({ setCartCount }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem("token"); // JWT stored here

  // Search query થી products filter
  useEffect(() => {
    const query =
      new URLSearchParams(location.search).get("q")?.toLowerCase() || "";
    if (query) {
      setLoading(true);
      setTimeout(() => {
        const filtered = products.filter((item) =>
          item.title.toLowerCase().includes(query)
        );
        setFilteredProducts(filtered);
        setLoading(false);
      }, 1000); // simulated loading
    } else {
      setFilteredProducts(products);
    }
  }, [location.search]);

  const addToCart = async (product) => {
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Item added to cart");
          setCartCount(prev => prev + 1); // ✅ live update
    } catch (error) {
      console.error(error);
      alert("Error adding item");
    }
  };

  return (
    <>
      <div className="Herosection_1">
        <div className="container">
          {loading ? (
            <div className="alert alert-info text-center">🔄 Searching...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="alert alert-warning text-center">
              ❌ No products found.
            </div>
          ) : (
            <div id="products3">
              {filteredProducts.map((item) => (
                <div key={item.id} className="box2">
                  <div className="img-box1">
                    <img className="images" src={item.image} alt={item.title} />
                  </div>
                  <div className="bottom">
                    <h2>{item.title}</h2>
                    <h4>{item.per}</h4>
                    <h3>₹{item.price}.00</h3>
                    <button className="btn3 " onClick={() => addToCart(item)}>
                      Add Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-dark text-white pt-5 pb-4">
        <div className="container text-center text-md-start">
          <div className="row">
            {/* About Us */}
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
              <h5 className="text-uppercase fw-bold text-warning mb-4">
                About Us
              </h5>
              <p>
                <a href="#" className="text-white text-decoration-none">
                  Our Heritage
                </a>
              </p>
              <p>
                <a href="#" className="text-white text-decoration-none">
                  Coffeehouse
                </a>
              </p>
              <p>
                <a href="#" className="text-white text-decoration-none">
                  Our Company
                </a>
              </p>
            </div>

            {/* Responsibility */}
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
              <h5 className="text-uppercase fw-bold text-warning mb-4">
                Responsibility
              </h5>
              <p>
                <a href="#" className="text-white text-decoration-none">
                  Diversity
                </a>
              </p>
              <p>
                <a href="#" className="text-white text-decoration-none">
                  Community
                </a>
              </p>
              <p>
                <a href="#" className="text-white text-decoration-none">
                  Ethical Sourcing
                </a>
              </p>
              <p>
                <a href="#" className="text-white text-decoration-none">
                  Environmental Stewardship
                </a>
              </p>
              <p>
                <a href="#" className="text-white text-decoration-none">
                  Learn More
                </a>
              </p>
            </div>

            {/* Quick Links */}
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
              <h5 className="text-uppercase fw-bold text-warning mb-4">
                Quick Links
              </h5>
              <p>
                <a href="#" className="text-white text-decoration-none">
                  Privacy Policy
                </a>
              </p>
              <p>
                <a href="#" className="text-white text-decoration-none">
                  FAQs
                </a>
              </p>
              <p>
                <a href="#" className="text-white text-decoration-none">
                  Delivery
                </a>
              </p>
              <p>
                <a href="#" className="text-white text-decoration-none">
                  Season's Gifting
                </a>
              </p>
              <p>
                <a href="#" className="text-white text-decoration-none">
                  Customer Service
                </a>
              </p>
            </div>

            {/* Contact Info */}
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
              <h5 className="text-uppercase fw-bold text-warning mb-4">
                Contact
              </h5>
              <p>
                <i className="fas fa-home me-2"></i> Surat, Gujarat
              </p>
              <p>
                <i className="far fa-envelope me-2"></i>{" "}
                vaghlaparth2005@gmail.com
              </p>
              <p>
                <i className="fas fa-phone me-2"></i> +91 8735035021
              </p>
            </div>
          </div>

          <hr className="mb-4" />

          <div className="row align-items-center">
            <div className="col-md-6 col-lg-8 mb-3 mb-md-0">
              <p className="mb-0 fw-bold">
                Owned by:{" "}
                <strong className="text-warning">Parth Vaghela</strong>
              </p>
            </div>
            <div className="col-md-6 col-lg-4 text-center text-md-end">
              <ul className="list-inline mb-0">
                <li className="list-inline-item">
                  <a href="#" className="text-white fs-5">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#" className="text-white fs-5">
                    <i className="fab fa-x-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#" className="text-white fs-5">
                    <i className="fab fa-google-plus-g"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#" className="text-white fs-5">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#" className="text-white fs-5">
                    <i className="fab fa-youtube"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Item;
