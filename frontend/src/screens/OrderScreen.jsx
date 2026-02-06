import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Button, ListGroup, Image, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetPayPalClientIdQuery,
    useDeliverOrdersMutation,
} from "../slices/ordersApiSlice";
import SummaryCard from "../components/SummaryCard";

const OrderScreen = () => {
    const { id: orderId } = useParams();
    const {
        data: order,
        refetch,
        isLoading,
        error,
    } = useGetOrderDetailsQuery(orderId);

    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const [deliverOrder, { isLoading: loadingDeliver }] =
        useDeliverOrdersMutation();

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    const {
        data: paypal,
        isLoading: loadingPayPal,
        error: errorPayPal,
    } = useGetPayPalClientIdQuery();

    useEffect(() => {
        if (!errorPayPal && !loadingPayPal && paypal.clientId) {
            const loadPayPalScript = async () => {
                paypalDispatch({
                    type: "resetOptions",
                    value: {
                        "client-id": paypal.clientId,
                        currency: "AUD",
                    },
                });
                paypalDispatch({ type: "setLoadingStatus", value: "pending" });
            };

            if (order && !order.isPaid) {
                if (!window.paypal) {
                    loadPayPalScript();
                }
            }
        }
    }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
            try {
                await payOrder({ orderId, details }).unwrap();
                refetch();
                toast.success("Payment successful");
            } catch (error) {
                toast.error(error?.data?.message || error.message);
            }
        });
    }

    async function onApproveTest() {
        console.log(orderId);
        console.log(userInfo);
        await payOrder({
            orderId,
            details: {
                id: orderId,
                status: "COMPLETED",
                payer: { ...userInfo },
            },
        });
        refetch();
    }

    function onError(err) {
        toast.error(err.message);
    }

    function createOrder(data, actions) {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: { value: order.totalPrice },
                    },
                ],
            })
            .then((orderId) => {
                return orderId;
            });
    }

    const deliverOrderHandler = async () => {
        try {
            await deliverOrder(orderId);
            refetch();
            toast.success("Order delivered");
        } catch (err) {
            toast.error(err?.data?.message || err.message);
        }
    };

    return isLoading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">
            {error?.data?.message || error.error}
        </Message>
    ) : (
        <div className="container py-4">
            <div className="mb-4">
                <h1 className="fw-bold h3">Order Details</h1>
                <p className="text-muted small">ID: {order._id}</p>
            </div>

            <Row className="g-4">
                <Col lg={8}>
                    <ListGroup
                        variant="flush"
                        className="border rounded-3 shadow-sm bg-white p-2"
                    >
                        <ListGroup.Item className="border-0 py-4">
                            <h4 className="fw-bold mb-3">
                                Shipping Information
                            </h4>
                            <Row className="small">
                                <Col md={6}>
                                    <p className="mb-1 text-muted">Customer</p>
                                    <p className="fw-bold mb-3">
                                        {order.user.name} ({order.user.email})
                                    </p>
                                    <p className="mb-1 text-muted">Address</p>
                                    <p className="mb-0">
                                        {order.shippingAddress.address},{" "}
                                        {order.shippingAddress.state}, AU
                                    </p>
                                </Col>
                                <Col md={6} className="d-flex align-items-end">
                                    {order.isDelivered ? (
                                        <Message
                                            variant="success"
                                            className="w-100 py-2 mt-2"
                                        >
                                            Delivered on{" "}
                                            {order.deliveredAt.substring(0, 10)}
                                        </Message>
                                    ) : (
                                        <Message
                                            variant="danger"
                                            className="w-100 py-2 mt-2"
                                        >
                                            Awaiting Delivery
                                        </Message>
                                    )}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <hr className="mx-3 my-0" />

                        <ListGroup.Item className="border-0 py-4">
                            <h4 className="fw-bold mb-3">Payment</h4>
                            <Row className="small">
                                <Col md={6}>
                                    <p className="mb-1 text-muted">Method</p>
                                    <p className="fw-bold">
                                        {order.paymentMethod}
                                    </p>
                                </Col>
                                <Col md={6} className="d-flex align-items-end">
                                    {order.isPaid ? (
                                        <Message
                                            variant="success"
                                            className="w-100 py-2 mt-2"
                                        >
                                            Paid on{" "}
                                            {order.paidAt.substring(0, 10)}
                                        </Message>
                                    ) : (
                                        <Message
                                            variant="danger"
                                            className="w-100 py-2 mt-2"
                                        >
                                            Payment Required
                                        </Message>
                                    )}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <hr className="mx-3 my-0" />

                        <ListGroup.Item className="border-0 py-4">
                            <h4 className="fw-bold mb-4">Ordered Items</h4>
                            {order.orderItems.map((item, index) => (
                                <Row
                                    key={index}
                                    className="align-items-center mb-3"
                                >
                                    <Col xs={2} md={1}>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fluid
                                            rounded
                                            className="bg-light p-1 border"
                                        />
                                    </Col>
                                    <Col>
                                        <Link
                                            to={`/product/${item.product}`}
                                            className="text-decoration-none text-dark fw-bold small"
                                        >
                                            {item.name}
                                        </Link>
                                        <div className="text-muted small d-md-none">
                                            {item.qty} x ${item.price}
                                        </div>
                                    </Col>
                                    <Col
                                        md={4}
                                        className="text-end d-none d-md-block fw-bold small"
                                    >
                                        {item.qty} x ${item.price} = $
                                        {item.qty * item.price}
                                    </Col>
                                </Row>
                            ))}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col lg={4}>
                    <SummaryCard
                        order={order}
                        userInfo={userInfo}
                        buttonText="Pseudo Pay the Order"
                        onCheckout={onApproveTest}
                        isLoading={loadingPay}
                        isPending={isPending}
                    />

                    {userInfo?.isAdmin &&
                        order.isPaid &&
                        !order.isDelivered && (
                            <div className="mt-3">
                                <Button
                                    type="button"
                                    className="btn btn-dark w-100 py-3 rounded-3 shadow-none fw-bold"
                                    onClick={deliverOrderHandler}
                                    disabled={loadingDeliver}
                                >
                                    {loadingDeliver ? (
                                        <Loader />
                                    ) : (
                                        "Mark As Delivered"
                                    )}
                                </Button>
                            </div>
                        )}
                </Col>
            </Row>
        </div>
    );
};

export default OrderScreen;
