import { Carousel } from "react-bootstrap";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import NewArrivalSlide from "./NewArrivalSlide";
import PromotedSlide from "./PromotedSlide";
import FeaturedProductSection from "./FeaturedProductSection";

const ProductCarousel = () => {
    const { data: products, isLoading, error } = useGetTopProductsQuery();

    return isLoading ? (
        <></>
    ) : error ? (
        <></>
    ) : (
        <Carousel pause="hover" variant="dark">
            <Carousel.Item>
                <NewArrivalSlide products={products} />
            </Carousel.Item>
            <Carousel.Item>
                <PromotedSlide products={products} />
            </Carousel.Item>
            <Carousel.Item>
                <FeaturedProductSection products={products} />
            </Carousel.Item>
        </Carousel>
    );
};

export default ProductCarousel;
