import {useDispatch} from "react-redux";
import {removeCookies, setLoginStatus} from "@/features/auth/authSlice.js";
import {Modal} from "antd";
import {BsExclamationCircle} from "react-icons/bs";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const LogoutConfirmationModal = () => {

    const [openModal, setOpenModal] = useState(false)
    const dispatch = useDispatch();
    const nav = useNavigate()

    const logoutHandler = (e) => {
        e.preventDefault();
        dispatch(removeCookies());
        dispatch(
            setLoginStatus({
                user: null,
                token: null,
            })
        );
    nav("/login")
    };

    return (
        <section>
            <button onClick={() => setOpenModal(true)} className="font-sans w-full">
                {" "}
                Logout{" "}
            </button>

            <Modal
                open={openModal}
                closeIcon={false}
                centered
                okText="Log Out"
                okButtonProps={{
                    type: "primary",
                    className: "confirm-btn",
                }}
                cancelButtonProps={{
                    type: "default",
                    className: "cancel-btn",
                }}
                onOk={logoutHandler}
                onCancel={() => setOpenModal(false)}
                className="confirm-box"
                width={""}
            >
                <div className="flex flex-row items-center justify-center gap-4 pb-6">
                    <BsExclamationCircle className="text-xl text-yellow-500" />
                    <h2 className="font-medium text-base">
                        {" "}
                        Are you sure you want to logout?{" "}
                    </h2>
                </div>
            </Modal>
        </section>
    );
};

export default LogoutConfirmationModal;
