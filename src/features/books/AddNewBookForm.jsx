import { Button, Form, Input, InputNumber, Modal } from "antd";
import { useEffect, useState } from "react";
import { useAddNewBooksMutation } from "./booksApi";
import { ModalHeader, FormSubmitBtn } from "@/components";
import { useSelector } from "react-redux";
const AddNewBookForm = ({ setMessage, setAddedCPBooks }) => {
    const { token } = useSelector((state) => state.authSlice);

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
            const { data, error: apiError } = await addNewBooks({
                bookData: values,
                token,
            });

            if (data?.apiResponse.success) {
                setMessage(data?.message);
                closeModal();
                setAddedCPBooks(data?.copiedBooks);
            } else {
                setError(apiError?.data?.message || apiError?.error);
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
                Add New Book
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
                <ModalHeader
                    title={"Add New Book"}
                    event={() => setOpenModal(false)}
                />
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
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: "Please enter book title!",
                            },
                            {
                                min: 4,
                                message: "Book title is too short!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Amount"
                        name="totalBooks"
                        rules={[
                            {
                                required: true,
                                message: "Please enter book amount!",
                            },
                            {
                                type: "number",
                                min: 1,
                                message:
                                    "There must have to be at least one book.",
                            },
                        ]}
                    >
                        <InputNumber className="!h-10 !w-full flex flex-col justify-center" />
                    </Form.Item>

                    <FormSubmitBtn label={"Save"} />
                </Form>
            </Modal>
        </section>
    );
};

export default AddNewBookForm;
