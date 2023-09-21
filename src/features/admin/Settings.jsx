import { useEffect, useState } from "react";
import {
    useGetSettingsQuery,
    useUpdateBLimitMutation,
    useUpdateBRDaysMutation,
    useUpdateEDaysMutation,
    useUpdateETimesMutation,
} from "./adminApi";
import SettingCard from "./SettingCard";
import { Alert } from "antd";

const Settings = () => {
    const { data } = useGetSettingsQuery();
    const adminData = data?.data;

    const [message, setMessage] = useState(null);
    const [apiStatus, setApiStatus] = useState(null);

    //settings
    const [booksLimit, setBooksLimit] = useState(0);
    const [rentableDays, setRentableDays] = useState(0);
    const [extendableDays, setExtendableDays] = useState(0);
    const [extendableTimes, setExtendableTimes] = useState(0);

    //modal
    const [openModal1, setOpenModal1] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const [openModal3, setOpenModal3] = useState(false);
    const [openModal4, setOpenModal4] = useState(false);

    useEffect(() => {
        if (message !== null) {
            setTimeout(() => {
                setMessage(null);
            }, 5000);
        }
    }, [message]);

    const [updateBLimit] = useUpdateBLimitMutation();
    const [updateBRDays] = useUpdateBRDaysMutation();
    const [updateEDays] = useUpdateEDaysMutation();
    const [updateETimes] = useUpdateETimesMutation();

    //issued books limit
    const changeBooksLimit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await updateBLimit(booksLimit);
            setMessage(data?.message);
            if (data?.success) {
                setApiStatus(true);
            } else {
                setApiStatus(false);
            }
            closeModal1();
        } catch (error) {
            throw new Error(error);
        }
    };
    const closeModal1 = () => {
        setBooksLimit(0);
        setOpenModal1(false);
    };

    //book rentable days
    const changeBookRentableDays = async (e) => {
        e.preventDefault();
        try {
            const { data } = await updateBRDays(rentableDays);
            setMessage(data?.message);
            if (data?.success) {
                setApiStatus(true);
            } else {
                setApiStatus(false);
            }
            closeModal2();
        } catch (error) {
            throw new Error(error);
        }
    };
    const closeModal2 = () => {
        setRentableDays(0);
        setOpenModal2(false);
    };

    //issued books extendable times
    const changeExtendableTimes = async (e) => {
        e.preventDefault();
        try {
            const { data } = await updateETimes(extendableTimes);
            setMessage(data?.message);
            if (data?.success) {
                setApiStatus(true);
            } else {
                setApiStatus(false);
            }
            closeModal3();
        } catch (error) {
            throw new Error(error);
        }
    };
    const closeModal3 = () => {
        setExtendableTimes(0);
        setOpenModal3(false);
    };

    //issued books extendable days
    const changeExtendableDays = async (e) => {
        e.preventDefault();
        try {
            const { data } = await updateEDays(extendableDays);
            setMessage(data?.message);
            if (data?.success) {
                setApiStatus(true);
            } else {
                setApiStatus(false);
            }
            closeModal4();
        } catch (error) {
            throw new Error(error);
        }
    };
    const closeModal4 = () => {
        setExtendableDays(0);
        setOpenModal4(false);
    };

    return (
        <section className="text-white p-5">
            {message !== null ? (
                <Alert
                    message={message}
                    type={apiStatus ? "success" : "error"}
                    showIcon
                    className="my-3"
                />
            ) : (
                ""
            )}

            <section className="grid grid-cols-2 gap-5">
                <SettingCard
                    title={"Books Limit"}
                    currentValue={adminData?.booksLimit}
                    event={changeBooksLimit}
                    updatedValue={booksLimit}
                    onChange={(e) => setBooksLimit(e.target.value)}
                    closeModal={closeModal1}
                    openModal={openModal1}
                    triggerModal={() => setOpenModal1(true)}
                />

                <SettingCard
                    title={"Rentable Days"}
                    currentValue={adminData?.rentableDays}
                    event={changeBookRentableDays}
                    updatedValue={rentableDays}
                    onChange={(e) => setRentableDays(e.target.value)}
                    closeModal={closeModal2}
                    openModal={openModal2}
                    triggerModal={() => setOpenModal2(true)}
                />

                <SettingCard
                    title={"Extendable Times"}
                    currentValue={adminData?.extendableTimes}
                    event={changeExtendableTimes}
                    updatedValue={extendableTimes}
                    onChange={(e) => setExtendableTimes(e.target.value)}
                    closeModal={closeModal3}
                    openModal={openModal3}
                    triggerModal={() => setOpenModal3(true)}
                />

                <SettingCard
                    title={"Extendable Days"}
                    currentValue={adminData?.extendableDays}
                    event={changeExtendableDays}
                    updatedValue={extendableDays}
                    onChange={(e) => setExtendableDays(e.target.value)}
                    closeModal={closeModal4}
                    openModal={openModal4}
                    triggerModal={() => setOpenModal4(true)}
                />
            </section>
        </section>
    );
};

export default Settings;
