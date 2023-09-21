import { Alert, Button, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { useGetMemberByIdQuery, useUpdateMembersMutation } from "./membersApi";
import { FormTlt } from "../../components";

const EditMemberForm = ({ setMessage, memberId }) => {
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState(null);

    const { data: memberData } = useGetMemberByIdQuery(memberId);
    const currentMember = memberData?.data;
    const [form] = Form.useForm();

    useEffect(() => {
        if (currentMember) {
            form.setFieldValue("name", currentMember?.name);
            form.setFieldValue("phone", currentMember?.phone);
            form.setFieldValue("address", currentMember?.address);
        }
    }, [openModal]);

    const [updateMembers] = useUpdateMembersMutation();
    const onFinish = async (values) => {
        try {
            const updatedMemberData = { memberId, ...values };
            const { data } = await updateMembers(updatedMemberData);
            if (data?.success) {
                setMessage(data?.message);
                closeModal();
            } else {
                setError(data?.message);
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
            <button
                className="px-3 py-1 rounded-md bg-blue-600 text-white"
                onClick={() => setOpenModal(true)}
            >
                Edit
            </button>

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
                    <FormTlt title={"Edit Member"} />
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

export default EditMemberForm;
