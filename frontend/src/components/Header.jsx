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
import { FaShoppingCart, FaUser, FaRegHeart, FaSearch } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import SearchBox from "./SearchBox";
import logo from "../assets/logo.png";
import { resetCart } from "../slices/cartSlice";
import MainMenu from "./MainMenu";
import MenuLinks from "./MenuLinks";

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
            <Navbar expand={false} className="py-3">
                <Container>
                    <Row className="align-items-center w-100">
                        <Col
                            xs={12}
                            md={3}
                            lg={3}
                            className="d-flex justify-content-center justify-content-md-start"
                        >
                            <LinkContainer to="/">
                                <Navbar.Brand className="fw-bold fs-3 d-flex align-items-center">
                                    <img
                                        src={logo}
                                        alt="su-shop-logo"
                                        height="100"
                                        className="me-4"
                                    />
                                    SuShop
                                </Navbar.Brand>
                            </LinkContainer>
                        </Col>
                        <Col
                            lg={7}
                            className="justify-content-center align-items-center d-none d-lg-flex mx-auto"
                        >
                            <div style={{ maxWidth: "420px", width: "100%" }}>
                                <SearchBox />
                            </div>
                        </Col>
                        <Col
                            xs={12}
                            md={9}
                            lg={2}
                            className="d-flex justify-content-center justify-content-md-end align-items-center"
                        >
                            <Nav className="flex-row align-items-center gap-4">
                                <Nav.Link
                                    className="d-lg-none"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#mobileSearch"
                                    aria-controls="mobileSearch"
                                    aria-expanded="false"
                                >
                                    <FaSearch size={24} />
                                </Nav.Link>
                                {userInfo ? (
                                    <NavDropdown
                                        title={userInfo.name}
                                        id="username"
                                        className="dropdown-menu-start"
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
                                    <LinkContainer to="/login">
                                        <Nav.Link>
                                            <FaUser size={24} />
                                        </Nav.Link>
                                    </LinkContainer>
                                )}
                                <LinkContainer to="/wish">
                                    <Nav.Link>
                                        <div className="icon-hover">
                                            <FaRegHeart size={24} />
                                        </div>
                                    </Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/cart">
                                    <Nav.Link className="position-relative icon-hover">
                                        <FaShoppingCart size={24} />
                                        {cartItems.length > 0 && (
                                            <Badge
                                                pill
                                                bg="dark"
                                                className="position-absolute top-0 start-100 translate-middle"
                                            >
                                                {cartItems.reduce(
                                                    (a, c) => a + c.qty,
                                                    0,
                                                )}
                                            </Badge>
                                        )}
                                    </Nav.Link>
                                </LinkContainer>
                                <Navbar.Toggle
                                    aria-controls="mobile-menu"
                                    className="ms-4 d-md-none"
                                />
                            </Nav>
                        </Col>
                    </Row>
                    <Navbar.Collapse id="mobile-menu" className="mt-3">
                        <MenuLinks vertical />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="collapse d-lg-none" id="mobileSearch">
                <Container className="py-3">
                    <SearchBox />
                </Container>
            </div>
            <div className="d-none d-md-block">
                <MainMenu />
            </div>
        </header>
    );
};
export default Header;
