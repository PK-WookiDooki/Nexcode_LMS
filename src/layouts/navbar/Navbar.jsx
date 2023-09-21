import { Link } from "react-router-dom";
import AccountMenu from "./AccountMenu";
const Navbar = () => {
    return (
        <header className=" sticky top-0 bg-white shadow-md z-10 ">
            <nav className="flex items-center justify-between py-5 w-[90%] mx-auto">
                <h1 className="text-3xl font-bold uppercase">
                    <Link to={"/"}> LMS </Link>
                </h1>

                <ul>
                    <AccountMenu />
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
