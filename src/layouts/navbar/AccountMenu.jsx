import { Dropdown } from "antd";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { removeCookies, setLoginStatus } from "../../features/admin/authSlice";
import { CPwsForm } from "../../features";
import { BsPersonCircle } from "react-icons/bs";

const AccountMenu = () => {
    const { user } = useSelector((state) => state.authSlice);
    const dispatch = useDispatch();

    const logoutHandler = (e) => {
        e.preventDefault();
        dispatch(removeCookies());
        dispatch(
            setLoginStatus({
                user: null,
                token: null,
            })
        );
    };

    const items = [
        {
            key: "1",
            label: <CPwsForm />,
        },
        {
            key: "2",
            label: (
                <button onClick={logoutHandler} className="font-sans">
                    {" "}
                    Logout{" "}
                </button>
            ),
            danger: true,
        },
    ];

    return (
        <section>
            <Dropdown placement="bottomRight" menu={{ items }} arrow>
                <button className="submit-btn flex items-center gap-2">
                    {" "}
                    <BsPersonCircle className="text-xl" /> {user?.name}{" "}
                </button>
            </Dropdown>
        </section>
    );
};

export default AccountMenu;
