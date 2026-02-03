import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";

const OfficeScreen = () => {
    // Mock Data for Office Products
    const officeProducts = [
        {
            id: 1,
            name: "ErgoChair Pro",
            price: 450.0,
            specs: "Mesh Back • Lumbar Support",
            image: "https://placehold.co/600x400/f8f9fa/212529?text=Ergo+Chair",
            badge: "Best Seller",
        },
        {
            id: 2,
            name: '4K IPS Monitor 27"',
            price: 320.0,
            specs: "USB-C Hub • 99% sRGB",
            image: "https://placehold.co/600x400/f8f9fa/212529?text=4K+Monitor",
        },
        {
            id: 3,
            name: "Thunderbolt 4 Dock",
            price: 180.0,
            specs: "100W Charging • Dual Display",
            image: "https://placehold.co/600x400/f8f9fa/212529?text=Docking+Station",
            badge: "Essential",
        },
        {
            id: 4,
            name: "Mechanical Keypad",
            price: 45.0,
            specs: "Hot-swappable • Macro Support",
            image: "https://placehold.co/600x400/f8f9fa/212529?text=NumPad",
        },
        {
            id: 5,
            name: "Vertical Mouse",
            price: 55.0,
            specs: "Wireless • 4000 DPI",
            image: "https://placehold.co/600x400/f8f9fa/212529?text=Vert+Mouse",
        },
        {
            id: 6,
            name: "Noise-Canceling Mic",
            price: 90.0,
            specs: "USB-C • Mute Toggle",
            image: "https://placehold.co/600x400/f8f9fa/212529?text=Microphone",
        },
    ];

    return (
        <section className="py-5 bg-white">
            <Container>
                {/* Header Banner */}
                <div className="bg-light p-5 mb-5 rounded-0 border text-center">
                    <h1 className="display-4 fw-bold">Workspace Engineering</h1>
                    <p
                        className="lead text-muted mx-auto"
                        style={{ maxWidth: "600px" }}
                    >
                        Curated tools for peak productivity. Designed for
                        developers, engineers, and professionals who demand
                        reliability.
                    </p>
                </div>

                {/* Product Grid */}
                <Row>
                    {officeProducts.map((product) => (
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
                                            bg="dark"
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
                                    <Card.Subtitle className="mb-2 text-muted small">
                                        {product.specs}
                                    </Card.Subtitle>
                                    <Card.Text className="fs-5 fw-bold mt-2">
                                        ${product.price.toFixed(2)}
                                    </Card.Text>
                                    <Button
                                        variant="outline-dark"
                                        className="mt-auto rounded-0 w-100 fw-bold"
                                    >
                                        Configure
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

export default OfficeScreen;
