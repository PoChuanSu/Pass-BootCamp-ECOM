import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const SearchBox = () => {
    const navigate = useNavigate();
    const { keyword: urlKeyword } = useParams();
    const [keyword, setKeyword] = useState(urlKeyword || "");

    const submithandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            setKeyword("");
            navigate(`/search/${keyword}`);
        } else {
            navigate("/");
        }
    };

    return (
        <Form onSubmit={submithandler} className="search-box">
            <div className="search-wrapper">
                <Form.Control
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search for products"
                    className="search-input"
                />
                <Button type="submit" className="search-btn">
                    <FaSearch />
                </Button>
            </div>
        </Form>
    );
};

export default SearchBox;
