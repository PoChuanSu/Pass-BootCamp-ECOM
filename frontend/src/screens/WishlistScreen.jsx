import { Container, Row, Col, Button, Image, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import Message from "../components/Message";
import { addToCart } from "../slices/cartSlice";
import { toggleLike } from "../slices/wishlistSlice";

const WishlistScreen = () => {
    const dispatch = useDispatch();
    const { wishlistItems } = useSelector((state) => state.wishlist);

    const addToCartHandler = (product) => {
        dispatch(addToCart({ ...product, qty: 1 }));
    };

    const removeFromWishlistHandler = (product) => {
        dispatch(toggleLike(product));
    };

    return (
        <Container className="py-5">
            <div className="mb-4">
                <h1 className="fw-bold h2 mb-1">My Wishlist</h1>
            </div>

            {wishlistItems.length === 0 ? (
                <div className="py-5">
                    <Message variant="info">Your wishlist is empty.</Message>
                </div>
            ) : (
                <div className="border rounded-4 bg-white shadow-sm overflow-hidden">
                    <ListGroup variant="flush">
                        {wishlistItems.map((item) => (
                            <ListGroup.Item key={item._id} className="p-3">
                                {" "}
                                <Row className="align-items-center">
                                    <Col xs={3} md={2} lg={1}>
                                        <div className="bg-light rounded-3 p-2">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fluid
                                                style={{
                                                    maxHeight: "70px",
                                                    objectFit: "contain",
                                                }}
                                            />
                                        </div>
                                    </Col>

                                    <Col
                                        xs={9}
                                        md={6}
                                        lg={7}
                                        className="ps-3 ps-md-4"
                                    >
                                        <Link
                                            to={`/product/${item._id}`}
                                            className="text-decoration-none text-dark"
                                        >
                                            <h5 className="fw-bold mb-1 text-truncate h6">
                                                {item.name}
                                            </h5>
                                        </Link>
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="fw-bold text-dark">
                                                ${item.price}
                                            </span>
                                            {item.countInStock > 0 ? (
                                                <small className="text-success fw-bold x-small">
                                                    In Stock
                                                </small>
                                            ) : (
                                                <small className="text-danger fw-bold x-small">
                                                    Out of Stock
                                                </small>
                                            )}
                                        </div>
                                    </Col>

                                    <Col
                                        xs={12}
                                        md={4}
                                        className="text-end mt-3 mt-md-0"
                                    >
                                        <div className="d-flex justify-content-between justify-content-md-end align-items-center gap-3">
                                            <Button
                                                variant="dark"
                                                className="rounded-pill px-4 py-2 fw-bold d-flex align-items-center shadow-none"
                                                disabled={
                                                    item.countInStock === 0
                                                }
                                                onClick={() =>
                                                    addToCartHandler(item)
                                                }
                                            >
                                                <FaShoppingCart
                                                    className="me-2"
                                                    size={14}
                                                />
                                                Add to Cart
                                            </Button>

                                            <div
                                                className="p-2 icon-hover text-muted"
                                                onClick={() =>
                                                    removeFromWishlistHandler(
                                                        item,
                                                    )
                                                }
                                            >
                                                <FaTrash size={16} />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
            )}
        </Container>
    );
};

export default WishlistScreen;
