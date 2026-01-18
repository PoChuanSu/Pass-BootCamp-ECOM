import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const MainMenu = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="md" className="py-2">
            <Container>
                <Navbar.Toggle
                    aria-controls="main-menu-nav"
                    className="d-md-none"
                />

                <Navbar.Collapse id="main-menu-nav">
                    <Nav>
                        <LinkContainer className="pe-4" to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>

                        <LinkContainer className="px-4" to="/about">
                            <Nav.Link>About</Nav.Link>
                        </LinkContainer>

                        <LinkContainer className="px-4" to="/category">
                            <Nav.Link>Category</Nav.Link>
                        </LinkContainer>

                        <LinkContainer className="px-4" to="/cart">
                            <Nav.Link>Cart</Nav.Link>
                        </LinkContainer>

                        <LinkContainer className="px-4" to="/order">
                            <Nav.Link>Order</Nav.Link>
                        </LinkContainer>

                        <LinkContainer className="px-4" to="/contact">
                            <Nav.Link>Contact</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MainMenu;
