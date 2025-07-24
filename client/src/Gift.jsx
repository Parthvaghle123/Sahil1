import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Gift.css";
import axios from "axios";
const products = [
  {
    id: 0,
    image:
      "https://preprodtsbstorage.blob.core.windows.net/cms/uploads/TSB_GC_indiacard_1_1_28dafb2bb6.png",
    title: "India Exclusive",
    per: "Bring in the festive season and make each celebration memorable.",
  },
  {
    id: 1,
    image:
      "https://preprodtsbstorage.blob.core.windows.net/cms/uploads/71d3780c_be6e_46b1_ab01_8a2bce244a7f_1_1_2d1afadaa0.png",
    title: "Starbucks Coffee",
    per: " Starbucks is best when shared. Treat your pals to a good cup of coffee.",
  },
  {
    id: 2,
    image:
      "https://preprodtsbstorage.blob.core.windows.net/cms/uploads/7c6f7c64_3f89_4ba2_9af8_45fc6d94ad35_1_1bdd3bf075.webp",
    title: "Keep Me Warm",
    per: "  Captivating, cosy, coffee. Gift your loved ones this Starbucks Gift Card.",
  },
  {
    id: 3,
    image:
      "https://preprodtsbstorage.blob.core.windows.net/cms/uploads/ff96761f_7c0a_4960_84a8_2a94c7d994fc_f59ad13bec.png",
    title: "Good Things Ahe",
    per: "Have a cup of coffee, its all good from here.",
  },
  {
    id: 4,
    image:
      "https://preprodtsbstorage.blob.core.windows.net/cms/uploads/2822e4c5_38ff_422a_a225_cfc3a6bdfc06_1_fdcaafd8bd.png",
    title: "My Treat",
    per: "  Nothing like a cup of coffee to flame a friendship. Share the experience with your..",
  },
  {
    id: 5,
    image:
      "https://preprodtsbstorage.blob.core.windows.net/cms/uploads/61c1abaf_3b0f_48af_903e_426c1b9dae41_1_9a59b0ea34.webp",
    title: "Way To Go",
    per: " Its time to celebrate! Show your appreciation with this Starbucks Gift Card.",
  },
  {
    id: 6,
    image:
      "https://preprodtsbstorage.blob.core.windows.net/cms/uploads/49bc224d_6ad8_46db_a46f_9ce256321659_1_2d7d101557.png",
    title: "Greetings",
    per: "Let each 'hello' be one with coffee.",
  },
  {
    id: 7,
    image:
      "https://preprodtsbstorage.blob.core.windows.net/cms/uploads/483b8a72_214b_47d4_81a1_ad9187f5f50b_1_a449d5551b.png",
    title: "Global Spring Card",
    per: "   Blissful, blooming, and bright. Spring is a merry time. Keep things fresh and lively.",
  },
  {
    id: 8,
    image:
      "https://preprodtsbstorage.blob.core.windows.net/cms/uploads/10471f55_db43_4633_8f4a_a2b8408abeea_1_dc2f4669f7.webp",
    title: "Are The Best Just Sayin",
    per: "Think theyre the Nitro to your Brew? Let them know..",
  },
  {
    id: 9,
    image:
      "https://preprodtsbstorage.blob.core.windows.net/cms/uploads/97ee3280_2f05_43ad_bd94_f5c184d4f502_1_0a31455af9.png",
    title: "Congrats",
    per: "   Coffee. Cheer. Celebrate. Enjoy each of your special moments withStarbucks.",
  },
  {
    id: 10,
    image:
      "https://preprodtsbstorage.blob.core.windows.net/cms/uploads/720b9684_c1ac_49cb_92fe_a7e0240c9602_1_1_faf8b923e5.webp",
    title: "Thank You",
    per: "To the people who make coffee and those who love it, thank you..",
  },
  {
    id: 11,
    image:
      "https://preprodtsbstorage.blob.core.windows.net/cms/uploads/0807fba8_293b_407b_a973_c5eaad1c73fa_1_11692c064d.png",
    title: "Life Happens",
    per: "Life happens, coffee helps. Brighten up their day with Starbucks.",
  },
];

const Item = ({ setCartCount }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem("token");

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
      }, 1000);
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
          price: 100, // default price
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
          <h3 className="mt-4 text text-dark head">Anytime</h3>
          <hr className="mb-4" />

          {loading ? (
            <div className="alert alert-info text-center">🔄 Searching...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="alert alert-warning text-center">
              ❌ No products found.
            </div>
          ) : (
            <div id="products2">
              {filteredProducts.map((item) => (
                <div key={item.id} className="box1">
                  <div className="img-box1">
                    <img
                      className="images1"
                      src={item.image}
                      alt={item.title}
                    />
                  </div>
                  <div className="bottom">
                    <h2>{item.title}</h2>
                    <h4>{item.per}.00</h4>
                    <button
                      className="btn3 btn btn-secondary"
                      disabled
                      onClick={() => addToCart(item)}
                    >
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
