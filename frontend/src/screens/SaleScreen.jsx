import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";

const SaleScreen = () => {
    const saleProducts = [
        {
            id: 1,
            name: "Old Gen Graphic Card",
            price: 300,
            originalPrice: 450,
            image: "https://placehold.co/600x400/222/fff?text=GPU",
        },
        {
            id: 2,
            name: "Mechanical Switches (Blue)",
            price: 20,
            originalPrice: 35,
            image: "https://placehold.co/600x400/222/fff?text=Switches",
        },
        {
            id: 3,
            name: "Server Rack 4U",
            price: 150,
            originalPrice: 220,
            image: "https://placehold.co/600x400/222/fff?text=Rack",
        },
        {
            id: 4,
            name: "Braided HDMI Cable",
            price: 10,
            originalPrice: 25,
            image: "https://placehold.co/600x400/222/fff?text=Cable",
        },
    ];

    return (
        <section className="py-5 bg-white">
            <Container>
                {/* Header Section */}
                <div className="mb-5 border-bottom pb-3">
                    <h6
                        className="text-uppercase fw-bold text-danger"
                        style={{ letterSpacing: "2px" }}
                    >
                        Limited Time Offers
                    </h6>
                    <h1 className="display-4 fw-bold">On Sale</h1>
                </div>

                <Row>
                    {saleProducts.map((product) => {
                        const discount = Math.round(
                            ((product.originalPrice - product.price) /
                                product.originalPrice) *
                                100,
                        );

                        return (
                            <Col
                                key={product.id}
                                sm={12}
                                md={6}
                                lg={4}
                                xl={3}
                                className="mb-4"
                            >
                                <Card className="h-100 border-0 shadow-sm">
                                    <div className="position-relative">
                                        <Badge
                                            bg="danger"
                                            className="position-absolute top-0 start-0 m-3 px-3 py-2 rounded-0"
                                        >
                                            -{discount}% OFF
                                        </Badge>
                                        <Card.Img
                                            variant="top"
                                            src={product.image}
                                            className="rounded-0"
                                        />
                                    </div>
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title className="fw-bold">
                                            {product.name}
                                        </Card.Title>
                                        <div className="d-flex align-items-center mb-3">
                                            <span className="text-danger fw-bold fs-5 me-2">
                                                ${product.price.toFixed(2)}
                                            </span>
                                            <span className="text-muted text-decoration-line-through small">
                                                $
                                                {product.originalPrice.toFixed(
                                                    2,
                                                )}
                                            </span>
                                        </div>
                                        <Button
                                            variant="outline-danger"
                                            className="mt-auto rounded-0 w-100"
                                        >
                                            Grab Deal
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </section>
    );
};

export default SaleScreen;
