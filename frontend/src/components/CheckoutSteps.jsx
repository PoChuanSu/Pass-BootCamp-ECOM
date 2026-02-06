import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    const steps = [
        { id: 1, label: "Cart", status: step1, url: "/cart" },
        { id: 2, label: "Deliver/Collect", status: step2, url: "/delivery" },
        { id: 3, label: "Address", status: step3, url: "/address" },
        { id: 4, label: "Payment", status: step4, url: "/payment" },
    ];

    const activeStepCount = steps.filter((s) => s.status).length;

    return (
        <div className="position-relative mb-5 mt-4">
            <div
                className="position-absolute top-0 start-50 translate-middle-x w-75 border-bottom"
                style={{ marginTop: "20px", zIndex: 0 }}
            ></div>

            <Nav
                className="justify-content-between position-relative mx-auto w-75"
                style={{ zIndex: 1 }}
            >
                {steps.map((step, index) => {
                    const isCompleted =
                        step.status && index < activeStepCount - 1;
                    const isCurrent =
                        step.status && index === activeStepCount - 1;

                    const stepContent = (
                        <div className="d-flex flex-column align-items-center">
                            {/* Circle Indicator */}
                            <div
                                className={`rounded-circle d-flex align-items-center justify-content-center border ${
                                    isCurrent
                                        ? "bg-dark text-white border-dark"
                                        : isCompleted
                                          ? "bg-white border-dark text-dark"
                                          : "bg-white text-muted border-secondary-subtle"
                                }`}
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    fontSize: "0.9rem",
                                    cursor: isCompleted ? "pointer" : "default",
                                }}
                            >
                                {isCompleted ? (
                                    <span className="fw-bold">✓</span>
                                ) : (
                                    <span className="fw-bold">{step.id}</span>
                                )}
                            </div>

                            <span
                                className={`small mt-2 ${step.status ? "text-dark fw-bold" : "text-muted"}`}
                            >
                                {step.label}
                            </span>
                        </div>
                    );

                    return (
                        <Nav.Item key={step.id}>
                            {isCompleted ? (
                                <Link
                                    to={step.url}
                                    className="text-decoration-none pe-auto"
                                >
                                    {stepContent}
                                </Link>
                            ) : (
                                <div className="text-decoration-none pe-none">
                                    {stepContent}
                                </div>
                            )}
                        </Nav.Item>
                    );
                })}
            </Nav>
        </div>
    );
};

export default CheckoutSteps;
