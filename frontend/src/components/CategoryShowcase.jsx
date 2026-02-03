import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const categories = [
    {
        title: "Office",
        image: "/images/office.jpg",
        link: "/office",
    },
    {
        title: "Gaming",
        image: "/images/gaming.jpg",
        link: "/gaming",
    },
    {
        title: "Explore All",
        image: "/images/all.jpg",
        link: "/shop",
    },
];

function CategoryShowcase() {
    return (
        <section className="py-5">
            <Row className="g-4">
                {categories.map((item, index) => (
                    <Col md={4} key={index}>
                        <Link
                            to={item.link}
                            className="text-decoration-none text-dark"
                        >
                            <Card
                                className="border-0 text-center h-100"
                                style={{
                                    borderRadius: "12px",
                                }}
                            >
                                <Card.Img
                                    src={item.image}
                                    alt={item.title}
                                    className="rounded-4"
                                    style={{
                                        height: "360px",
                                        width: "100%",
                                        objectFit: "cover",
                                        backgroundColor: "#fff",
                                    }}
                                />
                                <Card.Body>
                                    <Card.Title className="fs-5 text-center fw-medium text-decoration-underline mb-0">
                                        {item.title}
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </section>
    );
}

export default CategoryShowcase;
