import { useEffect, useState, useCallback } from "react";

const CountdownTimer = ({ endDate }) => {
    const calculateTimeLeft = useCallback(() => {
        const difference = new Date(endDate) - new Date();

        if (difference <= 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }, [endDate]);

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [calculateTimeLeft]);

    return (
        <div className="d-flex gap-3 mt-2">
            {Object.entries(timeLeft).map(([label, value]) => (
                <div key={label} className="count-box text-center">
                    <h5 className="mb-0 text-accent">{value}</h5>
                    <small className="text-muted text-capitalize">
                        {label}
                    </small>
                </div>
            ))}
        </div>
    );
};

export default CountdownTimer;
