import { Alert, Button, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { useUpdateMembersMutation } from "./membersApi";
import { ModalHeader } from "@/components";
import { useSelector } from "react-redux";
import { ActionBtn } from "@/components";

const EditMemberForm = ({ setMessage, member }) => {
    const { token } = useSelector((state) => state.authSlice);
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState(null);
    const [form] = Form.useForm();

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (member) {
            form.setFieldValue("name", member?.name);
            form.setFieldValue("phone", member?.phone);
            form.setFieldValue("address", member?.address);
        }
    }, [openModal]);

    const [updateMembers] = useUpdateMembersMutation();
    const onFinish = async (values) => {
        try {
            setIsSubmitting(true);
            const { data, error: apiError } = await updateMembers({
                memberData: values,
                id: member?.id,
                token,
            });
            if (data?.success) {
                setMessage(data?.message);
                closeModal();
                setIsSubmitting(false);
            } else {
                setError(apiError?.data?.message || apiError?.error);
                setIsSubmitting(false);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const closeModal = () => {
        setOpenModal(false);
        setError(null);
    };

    return (
        <section className="">
            <ActionBtn
                label={"Edit"}
                actionFor={"edit"}
                event={() => setOpenModal(true)}
            />
            <Modal
                centered
                open={openModal}
                onCancel={closeModal}
                footer={null}
                width={480}
                className="form-modal"
                closeIcon={false}
            >
                <ModalHeader title={"Edit Member"} event={closeModal} />

                <Form
                    form={form}
                    layout="vertical"
                    labelCol={{
                        style: {
                            textAlign: "left",
                        },
                    }}
                    onFinish={onFinish}
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
