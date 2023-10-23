import { NavLink } from "react-router-dom";

const CNavLink = ({ title, path, icon }) => {
    return (
        <NavLink to={path} className="nav-link">
            {icon} {title}
        </NavLink>
    );
};

export default CNavLink;
