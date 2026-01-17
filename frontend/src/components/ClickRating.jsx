import { FaStar, FaRegStar } from "react-icons/fa";

const ClickRating = ({ value, text, color = "#fbab18", onClick }) => {
    return (
        <div className="rating">
            {[1, 2, 3, 4, 5].map((index) => (
                <span
                    key={index}
                    onClick={() => onClick && onClick(index)}
                    style={{ cursor: onClick ? "pointer" : "default" }}
                >
                    {value >= index ? (
                        <FaStar style={{ color }} />
                    ) : (
                        <FaRegStar style={{ color }} />
                    )}
                </span>
            ))}
            <span className="rating-text ms-2 small text-muted">
                {text && text}
            </span>
        </div>
    );
};

export default ClickRating;
