import { Container, Row, Col } from "react-bootstrap";
import aboutMeImg from "../assets/aboutme.jpg";

const AboutMeHero = () => {
    return (
        <section
            className="mx-auto bg-light rounded"
            style={{ maxWidth: "1200px" }}
        >
            <Container>
                <Row className="align-items-center my-5">
                    <Col lg={8} md={12} className="mb-4 mb-lg-0">
                        <h1 className="mb-5">
                            Driven by code. Inspired by craft.
                        </h1>
                        <p style={{ maxWidth: "700px" }} className="fw-medium">
                            I am a developer dedicated to building elegant,
                            user-friendly solutions. I thrive on solving complex
                            problems with clean code and a creative perspective.
                            For me, every project is an opportunity to learn,
                            innovate, and turn a vision into a digital reality.
                        </p>
                    </Col>

                    <Col
                        lg={4}
                        md={12}
                        className="d-flex justify-content-center justify-content-lg-end pe-lg-0"
                    >
                        <div
                            className="shadow-sm rounded overflow-hidden"
                            style={{ maxWidth: "350px", width: "100%" }}
                        >
                            <img
                                src={aboutMeImg}
                                alt="About me img"
                                className="img-fluid d-block mx-auto"
                                style={{ height: "auto" }}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default AboutMeHero;
