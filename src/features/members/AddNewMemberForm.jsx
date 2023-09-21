import { Alert, Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { useAddNewMembersMutation } from "./membersApi";
import { FormTlt } from "../../components";

const AddNewMemberForm = ({ setMessage, setApiStatus }) => {
    const [openModal, setOpenModal] = useState(false);

    const [error, setError] = useState(null);

    const [form] = Form.useForm();
    const [addNewMembers] = useAddNewMembersMutation();
    const onFinish = async (values) => {
        try {
            const { data } = await addNewMembers(values);
            if (data?.success) {
                setMessage(data?.message);
                closeModal();
                setApiStatus(true);
            } else {
                setError(data?.message);
                setApiStatus(false);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const closeModal = () => {
        setOpenModal(false);
        form.resetFields();
    };

    return (
        <section className="">
            <Button
                type="primary"
                className="submit-btn"
                onClick={() => setOpenModal(true)}
            >
                Add New Member
            </Button>

            <Modal
                centered
                open={openModal}
                onCancel={closeModal}
                footer={null}
                style={{ minWidth: "550px", width: "100%" }}
            >
                <Form
                    form={form}
                    labelCol={{
                        span: 8,
                        style: {
                            textAlign: "left",
                            fontFamily: ["Montserrat", "sans-serif"],
                        },
                    }}
                    style={{
                        width: "100%",
                        padding: "12px",
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    {error !== null ? (
                        <Alert
                            message={error}
                            type="error"
                            showIcon
                            className="my-2"
                        />
                    ) : (
                        ""
                    )}

                    <FormTlt title={"Add New Member"} />
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please enter member name!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Phone No."
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: "Please enter phone number!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Address" name="address">
                        <Input />
                    </Form.Item>

                    <Button
                        type="primary"
                        className="submit-btn block ml-auto"
                        htmlType="submit"
                    >
                        Submit
                    </Button>
                </Form>
            </Modal>
        </section>
    );
};

export default AddNewMemberForm;
