import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Row, Col, Form, Button, Card, Accordion } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import { toast } from "react-toastify";
import SummaryCard from "../components/SummaryCard";

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState("Pay After Arrival");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!shippingAddress?.address) {
            navigate("/address");
        }
    }, [shippingAddress, navigate]);

    const placeOrderHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: paymentMethod,
                itemsPrice: cart.itemsPrice,
                mobile: cart.shippingAddress.mobile,
                shippingPrice: cart.shippingPrice,
                totalPrice: cart.totalPrice,
            }).unwrap();

            dispatch(clearCartItems());
            navigate(`/order/${res._id}`);
        } catch (err) {
            toast.error(err?.data?.message || err.error || "An error occurred");
        }
    };

    return (
        <div className="container pb-5 mt-4">
            <CheckoutSteps step1 step2 step3 step4 />

            <Form onSubmit={placeOrderHandler}>
                <Row className="mt-5">
                    <Col lg={4} md={6}>
                        <h2 className="fw-bold mb-4">Payment Method</h2>
                        <Accordion defaultActiveKey="2" className="rounded-0">
                            <Accordion.Item
                                eventKey="0"
                                className="border-bottom"
                            >
                                <Accordion.Header className="fw-bold">
                                    Gift Card
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Form.Group
                                        controlId="giftCardNumber"
                                        className="mb-3"
                                    >
                                        <Form.Label className="small fw-bold text-muted text-uppercase">
                                            Gift Card Number
                                        </Form.Label>
                                        <div className="d-flex">
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter 10-digit number"
                                                className="rounded-0 border-dark py-2"
                                            />
                                            <Button
                                                variant="dark"
                                                className="ms-2 rounded-0 px-4 fw-bold"
                                                style={{ minWidth: "100px" }}
                                            >
                                                Apply
                                            </Button>
                                        </div>
                                    </Form.Group>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="1">
                                <Accordion.Header className="fw-bold">
                                    Credit / Debit
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Form.Check
                                        type="radio"
                                        label="Debit or Credit Card"
                                        name="paymentMethod"
                                        id="CreditCard"
                                        value="Credit Card"
                                        checked={
                                            paymentMethod === "Credit Card"
                                        }
                                        onChange={(e) =>
                                            setPaymentMethod(e.target.value)
                                        }
                                        className="fw-bold mb-3"
                                    />
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header className="fw-bold">
                                    Pay After Arrival
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Form.Check
                                        type="radio"
                                        label="Pay After Arrival"
                                        name="paymentMethod"
                                        id="PayAfter"
                                        value="Pay After Arrival"
                                        checked={
                                            paymentMethod ===
                                            "Pay After Arrival"
                                        }
                                        onChange={(e) =>
                                            setPaymentMethod(e.target.value)
                                        }
                                        className="fw-bold mb-3"
                                    />
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>

                    <Col lg={4} md={6}>
                        <h2 className="fw-bold mb-4">Review Address</h2>
                        <Card className="rounded-0 border p-3">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <h6 className="fw-bold mb-0">
                                    Delivery & Billing Address
                                </h6>
                                <Button
                                    variant="link"
                                    className="p-0 text-dark small fw-bold text-decoration-underline"
                                    onClick={() => navigate("/address")}
                                >
                                    Edit
                                </Button>
                            </div>
                            <div className="small">
                                <p className="mb-0 fw-bold">
                                    {shippingAddress.firstName}{" "}
                                    {shippingAddress.lastName}
                                </p>
                                <p className="mb-0">{shippingAddress.email}</p>
                                <p className="mb-0">{shippingAddress.mobile}</p>
                                <p className="mb-0">
                                    {shippingAddress.address},{" "}
                                    {shippingAddress.state},{" "}
                                    {shippingAddress.postalCode}
                                </p>
                            </div>
                        </Card>
                    </Col>

                    <Col lg={4}>
                        <SummaryCard
                            cart={cart}
                            cartItems={cart.cartItems}
                            userInfo={userInfo}
                            buttonText="Place Order"
                            isLoading={isLoading}
                            onCheckout={placeOrderHandler}
                        />
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default PaymentScreen;
