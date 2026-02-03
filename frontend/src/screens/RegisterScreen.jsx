import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaCheckCircle, FaInfoCircle } from "react-icons/fa";

const RegisterScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    useEffect(() => {
        if (userInfo) navigate(redirect);
    }, [userInfo, redirect, navigate]);

    const passwordValidations = [
        {
            label: "7-12 characters",
            test: (pw) => pw.length >= 7 && pw.length <= 12,
        },
        { label: "1 number", test: (pw) => /\d/.test(pw) },
        { label: "1 uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
    ];

    const isPasswordValid = passwordValidations.every((item) =>
        item.test(password),
    );

    const submitHandler = async (e) => {
        e.preventDefault();
        setEmailError(false);

        if (!name || !email || !password || !confirmPassword) {
            toast.dark("Please complete all fields to continue.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError(true);
            return;
        }

        if (password !== confirmPassword) {
            toast.dark("The passwords entered do not match.");
        } else {
            try {
                const res = await register({ name, email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate(redirect);
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
        }
    };

    return (
        <FormContainer>
            {/* Top Tabs matching Login page */}
            <Nav
                variant="tabs"
                defaultActiveKey="register"
                className="mb-5 border-0 justify-content-center"
            >
                <Nav.Item className="w-50 text-center">
                    <Nav.Link
                        as={Link}
                        to={redirect ? `/login?redirect=${redirect}` : `/login`}
                        className="text-muted border-0 py-3"
                    >
                        Sign In
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="w-50 text-center">
                    <Nav.Link
                        eventKey="register"
                        className="fw-bold text-dark border-0 border-bottom border-dark border-3 py-3"
                    >
                        Create an Account
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            <h1 className="display-5 mb-3" style={{ fontFamily: "serif" }}>
                Register today
            </h1>
            <p className="text-muted mb-4 small">
                Create an account to enjoy faster checkout, curate a wishlist
                and track your orders.
            </p>

            <Form onSubmit={submitHandler} noValidate>
                <Form.Group controlId="name" className="mb-4">
                    <Form.Label className="fw-bold small">
                        Full Name *
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="e.g. Peter Su"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="py-3 border-dark rounded-3"
                    />
                </Form.Group>

                <Form.Group controlId="email" className="mb-4">
                    <Form.Label className="fw-bold small">Email *</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="e.g. name@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    className="mb-3 position-relative"
                >
                    <Form.Label className="fw-bold small">
                        Password *
                    </Form.Label>
                    <div className="position-relative">
                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="7-12 characters"
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
                <Form.Group
                    controlId="confirmPassword"
                    className="mb-4 position-relative"
                >
                    <Form.Label className="fw-bold small">
                        Confirm Password *
                    </Form.Label>
                    <div className="position-relative">
                        <Form.Control
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Re-enter password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="py-3 border-dark rounded-3 pe-5"
                        />
                        <span
                            className="position-absolute end-0 top-50 translate-middle-y me-3 cursor-pointer"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                            style={{ cursor: "pointer" }}
                        >
                            {showConfirmPassword ? (
                                <FaEyeSlash color="#6c757d" />
                            ) : (
                                <FaEye color="#6c757d" />
                            )}
                        </span>
                    </div>
                </Form.Group>

                {/* Password Requirements helper */}
                {password.length > 0 && (
                    <div className="mb-4 px-1">
                        {passwordValidations.map((item, index) => {
                            const isMet = item.test(password);
                            return (
                                <div
                                    key={index}
                                    className={`d-flex align-items-center mb-1 transition-all ${isMet ? "text-success" : "text-muted"}`}
                                    style={{
                                        fontSize: "0.85rem",
                                        transition: "color 0.3s ease",
                                    }}
                                >
                                    {isMet ? (
                                        <FaCheckCircle
                                            className="me-2"
                                            size={14}
                                        />
                                    ) : (
                                        <FaInfoCircle
                                            className="me-2"
                                            size={14}
                                        />
                                    )}
                                    <span className={isMet ? "fw-bold" : ""}>
                                        {item.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}

                <Button
                    type="submit"
                    variant="dark"
                    className="w-100 py-3 fw-bold rounded-3 text-uppercase"
                    disabled={isLoading || !isPasswordValid}
                    style={{ letterSpacing: "1px" }}
                >
                    Create Account
                </Button>

                {isLoading && <Loader />}
            </Form>
        </FormContainer>
    );
};

export default RegisterScreen;
