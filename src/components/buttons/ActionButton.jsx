import { Button } from "antd";

const ActionButton = ({ event, label, actionFor }) => {
    return (
        <Button
            type="default"
            htmlType="button"
            size="small"
            onClick={event}
            className={` !px-2 ${
                actionFor === "edit"
                    ? "!border-[#91D5FF] !bg-[#E6F7FF] !text-darkBlue "
                    : " !border-[#FFA39E] !bg-[#FFF1F0] !text-danger"
            } `}
        >
            {label}
        </Button>
    );
};

export default ActionButton;
