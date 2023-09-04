import { Link, NavLink } from "react-router-dom";
import "./header.css";

const Header = () => {
    return (
        <header className="sec-header">
            <nav className="navbar">
                <h1 className="text-3xl font-bold uppercase">
                    <Link to={"/"}> Logo </Link>
                </h1>

                <ul className="flex items-center gap-5">
                    <NavLink> NavLink 1 </NavLink>
                    <NavLink> NavLink 2 </NavLink>
                    <NavLink> NavLink 3 </NavLink>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
