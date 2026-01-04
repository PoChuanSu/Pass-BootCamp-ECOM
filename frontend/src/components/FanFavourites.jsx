import { Swiper, SwiperSlide } from "swiper/react";
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
                        <div className="text-center">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="img-fluid mb-3"
                                style={{ maxHeight: "200px" }}
                            />
                            <p className="fw-medium mb-1">{product.name}</p>
                            <p className="text-muted mb-0">${product.price}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

export default FanFavourites;
