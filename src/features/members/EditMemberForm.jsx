import { Alert, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { useUpdateMembersMutation } from "./membersApi";
import {FormSubmitBtn, ModalHeader, ActionBtn} from "@/components";
import {useDispatch, useSelector} from "react-redux";
import {scrollBackToTop} from "@/core/functions/scrollToTop.js";
import {setMessage} from "@/core/global/context/notiSlice.js";

const EditMemberForm = ({ member, setSearch }) => {
    const { token } = useSelector((state) => state.authSlice);
    const [openModal, setOpenModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null);
    const [form] = Form.useForm();

    const dispatch = useDispatch()

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
                dispatch(setMessage({msgType: "success", msgContent: "Member updated successfully!"}))
                closeModal();
                setSearch("")
            } else {
                dispatch(setMessage({msgType: "error", msgContent: apiError?.data?.message || apiError?.error }))
                setIsSubmitting(false);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const closeModal = () => {
        scrollBackToTop()
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
                            {
                                pattern : /^(09)\d{6,9}$/,
                                message : "Please enter valid phone number!"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Address" name="address"
                               rules={[
                                   {
                                       required: true,
                                       message: "Please enter member address!",
                                   },
                               ]}
                    >
                        <Input />
                    </Form.Item>
                    <FormSubmitBtn label={"Save"} isSubmitting={isSubmitting} />
                </Form>
            </Modal>
        </section>
    );
};

export default EditMemberForm;
