import {Alert, Form, Input} from "antd";
import { FormTlt, FormSubmitBtn } from "@/components";
import { useResetPasswordMutation } from "./authApi";
import imgBg from "@/assets/imgs/img_login.png";
import { MdOutlineLocalLibrary } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMessage } from "@/core/global/context/notiSlice";
import {useEffect, useState} from "react";

const ResetPasswordForm = () => {
    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState(null)

    useEffect(()=> {
        if(error !== null){
            setTimeout(() => {
                setError(null)
            }, 5000)
        }
    }, [error]);

    const [resetPassword] = useResetPasswordMutation();
    const onFinish = async (values) => {
        try {
            setIsSubmitting(true);
            const username = values.username;
            const { data, error } = await resetPassword(username);
            if (data?.success) {
                form.resetFields();
                nav("/login", {
                    replace: true,
                });
                dispatch(
                    setMessage({
                        msgType: "success",
                        msgContent: "Password reset successfully!",
                    })
                );
            } else {
                setIsSubmitting(false);
                setError(error?.data?.message || error?.error)
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-lightBlue ">
            <div className="flex items-center justify-center w-full gap-32">
                <img src={imgBg} alt="Login Image" />
                <div className=" self-stretch w-full max-w-[1px] bg-black/30"></div>
                <div className="max-w-[480px] w-full p-10 rounded-md shadow-md shadow-[#8FB5FF] bg-white">
                    <div className="mb-8 text-darkBlue">
                        <h2 className="text-3xl font-bold flex items-center gap-2  justify-center mb-5">
                            {" "}
                            <MdOutlineLocalLibrary className="text-[42px]" />{" "}
                            LIBRARY
                        </h2>
                        <p className="text-center">
                            The library is your gateway to a universe of ideas
                            and inspiration.
                        </p>
                    </div>
                    <FormTlt isCenter={true} title={"Reset Password"} />
                    <Form
                        form={form}
                        layout="vertical"
                        labelCol={{
                            style: {
                                textAlign: "left",
                            },
                        }}
                        className="mt-5"
                        onFinish={onFinish}
                    >

                        {error !== null ? <Alert message={error} type={"error"} showIcon={true} className={"mb-3"} /> : "" }

                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Username is required!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <div className="mt-3">
                            <FormSubmitBtn
                                isSubmitting={isSubmitting}
                                label={"Reset"}
                                isFullWidth={true}
                                extraStyle={"mt-3"}
                            />
                        </div>
                    </Form>
                    <p
                        className="mt-6 text-center text-sm
                    "
                    >
                        Are you sure you want to reset the password?{" "}
                        <Link
                            to={"/login"}
                            className="text-[#1890FF] underline underline-offset-2 hover:underline hover:underline-offset-2 duration-200 "
                        >
                            {" "}
                            Not now!
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ResetPasswordForm;
