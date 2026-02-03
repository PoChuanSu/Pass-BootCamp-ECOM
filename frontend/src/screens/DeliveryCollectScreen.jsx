import React, { useState } from "react";
import { Row, Col, Image, Button, Card, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    FaCheckCircle,
    FaRegCircle,
    FaTruck,
    FaShoppingBag,
} from "react-icons/fa";
import CheckoutSteps from "../components/CheckoutSteps";

const DeliveryCollectScreen = () => {
    const navigate = useNavigate();
    const [deliveryMethod, setDeliveryMethod] = useState("delivery"); // Default to Delivery

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const subtotal = cartItems
        .reduce((acc, item) => acc + item.qty * item.price, 0)
        .toFixed(2);

    return (
        <div className="container py-4">
            <CheckoutSteps step1 step2 />

            <Row className="mt-5">
                {/* --- Left Side: Items and Method Selection --- */}
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
                            {/* Product Detail */}
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

                            {/* Method Selector Cards */}
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
                                            {/* Empty circle to show it's unselected */}
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

                                {/* --- DELIVERY (ACTIVE & SELECTED) --- */}
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

                {/* --- Right Side: Order Summary --- */}
                <Col lg={4}>
                    <div className="ps-lg-4">
                        <h2 className="fw-bold mb-4">Order Summary</h2>
                        <div className="d-flex justify-content-between mb-3 mt-4">
                            <span className="fs-5">Subtotal</span>
                            <span className="fw-bold fs-5">${subtotal}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <span className="fs-5">Estimated Shipping</span>
                            <span className="fw-bold fs-5">
                                ${cart.shippingPrice}
                            </span>
                        </div>

                        <hr className="my-4" />

                        <div className="d-flex justify-content-between align-items-end mb-4">
                            <div>
                                <h2 className="fw-bold mb-0">Total</h2>
                                <small className="text-muted fw-bold">
                                    Including GST
                                </small>
                            </div>
                            <h2 className="fw-bold mb-0">${subtotal}</h2>
                        </div>

                        <Button
                            variant="dark"
                            className="w-100 py-3 rounded-2 fw-bold fs-5 shadow-none"
                            onClick={() => navigate("/address")}
                        >
                            Next
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default DeliveryCollectScreen;
