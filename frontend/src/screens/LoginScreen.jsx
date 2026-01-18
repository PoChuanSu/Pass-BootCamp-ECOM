import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    useEffect(() => {
        if (userInfo) navigate(redirect);
    }, [userInfo, redirect, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setEmailError(false);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError(true);
            return;
        }

        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (error) {
            toast.dark(error?.data?.message || error.error);
        }
    };

    return (
        <FormContainer>
            {/* Top Tabs */}
            <Nav
                variant="tabs"
                defaultActiveKey="signin"
                className="mb-5 border-0 justify-content-center"
            >
                <Nav.Item className="w-50 text-center">
                    <Nav.Link
                        eventKey="signin"
                        className="fw-bold text-dark border-0 border-bottom border-dark border-3 py-3"
                    >
                        Sign In
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="w-50 text-center">
                    <Nav.Link
                        as={Link}
                        to={
                            redirect
                                ? `/register?redirect=${redirect}`
                                : `/register`
                        }
                        className="text-muted border-0 py-3"
                    >
                        Create an Account
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            <h1 className="display-5 mb-3" style={{ fontFamily: "serif" }}>
                Sign In
            </h1>
            <p className="text-muted mb-4">
                Sign in to enjoy a faster checkout experience.
            </p>

            <Form onSubmit={submitHandler} noValidate>
                <Form.Group controlId="email" className="mb-4">
                    <Form.Label className="fw-bold small">Email *</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="e.g. name@email.com"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailError) setEmailError(false);
                        }}
                        className="py-3 border-dark rounded-3"
                    />
                    {emailError && (
                        <div className="text-danger small mt-2 fw-bold">
                            Please enter a valid Email
                        </div>
                    )}
                </Form.Group>

                <Form.Group
                    controlId="password"
                    className="mb-2 position-relative"
                >
                    <Form.Label className="fw-bold small">
                        Password *
                    </Form.Label>
                    <div className="position-relative">
                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="py-3 border-dark rounded-3 pe-5"
                        />
                        <span
                            className="position-absolute end-0 top-50 translate-middle-y me-3 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ cursor: "pointer" }}
                        >
                            {showPassword ? (
                                <FaEyeSlash color="#6c757d" />
                            ) : (
                                <FaEye color="#6c757d" />
                            )}
                        </span>
                    </div>
                </Form.Group>

                <Link
                    to="/forgot-password"
                    size="sm"
                    className="text-dark fw-bold text-decoration-none small d-block mt-3 mb-5 "
                >
                    Forgot Password
                </Link>

                <Button
                    type="submit"
                    variant="dark"
                    className="w-100 py-3 fw-bold rounded-3 text-uppercase"
                    disabled={isLoading || !email || !password}
                    style={{ letterSpacing: "1px" }}
                >
                    Sign In
                </Button>

                {isLoading && <Loader />}
            </Form>
        </FormContainer>
    );
};

export default LoginScreen;
