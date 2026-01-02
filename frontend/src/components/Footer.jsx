import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/logo-footer.png";
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaClock,
} from "react-icons/fa";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black text-light pt-5">
            <Container>
                <Row className="gy-4">
                    <Col lg={4} md={4}>
                        <h2 className="fw-bold mb-3">SuShop</h2>
                        <p className="text-secondary">
                            SuShop is an online store dedicated to offering
                            quality products with a seamless shopping
                            experience. We focus on simplicity, convenience, and
                            customer satisfaction.
                        </p>

                        <h4 className="my-4">Connect With Us</h4>
                        <div className="d-flex gap-3 mt-2">
                            <button
                                className="social-btn"
                                aria-label="Facebook"
                            >
                                <FaFacebookF />
                            </button>

                            <button
                                className="social-btn"
                                aria-label="Instagram"
                            >
                                <FaInstagram />
                            </button>

                            <button
                                className="social-btn"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedinIn />
                            </button>
                        </div>
                    </Col>

                    <Col lg={2} md={2}>
                        <h5 className="fw-semibold pb-2">Shopping</h5>
                        <ul className="list-unstyled mt-3 text-secondary">
                            <li>
                                <button className="footer-btn">
                                    New Arrivals
                                </button>
                            </li>
                            <li>
                                <button className="footer-btn">
                                    Bestsellers
                                </button>
                            </li>
                            <li>
                                <button className="footer-btn">Sale</button>
                            </li>
                        </ul>
                    </Col>

                    <Col lg={3} md={2}>
                        <h5 className="fw-semibold pb-2">Customer Service</h5>
                        <ul className="list-unstyled mt-3 text-secondary">
                            <li>
                                <button className="footer-btn">FAQs</button>
                            </li>
                            <li>
                                <button className="footer-btn">
                                    Order Status
                                </button>
                            </li>
                            <li>
                                <button className="footer-btn">
                                    Returns & Exchanges
                                </button>
                            </li>
                        </ul>
                    </Col>

                    <Col lg={3} md={4}>
                        <h5 className="fw-semibold pb-2">
                            Contact Information
                        </h5>

                        <ul className="list-unstyled mt-3 text-secondary">
                            <li className="d-flex align-items-start gap-2 ">
                                <FaMapMarkerAlt className="mt-1 me-2" />
                                <span>1010 Su Street, Suwell VIC 1010</span>
                            </li>

                            <li className="d-flex align-items-start gap-2 mt-1">
                                <FaPhoneAlt className="mt-1 me-2" />
                                <span>+61 410 101 010</span>
                            </li>

                            <li className="d-flex align-items-start gap-2 mt-1">
                                <FaEnvelope className="mt-1 me-2" />
                                <span>su@email.com</span>
                            </li>

                            <li className="d-flex align-items-start gap-2 mt-1">
                                <FaClock className="mt-1 me-2" />
                                <span>
                                    Mon – Fri : 9am – 5pm <br />
                                    Sat : 11am – 4pm <br />
                                    Sun : Closed
                                </span>
                            </li>
                        </ul>

                        <div className="d-flex gap-3 mt-3">
                            <button className="btn btn-dark text-nowrap">
                                 App Store
                            </button>
                            <button className="btn btn-dark text-nowrap">
                                ▶ Google Play
                            </button>
                        </div>
                    </Col>
                </Row>

                <Row className="py-4 align-items-center text-secondary">
                    <Col md={6} xs={6}>
                        {" "}
                        <img
                            src={logo}
                            alt="su-shop-logo"
                            height="48"
                            className="me-2"
                        />
                    </Col>
                    <Col md={6} xs={6} className="text-light text-end">
                        Copyright © {currentYear} SuShop
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};
export default Footer;
