import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import { FaCheckSquare, FaSquare } from "react-icons/fa"; // For the custom checkbox look

const ShippingScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);
    const { shippingAddress, cartItems } = cart;

    // Standard fields from your image
    const [name, setName] = useState(userInfo?.name || "");
    const [email, setEmail] = useState(userInfo?.email || "");
    const [mobile, setMobile] = useState(userInfo?.mobile || "");
    const [state, setState] = useState(shippingAddress?.state || "");
    const [city, setCity] = useState(shippingAddress?.city || "");
    const [postalCode, setPostalCode] = useState(
        shippingAddress?.postalCode || "",
    );
    const [address, setAddress] = useState(shippingAddress?.address || "");
    const [sameAsBilling, setSameAsBilling] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const subtotal = cartItems
        .reduce((acc, item) => acc + item.qty * item.price, 0)
        .toFixed(2);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            saveShippingAddress({
                name,
                email,
                mobile,
                address,
                country: "Australia",
                city,
                state,
                postalCode,
            }),
        );
        navigate("/payment");
    };

    return (
        <div className="container pb-5 mt-4">
            {/* Step 3: Address */}
            <CheckoutSteps step1 step2 step3 />

            <Form onSubmit={submitHandler}>
                <Row className="mt-5">
                    {/* LEFT COLUMN: Delivery Address */}
                    <Col lg={4} md={6}>
                        <h2 className="fw-bold mb-4">Delivery Address</h2>

                        <Form.Group className="mb-3" controlId="firstName">
                            <Form.Label>
                                Name <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                className="rounded-0 border-dark py-2"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>
                                Email Address{" "}
                                <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                                type="email"
                                className="rounded-0 border-dark py-2"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="mobile">
                            <Form.Label>
                                Mobile <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                className="rounded-0 border-dark py-2"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="country">
                            <Form.Label>Country</Form.Label>
                            <Form.Select className="rounded-0 border-dark py-2">
                                <option>Australia</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="address">
                            <Form.Label>
                                Address <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                className="rounded-0 border-dark py-2"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="address">
                            <Form.Label>
                                City <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                className="rounded-0 border-dark py-2"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="address">
                            <Form.Label>
                                State <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Select
                                className="rounded-0 border-dark py-2"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                            >
                                <option value="">Select State</option>
                                <option value="NSW">New South Wales</option>
                                <option value="VIC">Victoria</option>
                                <option value="QLD">Queensland</option>
                                <option value="WA">Western Australia</option>
                                <option value="SA">South Australia</option>
                                <option value="TAS">Tasmania</option>
                                <option value="ACT">
                                    Australian Capital Territory
                                </option>
                                <option value="NT">Northern Territory</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="address">
                            <Form.Label>
                                Post Code <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                className="rounded-0 border-dark py-2"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>

                    {/* MIDDLE COLUMN: Billing Address */}
                    <Col lg={4} md={6}>
                        <h2 className="fw-bold mb-4">Billing Address</h2>
                        <div
                            className="d-flex align-items-center"
                            style={{ cursor: "pointer" }}
                            onClick={() => setSameAsBilling(!sameAsBilling)}
                        >
                            {sameAsBilling ? (
                                <FaCheckSquare
                                    className="me-2 text-dark"
                                    size={20}
                                />
                            ) : (
                                <FaSquare
                                    className="me-2 text-muted"
                                    size={20}
                                />
                            )}
                            <span className="fw-bold">
                                Same as Delivery Address
                            </span>
                        </div>
                    </Col>

                    {/* RIGHT COLUMN: Order Summary */}
                    <Col lg={4}>
                        <div className="ps-lg-4">
                            <h2 className="fw-bold mb-4">Order Summary</h2>
                            <div className="d-flex justify-content-between mb-3 mt-4">
                                <span className="fs-5 text-muted">
                                    Subtotal
                                </span>
                                <span className="fw-bold fs-5">
                                    ${subtotal}
                                </span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span className="fs-5 text-muted">
                                    Estimated Shipping
                                </span>
                                <span className="fw-bold fs-5">FREE</span>
                            </div>
                            <p className="text-muted small mb-4">
                                Actual shipping cost is calculated once we know
                                your delivery details
                            </p>
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
                                type="submit"
                                variant="dark"
                                className="w-100 py-3 rounded-2 fw-bold fs-5"
                            >
                                Continue to Payment
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default ShippingScreen;
