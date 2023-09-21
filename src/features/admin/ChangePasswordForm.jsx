import { Alert, Button, Form, Modal } from "antd";
import { useEffect, useState } from "react";
import { useUpdateAdminDataMutation } from "./adminApi";
import Password from "antd/es/input/Password";
import { useDispatch, useSelector } from "react-redux";
import { removeCookies, setLoginStatus } from "./authSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FormTlt } from "../../components";

const ChangePasswordForm = () => {
    const [openModal, setOpenModal] = useState(false);
    const [form] = Form.useForm();
    const [error, setError] = useState(null);

    const [updateAdminData] = useUpdateAdminDataMutation();
    const { user } = useSelector((state) => state.authSlice);
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
            const updatedPassword = {
                email: user?.email,
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
            };
            const { data } = await updateAdminData(updatedPassword);
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
                nav("/login", { state: data?.message });
            } else {
                setError(data?.message);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const onFinishFailed = (errors) => {
        console.log(errors);
    };

    const closeModal = () => {
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
                style={{ minWidth: "550px", width: "100%" }}
            >
                <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    form={form}
                    labelCol={{
                        span: 10,
                        style: {
                            textAlign: "left",
                            fontFamily: ["Montserrat", "sans-serif"],
                        },
                    }}
                    style={{
                        width: "100%",
                        padding: "12px",
                    }}
                >
                    <FormTlt title={"Change New Password"} />
                    {error ? (
                        <Alert message={error} type="error" showIcon />
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
                                len: "8",
                                message: "Password cant't be too short!",
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

                    <Button
                        type="primary"
                        htmlType="submit"
                        className="submit-btn block ml-auto"
                    >
                        {" "}
                        Submit{" "}
                    </Button>
                </Form>
            </Modal>
        </section>
    );
};

export default ChangePasswordForm;
