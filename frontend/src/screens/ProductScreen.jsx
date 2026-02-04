import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdLocalOffer } from "react-icons/md";
import { HiMinus, HiPlus } from "react-icons/hi";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { LuTruck, LuRefreshCw, LuShieldCheck } from "react-icons/lu";
import {
    Tabs,
    Form,
    Tab,
    Row,
    Col,
    Image,
    ListGroup,
    Button,
    Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import {
    useGetProductDetailsQuery,
    useCreateReviewMutation,
} from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";
import ClickRating from "../components/ClickRating";

const ProductScreen = () => {
    const { id: productId } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");

    const {
        data: product,
        isLoading,
        refetch,
        error,
    } = useGetProductDetailsQuery(productId);

    const [createReview, { isLoading: loadingProductReview }] =
        useCreateReviewMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate("/cart");
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await createReview({
                productId,
                rating,
                title,
                comment,
            }).unwrap();
            refetch();
            toast.success("Review Submitted");
            setTitle("");
            setRating(0);
            setComment("");
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <Container>
            <nav className="mb-4 fs-5">
                <Link to="/" className="text-decoration-none fw-bold text-dark">
                    Home
                </Link>
                <span className="mx-2 text-muted">/</span>
                <span className="text-dark">Product Details</span>
            </nav>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <>
                    <Meta title={product.name} />
                    <Row className="product-details-container">
                        <Col
                            lg={6}
                            className="d-flex justify-content-center align-items-center"
                        >
                            <div
                                className="main-image-wrapper w-100"
                                style={{ maxWidth: "450px" }}
                            >
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fluid
                                    rounded
                                    className="product-main-img"
                                />
                            </div>
                        </Col>

                        <Col lg={6} className="ps-lg-5">
                            <div className="product-info-header mb-2">
                                <span className="text-muted text-uppercase small ls-wide pt-4 py-md-0 d-block d-md-inline">
                                    {product.category || "CATEGORY"}
                                </span>
                                <h1 className="display-6 fw-bold text-dark my-2">
                                    {product.name}
                                </h1>

                                <div className="d-flex align-items-center mb-4 fs-5">
                                    <Rating value={product.rating} />
                                    <span className="ms-1 me-3 fw-bold">
                                        {product.rating}
                                    </span>
                                    <span className="ms-1 text-muted">
                                        {product.numReviews} Reviews
                                    </span>
                                </div>
                            </div>

                            <div
                                className="price-card p-4 rounded-4 mb-4"
                                style={{ backgroundColor: "#fcfafb" }}
                            >
                                <div className="d-flex align-items-baseline mb-2">
                                    <h2 className="fw-bold mb-0">
                                        ${product.price}
                                    </h2>
                                    <span className="text-muted text-decoration-line-through ms-3">
                                        $799.99
                                    </span>
                                </div>
                                <div
                                    className="d-flex align-items-center my-2"
                                    style={{ color: "#c1272d" }}
                                >
                                    <MdLocalOffer size={20} className="me-2" />
                                    <span
                                        className="fw-bold"
                                        style={{ fontSize: "1.1rem" }}
                                    >
                                        Promos & Rewards
                                    </span>
                                </div>
                                <div className="stock-status small fw-bold">
                                    <i
                                        className={`fas fa-check-circle ${product.countInStock > 0 ? "text-success" : "text-danger"} me-1`}
                                    ></i>
                                    {product.countInStock > 0
                                        ? `In Stock (${product.countInStock} items left)`
                                        : "Out of Stock"}
                                </div>
                            </div>

                            <p className="text-muted mb-4">
                                {product.description}
                            </p>

                            <div className="qty-section mb-4">
                                <h6 className="fw-bold mb-4">Quantity</h6>
                                <div className="d-flex align-items-center gap-3">
                                    <div className="mb-4">
                                        <div className="quantity-group d-flex align-items-center border rounded-3">
                                            <Button
                                                variant="light"
                                                className="qty-btn border-0 bg-transparent"
                                                onClick={() =>
                                                    setQty(Math.max(1, qty - 1))
                                                }
                                            >
                                                <HiMinus size={20} />
                                            </Button>

                                            <div className="qty-number px-4 fw-bold border-start border-end">
                                                {qty}
                                            </div>

                                            <Button
                                                variant="light"
                                                className="qty-btn border-0 bg-transparent"
                                                onClick={() =>
                                                    setQty(
                                                        Math.min(
                                                            product.countInStock,
                                                            qty + 1,
                                                        ),
                                                    )
                                                }
                                            >
                                                <HiPlus size={20} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex gap-2 mb-5">
                                <Button
                                    variant="dark"
                                    className="btn-lg flex-grow-1 border-0"
                                    disabled={product.countInStock === 0}
                                    onClick={addToCartHandler}
                                >
                                    <FaShoppingCart
                                        size={22}
                                        className="me-2"
                                    />
                                    Add to Cart
                                </Button>
                                <Button
                                    variant="outline-secondary"
                                    className="btn-lg flex-grow-1"
                                >
                                    Buy Now
                                </Button>
                                <Button
                                    variant="outline-dark"
                                    className="btn-lg px-3"
                                >
                                    <FaRegHeart size={22} />
                                </Button>
                            </div>

                            <Row className="pt-4 border-top mt-5 g-4">
                                {" "}
                                {/* g-4 adds vertical spacing when stacked */}
                                {/* Free Shipping */}
                                <Col
                                    xs={12}
                                    md={4}
                                    className="d-flex align-items-center"
                                >
                                    <LuTruck
                                        size={30}
                                        className="me-3 flex-shrink-0"
                                    />
                                    <div>
                                        <h6 className="fw-bold mb-0">
                                            Free Shipping
                                        </h6>
                                        <p className="text-muted mb-0 small">
                                            On orders over $50
                                        </p>
                                    </div>
                                </Col>
                                {/* 30-Day Returns */}
                                <Col
                                    xs={12}
                                    md={4}
                                    className="d-flex align-items-center"
                                >
                                    <LuRefreshCw
                                        size={28}
                                        className="me-3 flex-shrink-0"
                                    />
                                    <div>
                                        <h6 className="fw-bold mb-0">
                                            30-Day Returns
                                        </h6>
                                        <p className="text-muted mb-0 small">
                                            Hassle-free returns
                                        </p>
                                    </div>
                                </Col>
                                <Col
                                    xs={12}
                                    md={4}
                                    className="d-flex align-items-center"
                                >
                                    <LuShieldCheck
                                        size={30}
                                        className="me-3 flex-shrink-0"
                                    />
                                    <div>
                                        <h6 className="fw-bold mb-0">
                                            2-Year Warranty
                                        </h6>
                                        <p className="text-muted mb-0 small">
                                            Full coverage
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-5 pt-4">
                        <Col md={12}>
                            <Tabs
                                defaultActiveKey="description"
                                id="product-tabs"
                                className="mb-4 custom-tabs"
                                justify
                            >
                                <Tab
                                    eventKey="description"
                                    title={
                                        <span className="fw-bold text-dark">
                                            Description
                                        </span>
                                    }
                                >
                                    <div className="py-4">
                                        <h4 className="fw-bold mb-3 text-dark">
                                            Product Overview
                                        </h4>
                                        <p className="text-muted lh-lg">
                                            {product.description} Lorem ipsum
                                            dolor sit amet, consectetur
                                            adipiscing elit. Vestibulum at lacus
                                            congue, suscipit elit nec, tincidunt
                                            orci. Phasellus egestas nisi vitae
                                            lectus imperdiet venenatis.
                                        </p>

                                        <h5 className="fw-bold mt-4 mb-3 text-dark">
                                            Key Features
                                        </h5>
                                        <ul className="text-muted lh-lg">
                                            <li>
                                                High-fidelity audio with noise
                                                cancelling technology
                                            </li>
                                            <li>
                                                Ergonomic design for
                                                long-lasting comfort
                                            </li>
                                            <li>
                                                Seamless wireless connectivity
                                                with long battery life
                                            </li>
                                            <li>
                                                Premium build quality with
                                                durable materials
                                            </li>
                                        </ul>

                                        <h5 className="fw-bold mt-4 mb-3 text-dark">
                                            What's in the Box
                                        </h5>
                                        <ul className="text-muted lh-lg">
                                            <li>{product.name}</li>
                                            <li>Premium Carrying Case</li>
                                            <li>USB-C Charging Cable</li>
                                            <li>3.5mm Audio Cable</li>
                                            <li>User Manual & Warranty Card</li>
                                        </ul>
                                    </div>
                                </Tab>

                                <Tab
                                    eventKey="specs"
                                    title={
                                        <span className="fw-bold text-dark">
                                            Specifications
                                        </span>
                                    }
                                >
                                    <div className="py-4">
                                        <ListGroup variant="flush">
                                            <ListGroup.Item className="d-flex justify-content-between">
                                                <span className="fw-bold">
                                                    Model
                                                </span>
                                                <span className="text-muted">
                                                    Pro-Series v2
                                                </span>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="d-flex justify-content-between">
                                                <span className="fw-bold">
                                                    Battery Life
                                                </span>
                                                <span className="text-muted">
                                                    Up to 40 Hours
                                                </span>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="d-flex justify-content-between">
                                                <span className="fw-bold">
                                                    Weight
                                                </span>
                                                <span className="text-muted">
                                                    250g
                                                </span>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="d-flex justify-content-between">
                                                <span className="fw-bold">
                                                    Connectivity
                                                </span>
                                                <span className="text-muted">
                                                    Bluetooth 5.2, 3.5mm Jack
                                                </span>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </div>
                                </Tab>

                                <Tab
                                    eventKey="reviews"
                                    title={
                                        <span className="fw-bold text-dark">
                                            Reviews ({product.numReviews})
                                        </span>
                                    }
                                >
                                    <div className="py-5">
                                        <Row className="mb-5 align-items-center">
                                            <Col
                                                md={3}
                                                className="text-center border-end"
                                            >
                                                <h1 className="display-4 fw-bold mb-0">
                                                    {product.rating}
                                                </h1>
                                                <div className="mb-2">
                                                    <Rating
                                                        value={product.rating}
                                                        color="#ffc107"
                                                    />
                                                </div>
                                                <p className="text-muted small">
                                                    Based on{" "}
                                                    {product.numReviews} reviews
                                                </p>
                                            </Col>

                                            <Col md={6} className="px-md-5">
                                                {[5, 4, 3, 2, 1].map((num) => {
                                                    const starCount =
                                                        product?.reviews?.filter(
                                                            (r) =>
                                                                r.rating ===
                                                                num,
                                                        ).length || 0;

                                                    const totalReviews =
                                                        product?.reviews
                                                            ?.length || 0;
                                                    const percentage =
                                                        totalReviews > 0
                                                            ? (starCount /
                                                                  totalReviews) *
                                                              100
                                                            : 0;

                                                    return (
                                                        <div
                                                            key={num}
                                                            className="d-flex align-items-center mb-2"
                                                        >
                                                            <span
                                                                className="me-3 small text-nowrap"
                                                                style={{
                                                                    width: "50px",
                                                                }}
                                                            >
                                                                {num} stars
                                                            </span>
                                                            <div
                                                                className="progress flex-grow-1"
                                                                style={{
                                                                    height: "8px",
                                                                    backgroundColor:
                                                                        "#eee",
                                                                }}
                                                            >
                                                                <div
                                                                    className="progress-bar"
                                                                    role="progressbar"
                                                                    style={{
                                                                        width: `${percentage}%`,
                                                                        backgroundColor:
                                                                            "#fbab18",
                                                                    }}
                                                                ></div>
                                                            </div>
                                                            <span
                                                                className="ms-3 small text-muted"
                                                                style={{
                                                                    width: "30px",
                                                                }}
                                                            >
                                                                {starCount}
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                            </Col>
                                        </Row>

                                        <hr className="my-5" />

                                        <div className="write-review-container p-4 rounded-4 shadow-sm bg-white border">
                                            <h4 className="fw-bold mb-4 position-relative d-inline-block">
                                                Write a Review
                                            </h4>

                                            {userInfo ? (
                                                <Form onSubmit={submitHandler}>
                                                    <Form.Group className="mb-4">
                                                        <Form.Label className="fw-bold small text-muted text-uppercase">
                                                            Your Rating
                                                        </Form.Label>
                                                        <div className="fs-3">
                                                            <ClickRating
                                                                value={rating}
                                                                onClick={(
                                                                    val,
                                                                ) =>
                                                                    setRating(
                                                                        val,
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </Form.Group>

                                                    <Form.Group
                                                        className="mb-4"
                                                        controlId="reviewTitle"
                                                    >
                                                        <Form.Label className="fw-bold small text-muted text-uppercase">
                                                            Review Title
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            value={title}
                                                            onChange={(e) =>
                                                                setTitle(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            placeholder="Summary of your experience"
                                                            className="py-2 bg-light border-0"
                                                        />
                                                    </Form.Group>

                                                    <Form.Group
                                                        className="mb-4"
                                                        controlId="comment"
                                                    >
                                                        <Form.Label className="fw-bold small text-muted text-uppercase">
                                                            Your Review
                                                        </Form.Label>
                                                        <Form.Control
                                                            as="textarea"
                                                            rows={5}
                                                            value={comment}
                                                            onChange={(e) =>
                                                                setComment(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="bg-light border-0"
                                                        />
                                                        <Form.Text className="text-muted small">
                                                            Tell others what you
                                                            think about this
                                                            product. Be honest
                                                            and helpful!
                                                        </Form.Text>
                                                    </Form.Group>

                                                    <Button
                                                        variant="dark"
                                                        type="submit"
                                                        className="w-100 py-3 fw-bold btn-hover-float"
                                                        style={{
                                                            border: "none",
                                                        }}
                                                        disabled={
                                                            loadingProductReview
                                                        }
                                                    >
                                                        {loadingProductReview ? (
                                                            <Loader />
                                                        ) : (
                                                            "Submit Review"
                                                        )}
                                                    </Button>
                                                </Form>
                                            ) : (
                                                <div className="p-4 bg-light rounded text-center">
                                                    Please{" "}
                                                    <Link
                                                        to="/login"
                                                        className="fw-bold text-primary"
                                                    >
                                                        sign in
                                                    </Link>{" "}
                                                    to write a review.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                    <div className="mt-5 pt-4">
                        <h3 className="fw-bold mb-4">Customer Reviews</h3>

                        {product?.reviews?.length === 0 ? (
                            <div className="p-4 bg-light rounded text-center text-muted">
                                No reviews yet. Be the first to share your
                                experience!
                            </div>
                        ) : (
                            <div className="review-list">
                                {product.reviews.map((review) => (
                                    <div
                                        key={review._id}
                                        className="p-4 mb-4 rounded-4 shadow-sm border bg-white"
                                    >
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div className="d-flex align-items-center">
                                                <div
                                                    className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3"
                                                    style={{
                                                        width: "50px",
                                                        height: "50px",
                                                    }}
                                                >
                                                    <span className="text-muted fw-bold">
                                                        {review.name
                                                            .split(" ")
                                                            .map((word) =>
                                                                word.charAt(0),
                                                            )
                                                            .join("")
                                                            .toUpperCase()
                                                            .substring(0, 2)}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h6 className="fw-bold mb-0 text-dark">
                                                        {review.name}
                                                    </h6>
                                                    <small className="text-muted">
                                                        {new Date(
                                                            review.createdAt,
                                                        ).toLocaleDateString(
                                                            "en-GB",
                                                        )}
                                                    </small>
                                                </div>
                                            </div>
                                            <Rating value={review.rating} />
                                        </div>

                                        <h5 className="fw-bold mb-2">
                                            {review.title || "Review Title"}
                                        </h5>
                                        <p className="text-muted lh-base mb-0">
                                            {review.comment}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </Container>
    );
};
export default ProductScreen;
