import { Alert, Space, Table } from "antd";
import { ACTBtn, TableTlt } from "../../components";
import {
    useSetCPBStatusMutation,
    useGetAllCopiedBooksQuery,
} from "../books/booksApi";
import { useEffect, useState } from "react";
const CopiedBooksList = () => {
    const { data, isLoading } = useGetAllCopiedBooksQuery();

    const [message, setMessage] = useState(null);
    const [apiStatus, setApiStatus] = useState(null);

    const copiedBooks = data?.data;
    const [setCPBstatus] = useSetCPBStatusMutation();

    useEffect(() => {
        if (message !== null) {
            setTimeout(() => {
                setMessage(null);
            }, 5000);
        }
    }, [message]);

    const deleteBooksFromDB = async (copiedId, dmgStatus) => {
        try {
            const isDamaged = dmgStatus === "true" ? "false" : "true";
            const updatedData = { copiedId, isDamaged };
            const { data } = await setCPBstatus(updatedData);
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
            dataIndex: "copiedId",
            key: "copiedId",
            render: (_, book) => (
                <p
                    className={` ${
                        book?.isDamaged === "true" ? " bg-red-400 " : ""
                    }  `}
                >
                    {" "}
                    {book?.copiedId}{" "}
                </p>
            ),
        },
        {
            title: "Original Book ID",
            dataIndex: "bookId",
            key: "bookId",
        },
        {
            title: "Damaged Status",
            dataIndex: "isDamaged",
            key: "isDamaged",
            render: (_, book) => (
                <p> {book?.isDamaged === "true" ? "YES" : "NO"} </p>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_, book) => (
                <Space size="middle">
                    <ACTBtn
                        event={() =>
                            deleteBooksFromDB(book?.copiedId, book?.isDamaged)
                        }
                        title={book?.isDamaged === "true" ? "Refill" : "Damage"}
                        type={"del"}
                    />
                </Space>
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
