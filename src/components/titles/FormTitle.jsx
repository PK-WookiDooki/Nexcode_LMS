const FormTitle = ({ title, isCenter }) => {
    return (
        <h2
            className={`text-xl font-semibold ${
                isCenter ? "text-center" : "text-left"
            } `}
        >
            {" "}
            {title}{" "}
        </h2>
    );
};

export default FormTitle;
