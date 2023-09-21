import { Alert, Button, DatePicker, Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { useAddNewIssuedBooksMutation } from "./issuedBooksApi";
import { FormTlt } from "../../components";
import { useGetAllCopiedBooksQuery } from "../copiedBooks/copiedBooksApi";
import dayjs from "dayjs";

const AddNewIssuedBookForm = ({ setMessage, setApiStatus }) => {
    const [openModal, setOpenModal] = useState(false);
    const [form] = Form.useForm();
    const [error, setError] = useState(null);

    const date = new Date(Date.now()).toISOString().slice(0, 10);

    const { data: copiedBooksData } = useGetAllCopiedBooksQuery();
    const copiedIds = copiedBooksData?.data?.map((book) => {
        return {
            label: book.copiedId.toString(),
            value: book.copiedId,
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
            console.log(values);
            //console.log(copiedIds);
            return;
            const issuedBookData = {
                copiedIds,
                memberId: values?.memberId,
                issued_date: values.issued_date,
            };

            const { data } = await addNewIssuedBooks(issuedBookData);
            console.log(data);
            if (data?.success) {
                setApiStatus(true);
                setMessage(data?.message);
                closeModal();
            } else {
                setApiStatus(false);
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
                Add Issued Book
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
                    <FormTlt title="Add New Issued Book" />
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
                        label="Copied ID"
                        name="copiedId"
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
                            options={copiedIds}
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
                        name="issued_date"
                        label="Issued Date"
                        rules={[
                            {
                                required: true,
                                message: "Please enter book issued date!",
                            },
                        ]}
                    >
                        <DatePicker
                            defaultValue={dayjs()}
                            format={"DD/MM/YYYY"}
                            className="common-blk"
                        />
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

export default AddNewIssuedBookForm;
