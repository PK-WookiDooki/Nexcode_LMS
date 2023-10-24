import { Alert, Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { useAddNewMembersMutation } from "./membersApi";
import {FormSubmitBtn, ModalHeader} from "@/components";
import {useDispatch, useSelector} from "react-redux";
import {setAlert} from "@/core/global/context/notiSlice.js";

const AddNewMemberForm = () => {
    const { token } = useSelector((state) => state.authSlice);
    const [openModal, setOpenModal] = useState(false);

    const [error, setError] = useState(null);
    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false)

    const dispatch = useDispatch()

    const [addNewMembers] = useAddNewMembersMutation();
    const onFinish = async (values) => {
        try {
            setIsSubmitting(true)
            const { data, error: apiError } = await addNewMembers({
                memberData: values,
                token,
            });
            if (data?.success) {
                dispatch(setAlert({alertType: "success", alertMsg : data?.message}))
                closeModal();
            } else {
                setIsSubmitting(false)
                setError(apiError?.data || apiError?.error);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const closeModal = () => {
        form.resetFields();
        setOpenModal(false);
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
                width={480}
                className="form-modal"
                closeIcon={false}
            >
                <ModalHeader title={"Add New Member"} event={closeModal} />

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
                    <FormSubmitBtn label={"Save"} isSubmitting={isSubmitting} />
                </Form>
            </Modal>
        </section>
    );
};

export default AddNewMemberForm;
