import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";

const MainMenu = () => {
    const location = useLocation();

    return (
        <Navbar bg="dark" variant="dark" expand="md" className="py-2">
            <Container>
                <Navbar.Toggle aria-controls="main-menu-nav" />

                <Navbar.Collapse id="main-menu-nav">
                    <Nav activeKey={location.pathname} className="mx-auto">
                        <LinkContainer className="px-md-3 px-xl-4" to="/" end>
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>

                        <LinkContainer
                            className="px-md-3 px-xl-4"
                            to="/about"
                            end
                        >
                            <Nav.Link>About</Nav.Link>
                        </LinkContainer>

                        <LinkContainer
                            className="px-md-3 px-xl-4"
                            to="/new"
                            end
                        >
                            <Nav.Link className="text-nowrap">New In</Nav.Link>
                        </LinkContainer>

                        <LinkContainer
                            className="px-md-3 px-xl-4"
                            to="/office"
                            end
                        >
                            <Nav.Link>Office</Nav.Link>
                        </LinkContainer>

                        <LinkContainer
                            className="px-md-3 px-xl-4"
                            to="/gaming"
                            end
                        >
                            <Nav.Link>Gaming</Nav.Link>
                        </LinkContainer>

                        <LinkContainer
                            className="px-md-3 px-xl-4"
                            to="/sale"
                            end
                        >
                            <Nav.Link>Sale</Nav.Link>
                        </LinkContainer>

                        <LinkContainer
                            className="px-md-3 px-xl-4"
                            to="/cart"
                            end
                        >
                            <Nav.Link>Cart</Nav.Link>
                        </LinkContainer>

                        <LinkContainer
                            className="px-md-3 px-xl-4"
                            to="/order"
                            end
                        >
                            <Nav.Link>Order</Nav.Link>
                        </LinkContainer>

                        <LinkContainer
                            className="px-md-3 px-xl-4"
                            to="/contact"
                            end
                        >
                            <Nav.Link>Contact</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MainMenu;
