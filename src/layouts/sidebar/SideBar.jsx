import "./sidebar.css";
import CNavLink from "./CNavLink";

const SideBar = () => {
    return (
        <aside className="sec-aside">
            <ul className="sidebar">
                <CNavLink title={"Home"} path={"/"} />
                <CNavLink title={"Books"} path={"/books"} />
                <CNavLink title={"Members"} path={"/members"} />
                <CNavLink title={"Issued Books"} path={"/issued_books"} />
                <CNavLink title={"Settings"} path={"/settings"} />
            </ul>
        </aside>
    );
};

export default SideBar;
