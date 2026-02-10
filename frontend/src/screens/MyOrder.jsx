import { Table, Button, Container, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaChevronRight } from "react-icons/fa";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";

const MyOrderScreen = () => {
    const {
        data: orders,
        isLoading,
        error,
    } = useGetMyOrdersQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    return (
        <Container className="py-5">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h1 className="fw-bold mb-0">My Order</h1>
                <p className="text-muted mb-0">
                    {orders?.length || 0} orders placed
                </p>
            </div>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <div className="text-center py-5">
                    <Message variant="info">
                        You haven't placed any orders yet.
                    </Message>
                    <LinkContainer to="/">
                        <Button
                            variant="dark"
                            className="mt-3 px-4 rounded-pill"
                        >
                            Start Shopping
                        </Button>
                    </LinkContainer>
                </div>
            ) : (
                <div className="border rounded-4 overflow-hidden shadow-sm bg-white">
                    <Table hover responsive className="mb-0 align-middle">
                        <thead className="bg-light border-bottom">
                            <tr>
                                <th className="ps-4 py-4 text-muted small fw-bold text-uppercase">
                                    Order ID
                                </th>
                                <th className="py-4 text-muted small fw-bold text-uppercase">
                                    Date
                                </th>
                                <th className="py-4 text-muted small fw-bold text-uppercase">
                                    Total
                                </th>
                                <th className="py-4 text-muted small fw-bold text-uppercase">
                                    Payment
                                </th>
                                <th className="py-4 text-muted small fw-bold text-uppercase">
                                    Delivery
                                </th>
                                <th className="pe-4 py-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr
                                    key={order._id}
                                    style={{ transition: "background 0.2s" }}
                                >
                                    <td className="ps-4 py-4">
                                        <span className="text-muted small">
                                            #{order._id.substring(18)}
                                        </span>
                                    </td>
                                    <td className="py-4 fw-medium">
                                        {new Date(
                                            order.createdAt,
                                        ).toLocaleDateString("en-AU", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </td>
                                    <td className="py-4 fw-bold">
                                        ${order.totalPrice.toFixed(2)}
                                    </td>
                                    <td className="py-4">
                                        {order.isPaid ? (
                                            <Badge
                                                bg="success-subtle"
                                                className="text-success border border-success-subtle px-3 py-2 rounded-pill fw-normal"
                                            >
                                                Paid{" "}
                                                {order.paidAt.substring(5, 10)}
                                            </Badge>
                                        ) : (
                                            <Badge
                                                bg="secondary-subtle"
                                                className="text-secondary border border-secondary-subtle px-3 py-2 rounded-pill fw-normal"
                                            >
                                                Unpaid
                                            </Badge>
                                        )}
                                    </td>
                                    <td className="py-4">
                                        {order.isDelivered ? (
                                            <Badge
                                                bg="info-subtle"
                                                className="text-info border border-info-subtle px-3 py-2 rounded-pill fw-normal"
                                            >
                                                Delivered
                                            </Badge>
                                        ) : (
                                            <Badge
                                                bg="warning-subtle"
                                                className="text-warning border border-warning-subtle px-3 py-2 rounded-pill fw-normal"
                                            >
                                                In Progress
                                            </Badge>
                                        )}
                                    </td>
                                    <td className="pe-4 py-4 text-end">
                                        <LinkContainer
                                            to={`/order/${order._id}`}
                                        >
                                            <Button
                                                variant="link"
                                                className="text-dark p-0 d-flex align-items-center justify-content-end text-decoration-none fw-bold small"
                                            >
                                                DETAILS{" "}
                                                <FaChevronRight
                                                    className="ms-2"
                                                    size={10}
                                                />
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </Container>
    );
};

export default MyOrderScreen;
