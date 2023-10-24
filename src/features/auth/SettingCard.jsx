import { Alert, Button, Form, InputNumber, Modal } from "antd";
import {MdOutlineBorderColor} from "react-icons/md";
import { ModalHeader } from "@/components";

const SettingCard = ({
    title,
    event,
    currentValue,
    open,
    setOpenModal,
    name,
    error,
}) => {
    return (
        <section className="p-5 bg-[#D6E4FF]/30">
            <div className="flex items-center gap-5 ml-12">
                <h2 className="flex items-center gap-5 text-lg font-medium">
                    {" "}
                    {title} : <span>{currentValue}</span>
                </h2>
                <button
                    onClick={() => setOpenModal(true)}
                    className=" text-darkBlue outline-none text-xl"
                >
                    <MdOutlineBorderColor />
                </button>
            </div>
            <Modal
                centered
                width={480}
                open={open}
                footer={null}
                closeIcon={false}
                className="form-modal"
            >
                <ModalHeader
                    title={`Change ${title}`}
                    event={() => setOpenModal(false)}
                />
                <Form layout="vertical" onFinish={event}>
                    {error !== null ? (
                        <Alert
                            message={error}
                            type="error"
                            showIcon
                            className="mb-3"
                        />
                    ) : (
                        ""
                    )}

                    <Form.Item
                        label={title}
                        name={name}
                        rules={[
                            {
                                required: true,
                                message: `${title} is required!`,
                            },
                            {
                                type: "number",
                                min: 1,
                                max: 10,
                                message: "Please enter valid number!",
                            },
                        ]}
                        initialValue={currentValue}
                    >
                        <InputNumber
                            type="number"
                            className="w-full h-10 leading-10 text-base"
                        />
                    </Form.Item>
                    <div className="flex justify-end">
                        <Button
                            type="primary"
                            htmlType="submit"
                            className={` shadow-none confirm-btn`}
                        >
                            Save
                        </Button>
                    </div>
                </Form>
            </Modal>
        </section>
    );
};

export default SettingCard;
