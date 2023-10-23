import { Link } from "react-router-dom";
import { useGetAllOverdueBooksQuery } from "@/features/issuedBooks/issuedBooksApi";
import AccountMenu from "./AccountMenu";
import { MdOutlineNotifications } from "react-icons/md";
import { useSelector } from "react-redux";
const Navbar = () => {
    const { token } = useSelector((state) => state.authSlice);
    const { data } = useGetAllOverdueBooksQuery(token);
    const totalOverdueBooks = data?.length;

    //const scrollToODB = () => {
    //    document.getElementById("odb").scrollIntoView({ behavior: "smooth" });
    //};

    return (
        <header className=" sticky top-0 shadow-sm z-10 bg-white ">
            <nav className="flex items-center justify-end gap-5 p-4 py-6 ">
                <Link
                    to="/#odb"
                    //onClick={scrollToODB}
                    className="text-2xl duration-200 relative"
                >
                    {" "}
                    <MdOutlineNotifications className="text-black/70" />{" "}
                    <span
                        className={` ${
                            totalOverdueBooks > 0 ? "block" : "hidden"
                        } w-2 h-2
                            rounded-full bg-danger absolute top-1 right-1 ring-1 ring-white `}
                    ></span>
                </Link>
                <AccountMenu />
            </nav>
        </header>
    );
};

export default Navbar;
