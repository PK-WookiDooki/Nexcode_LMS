import { Button } from "antd";

const FormSubmitButton = ({ label, isFullWidth, extraStyle, isSubmitting, isDisabled }) => {
    return (
        <Button
            type="primary"
            htmlType="submit"
            className={` capitalize ${isDisabled ? "" : "submit-btn" }  ${
                isFullWidth ? "w-full" : "ml-auto block"
            } ${extraStyle} `}
            loading={isSubmitting}
            disabled={isDisabled}
        >
            {" "}
            {label}{" "}
        </Button>
    );
};

export default FormSubmitButton;
