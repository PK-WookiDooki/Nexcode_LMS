import { Dropdown } from "antd";
import { useSelector } from "react-redux";
import {CPwsForm, Logout} from "@/features";
import { BsPersonCircle } from "react-icons/bs";

const AccountMenu = () => {
    const { username } = useSelector((state) => state.authSlice);

    const items = [
        {
            key: "1",
            label: <CPwsForm />,
        },
        {
            key: "2",
            label: <Logout/>,
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
                <button type="button" className="flex items-center gap-2 px-3">
                    {" "}
                    <BsPersonCircle className="text-xl" /> {username || "admin" }
                </button>
            </Dropdown>
        </section>
    );
};

export default AccountMenu;
