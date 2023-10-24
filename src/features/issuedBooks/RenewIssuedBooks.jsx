import { useState } from "react";
import { useRenewIssuedBooksMutation } from "./issuedBooksApi";
import { Alert, Button, Modal } from "antd";
import { BsExclamationCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { scrollBackToTop } from "@/core/functions/scrollToTop";
import {setAlert} from "@/core/global/context/notiSlice.js";

const RenewIssuedBooks = ({ issuedBookIds, setSelectedRowKeys }) => {
    const { token } = useSelector((state) => state.authSlice);
    const [renewIssuedBooks] = useRenewIssuedBooksMutation();
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const dispatch = useDispatch();

    const closeModal = () => {
        setError(null);
        scrollBackToTop();
        setSelectedRowKeys([]);
        setOpen(false);
    };

    const onRenewIssuedBooks = async () => {
        try {
            setIsSubmitting(true);
            const { data, error: apiError } = await renewIssuedBooks({
                ids: issuedBookIds,
                token,
            });

            if (data?.success) {
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

    return (
        <section>
            <Button
                type="primary"
                onClick={() => setOpen(true)}
                disabled={issuedBookIds?.length === 0}
                className={`border ${
                    issuedBookIds?.length <= 0 ? "disabled-btn" : "confirm-btn"
                } `}
            >
                {" "}
                Renew{" "}
            </Button>
            <Modal
                open={open}
                onCancel={closeModal}
                closeIcon={false}
                centered
                okText="Renew"
                okButtonProps={{
                    type: "primary",
                    className: "confirm-btn",
                    loading: isSubmitting,
                }}
                width={450}
                cancelButtonProps={{
                    type: "default",
                    className: "cancel-btn",
                }}
                onOk={onRenewIssuedBooks}
                className="confirm-box"
            >
                {error !== null ? (
                    <Alert
                        message={error}
                        type="error"
                        showIcon
                        className="w-full mb-3"
                    />
                ) : (
                    ""
                )}
                <div className="flex flex-row items-center justify-center gap-3 pb-6">
                    <BsExclamationCircle className="text-xl text-yellow-500" />
                    <h2 className="text-lg font-medium">
                        {" "}
                        Are you sure you want to renew this ?{" "}
                    </h2>
                </div>
            </Modal>
        </section>
    );
};

export default RenewIssuedBooks;
