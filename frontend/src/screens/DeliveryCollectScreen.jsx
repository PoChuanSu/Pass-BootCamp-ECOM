import { useState } from "react";
import { Row, Col, Image, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    FaCheckCircle,
    FaRegCircle,
    FaTruck,
    FaShoppingBag,
} from "react-icons/fa";
import CheckoutSteps from "../components/CheckoutSteps";
import SummaryCard from "../components/SummaryCard";

const DeliveryCollectScreen = () => {
    const navigate = useNavigate();
    const [deliveryMethod, setDeliveryMethod] = useState("delivery");

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const { userInfo } = useSelector((state) => state.auth);

    return (
        <div className="container py-4">
            <CheckoutSteps step1 step2 />

            <Row className="mt-5">
                <Col lg={8} className="pe-lg-5">
                    <h2 className="fw-bold mb-4">
                        Your Items ({cartItems.length})
                    </h2>
                    <hr className="mb-4" />
                    <p className="fw-bold mb-4">
                        Select click & collect or delivery for each item
                    </p>

                    {cartItems.map((item) => (
                        <div key={item._id} className="mb-5">
                            <Row className="mb-4">
                                <Col xs={4} md={3}>
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fluid
                                    />
                                </Col>
                                <Col xs={8} md={9}>
                                    <h6 className="fw-bold text-uppercase mb-1">
                                        {item.brand || "Su"}
                                    </h6>
                                    <p className="mb-1 text-muted small">
                                        {item.name}
                                    </p>

                                    <p className="small mb-2">
                                        Quantity {item.qty}
                                    </p>
                                    <div className="d-flex align-items-center">
                                        <span
                                            className="text-muted text-decoration-line-through me-2"
                                            style={{ fontSize: "1.1rem" }}
                                        >
                                            $779.00
                                        </span>
                                        <span
                                            className="text-danger fw-bold"
                                            style={{ fontSize: "1.3rem" }}
                                        >
                                            ${item.price.toFixed(2)}
                                        </span>
                                    </div>
                                </Col>
                            </Row>

                            <Row className="g-3">
                                <Col md={6}>
                                    <Card
                                        className="h-100 rounded-0 border-light-subtle bg-light p-3"
                                        style={{
                                            cursor: "not-allowed",
                                            opacity: 0.5,
                                        }}
                                    >
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div className="small fw-bold text-muted">
                                                <FaShoppingBag className="me-2" />
                                                Click & Collect
                                            </div>
                                            <FaRegCircle
                                                size={20}
                                                className="text-muted"
                                            />
                                        </div>

                                        <p className="fw-bold mb-1 text-muted">
                                            Currently Unavailable
                                        </p>
                                        <p className="small text-muted mb-4">
                                            Click & collect is not available for
                                            this item.
                                        </p>
                                    </Card>
                                </Col>

                                <Col md={6}>
                                    <Card
                                        className="h-100 rounded-0 border-dark border-2 p-3 shadow-sm"
                                        onClick={() =>
                                            setDeliveryMethod("delivery")
                                        }
                                        style={{ cursor: "pointer" }}
                                    >
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div className="small fw-bold text-dark">
                                                <FaTruck className="me-2" />
                                                Delivery
                                            </div>
                                            <FaCheckCircle
                                                size={20}
                                                className="text-dark"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <p className="mb-0 small fw-bold text-dark">
                                                Standard Delivery (2-7 Business
                                                Days)
                                            </p>
                                            <p className="mb-0 small fw-bold text-dark">
                                                FREE
                                            </p>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    ))}
                </Col>

                <Col lg={4}>
                    <SummaryCard
                        cart={cart}
                        cartItems={cart.cartItems}
                        userInfo={userInfo}
                        buttonText="Next"
                        onCheckout={() => navigate("/address")}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default DeliveryCollectScreen;
