import { Modal, Form, InputNumber } from "antd";
import { useEffect, useState } from "react";
import { useAddMoreBooksMutation } from "./booksApi";
import {useDispatch, useSelector} from "react-redux";
import { ActionBtn, ModalHeader, FormSubmitBtn } from "@/components";
import { scrollBackToTop } from "@/core/functions/scrollToTop";
import {setAlert, setMessage} from "@/core/global/context/notiSlice.js";
import {removeCookies, setLoginStatus} from "@/features/auth/authSlice.js";

const AddMoreBooksForm = ({
    bookId,
    setAddedCPBooks,
}) => {
    const { token } = useSelector((state) => state.authSlice);
    const [error, setError] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (error?.trim().length > 0) {
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    }, [error]);

    const [isFormEmpty, setIsFormEmpty] = useState(true)
    const amountValue = Form.useWatch("amount", form)
    useEffect(() => {
        if(amountValue?.toString().trim().length > 0 ){
            setIsFormEmpty(false)
        }
    }, [amountValue]);

    const [addMoreBooks] = useAddMoreBooksMutation();
    const updateBookAmount = async (values) => {
        try {
            setIsSubmitting(true)
            const { data, error: apiError } = await addMoreBooks({
                totalBooks : values.amount,
                bookId,
                token,
            });
            if (data) {
                setAddedCPBooks(data?.copiedBooks);
                dispatch(setMessage({msgType : "success", msgContent : "New books added successfully!"}))
                closeModal();
            } else {
                setIsSubmitting(false)
                dispatch(setMessage({msgType: "error", msgContent: apiError?.data?.message || apiError?.error }))
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const closeModal = () => {
        setIsSubmitting(false)
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
                    <FormSubmitBtn label={"Save"} isSubmitting={isSubmitting} isDisabled={isFormEmpty} />
                </Form>
            </Modal>
        </section>
    );
};

export default AddMoreBooksForm;
