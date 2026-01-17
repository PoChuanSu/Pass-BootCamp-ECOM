import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function FanFavourites({ products }) {
    return (
        <section className="py-5">
            <h2 className="text-center mb-4">Fan Favourites</h2>

            <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={30}
                breakpoints={{
                    0: { slidesPerView: 2 },
                    576: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1200: { slidesPerView: 5 },
                }}
            >
                {products.map((product) => (
                    <SwiperSlide key={product._id}>
                        <div className="text-center w-100 px-2">
                            <div className="ratio ratio-1x1 mb-3">
                                <Link to={`/product/${product._id}`}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="object-fit-contain p-2"
                                        style={{ maxHeight: "200px" }}
                                    />
                                </Link>
                            </div>
                            <Link
                                to={`/product/${product._id}`}
                                className="text-decoration-none text-reset"
                            >
                                <p className="fw-medium mb-1 text-truncate">
                                    {product.name}
                                </p>
                            </Link>
                            <p className="text-muted mb-0">${product.price}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

export default FanFavourites;
