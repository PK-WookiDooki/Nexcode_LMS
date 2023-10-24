import { NavLink } from "react-router-dom";
import {scrollBackToTop} from "@/core/functions/scrollToTop.js";

const CNavLink = ({ title, path, icon }) => {
    return (
        <NavLink to={path} onClick={scrollBackToTop} className="nav-link">
            {icon} {title}
        </NavLink>
    );
};

export default CNavLink;
