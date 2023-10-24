import { useState } from "react";
import {
    useGetAllSettingsQuery,
    useUpdateRentableBookLimitMutation,
    useUpdateRentableDaysMutation,
    useUpdateExtendableDaysMutation,
    useUpdateExtendableTimesMutation,
} from "./authApi";
import SettingCard from "./SettingCard";
import {setAlert} from "@/core/global/context/notiSlice.js";
import { TableTlt } from "@/components";
import {useDispatch, useSelector} from "react-redux";

const Settings = () => {
    const { token } = useSelector((state) => state.authSlice);
    const { data } = useGetAllSettingsQuery(token);
    const adminData = data;
    const [error, setError] = useState(null);

    const dispatch = useDispatch()

    //modals
    const [openModal1, setOpenModal1] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const [openModal3, setOpenModal3] = useState(false);
    const [openModal4, setOpenModal4] = useState(false);

    //queries
    const [updateRentableBookLimit] = useUpdateRentableBookLimitMutation();
    const [updateRentableDays] = useUpdateRentableDaysMutation();
    const [updateExtendableDays] = useUpdateExtendableDaysMutation();
    const [updateExtendableTimes] = useUpdateExtendableTimesMutation();

    //issued books limit
    const changeBooksLimit = async (values) => {
        try {
            console.log(values);
            const { data, error: apiError } = await updateRentableBookLimit({
                limit: values.bookLimit,
                token,
            });
            if (data?.success) {
                dispatch(setAlert({alertType: "success", alertMsg : data?.message}))
                setOpenModal1(false);
            } else {
                setError(apiError?.data?.message || apiError?.error);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    //book rentable days
    const changeBookRentableDays = async (values) => {
        try {
            const { data, error: apiError } = await updateRentableDays({
                limit: values.rentableDays,
                token,
            });
            if (data?.success) {
                dispatch(setAlert({alertType: "success", alertMsg : data?.message}))
                setOpenModal2(false);
            } else {
                setError(apiError?.data?.message || apiError?.error);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    //issued books extendable times
    const changeExtendableTimes = async (values) => {
        try {
            console.log(values);
            const { data, error: apiError } = await updateExtendableTimes({
                limit: values.extendableTimes,
                token,
            });
            if (data?.success) {
                dispatch(setAlert({alertType: "success", alertMsg : data?.message}))
                setOpenModal3(false);
            } else {
                setError(apiError?.data?.message || apiError?.error);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    //issued books extendable days
    const changeExtendableDays = async (values) => {
        try {
            const { data, error: apiError } = await updateExtendableDays({
                limit: values.extendableDays,
                token,
            });
            if (data?.success) {
                dispatch(setAlert({alertType: "success", alertMsg : data?.message}))
                setOpenModal4(false);
            } else {
                setError(apiError?.data?.message || apiError?.error);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    return (
        <section className="text-black">
            <div className="px-10 mb-11">
                <TableTlt title={"Settings"} />
            </div>

            <section className="grid grid-cols-1 gap-5 ">
                <SettingCard
                    title={"Books Limit"}
                    currentValue={adminData?.bookLimit}
                    event={changeBooksLimit}
                    name={"bookLimit"}
                    error={error}
                    open={openModal1}
                    setOpenModal={setOpenModal1}
                />

                <SettingCard
                    title={"Rentable Days"}
                    currentValue={adminData?.rentableDays}
                    event={changeBookRentableDays}
                    name={"rentableDays"}
                    error={error}
                    open={openModal2}
                    setOpenModal={setOpenModal2}
                />

                <SettingCard
                    title={"Extendable Times"}
                    currentValue={adminData?.extendableTimes}
                    event={changeExtendableTimes}
                    name={"extendableTimes"}
                    error={error}
                    open={openModal3}
                    setOpenModal={setOpenModal3}
                />

                <SettingCard
                    title={"Extendable Days"}
                    currentValue={adminData?.extendableDays}
                    event={changeExtendableDays}
                    name={"extendableDays"}
                    error={error}
                    open={openModal4}
                    setOpenModal={setOpenModal4}
                />
            </section>
        </section>
    );
};

export default Settings;
