import { useState } from "react";
import { useReturnIssuedBooksMutation } from "./issuedBooksApi";
import { Alert, Button, Modal } from "antd";
import { BsExclamationCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { scrollBackToTop } from "../../core/functions/scrollToTop";
import { setIssuedMessage } from "./issuedSlice";

const ReturnIssuedBooks = ({ issuedBookIds, setSelectedRowKeys }) => {
    const { token } = useSelector((state) => state.authSlice);
    const [returnIssuedBooks] = useReturnIssuedBooksMutation();
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const dispatch = useDispatch();

    const onModalClose = () => {
        setError(null);
        scrollBackToTop();
        setSelectedRowKeys([]);
        setIsSubmitting(false);
        setOpen(false);
    };

    const onReturnIssuedBooks = async () => {
        try {
            setIsSubmitting(true);
            const { data, error: apiError } = await returnIssuedBooks({
                ids: issuedBookIds,
                token,
            });
            if (data?.success) {
                onModalClose();
                dispatch(
                    setIssuedMessage({
                        msgType: true,
                        msgContent: data?.message,
                    })
                );
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
                className={` border ${
                    issuedBookIds?.length <= 0 ? "disabled-btn" : "delete-btn"
                } `}
            >
                {" "}
                Return{" "}
            </Button>
            <Modal
                open={open}
                onCancel={onModalClose}
                closeIcon={false}
                centered
                okText="Return"
                okButtonProps={{
                    type: "primary",
                    className: "delete-btn",
                    loading: isSubmitting,
                }}
                cancelButtonProps={{
                    type: "primary",
                    className: "cancel-btn",
                }}
                onOk={onReturnIssuedBooks}
                className="confirm-box"
            >
                {error !== null ? (
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
                    <BsExclamationCircle className="text-xl text-yellow-500" />
                    <h2 className="text-lg font-medium">
                        {" "}
                        Are you sure you want to return this ?{" "}
                    </h2>
                </div>
            </Modal>
        </section>
    );
};

export default ReturnIssuedBooks;
