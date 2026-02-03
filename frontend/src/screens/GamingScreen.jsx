import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { FaBolt } from "react-icons/fa"; // npm install react-icons

const GamingScreen = () => {
    // Mock Data for Gaming Products
    const gamingProducts = [
        {
            id: 1,
            name: "RTX 5090 Ti Founder",
            price: 1999.0,
            specs: "24GB GDDR7 • AI Cooling",
            image: "https://placehold.co/600x400/111/fff?text=GPU+Monster",
            badge: "Flagship",
        },
        {
            id: 2,
            name: "eSports Mouse Pro",
            price: 120.0,
            specs: "50g Weight • 8K Polling",
            image: "https://placehold.co/600x400/111/fff?text=Ultralight+Mouse",
        },
        {
            id: 3,
            name: "360Hz OLED Monitor",
            price: 950.0,
            specs: "0.03ms Response • HDR1000",
            image: "https://placehold.co/600x400/111/fff?text=OLED+Display",
            badge: "High FPS",
        },
        {
            id: 4,
            name: "60% Mech Keyboard",
            price: 140.0,
            specs: "Rapid Trigger • PBT Caps",
            image: "https://placehold.co/600x400/111/fff?text=60%25+Keyboard",
        },
        {
            id: 5,
            name: "Open-Back Headset",
            price: 250.0,
            specs: "Planar Magnetic • Wide Soundstage",
            image: "https://placehold.co/600x400/111/fff?text=Audiophile+Set",
        },
        {
            id: 6,
            name: "Glass Mousepad",
            price: 80.0,
            specs: "Zero Friction • Tempered Glass",
            image: "https://placehold.co/600x400/111/fff?text=Speed+Pad",
        },
    ];

    return (
        <section className="py-5 bg-white">
            <Container>
                {/* Header Banner - Darker Theme for Gaming */}
                <div className="bg-dark text-white p-5 mb-5 rounded-0 text-center">
                    <h1 className="display-4 fw-bold">
                        <FaBolt className="me-3 text-warning" />
                        Performance Lab
                    </h1>
                    <p
                        className="lead text-white-50 mx-auto"
                        style={{ maxWidth: "600px" }}
                    >
                        Unfair advantages engineered for competitive play. Low
                        latency, high precision, zero compromise.
                    </p>
                </div>

                {/* Product Grid */}
                <Row>
                    {gamingProducts.map((product) => (
                        <Col
                            key={product.id}
                            sm={12}
                            md={6}
                            lg={4}
                            className="mb-4"
                        >
                            <Card className="h-100 border-0 shadow-sm">
                                <div className="position-relative">
                                    {product.badge && (
                                        <Badge
                                            bg="danger"
                                            className="position-absolute top-0 start-0 m-3 px-3 py-2 rounded-0"
                                        >
                                            {product.badge}
                                        </Badge>
                                    )}
                                    <Card.Img
                                        variant="top"
                                        src={product.image}
                                        className="rounded-0"
                                    />
                                </div>
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="fw-bold fs-5">
                                        {product.name}
                                    </Card.Title>
                                    <Card.Subtitle className="mb-2 text-danger small fw-bold">
                                        {product.specs}
                                    </Card.Subtitle>
                                    <Card.Text className="fs-5 fw-bold mt-2">
                                        ${product.price.toFixed(2)}
                                    </Card.Text>
                                    <Button
                                        variant="dark"
                                        className="mt-auto rounded-0 w-100 fw-bold"
                                    >
                                        Add to Setup
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

export default GamingScreen;
