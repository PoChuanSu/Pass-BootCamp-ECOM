import { Helmet } from "react-helmet-async";

const Meta = ({
    title = "Welcome to SuShop",
    description = "We sell the bast products for cheap",
    keywords = "electronic, buy eletornics, cehap electronics",
}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
        </Helmet>
    );
};

export default Meta;
