import { Alert, Button, DatePicker, Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { useAddNewIssuedBooksMutation } from "./issuedBooksApi";
import { useGetAllCopiedBooksQuery } from "../copiedBooks/copiedBooksApi";
import { ModalHeader, FormSubmitBtn } from "@/components";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { scrollBackToTop } from "@/core/functions/scrollToTop";
import {setAlert} from "@/core/global/context/notiSlice.js";

const AddNewIssuedBookForm = () => {
    const [openModal, setOpenModal] = useState(false);
    const [form] = Form.useForm();
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { token } = useSelector((state) => state.authSlice);
    const dispatch = useDispatch();

    const { data: copiedBooksData } = useGetAllCopiedBooksQuery(token);
    const generatedIds = copiedBooksData
        ?.filter((book) => book.issued === false && book.damaged === false)
        .map((book) => {
            return {
                label: book.generatedId.toString(),
                value: book.generatedId,
            };
        });
    const [addNewIssuedBooks] = useAddNewIssuedBooksMutation();

    useEffect(() => {
        if (error !== null) {
            setTimeout(() => {
                setError(null);
            }, 5000);
        }
    }, [error]);

    const onFinish = async (values) => {
        try {
            setIsSubmitting(true);
            const issuedBookData = {
                generatedIds: values?.generatedIds,
                memberId: values?.memberId,
                issuedDate: values.issuedDate.toISOString().slice(0, 10),
            };
            const { data, error: apiError } = await addNewIssuedBooks({
                issuedBookData,
                token,
            });
            // console.log(data);
            if (data?.success) {
                setIsSubmitting(false);
                dispatch(
                    setAlert({
                        alertType: "success",
                        alertMsg: data?.message,
                    })
                );
                closeModal();
            } else {
                setIsSubmitting(false);
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
        <section className="">
            <Button
                type="primary"
                className="submit-btn"
                onClick={() => setOpenModal(true)}
            >
                Add New Issued Book
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
                <ModalHeader title={"Add New Issued Book"} event={closeModal} />
                <Form
                    form={form}
                    labelCol={{
                        style: {
                            textAlign: "left",
                        },
                    }}
                    onFinish={onFinish}
                    layout="vertical"
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
                        label="Book Copied IDs"
                        name="generatedIds"
                        rules={[
                            {
                                required: true,
                                message: "Please enter Book Copied ID!",
                            },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            placeholder="Please enter book id . . ."
                            className=" issued-form "
                            options={generatedIds}
                            direction="horizontal"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Member ID"
                        name="memberId"
                        rules={[
                            {
                                required: true,
                                message: "Please enter memberId!",
                            },
                        ]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="issuedDate"
                        label="Issued Date"
                        initialValue={dayjs()}
                    >
                        <DatePicker
                            format={"DD-MM-YYYY"}
                            className="common-blk"
                        />
                    </Form.Item>

                    <FormSubmitBtn isSubmitting={isSubmitting} label={"Save"} />
                </Form>
            </Modal>
        </section>
    );
};

export default AddNewIssuedBookForm;
