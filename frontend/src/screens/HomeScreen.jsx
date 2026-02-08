import { useParams, Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductCarousel from "../components/ProductCarousel";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import CategoryShowcase from "../components/CategoryShowcase";
import FanFavourites from "../components/FanFavourites";
import AboutMeHero from "../components/AboutMeHero";

const HomeScreen = () => {
    const { pageNumber, keyword } = useParams();
    const { data, isLoading, error } = useGetProductsQuery({
        keyword,
        pageNumber,
    });

    return (
        <>
            {!keyword ? (
                <ProductCarousel />
            ) : (
                <Link className="btn btn-dark mb-4" to="/">
                    Go Back
                </Link>
            )}
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.error || "Connection Error"}
                </Message>
            ) : (
                <>
                    <CategoryShowcase />
                    <FanFavourites products={data.products} />
                    <div id="about-me-section">
                        <AboutMeHero />
                    </div>
                </>
            )}
        </>
    );
};

export default HomeScreen;
