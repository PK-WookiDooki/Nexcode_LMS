import { Button, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { useAddNewBooksMutation } from "./booksApi";
import { FormTlt } from "../../components";
const AddNewBookForm = ({ setMessage, setApiStatus }) => {
    const [form] = Form.useForm();
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState(null);

    const [addNewBooks] = useAddNewBooksMutation();

    useEffect(() => {
        if (error !== null) {
            setTimeout(() => {
                setError(null);
            }, 5000);
        }
    }, [error]);

    const onFinish = async (values) => {
        try {
            const { data } = await addNewBooks(values);
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
                Add New Book
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
                    <FormTlt title="Add New Book" />

                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: "Please enter book title!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Amount"
                        name="amount"
                        rules={[
                            {
                                required: true,
                                message: "Please enter book amount!",
                            },
                            {
                                min: 1,
                                message:
                                    "There must have to be at least one book.",
                            },
                        ]}
                    >
                        <Input type="number" />
                    </Form.Item>

                    <Button
                        htmlType="submit"
                        type="primary"
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

export default AddNewBookForm;
