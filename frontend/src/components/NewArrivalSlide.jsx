import { Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function NewArrivalSlide({ products }) {
    const displayProducts = products.slice(0, 4);

    return (
        <section className="py-5 mx-auto carousel-slide">
            <Row className="align-items-center">
                <Col lg={5}>
                    <span
                        className="px-4 py-2 mb-3 rounded-pill fw-semibold border border-dark"
                        style={{
                            backgroundColor: "#ffffffff",
                            color: "#000000ff",
                        }}
                    >
                        New Arrivals
                    </span>
                    <h2 className="fw-bold display-6 mt-5">
                        Discover Our Latest Collection
                    </h2>

                    <p className="text-muted mt-3">
                        Check out what’s new — stylish products, great quality,
                        and prices you’ll love.
                    </p>
                    <div className="d-flex justify-content-center justify-content-lg-start">
                        <Button
                            size="lg"
                            style={{
                                backgroundColor: "#ffffffff",
                                color: "#000000ff",
                            }}
                            className="my-5 px-4 fw-semibold border border-dark"
                        >
                            Shop New Arrivals →
                        </Button>
                    </div>
                </Col>

                <Col lg={7}>
                    <Row className="g-4">
                        {displayProducts.map((product) => (
                            <Col md={6} key={product._id}>
                                <Card className="border-0 shadow-sm text-center h-100">
                                    <Link to={`/product/${product._id}`}>
                                        <Card.Img
                                            src={product.image}
                                            alt={product.name}
                                            style={{
                                                height: "180px",
                                                objectFit: "contain",
                                                padding: "1rem",
                                            }}
                                        />
                                    </Link>

                                    <Card.Body>
                                        <Card.Title className="fs-6">
                                            {product.name}
                                        </Card.Title>
                                        <p className="fw-bold text-danger mb-0">
                                            ${product.price}
                                        </p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </section>
    );
}

export default NewArrivalSlide;
