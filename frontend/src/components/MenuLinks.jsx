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
        <LinkContainer to="/new">
            <Nav.Link>New In</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/office">
            <Nav.Link>Office</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/gaming">
            <Nav.Link>Gaming</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/sale">
            <Nav.Link>Sale</Nav.Link>
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
