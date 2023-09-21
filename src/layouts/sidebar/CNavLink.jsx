import React from "react";
import { NavLink } from "react-router-dom";

const CNavLink = ({ title, path }) => {
    return (
        <NavLink to={path} className="nav-link">
            {title}
        </NavLink>
    );
};

export default CNavLink;
