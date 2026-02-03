import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Row,
    Col,
    ListGroup,
    Image,
    Button,
    Card,
    Form,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { HiMinus, HiPlus } from "react-icons/hi";
import { FaShop } from "react-icons/fa6";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const addToCartHandler = (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
    };

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    return (
        <>
            <CheckoutSteps step1 />
            <Row className="align-items-center mb-5 mt-2">
                <Col className="d-flex justify-content-between align-items-center">
                    <h1 className="fw-bold mb-0" style={{ fontSize: "2.5rem" }}>
                        My Cart
                    </h1>

                    <Link
                        to="/"
                        className="text-decoration-none text-dark fw-bold d-flex align-items-center"
                        style={{ fontSize: "1rem" }}
                    >
                        <FaShop className="me-2" size={18} />
                        Continue shopping
                    </Link>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col lg={8}>
                    {cartItems.length === 0 ? (
                        <Message variant="danger">
                            You don't have anything in your cart
                        </Message>
                    ) : (
                        <ListGroup variant="flush">
                            <div className="d-none d-md-flex align-items-center mb-3 border-bottom pb-2 text-muted fw-bold">
                                <Col md={6} className="ps-4">
                                    Product
                                </Col>
                                <Col md={2} className="text-center">
                                    Price
                                </Col>
                                <Col md={2} className="text-center">
                                    Quantity
                                </Col>
                                <Col md={2} className="ps-1 text-center">
                                    Total
                                </Col>
                            </div>
                            {cartItems.map((item) => (
                                <ListGroup.Item
                                    key={item._id}
                                    className="py-4 border-0 border-bottom"
                                >
                                    <Row className="align-items-center">
                                        <Col
                                            xs={12}
                                            md={6}
                                            className="d-flex align-items-center"
                                        >
                                            <div
                                                className="border rounded-3 p-2 bg-light me-3"
                                                style={{ width: "100px" }}
                                            >
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fluid
                                                    rounded
                                                />
                                            </div>
                                            <div>
                                                <Link
                                                    to={`/product/${item._id}`}
                                                    className="text-decoration-none text-dark fw-bold d-block mb-1"
                                                >
                                                    {item.name}
                                                </Link>
                                                <Button
                                                    variant="link"
                                                    className="p-0 text-muted small text-decoration-none d-flex align-items-center"
                                                    onClick={() =>
                                                        removeFromCartHandler(
                                                            item._id,
                                                        )
                                                    }
                                                >
                                                    <FaTrash
                                                        size={12}
                                                        className="me-2"
                                                    />{" "}
                                                    Remove
                                                </Button>
                                            </div>
                                        </Col>

                                        <Col
                                            xs={4}
                                            md={2}
                                            className="text-center fw-bold "
                                        >
                                            <div className="d-md-none text-muted small mb-1">
                                                Price
                                            </div>
                                            <div className="fw-bold">
                                                ${item.price.toFixed(2)}
                                            </div>
                                        </Col>

                                        {/* QUANTITY - Matches Header "Quantity" */}
                                        <Col
                                            xs={4}
                                            md={2}
                                            className="d-flex flex-column align-items-center justify-content-center"
                                        >
                                            <div className="d-md-none text-muted small mb-1 pt-2">
                                                Qty
                                            </div>
                                            <div className="quantity-group d-flex align-items-center border rounded-3 bg-white">
                                                <Button
                                                    variant="light"
                                                    className="qty-btn border-0 bg-transparent px-2"
                                                    onClick={() =>
                                                        addToCartHandler(
                                                            item,
                                                            Math.max(
                                                                1,
                                                                item.qty - 1,
                                                            ),
                                                        )
                                                    }
                                                >
                                                    <HiMinus size={14} />
                                                </Button>
                                                <div
                                                    className="px-2 fw-bold small"
                                                    style={{
                                                        minWidth: "30px",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {item.qty}
                                                </div>
                                                <Button
                                                    variant="light"
                                                    className="qty-btn border-0 bg-transparent px-2"
                                                    onClick={() =>
                                                        addToCartHandler(
                                                            item,
                                                            Math.min(
                                                                item.countInStock,
                                                                item.qty + 1,
                                                            ),
                                                        )
                                                    }
                                                >
                                                    <HiPlus size={14} />
                                                </Button>
                                            </div>
                                        </Col>
                                        {/* TOTAL - Matches Header "Total" */}
                                        <Col
                                            xs={4}
                                            md={2}
                                            className="text-end fw-bold pe-4"
                                        >
                                            <div className="d-md-none text-muted small mb-1">
                                                Subtotal
                                            </div>
                                            <div>
                                                $
                                                {(
                                                    item.qty * item.price
                                                ).toFixed(2)}
                                            </div>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>

                <Col lg={4}>
                    <Card className="border-0 shadow-sm p-3 rounded-4 bg-white">
                        <h4 className="fw-bold mb-4">Order Summary</h4>
                        <div className="d-flex justify-content-between mb-3">
                            <span className="text-muted">Total</span>
                            <span className="fw-bold">
                                $
                                {cartItems
                                    .reduce(
                                        (acc, item) =>
                                            acc + item.qty * item.price,
                                        0,
                                    )
                                    .toFixed(2)}
                            </span>
                        </div>

                        <div className="d-flex justify-content-between mb-3">
                            <span className="text-muted">Shipping</span>
                            <span className="fw-bold">
                                ${cart.shippingPrice}
                            </span>
                        </div>

                        <div className="w-100 d-flex justify-content-center align-items-center">
                            <Form.Control
                                placeholder="Coupon code"
                                className="bg-light border-0"
                            />
                            <Button variant="dark" className="ms-2 px-4 ">
                                Apply
                            </Button>
                        </div>

                        <div className="d-flex justify-content-between pt-3 border-top mt-3">
                            <h4 className="fw-bold">Total</h4>
                            <h4 className="fw-bold">
                                $
                                {cartItems
                                    .reduce(
                                        (acc, item) =>
                                            acc + item.qty * item.price,
                                        0,
                                    )
                                    .toFixed(2)}
                            </h4>
                        </div>
                        <Button
                            variant="dark"
                            className="w-100 py-3 mt-4 rounded-3 d-flex align-items-center justify-content-center fw-bold"
                            onClick={() =>
                                navigate("/login?redirect=/delivery")
                            }
                        >
                            Sign in and Checkout{" "}
                        </Button>

                        <Button
                            variant="light"
                            className="w-100 mt-3 text-dark text-decoration-none small fw-bold"
                            onClick={() => navigate("/")}
                        >
                            Checkout as Guest
                        </Button>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default CartScreen;
