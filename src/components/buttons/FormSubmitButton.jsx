import { Button } from "antd";

const FormSubmitButton = ({ label, isFullWidth, extraStyle, isSubmitting }) => {
    return (
        <Button
            type="primary"
            htmlType="submit"
            className={`submit-btn ${
                isFullWidth ? "w-full" : "ml-auto block"
            } ${extraStyle} `}
            loading={isSubmitting}
        >
            {" "}
            {label}{" "}
        </Button>
    );
};

export default FormSubmitButton;
