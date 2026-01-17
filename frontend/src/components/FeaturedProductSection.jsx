import { Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import appleCollections from "../assets/apples.jpg";

function PromotedSlide({ products }) {
    const displayProducts = products.slice(0, 3);

    return (
        <section className="mx-auto carousel-slide">
            <Row className="align-items-center">
                <Col lg={4}>
                    <span
                        className="px-4 py-2 mb-3 rounded-pill fw-semibold border border-dark"
                        style={{
                            backgroundColor: "#ffffffff",
                            color: "#000000ff",
                        }}
                    >
                        Featured Collection
                    </span>
                    <h2 className="fw-bold display-6 mt-5">
                        Premium Quality Product
                    </h2>

                    <p className="text-muted mt-3">
                        Experience premium products crafted with exceptional
                        quality, refined design, and lasting performance.
                    </p>

                    <div className="d-flex justify-content-center justify-content-lg-start">
                        <Button
                            size="lg"
                            style={{
                                backgroundColor: "#ffffffff",
                                color: "#000000ff",
                            }}
                            className="my-5 px-4 border border-dark"
                        >
                            Explore Collection →
                        </Button>
                    </div>
                </Col>

                <Col
                    lg={8}
                    className="d-flex align-items-center justify-content-center"
                >
                    <Link to={`/product/}`}>
                        <img
                            src={appleCollections}
                            alt="Apple collections"
                            className="img-fluid"
                            style={{
                                maxHeight: "100%",
                                objectFit: "contain",
                            }}
                        />
                    </Link>
                </Col>
            </Row>
        </section>
    );
}

export default PromotedSlide;
