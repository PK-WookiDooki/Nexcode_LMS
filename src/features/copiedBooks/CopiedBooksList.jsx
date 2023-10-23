import { Alert, Table } from "antd";
import { TableTlt } from "@/components";
import {
    useSetCopiedBooksStatusMutation,
    useGetAllCopiedBooksQuery,
} from "./copiedBooksApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const CopiedBooksList = () => {
    const { token } = useSelector((state) => state.authSlice);
    const { data, isLoading } = useGetAllCopiedBooksQuery(token);
    const [message, setMessage] = useState(null);
    const [apiStatus, setApiStatus] = useState(null);
    const copiedBooks = data;
    const [setCopiedBooksStatus] = useSetCopiedBooksStatusMutation();

    useEffect(() => {
        if (message !== null) {
            setTimeout(() => {
                setMessage(null);
            }, 5000);
        }
    }, [message]);

    const deleteBooksFromDB = async (generatedId) => {
        try {
            const { data } = await setCopiedBooksStatus({ generatedId, token });
            setMessage(data?.message);
            if (data?.success) {
                setApiStatus(true);
            } else {
                setApiStatus(false);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const columns = [
        {
            title: "No.",
            render: (_, book, index) => <p> {index + 1} </p>,
        },
        {
            title: "Copied ID",
            dataIndex: "generatedId",
            key: "generatedId",
            render: (_, book) => (
                <p className={` ${book?.isDamaged ? " bg-red-400 " : ""}  `}>
                    {" "}
                    {book?.generatedId}{" "}
                </p>
            ),
        },

        {
            title: "Damaged Status",
            dataIndex: "damaged",
            key: "damaged",
            render: (_, book) => <p> {book?.damaged ? "Damaged" : "Fine"} </p>,
        },
        {
            title: "Issued Status",
            dataIndex: "issued",
            key: "issued",
            render: (_, book) => (
                <p> {book?.issued ? "Borrowed" : "Available"} </p>
            ),
        },
    ];

    return (
        <section className="p-3">
            <TableTlt title={"Copied Books List"} />
            <div className="mt-3">
                {message ? (
                    <Alert
                        message={message}
                        type={apiStatus ? "success" : "error"}
                        showIcon
                        className="mb-3"
                    />
                ) : (
                    ""
                )}
                <Table
                    columns={columns}
                    dataSource={copiedBooks}
                    loading={isLoading}
                />
            </div>
        </section>
    );
};

export default CopiedBooksList;
