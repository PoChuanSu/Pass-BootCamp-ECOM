import { Table, Button, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaTimes } from "react-icons/fa";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";

const MyOrderScreen = () => {
    const { data: orders, isLoading, error } = useGetMyOrdersQuery();

    return (
        <Container className="py-3">
            <h1 className="mb-4">My Orders</h1>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <Table
                    striped
                    hover
                    responsive
                    className="table-sm align-middle"
                >
                    <thead>
                        <tr className="text-uppercase">
                            <th className="py-3">ID</th>
                            <th className="py-3">Date</th>
                            <th className="py-3">Total</th>
                            <th className="py-3">Paid</th>
                            <th className="py-3">Delivered</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td className="py-3">{order._id}</td>
                                <td className="py-3">
                                    {order.createdAt.substring(0, 10)}
                                </td>
                                <td className="py-3">${order.totalPrice}</td>
                                <td className="py-3">
                                    {order.isPaid ? (
                                        order.paidAt.substring(0, 10)
                                    ) : (
                                        <FaTimes style={{ color: "red" }} />
                                    )}
                                </td>
                                <td className="py-3">
                                    {order.isDelivered ? (
                                        order.deliveredAt.substring(0, 10)
                                    ) : (
                                        <FaTimes style={{ color: "red" }} />
                                    )}
                                </td>
                                <td className="py-3 text-end">
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button
                                            className="btn-sm px-3"
                                            variant="light"
                                            style={{
                                                backgroundColor: "#f8f9fa",
                                                border: "1px solid #dee2e6",
                                            }}
                                        >
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default MyOrderScreen;
