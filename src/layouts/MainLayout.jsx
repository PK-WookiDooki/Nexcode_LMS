import {Outlet, useLocation} from "react-router-dom";
import "./layout.css";
import SideBar from "./sidebar/SideBar";
import Navbar from "./navbar/Navbar";

import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {setAlert} from "@/core/global/context/notiSlice.js";
import {Alert} from "antd";
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

    const {alert} = useSelector(state => state.notiSlice);
    const dispatch = useDispatch()

    const location = useLocation().pathname


    useEffect(() => {
        // if(location){
        //     dispatch(setAlert({alertType : null, alertMsg : null}));
        // }
        if(location){
            resetAlert()
        }
    }, [location])

    const resetAlert = () => {
        dispatch(setAlert({alertType : null, alertMsg : null}))
    }

    return (
        <main className="wrapper">
            <SideBar />
            <section className="inner-wrapper">
                <Navbar />

                <div className="h-full text-black">

                    {
                        alert.alertType && alert.alertMsg ? <div className={` px-10 mb-8`}> <Alert message={alert.alertMsg} type={alert.alertType} closable={true} className={" !text-c52 !pl-4 !bg-c52/[15%] !border-c52/[15%] rounded-sm capitalize "} onClose={resetAlert} /> </div> : null
                    }

                    {/*<div className={` px-10 mb-8`}> <Alert message={"Hello"} type={"success"} closable={true} className={" !text-c52 !pl-10 !bg-c52/[15%] !border-c52/[15%] rounded-sm capitalize "} onClose={resetAlert} /> </div>*/}

                    <Outlet />
                </div>
            </section>

            {/*<Footer />*/}
        </main>
    );
};

export default MainLayout;
