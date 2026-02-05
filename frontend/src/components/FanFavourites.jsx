import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function FanFavourites({ products }) {
    return (
        <section className="py-5 bg-white">
            <h2 className="text-center mb-5 fw-bold">Fan Favourites</h2>

            <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={15}
                breakpoints={{
                    0: { slidesPerView: 2 },
                    576: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1200: { slidesPerView: 5 },
                }}
            >
                {products.map((product) => (
                    <SwiperSlide key={product._id} className="h-auto">
                        <div className="text-center w-100 px-2 d-flex flex-column h-100">
                            <div
                                className="mb-3 d-flex align-items-center justify-content-center bg-white rounded-3"
                                style={{ height: "160px", overflow: "hidden" }}
                            >
                                <Link
                                    to={`/product/${product._id}`}
                                    className="w-100 h-100 d-flex align-items-center justify-content-center"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        style={{
                                            maxHeight: "90%",
                                            maxWidth: "90%",
                                            objectFit: "contain",
                                        }}
                                    />
                                </Link>
                            </div>

                            <div className="mt-auto">
                                <Link
                                    to={`/product/${product._id}`}
                                    className="text-decoration-none text-dark"
                                >
                                    <p className="fw-bold mb-1 text-truncate small">
                                        {product.name}
                                    </p>
                                </Link>
                                <p className="text-muted mb-2 small">
                                    ${product.price}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

export default FanFavourites;
