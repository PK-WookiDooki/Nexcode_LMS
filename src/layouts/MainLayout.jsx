import { Outlet } from "react-router-dom";
import "./layout.css";
import SideBar from "./sidebar/SideBar";
import Navbar from "./navbar/Navbar";

import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
    months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ],
});

const MainLayout = () => {
    return (
        <main className="wrapper">
            <Navbar />
            <section className="inner-wrapper">
                <SideBar />

                <div className="w-full bg-slate-700">
                    <Outlet />
                </div>
            </section>

            {/*<Footer />*/}
        </main>
    );
};

export default MainLayout;
