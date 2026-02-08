import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaShoppingCart, FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Rating from "./Rating";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import { toggleLike } from "../slices/wishlistSlice";

const Product = ({ product }) => {
    const dispatch = useDispatch();

    const { cartItems } = useSelector((state) => state.cart);
    const isInCart = cartItems.some((x) => x._id === product._id);

    const { wishlistItems } = useSelector(
        (state) => state.wishlist || { wishlistItems: [] },
    );
    const isLiked = wishlistItems.some((x) => x._id === product._id);

    const toggleCartHandler = (e) => {
        e.preventDefault();

        if (isInCart) {
            dispatch(removeFromCart(product._id));
        } else {
            if (product.countInStock > 0) {
                dispatch(addToCart({ ...product, qty: 1 }));
            }
        }
    };

    const toggleLikeHandler = (e) => {
        e.preventDefault();
        dispatch(toggleLike(product));
    };

    return (
        <Card className="my-3 p-3 rounded-4 h-100 border-0 shadow-sm product-card">
            <Link to={`/product/${product._id}`}>
                <Card.Img
                    src={product.image}
                    variant="top"
                    style={{ height: "200px", objectFit: "contain" }}
                    className="p-2"
                />
            </Link>

            <Card.Body className="d-flex flex-column px-1">
                <Link
                    to={`/product/${product._id}`}
                    className="text-decoration-none text-dark"
                >
                    <Card.Title as="div" className="text-truncate mb-2">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div" className="mb-2">
                    <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                    />
                </Card.Text>

                <div className="mt-auto d-flex justify-content-between align-items-center">
                    <Card.Text as="div" className="mb-0">
                        {product.salePrice &&
                        product.salePrice < product.price ? (
                            <div className="d-flex flex-column">
                                <span className="text-danger fw-bold fs-5">
                                    ${product.salePrice}
                                </span>
                                <span className="text-muted text-decoration-line-through x-small">
                                    ${product.price}
                                </span>
                            </div>
                        ) : (
                            <span className="fw-bold fs-5">
                                ${product.price}
                            </span>
                        )}
                    </Card.Text>

                    <div className="d-flex align-items-center gap-3">
                        <div
                            style={{ cursor: "pointer" }}
                            onClick={toggleLikeHandler}
                            className="p-1 icon-hover"
                        >
                            {isLiked ? (
                                <FaHeart className="text-danger" size={20} />
                            ) : (
                                <FaRegHeart className="text-muted" size={20} />
                            )}
                        </div>

                        <div
                            className="p-2 d-flex align-items-center justify-content-center shadow-none icon-hover"
                            style={{
                                width: "40px",
                                height: "40px",
                                backgroundColor: "transparent",
                                cursor:
                                    product.countInStock === 0
                                        ? "not-allowed"
                                        : "pointer",
                                opacity: product.countInStock === 0 ? 0.3 : 1,
                            }}
                            onClick={toggleCartHandler}
                        >
                            {isInCart ? (
                                <FaCheck size={20} className="text-success" />
                            ) : (
                                <FaShoppingCart
                                    size={20}
                                    className={
                                        product.countInStock === 0
                                            ? "text-muted opacity-50"
                                            : "text-dark"
                                    }
                                />
                            )}
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Product;
