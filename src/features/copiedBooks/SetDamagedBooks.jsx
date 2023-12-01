import { useEffect, useState } from "react";
import { useSetCopiedBooksStatusMutation } from "./copiedBooksApi";
import { Alert, Button, Modal } from "antd";
import { BsExclamationCircle } from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {setMessage} from "@/core/global/context/notiSlice.js";
import {scrollBackToTop} from "@/core/functions/scrollToTop.js";

const SetDamagedBooks = ({ generatedIds, setSelectedRowKeys }) => {
    const { token } = useSelector((state) => state.authSlice);
    const [error, setError] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [setCopiedBooksStatus] = useSetCopiedBooksStatusMutation();
    const [isSubmitting, setIsSubmitting] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (error?.trim().length > 0) {
            setTimeout(() => {
                setError("");
            }, 4000);
        }
    }, [error]);

    const closeModal = () => {
        setOpenModal(false);
        setIsSubmitting(false)
        setSelectedRowKeys([])
        scrollBackToTop()
    };

    const setDamagedBooks = async () => {
        try {
            setIsSubmitting(true)
            const { data, error: apiError } = await setCopiedBooksStatus({
                generatedIds,
                token,
            });
            if (data?.success) {
                dispatch(
                    setMessage({
                        msgType: "success",
                        msgContent: data?.message,
                    })
                );
                closeModal();
                setIsSubmitting(false)
            } else {
                setIsSubmitting(false)
                dispatch(
                    setMessage({
                        msgType: "error",
                        msgContent: apiError?.data?.message || apiError?.error,
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
        <section>
            <Button
                type="primary"
                onClick={() => setOpenModal(true)}
                className={` border ${
                    generatedIds?.length <= 0 ? "disabled-btn" : " delete-btn "
                }   `}
                disabled={generatedIds?.length <= 0}
            >
                Damage
            </Button>
            <Modal
                open={openModal}
                onCancel={closeModal}
                closeIcon={false}
                centered
                okText="Damage"
                okButtonProps={{
                    type: "primary",
                    className: "delete-btn",
                    loading : isSubmitting
                }}
                cancelButtonProps={{
                    type: "default",
                    className: "cancel-btn",
                }}
                onOk={setDamagedBooks}
                className="confirm-box"
                width={500}
            >
                {error?.trim().length > 0 ? (
                    <Alert
                        message={error}
                        type="error"
                        showIcon
                        className="mb-3 w-full"
                    />
                ) : (
                    ""
                )}

                <div className="flex flex-row items-center justify-center gap-3 pb-6">
                    <BsExclamationCircle className="text-2xl text-yellow-500 min-w-max" />
                    <h2 className="text-lg font-medium">
                        {" "}
                        Are you sure you want to add these books to damaged books list
                        ?{" "}
                    </h2>
                </div>
            </Modal>
        </section>
    );
};

export default SetDamagedBooks;
