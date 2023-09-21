import Modal from "antd/es/modal/Modal";
import React from "react";

const SettingCard = ({
    title,
    event,
    currentValue,
    updatedValue,
    onChange,
    triggerModal,
    openModal,
    closeModal,
}) => {
    return (
        <div className=" p-3 rounded-md bg-white text-black  flex flex-col gap-1 w-full">
            <div className=" flex items-center justify-between text-xl font-bold mb-2">
                <h2 className=" min-w-max"> {title} </h2>
                <span> : </span>
                <p>{currentValue}</p>
            </div>

            <Modal
                title="Add New Member"
                centered
                open={openModal}
                onCancel={closeModal}
                footer={null}
                style={{ minWidth: "550px", width: "100%" }}
            >
                <form onSubmit={event} className="flex items-center gap-3">
                    <input
                        type="number"
                        value={updatedValue}
                        onChange={onChange}
                        className="p-2 rounded-md outline-none border border-black w-full"
                    />
                    <button
                        type="submit"
                        className="py-2 px-3 rounded-md bg-blue-600 text-white"
                    >
                        {" "}
                        Submit{" "}
                    </button>
                </form>
            </Modal>

            <button
                onClick={triggerModal}
                className="px-3 py-2 rounded-md bg-blue-600 text-white"
            >
                {" "}
                Change {title}{" "}
            </button>
        </div>
    );
};

export default SettingCard;
