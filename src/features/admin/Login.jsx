import { Alert, Form, Input, notification } from "antd";
import { useEffect, useState } from "react";
import { useLoginAccountMutation } from "./adminApi";
import { useDispatch } from "react-redux";
import { setLoginStatus } from "./authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const Login = () => {
    const [error, setError] = useState(null);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const nav = useNavigate();

    const location = useLocation();
    //console.log(location);
    const message = location?.state;

    console.log(message);
    useEffect(() => {
        if (error !== null) {
            setTimeout(() => {
                setError(null);
            }, 5000);
        }
        openNotification();
    }, [error, message]);

    //notification

    const [api, contextHolder] = notification.useNotification();

    const openNotification = () => {
        api["success"]({
            message: message,
        });
    };

    const [loginAccount] = useLoginAccountMutation();

    const onFinish = async (values) => {
        try {
            const { data } = await loginAccount(values);
            console.log(data);
            if (data?.success) {
                Cookies.set("user", JSON.stringify(data?.data));
                Cookies.set("token", data?.token);
                dispatch(
                    setLoginStatus({ user: data?.data, token: data?.token })
                );
                nav("/");
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

    return (
        <section className="min-h-screen flex items-center justify-center">
            {message !== null ? contextHolder : ""}
            <div className="max-w-md w-full p-3 rounded-md shadow-md border">
                <h2 className="pb-5 text-lg font-bold text-center">
                    {" "}
                    Login Account{" "}
                </h2>

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

                <Form
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    labelCol={{
                        span: 7,
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
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Email address is required!",
                            },
                        ]}
                    >
                        <Input type="email" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Password is required!",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <button
                        className="px-4 py-2 rounded-md bg-blue-600 text-white mt-3 font-sans"
                        type="submit"
                    >
                        {" "}
                        Submit{" "}
                    </button>
                </Form>
            </div>
        </section>
    );
};

export default Login;
