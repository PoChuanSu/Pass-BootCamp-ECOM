import { Container, Row, Col, Button } from "react-bootstrap";
import logo from "../assets/logo.png";
import { LinkContainer } from "react-router-bootstrap";

const AboutMeScreen = () => {
    return (
        <section id="about-me-section" className="py-5 bg-white">
            <Container>
                <Row className="align-items-center">
                    {/* Left Side: Shop Introduction */}
                    <Col md={7} className="pe-md-5">
                        <h6
                            className="text-uppercase fw-bold mb-3"
                            style={{ color: "#6c757d", letterSpacing: "2px" }}
                        >
                            Welcome to SuShop
                        </h6>
                        <h1 className="display-4 fw-bold mb-4 text-dark">
                            Engineering Quality & Security
                        </h1>
                        <p
                            className="lead text-muted mb-4"
                            style={{ lineHeight: "1.8" }}
                        >
                            SuShop is more than just an e-commerce platform. It
                            is a curated collection of products informed by a
                            background in <strong>Engineering</strong> and{" "}
                            <strong>Cybersecurity</strong>. We provide
                            innovative solutions with the same precision and
                            algorithmic rigor used in high-level computing.
                        </p>
                        <div className="d-flex gap-3">
                            <LinkContainer to="/">
                                <Button
                                    variant="dark"
                                    className="px-4 py-2 rounded-0"
                                >
                                    Explore Products
                                </Button>
                            </LinkContainer>
                        </div>
                    </Col>

                    {/* Right Side: SuShop Logo */}
                    <Col md={5} className="text-center mt-5 mt-md-0">
                        <div className="p-4 rounded-0">
                            <img
                                src={logo}
                                alt="SuShop Logo"
                                className="img-fluid"
                                style={{
                                    width: "100%",
                                    maxHeight: "400px",
                                    objectFit: "contain",
                                }}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default AboutMeScreen;
