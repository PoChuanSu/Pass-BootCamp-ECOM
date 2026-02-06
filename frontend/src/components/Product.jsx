import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
    return (
        <Card className="my-3 p-3 rounded h-100">
            <Link to={`/product/${product._id}`}>
                <Card.Img
                    src={product.image}
                    variant="top"
                    style={{ height: "200px", objectFit: "contain" }}
                />
            </Link>

            <Card.Body className="d-flex flex-column">
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div" className="text-truncate">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                    />
                </Card.Text>

                <Card.Text as="div" className="mt-auto">
                    {product.salePrice && product.salePrice < product.price ? (
                        <div className="d-flex align-items-center">
                            <span className="text-danger fw-bold fs-4 me-2">
                                ${product.salePrice}
                            </span>
                            <span className="text-muted text-decoration-line-through small">
                                ${product.price}
                            </span>
                        </div>
                    ) : (
                        <h3 className="fs-4">${product.price}</h3>
                    )}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Product;
