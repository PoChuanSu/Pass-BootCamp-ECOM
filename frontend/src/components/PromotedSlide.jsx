import { Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import CountdownTimer from "./CountdownTimer";

function PromotedSlide({ products }) {
    const displayProducts = products.slice(0, 1);

    return (
        <section className="py-5 mx-auto carousel-slide">
            <Row className="align-items-center">
                <Col lg={5}>
                    <span
                        className="px-4 py-2 mb-3 rounded-pill fw-semibold"
                        style={{
                            backgroundColor: "#e1096aff",
                            color: "#dedddeff",
                        }}
                    >
                        Limited Time
                    </span>
                    <h2 className="fw-bold display-6 mt-5">
                        Top Tech Picks Save Up to 50%
                    </h2>

                    <p className="text-muted mt-3">
                        Check out what’s new stylish products, great quality,
                        and prices you’ll love.
                    </p>
                    <div className="mt-5">
                        <span className="fw-bold">Offer ends in:</span>
                        <CountdownTimer endDate="2026-02-01T23:59:59" />
                    </div>
                    <div className="d-flex justify-content-center justify-content-lg-start">
                        <Button
                            size="lg"
                            style={{
                                backgroundColor: "#e1096aff",
                                color: "#dedddeff",
                            }}
                            className="my-5 px-4 border-0"
                        >
                            Shop Sale →
                        </Button>
                    </div>
                </Col>

                <Col lg={7}>
                    <Card className="border-0 shadow-sm text-center h-100">
                        <Link to={`/product/${displayProducts[0]._id}`}>
                            <Card.Img
                                src={displayProducts[0].image}
                                alt={displayProducts[0].name}
                                style={{
                                    height: "400px",
                                    objectFit: "contain",
                                    padding: "1rem",
                                }}
                            />
                        </Link>

                        <Card.Body>
                            <Card.Title className="fs-6">
                                {displayProducts[0].name}
                            </Card.Title>
                            <p className="fw-bold text-danger mb-0">
                                ${displayProducts[0].price}
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </section>
    );
}

export default PromotedSlide;
