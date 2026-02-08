import { useState } from "react";
import { Row, Col, Container, Form } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { FaFilter } from "react-icons/fa";

const ProductsScreen = () => {
    const { pageNumber } = useParams();
    const { keyword: urlKeyword } = useParams();
    const [sortOption, setSortOption] = useState("newest");

    const { data, isLoading, error } = useGetProductsQuery({
        pageNumber,
        keyword: urlKeyword,
    });

    let sortedProducts = [];
    if (data && data.products) {
        sortedProducts = [...data.products];

        if (sortOption === "price-asc") {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortOption === "price-desc") {
            sortedProducts.sort((a, b) => b.price - a.price);
        } else if (sortOption === "top-rated") {
            sortedProducts.sort((a, b) => b.rating - a.rating);
        } else if (sortOption === "newest") {
            sortedProducts.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
            );
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
                    <span className="text-muted">All Products</span>
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
                    <Row>
                        {sortedProducts.map((product) => (
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

                    <div className="d-flex justify-content-center mt-5 mb-5 ">
                        <Paginate
                            category={"products"}
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

export default ProductsScreen;
