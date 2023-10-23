import { Input, Modal, Form, Alert } from "antd";
import { useEffect, useState } from "react";
import { ModalHeader, FormSubmitBtn } from "@/components";
import { useUpdateBooksMutation } from "./booksApi";
import { MdOutlineEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { scrollBackToTop } from "../../core/functions/scrollToTop";

const ChangeBookTitleForm = ({ setMessage, book }) => {
    const { token } = useSelector((state) => state.authSlice);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const [form] = Form.useForm();
    const [updateBooks] = useUpdateBooksMutation();

    useEffect(() => {
        if (book) {
            form.setFieldValue("title", book?.title);
        }
    }, [openModal]);

    const updateBookTitle = async (values) => {
        try {
            const bookData = { id: book?.id, title: values.title };
            const { data, error: apiError } = await updateBooks({
                bookData,
                token,
            });
            if (data?.success) {
                setMessage(data?.message);
                closeModal();
            } else {
                setError(apiError?.data?.message || apiError?.error);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const closeModal = () => {
        form.setFieldValue("title", book?.title);
        scrollBackToTop();
        setOpenModal(false);
    };

    return (
        <section className="flex items-center justify-center">
            <button
                type="button"
                className="text-lg text-darkBlue outline-none border-none"
                onClick={() => setOpenModal(true)}
            >
                <MdOutlineEdit />
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
                <ModalHeader title={"Change Book Title"} event={closeModal} />

                <Form
                    form={form}
                    onFinish={updateBookTitle}
                    layout="vertical"
                    labelCol={{
                        style: {
                            textAlign: "left",
                        },
                    }}
                >
                    {error !== null ? (
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
                        label={"Book Title"}
                        name={"title"}
                        rules={[
                            {
                                required: true,
                                message: "Book title is required!",
                            },
                        ]}
                    >
                        <Input placeholder="Enter book title . . ." />
                    </Form.Item>
                    <FormSubmitBtn label={"Save"} />
                </Form>
            </Modal>
        </section>
    );
};

export default ChangeBookTitleForm;
