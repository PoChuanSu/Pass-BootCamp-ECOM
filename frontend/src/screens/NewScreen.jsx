import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NewScreen = () => {
    // Mock Data for New Arrivals
    const newProducts = [
        {
            id: 1,
            name: "Mechanical Keyboard X1",
            price: 120,
            image: "https://placehold.co/600x400/222/fff?text=Keyboard",
        },
        {
            id: 2,
            name: "Ergo Mouse Pro",
            price: 85,
            image: "https://placehold.co/600x400/222/fff?text=Mouse",
        },
        {
            id: 3,
            name: "Ultrawide Monitor Stand",
            price: 200,
            image: "https://placehold.co/600x400/222/fff?text=Stand",
        },
        {
            id: 4,
            name: "Noise Cancelling Headset",
            price: 150,
            image: "https://placehold.co/600x400/222/fff?text=Headset",
        },
    ];

    return (
        <section className="py-5 bg-white">
            <Container>
                {/* Header Section */}
                <div className="mb-5 border-bottom pb-3">
                    <h6
                        className="text-uppercase fw-bold text-muted"
                        style={{ letterSpacing: "2px" }}
                    >
                        Just Landed
                    </h6>
                    <h1 className="display-4 fw-bold">New Arrivals</h1>
                </div>

                {/* Product Grid */}
                <Row>
                    {newProducts.map((product) => (
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
                                        bg="dark"
                                        className="position-absolute top-0 start-0 m-3 px-3 py-2 rounded-0"
                                    >
                                        NEW
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
                                    <Card.Text className="lead fs-6">
                                        ${product.price.toFixed(2)}
                                    </Card.Text>
                                    <Button
                                        variant="outline-dark"
                                        className="mt-auto rounded-0 w-100"
                                    >
                                        View Details
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default NewScreen;
