import { Alert } from "react-bootstrap";

const Message = ({ variant = "info", children }) => {
    return (
        <Alert variant={variant} className="text-dark fw-bold">
            {children}
        </Alert>
    );
};

export default Message;
