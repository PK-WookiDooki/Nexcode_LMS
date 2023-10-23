import { Modal, Form, InputNumber } from "antd";
import { useEffect, useState } from "react";
import { useAddMoreBooksMutation } from "./booksApi";
import { useSelector } from "react-redux";
import { ActionBtn, ModalHeader, FormSubmitBtn } from "@/components";
import { scrollBackToTop } from "../../core/functions/scrollToTop";

const AddMoreBooksForm = ({
    bookId,
    setMessage,
    setAddedCPBooks,
}) => {
    const { token } = useSelector((state) => state.authSlice);
    const [error, setError] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [form] = Form.useForm();
    const [addMoreBooks] = useAddMoreBooksMutation();

    useEffect(() => {
        if (error?.trim().length > 0) {
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    }, [error]);

    const updateBookAmount = async (values) => {
        try {
            const bookData = { id: bookId, totalBooks: values.amount };
            const { data, error: apiError } = await addMoreBooks({
                bookData,
                token,
            });
            if (data?.apiResponse?.success) {
                setMessage(data?.apiResponse?.message);
                setAddedCPBooks(data?.copiedBooks);
                closeModal();
            } else {
                setError(apiError?.data?.message || apiError?.error);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const closeModal = () => {
        form.resetFields();
        scrollBackToTop();
        setOpenModal(false);
    };

    return (
        <section>
            <ActionBtn
                label={"Add More"}
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
                <ModalHeader title={"Add More Book"} event={closeModal} />
                <Form
                    form={form}
                    onFinish={updateBookAmount}
                    layout="vertical"
                    labelCol={{
                        style: {
                            textAlign: "left",
                        },
                    }}
                >
                    <Form.Item
                        label={"Amount"}
                        name="amount"
                        rules={[
                            {
                                required: true,
                                message: "Please enter book amount!",
                            },
                            {
                                type: "number",
                                min: 1,
                                message:
                                    "There must have to be at least one book!",
                            },
                            {
                                type: "number",
                                max: 100,
                                message:
                                    "The maximum book amount limit is 100!",
                            },
                        ]}
                    >
                        <InputNumber
                            placeholder="Enter book amount"
                            className="!w-full !h-10 flex flex-col justify-center"
                        />
                    </Form.Item>
                    <FormSubmitBtn label={"Save"} />
                </Form>
            </Modal>
        </section>
    );
};

export default AddMoreBooksForm;
