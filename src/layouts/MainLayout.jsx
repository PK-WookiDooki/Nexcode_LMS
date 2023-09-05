import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import "./layout.css";

const MainLayout = () => {
    return (
        <main className="wrapper">
            <Header />

            <section className="flex flex-1">
                <Outlet />
            </section>

            <Footer />
        </main>
    );
};

export default MainLayout;
