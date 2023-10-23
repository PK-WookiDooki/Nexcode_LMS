import { Alert, Table } from "antd";
import { TableTlt } from "@/components";
import { useGetCopiedBooksByOrgIdQuery } from "./copiedBooksApi";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdArrowBack } from "react-icons/md";
import SetDamagedBooks from "./SetDamagedBooks";
const CopiedBooksList = () => {
    const { bookId } = useParams();
    const { token } = useSelector((state) => state.authSlice);
    const { data, isLoading } = useGetCopiedBooksByOrgIdQuery({
        bookId,
        token,
    });
    const copiedBooks = data;
    const [message, setMessage] = useState(null);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const rowSelection = {
        selectedRowKeys,
        onChange: (generatedId) => setSelectedRowKeys(generatedId),
        getCheckboxProps: (record) => ({
            disabled: record?.damaged === true,
        }),
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
        },
        {
            title: "Book Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Issued Status",
            dataIndex: "issued",
            key: "issued",
            render: (_, book) => (
                <p
                    className={` flex items-center gap-2 ${
                        book?.issued || book?.damaged
                            ? "text-red-600"
                            : " text-emerald-500 "
                    } `}
                >
                    <span
                        className={`block h-2 w-2 rounded-full ${
                            book?.issued || book?.damaged
                                ? "bg-red-600"
                                : "bg-emerald-500"
                        }`}
                    ></span>
                    {book?.issued
                        ? "Borrowed"
                        : book?.damaged
                        ? "Not Available"
                        : "Available"}{" "}
                </p>
            ),
        },
        {
            title: "Damaged Status",
            dataIndex: "damaged",
            key: "damaged",
            render: (_, book) => (
                <p
                    className={` flex items-center gap-2 ${
                        book?.damaged ? "text-red-600" : " text-emerald-500 "
                    } `}
                >
                    <span
                        className={`block h-2 w-2 rounded-full ${
                            book?.damaged ? "bg-red-600" : "bg-emerald-500"
                        }`}
                    ></span>
                    {book?.damaged ? "Damaged" : "Fine"}{" "}
                </p>
            ),
        },
    ];

    return (
        <section className="px-10">
            {" "}
            {message ? (
                <Alert
                    message={message}
                    type="success"
                    showIcon
                    className="mb-3"
                />
            ) : (
                ""
            )}
            <Link
                to={".."}
                className="flex items-center gap-3 text-black hover:text-black/80 duration-200 w-fit"
            >
                {" "}
                <MdArrowBack className="text-xl" /> Books List
            </Link>
            <div className="flex items-center justify-between my-6">
                <TableTlt title={`Copied Books ID List`} />
                <SetDamagedBooks
                    generatedIds={selectedRowKeys}
                    setSelectedRowKeys={setSelectedRowKeys}
                    setMessage={setMessage}
                />
            </div>
            <Table
                className="copied-table"
                columns={columns}
                dataSource={copiedBooks}
                loading={isLoading}
                rowSelection={rowSelection}
                rowKey={(record) => record?.generatedId}
            />
        </section>
    );
};

export default CopiedBooksList;
