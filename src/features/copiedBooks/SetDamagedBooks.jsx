import { useEffect, useState } from "react";
import { useSetCopiedBooksStatusMutation } from "./copiedBooksApi";
import { Alert, Button, Modal } from "antd";
import { BsExclamationCircle } from "react-icons/bs";
import { useSelector } from "react-redux";

const SetDamagedBooks = ({ generatedIds, setMessage, setSelectedRowKeys }) => {
    const { token } = useSelector((state) => state.authSlice);
    const [error, setError] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [setCopiedBooksStatus] = useSetCopiedBooksStatusMutation();

    useEffect(() => {
        if (error?.trim().length > 0) {
            setTimeout(() => {
                setError("");
            }, 4000);
        }
    }, [error]);

    const closeModal = () => {
        setOpenModal(false);
    };

    const setDamagedBooks = async () => {
        try {
            const { data, error: apiError } = await setCopiedBooksStatus({
                generatedIds,
                token,
            });
            if (data?.success) {
                setMessage(data?.message);
                setSelectedRowKeys([]);
                closeModal();
            } else {
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
                okText="Confirm"
                okButtonProps={{
                    type: "primary",
                    className: "confirm-btn",
                }}
                cancelButtonProps={{
                    type: "default",
                    className: "cancel-btn",
                }}
                onOk={setDamagedBooks}
                className="confirm-box"
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
                    <BsExclamationCircle className="text-2xl text-yellow-500" />
                    <h2 className="text-lg font-medium">
                        {" "}
                        Are you sure you want to add these to damaged books list
                        ?{" "}
                    </h2>
                </div>
            </Modal>
        </section>
    );
};

export default SetDamagedBooks;
