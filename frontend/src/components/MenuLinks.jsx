import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const MenuLinks = ({ vertical }) => (
    <Nav className={vertical ? "flex-column" : ""}>
        <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/about">
            <Nav.Link>About</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/category">
            <Nav.Link>Category</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/cart">
            <Nav.Link>Cart</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/checkout">
            <Nav.Link>Checkout</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/contact">
            <Nav.Link>Contact</Nav.Link>
        </LinkContainer>
    </Nav>
);

export default MenuLinks;
