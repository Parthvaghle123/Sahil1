import React from "react";
import Images from "./images";
// import "./Home.css";
import Item from "./Item";
const Home = () => {
  return (
    <>
      {/* Carousel Section */}
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div
              id="carouselExampleControls"
              className="carousel slide mt-5"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="https://cdn.sbux.com.my/media/bc78f7ce-b47d-43e3-b297-14543013d3a8.jpg"
                    className="d-block w-100 img-fluid"
                    style={{ maxHeight: "400px", objectFit: "cover" }}
                    alt="carousel 1"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://cdn.sbux.com.my/media/34163518-78f9-4a5e-afba-3d969535f4c8.webp"
                    className="d-block w-100 img-fluid"
                    style={{ maxHeight: "400px", objectFit: "cover" }}
                    alt="carousel 2"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://pbs.twimg.com/media/EhpesVAWsAE7Tmj.jpg"
                    className="d-block w-100 img-fluid"
                    style={{ maxHeight: "400px", objectFit: "cover" }}
                    alt="carousel 3"
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon"></span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Handcrafted Section */}
      <div className="Herosection_1">
        <div className="container">
          <h3 className="mt-5 pt-3 text-success head fst-italic">
            Handcrafted Curations
          </h3>
          <Images />
        </div>
      </div>

      <div className="Herosection_2">
        <div className="container">
          <h3 className="mt-2 pt-4 text-success head fst-italic">
            Barista Recommends
          </h3>
          <Item />
        </div>
      </div>

      <div className="Herosection_3 mt-4">
        <div className="container">
          <h3 className="mt-3 pt-4 text-success head fst-italic">
            Learn more about the world of coffee!
          </h3>
          <div className="card bg-dark text-white mt-4 mb-4">
            <img
              src="https://preprodtsbstorage.blob.core.windows.net/cms/uploads/ICW_Live_Event_Day5_41f11ca3d2.jpg"
              className="card-img"
              height="400px"
              alt="coffee event"
            />
            <div
              className="card-img-overlay"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
              <h5 className="card-title fs-4 ms-4 fst-italic fw-bold">
                Art & Science Of Coffee Brewing
              </h5>
              <p className="card-text ms-4 fst-italic fw-blold">
                Master the perfect brew with starbucks! Learn the art and
                science of coffee brewing.
              </p>
            </div>
          </div>
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

export default Home;
