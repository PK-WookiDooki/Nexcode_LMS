import { Alert, Form, Modal } from "antd";
import { useEffect, useState } from "react";
import { useChangePasswordMutation } from "./authApi";
import Password from "antd/es/input/Password";
import { useDispatch, useSelector } from "react-redux";
import { removeCookies, setLoginStatus } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { ModalHeader, FormSubmitBtn } from "@/components";
import {setMessage} from "@/core/global/context/notiSlice.js";

const ChangePasswordForm = () => {
    const { token } = useSelector((state) => state.authSlice);
    const [openModal, setOpenModal] = useState(false);
    const [form] = Form.useForm();
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [changePassword] = useChangePasswordMutation();
    const dispatch = useDispatch();
    const nav = useNavigate();

    useEffect(() => {
        if (error !== null) {
            setTimeout(() => {
                setError(null);
            }, 5000);
        }
    }, [error]);

    const onFinish = async (values) => {
        try {
            setIsSubmitting(true)
            const updatedPasswords = {
                oldPassword: values?.currentPassword,
                newPassword: values?.newPassword,
            };
            const { data, error: apiError } = await changePassword({
                updatedPasswords,
                token,
            });
            console.log(data);
            if (data?.success) {
                closeModal();
                dispatch(removeCookies());
                dispatch(
                    setLoginStatus({
                        user: null,

                        token: null,
                    })
                );
                dispatch(setMessage({msgType : "success", msgContent : data?.message}))
                nav("/login");
            } else {
                setIsSubmitting(false)
                setError(apiError?.data?.message || apiError?.error);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const closeModal = () => {
        setIsSubmitting(false)
        form.resetFields();
        setOpenModal(false);
    };

    return (
        <section>
            <button onClick={() => setOpenModal(true)} className="font-sans">
                {" "}
                Change Password{" "}
            </button>
            <Modal
                centered
                open={openModal}
                onCancel={closeModal}
                footer={null}
                width={480}
                className="form-modal"
                closeIcon={false}
            >
                <ModalHeader
                    title={"Change Password"}
                    event={() => setOpenModal(false)}
                />
                <Form
                    onFinish={onFinish}
                    form={form}
                    layout="vertical"
                    labelCol={{
                        style: {
                            textAlign: "left",
                        },
                    }}
                >
                    {error ? (
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
                        label={"Current Password"}
                        name={"currentPassword"}
                        rules={[
                            {
                                required: true,
                                message: "Current password is required!",
                            },
                        ]}
                    >
                        <Password />
                    </Form.Item>
                    <Form.Item
                        label={"New Password"}
                        name={"newPassword"}
                        rules={[
                            {
                                required: true,
                                message: "New password is required!",
                            },
                            {
                                pattern:
                                    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                message:
                                    "Password must have minimum eight characters, at least one uppercase letter, one number and one special character.",
                            },
                            {
                                min: 8,
                                message:
                                    "Password must have at least 8 characters!",
                            },
                        ]}
                    >
                        <Password />
                    </Form.Item>
                    <Form.Item
                        label={"Confirm Password"}
                        name={"password_confirmation"}
                        dependencies={["newPassword"]}
                        rules={[
                            {
                                required: true,
                                message: "Password confirmation is required!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("newPassword") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            "The new password that you entered do not match!"
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Password />
                    </Form.Item>

                    <FormSubmitBtn
                        label={"Confirm"}
                        isFullWidth={true}
                        extraStyle={"mt-3"}
                        isSubmitting={isSubmitting}
                    />
                </Form>
            </Modal>
        </section>
    );
};

export default ChangePasswordForm;
