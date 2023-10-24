import "./sidebar.css";
import CNavLink from "./CNavLink";
import { Link } from "react-router-dom";
import {
    MdOutlineLocalLibrary,
    MdOutlineDashboard,
    MdDiversity3,
    MdOutlineBook,
    MdOutlineLibraryBooks,
    MdOutlineSettings,
} from "react-icons/md";

const SideBar = () => {
    return (
        <aside className="sec-aside">
            <h1 className="text-3xl font-bold uppercase py-4 text-primary">
                <Link
                    to={"/"}
                    className="flex items-center gap-2 justify-center"
                >
                    <MdOutlineLocalLibrary />
                    LIBRARY{" "}
                </Link>
            </h1>
            <ul className="sidebar">
                <CNavLink
                    title={"Dashboard"}
                    path={"/"}
                    icon={<MdOutlineDashboard className="text-2xl" />}
                />
                <CNavLink
                    title={"Books"}
                    path={"/books"}
                    icon={<i className="material-symbols-outlined" >book_3</i>}
                />
                <CNavLink
                    title={"Members"}
                    path={"/members"}
                    icon={<MdDiversity3 className="text-2xl" />}
                />
                <CNavLink
                    title={"Issued Books"}
                    path={"/issuedBooks"}
                    icon={<MdOutlineLibraryBooks className="text-2xl" />}
                />
                <CNavLink
                    title={"Settings"}
                    path={"/settings"}
                    icon={<MdOutlineSettings className="text-2xl" />}
                />
            </ul>
        </aside>
    );
};

export default SideBar;
