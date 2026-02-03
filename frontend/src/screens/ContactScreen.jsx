import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ContactScreen = () => {
    const { userInfo } = useSelector((state) => state.auth);

    const [name, setName] = useState(userInfo?.name || "");
    const [email, setEmail] = useState(userInfo?.email || "");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            toast.success("Message sent successfully");

            setSubject("");
            setMessage("");
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    };

    return (
        <section className="py-5 bg-white">
            <Container>
                <Row className="mb-5 text-center">
                    <Col>
                        <h6
                            className="text-uppercase fw-bold mb-3"
                            style={{ color: "#6c757d", letterSpacing: "2px" }}
                        >
                            We'd love to hear from you
                        </h6>
                        <h1 className="display-4 fw-bold text-dark">
                            Contact SuShop
                        </h1>
                        <p
                            className="lead text-muted mx-auto"
                            style={{ maxWidth: "600px" }}
                        >
                            Have a question about our engineering-grade
                            products? Fill out the form below and our team will
                            get back to you very soon.
                        </p>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col md={7} lg={6} className="mb-5 mb-md-0">
                        <div className="p-4 p-md-5 border rounded-3 bg-light">
                            <h3 className="fw-bold mb-4">Send us a message</h3>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Group controlId="formName">
                                            <Form.Label className="fw-bold">
                                                Name
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="John Wicked"
                                                className="rounded-0 py-2"
                                                value={name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group controlId="formEmail">
                                            <Form.Label className="fw-bold">
                                                Email
                                            </Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="john@example.com"
                                                className="rounded-0 py-2"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group
                                    controlId="formSubject"
                                    className="mb-3"
                                >
                                    <Form.Label className="fw-bold">
                                        Subject
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Order Inquiry / Product Support"
                                        className="rounded-0 py-2"
                                        value={subject}
                                        onChange={(e) =>
                                            setSubject(e.target.value)
                                        }
                                    />
                                </Form.Group>

                                <Form.Group
                                    controlId="formMessage"
                                    className="mb-4"
                                >
                                    <Form.Label className="fw-bold">
                                        Message
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        placeholder="How can we help you?"
                                        className="rounded-0"
                                        value={message}
                                        onChange={(e) =>
                                            setMessage(e.target.value)
                                        }
                                    />
                                </Form.Group>

                                <Button
                                    variant="dark"
                                    type="submit"
                                    className="w-100 py-3 rounded-0 fw-bold text-uppercase"
                                    style={{ letterSpacing: "1px" }}
                                >
                                    Send Message
                                </Button>
                            </Form>
                        </div>
                    </Col>

                    <Col md={5} lg={4} className="ps-md-5 d-flex flex-column">
                        <div className="mb-5">
                            <h4 className="fw-bold mb-3">Visit Us</h4>
                            <p className="text-muted mb-1">
                                <strong>SuShop HQ</strong>
                                <br />
                                1010 Su Street
                                <br />
                                Suwell VIC 1010
                                <br />
                                Australia
                            </p>
                        </div>

                        <div className="mb-5">
                            <h4 className="fw-bold mb-3">Support</h4>
                            <p className="text-muted mb-1">su@email.com</p>
                            <p className="text-muted">+61 410 101 010</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ContactScreen;
