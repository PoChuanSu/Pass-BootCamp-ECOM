import { useNavigate } from "react-router-dom";
import {
    Badge,
    Navbar,
    Nav,
    Container,
    NavDropdown,
    Row,
    Col,
} from "react-bootstrap";
import { FaShoppingCart, FaUser, FaRegHeart } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap"; // npm i react-router-bootstrap
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import SearchBox from "./SearchBox";
import logo from "../assets/logo.png";
import { resetCart } from "../slices/cartSlice";

// npm i react-router-dom@6.8.2 downgrade to solve issue

const Header = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            dispatch(resetCart());
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <header>
            <Navbar expand="md" className="py-5">
                <Container>
                    <Row className="align-items-center w-100">
                        <Col md={4}>
                            <LinkContainer to="/">
                                <Navbar.Brand className="fw-bold fs-3 d-flex align-items-center">
                                    <img
                                        src={logo}
                                        alt="su-shop-logo"
                                        height="48"
                                        className="me-2"
                                    />
                                    SuShop
                                </Navbar.Brand>
                            </LinkContainer>
                        </Col>
                        <Col md={4} className="justify-content-center">
                            <SearchBox />
                        </Col>
                        <Col md={4} className="text-end">
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="ms-auto">
                                    {userInfo ? (
                                        <NavDropdown
                                            title={userInfo.name}
                                            id="username"
                                        >
                                            <LinkContainer to="/profile">
                                                <NavDropdown.Item>
                                                    Profile
                                                </NavDropdown.Item>
                                            </LinkContainer>
                                            <NavDropdown.Item
                                                onClick={logoutHandler}
                                            >
                                                Logout
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    ) : (
                                        <LinkContainer
                                            className="px-4"
                                            to="/login"
                                        >
                                            <Nav.Link>
                                                <FaUser size={24} />
                                            </Nav.Link>
                                        </LinkContainer>
                                    )}
                                    <Nav.Link className="px-4">
                                        <FaRegHeart size={24} />
                                    </Nav.Link>
                                    <LinkContainer to="/cart">
                                        <Nav.Link className="ps-4 position-relative">
                                            <FaShoppingCart size={24} />
                                            {cartItems.length > 0 && (
                                                <Badge
                                                    pill
                                                    bg="dark"
                                                    className="position-absolute top-0 start-100 translate-middle"
                                                >
                                                    {cartItems.reduce(
                                                        (a, c) => a + c.qty,
                                                        0
                                                    )}
                                                </Badge>
                                            )}
                                        </Nav.Link>
                                    </LinkContainer>
                                </Nav>
                            </Navbar.Collapse>
                        </Col>
                    </Row>
                </Container>
            </Navbar>
        </header>
    );
};
export default Header;
