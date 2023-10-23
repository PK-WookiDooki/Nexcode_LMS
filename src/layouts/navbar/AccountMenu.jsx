import { Button, Dropdown } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { removeCookies, setLoginStatus } from "@/features/auth/authSlice";
import { CPwsForm } from "@/features";
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
                <button onClick={logoutHandler} className="font-sans w-full">
                    {" "}
                    Logout{" "}
                </button>
            ),
            danger: true,
        },
    ];

    return (
        <section>
            <Dropdown
                placement="bottomRight"
                menu={{ items }}
                arrow
                trigger={["click"]}
            >
                <button type="button" className="flex items-center gap-2">
                    {" "}
                    <BsPersonCircle className="text-xl" /> Admin{" "}
                </button>
            </Dropdown>
        </section>
    );
};

export default AccountMenu;
