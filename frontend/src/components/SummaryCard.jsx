import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SummaryCard = ({
    order,
    cart,
    cartItems,
    userInfo,
    onCheckout,
    buttonText = "Checkout",
    showCoupon = true,
    isLoading = false,
}) => {
    const navigate = useNavigate();

    const itemsPrice = order
        ? order.itemsPrice
        : cartItems
              ?.reduce((acc, item) => acc + item.qty * item.price, 0)
              .toFixed(2);
    const shippingPrice = order ? order.shippingPrice : cart?.shippingPrice;
    const totalPrice = order ? order.totalPrice : cart?.totalPrice;
    const isPaid = order ? order.isPaid : false;

    // const subtotal = cartItems
    //     .reduce((acc, item) => acc + item.qty * item.price, 0)
    //     .toFixed(2);

    return (
        <Card className="border-0 shadow-sm p-4 rounded-4 bg-white">
            <h2 className="fw-bold mb-4">Order Summary</h2>

            <div className="d-flex justify-content-between mb-3 mt-2">
                <span className="fs-5 text-muted">Subtotal</span>
                <span className="fw-bold fs-5">${itemsPrice}</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
                <span className="fs-5 text-muted">Total Shipping</span>
                <span className="fw-bold fs-5">${shippingPrice}</span>
            </div>

            {showCoupon && (
                <div className="w-100 d-flex justify-content-center align-items-center my-4">
                    <Form.Control
                        placeholder="Coupon code"
                        className="bg-light border-0 py-2"
                    />
                    <Button variant="dark" className="ms-2 px-4 fw-bold">
                        Apply
                    </Button>
                </div>
            )}

            <hr className="my-4" />

            <div className="d-flex justify-content-between align-items-end mb-4">
                <div>
                    <h2 className="fw-bold mb-0">Total</h2>
                    <small className="text-muted fw-bold">Including GST</small>
                </div>
                <h2 className="fw-bold mb-0">${totalPrice}</h2>
            </div>

            <Button
                type={buttonText === "Place Order" ? "submit" : "button"}
                variant="dark"
                className="w-100 py-3 rounded-2 fw-bold fs-5 shadow-none"
                disabled={(cartItems && cartItems.length === 0) || isLoading}
                onClick={onCheckout}
            >
                {isLoading ? "Processing..." : buttonText}
            </Button>

            {!userInfo && (
                <Button
                    variant="light"
                    className="w-100 mt-3 text-dark text-decoration-none small fw-bold"
                    onClick={() => navigate("/delivery")}
                >
                    Checkout as Guest
                </Button>
            )}
        </Card>
    );
};

export default SummaryCard;
