import { Alert, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useLoginAccountMutation } from "./authApi";
import { useDispatch } from "react-redux";
import { setLoginStatus } from "./authSlice";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {FormTlt, FormSubmitBtn, Quote} from "@/components";
import imgBg from "@/assets/imgs/img_login.png";
import { setMessage } from "@/core/global/context/notiSlice";

const Login = () => {
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const nav = useNavigate();

    const [isFormEmpty, setIsFormEmpty] = useState(true)

    const nameValue = Form.useWatch("username", form)
    const pwsValue = Form.useWatch("password", form)

    useEffect(() => {
        if(nameValue?.length > 0 && pwsValue?.length > 0 ) {
            setIsFormEmpty(false)
        }
    },  [nameValue, pwsValue])

    useEffect(() => {
        if (error !== null) {
            setTimeout(() => {
                setError(null);
            }, 5000);
        }
    }, [error]);

    const [loginAccount] = useLoginAccountMutation();

    const onFinish = async (values) => {
        try {
            setIsSubmitting(true);
            const { data, error: apiError } = await loginAccount(values);
            const tokenDuration = new Date(data?.expiredAt).getTime() - new Date(Date.now()).getTime()
            const dayInMilliseconds = 24 * 60 * 60 * 1000;
            const tokenExpiredTime = tokenDuration / dayInMilliseconds

            if (data?.accessToken) {
                Cookies.set("lmsToken", data?.accessToken, { expires: tokenExpiredTime });
                Cookies.set("username", values?.username);
                dispatch(
                    setLoginStatus({
                        token: data?.accessToken,
                        username : values.username
                    })
                );
                nav("/");
                dispatch(
                    setMessage({
                        msgType: "success",
                        msgContent: "Login successful!",
                    })
                );
            } else {
                setIsSubmitting(false);
                setError(apiError?.data?.message || apiError?.error);
                dispatch(
                    setMessage({
                        msgType: "error",
                        msgContent: error?.data?.message || error?.error,
                    })
                );
            }
        } catch (error) {
            throw new Error(error);
        } finally {
            setIsSubmitting(false)
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-lightBlue ">
            <div className="flex items-center justify-center w-full gap-32">
                <img src={imgBg} alt="Login Image" />
                <div className=" h-[400px] w-full max-w-[1px] bg-black/30"></div>
                <div className="max-w-[480px] w-full p-10 rounded-md shadow-md shadow-[#8FB5FF] bg-white">
                    <Quote/>
                    <FormTlt isCenter={true} title={"log in to dashboard"} />
                    <Form
                        form={form}
                        onFinish={onFinish}
                        layout="vertical"
                        labelCol={{
                            style: {
                                textAlign: "left",
                            },
                        }}
                        className="mt-2"
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
                            label="Username"
                            name="username"
                            className=" !mb-6 "
                            rules={[
                                {
                                    required: true,
                                    message: "Username is required!",
                                },
                            ]}
                        >
                            <Input />
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
                        <Link
                            to={"/resetPassword"}
                            className="text-[#1890FF] text-sm font-medium block ml-auto w-fit mb-6 underline underline-offset-2 hover:underline hover:underline-offset-2"
                        >
                            {" "}
                            Forgot Password?{" "}
                        </Link>

                        <FormSubmitBtn
                            label={"login"}
                            isFullWidth={true}
                            isSubmitting={isSubmitting}
                            isDisabled={isFormEmpty}
                        />
                    </Form>
                </div>
            </div>
        </section>
    );
};

export default Login;
