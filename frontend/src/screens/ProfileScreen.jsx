import { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { FaTimes } from "react-icons/fa";
import { useProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { Container } from "react-bootstrap";

const ProfileScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);

    const [updateProfile, { isLoading: loadingUpdateProfile }] =
        useProfileMutation();
    const { data: orders, isLoading, error } = useGetMyOrdersQuery();

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    name,
                    email,
                    password,
                }).unwrap();
                dispatch(setCredentials({ ...res }));
                toast.success("Profile updated successfully");
                setPassword("");
                setConfirmPassword("");
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <Container className="py-5">
            <Row className="g-5">
                <Col lg={4}>
                    <div className="p-4 bg-white border rounded-3 shadow-sm">
                        <h2 className="fw-bold mb-4">User Profile</h2>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId="name" className="mb-3">
                                <Form.Label className="text-muted small fw-bold">
                                    Name
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    className="rounded-0 border-top-0 border-start-0 border-end-0 px-0 shadow-none"
                                    placeholder="Enter name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="email" className="mb-3">
                                <Form.Label className="text-muted small fw-bold">
                                    Email Address
                                </Form.Label>
                                <Form.Control
                                    type="email"
                                    className="rounded-0 border-top-0 border-start-0 border-end-0 px-0 shadow-none"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group
                                controlId="password"
                                title="Leave blank to keep current"
                                className="mb-3"
                            >
                                <Form.Label className="text-muted small fw-bold">
                                    New Password
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    className="rounded-0 border-top-0 border-start-0 border-end-0 px-0 shadow-none"
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </Form.Group>

                            <Form.Group
                                controlId="confirmPassword"
                                title="Repeat new password"
                                className="mb-4"
                            >
                                <Form.Label className="text-muted small fw-bold">
                                    Confirm New Password
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    className="rounded-0 border-top-0 border-start-0 border-end-0 px-0 shadow-none"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </Form.Group>

                            <Button
                                type="submit"
                                variant="dark"
                                className="w-100 rounded-pill py-2 fw-bold"
                            >
                                {loadingUpdateProfile
                                    ? "Updating..."
                                    : "Update Profile"}
                            </Button>
                        </Form>
                    </div>
                </Col>

                <Col lg={8}>
                    <h2 className="fw-bold mb-4">My Orders</h2>
                    {isLoading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant="danger">
                            You haven't placed any orders yet.
                        </Message>
                    ) : (
                        <div className="border rounded-3 overflow-hidden shadow-sm">
                            <Table hover responsive className="mb-0 bg-white">
                                <thead className="bg-light">
                                    <tr>
                                        <th className="px-3 border-0">ID</th>
                                        <th className="border-0">DATE</th>
                                        <th className="border-0">TOTAL</th>
                                        <th className="border-0">PAID</th>
                                        <th className="border-0">DELIVERED</th>
                                        <th className="border-0"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr
                                            key={order._id}
                                            className="align-middle"
                                        >
                                            <td className="px-3 py-3 small text-muted">
                                                #{order._id.substring(0, 8)}...
                                            </td>
                                            <td className="small">
                                                {new Date(
                                                    order.createdAt,
                                                ).toLocaleDateString("en-AU", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </td>
                                            <td className="fw-bold">
                                                ${order.totalPrice.toFixed(2)}
                                            </td>
                                            <td>
                                                {order.isPaid ? (
                                                    <span className="badge bg-success-subtle text-success border border-success px-2 py-1">
                                                        {order.paidAt
                                                            .substring(5, 10)
                                                            .split("-")
                                                            .reverse()
                                                            .join("/")}
                                                    </span>
                                                ) : (
                                                    <FaTimes className="text-danger" />
                                                )}
                                            </td>
                                            <td>
                                                {order.isDelivered ? (
                                                    <span className="badge bg-info-subtle text-info border border-info px-2 py-1">
                                                        {order.deliveredAt.substring(
                                                            0,
                                                            10,
                                                        )}
                                                    </span>
                                                ) : (
                                                    <FaTimes className="text-danger" />
                                                )}
                                            </td>
                                            <td className="text-end px-3">
                                                <LinkContainer
                                                    to={`/order/${order._id}`}
                                                >
                                                    <Button
                                                        variant="outline-dark"
                                                        size="sm"
                                                        className="rounded-pill px-3"
                                                    >
                                                        Details
                                                    </Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};
export default ProfileScreen;
