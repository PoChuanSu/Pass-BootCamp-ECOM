import { useState } from "react";
import { Row, Col, Container, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { FaFilter } from "react-icons/fa";

const SaleScreen = () => {
    const { pageNumber } = useParams();
    const [sortOption, setSortOption] = useState("newest");

    const { data, isLoading, error } = useGetProductsQuery({
        pageNumber,
        keyword: "",
    });

    let displayedProducts = [];
    if (data && data.products) {
        const saleItems = data.products.filter(
            (p) => p.salePrice > 0 && p.salePrice < p.price,
        );

        displayedProducts = [...saleItems];

        if (sortOption === "newest") {
            displayedProducts.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
            );
        } else if (sortOption === "price-asc") {
            displayedProducts.sort(
                (a, b) => (a.salePrice || a.price) - (b.salePrice || b.price),
            );
        } else if (sortOption === "price-desc") {
            displayedProducts.sort(
                (a, b) => (b.salePrice || b.price) - (a.salePrice || a.price),
            );
        } else if (sortOption === "top-rated") {
            displayedProducts.sort((a, b) => b.rating - a.rating);
        }
    }

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center py-4 mb-5 border-bottom">
                <div className="fs-4">
                    <Link
                        to="/"
                        className="text-decoration-none text-dark fw-bold"
                    >
                        Home
                    </Link>
                    <span className="mx-3 text-muted">/</span>
                    <Link
                        to="/products"
                        className="text-decoration-none text-muted"
                    >
                        All Products
                    </Link>
                    <span className="mx-3 text-muted">/</span>
                    <span className="text-danger fw-bold">On Sale</span>
                </div>

                <div className="d-flex align-items-center">
                    <FaFilter size={20} className="me-3 text-muted" />
                    <Form.Select
                        className="border-0 bg-light rounded-0 py-2 fs-5"
                        style={{ width: "220px", cursor: "pointer" }}
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option value="newest">Newest Arrivals</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="top-rated">Top Rated</option>
                    </Form.Select>
                </div>
            </div>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <>
                    {displayedProducts.length === 0 ? (
                        <Message variant="info">
                            No sale items found right now.
                        </Message>
                    ) : (
                        <Row>
                            {displayedProducts.map((product) => (
                                <Col
                                    key={product._id}
                                    sm={12}
                                    md={6}
                                    lg={4}
                                    xl={3}
                                    className="mb-4"
                                >
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                    )}

                    <div className="d-flex justify-content-center mt-5 mb-5">
                        <Paginate
                            pages={data.pages}
                            page={data.page}
                            isAdmin={false}
                            keyword={""}
                        />
                    </div>
                </>
            )}
        </Container>
    );
};

export default SaleScreen;
