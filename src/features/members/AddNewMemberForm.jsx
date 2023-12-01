import { Alert, Button, Form, Input, Modal } from "antd";
import {useEffect, useState} from "react";
import { useAddNewMembersMutation } from "./membersApi";
import {FormSubmitBtn, ModalHeader} from "@/components";
import {useDispatch, useSelector} from "react-redux";
import {setAlert, setMessage} from "@/core/global/context/notiSlice.js";
import {scrollBackToTop} from "@/core/functions/scrollToTop.js";

const AddNewMemberForm = () => {
    const { token } = useSelector((state) => state.authSlice);
    const [openModal, setOpenModal] = useState(false);

    const [error, setError] = useState(null);
    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false)

    const dispatch = useDispatch()

    const [isFormEmpty, setIsFormEmpty] = useState(true)

    const nameValue = Form.useWatch("name", form);
    const phoneValue = Form.useWatch("phone", form);
    const addressValue = Form.useWatch("address", form);
    useEffect(() => {
        if(nameValue?.trim().length > 0 && phoneValue?.trim().length > 0 && addressValue?.trim().length > 0){
            setIsFormEmpty(false)
        }
    }, [nameValue, phoneValue, addressValue]);

    const [addNewMembers] = useAddNewMembersMutation();
    const onFinish = async (values) => {
        try {
            setIsSubmitting(true)
            const { data, error: apiError } = await addNewMembers({
                memberData: values,
                token,
            });
            if (data?.success) {
                dispatch(setMessage({msgType: "success", msgContent: data?.mesage}))
                closeModal();
            } else {
                dispatch(setMessage({msgType: "error", msgContent: apiError?.data?.message || apiError?.error }))
                setIsSubmitting(false);
            }
        } catch (error) {
            throw new Error(error);
        }  finally {
            setIsSubmitting(false)
        }
    };

    const closeModal = () => {
        scrollBackToTop()
        form.resetFields();
        setError(null)
        setIsSubmitting(false);
        setIsFormEmpty(true)
        setOpenModal(false);
    };

    return (
        <section className="">
            <Button
                type="primary"
                className="submit-btn"
                onClick={() => setOpenModal(true)}
            >
                Add New Member
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
                <ModalHeader title={"Add Member"} event={closeModal} />

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
                    {error !== null ? (
                        <Alert
                            message={error}
                            type="error"
                            showIcon
                            className="my-2"
                        />
                    ) : (
                        ""
                    )}

                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please enter member name!",
                            },
                        ]}
                    >
                        <Input autoComplete={"off"} />
                    </Form.Item>
                    <Form.Item
                        label="Phone No."
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: "Please enter phone number!",
                            },
                            {
                                pattern : /^(09)\d{6,9}$/,
                                message : "Please enter valid phone number!"
                            }
                        ]}
                    >
                        <Input autoComplete={"off"}  />
                    </Form.Item>
                    <Form.Item label="Address" name="address"
                               rules={[
                                   {
                                       required: true,
                                       message: "Please enter member address!",
                                   },
                               ]}>
                        <Input autoComplete={"off"} />
                    </Form.Item>
                    <FormSubmitBtn label={"Save"} isSubmitting={isSubmitting} isDisabled={isFormEmpty}  />
                </Form>
            </Modal>
        </section>
    );
};

export default AddNewMemberForm;
