import { Alert, DatePicker, Select, Space, Table } from "antd";
import { ACTBtn, SearchForm, TableTlt } from "../../components";
import AddNewIssuedBookForm from "./AddNewIssuedBooksForm";
import {
    useDeleteIssuedBooksMutation,
    useGetAllIssuedBooksQuery,
    useRenewIssuedBooksMutation,
} from "./issuedBooksApi";
import { useEffect, useState } from "react";
import "./issued.css";
import dayjs from "dayjs";

const IssuedBooksList = () => {
    const [keyword, setKeyword] = useState("all");
    const [date, setDate] = useState(
        new Date(Date.now()).toISOString().slice(0, 7)
    );
    const [search, setSearch] = useState("");
    const [deleteIssuedBooks] = useDeleteIssuedBooksMutation();
    const [renewIssuedBooks] = useRenewIssuedBooksMutation();
    const [message, setMessage] = useState(null);
    const [apiStatus, setApiStatus] = useState(null);
    const [searchedBooks, setSearchedBooks] = useState([]);

    const { data, isLoading: isISBLoading } = useGetAllIssuedBooksQuery({
        keyword,
        date,
    });
    const issuedBooks = data?.data;

    const onSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        const filteredBooks = issuedBooks?.filter(
            (book) =>
                book.copiedId.toString().includes(value) ||
                book.memberId.toString().includes(value)
        );
        setSearchedBooks(filteredBooks);
    };

    useEffect(() => {
        if (message !== null) {
            setTimeout(() => {
                setMessage(null);
            }, 5000);
        }
    }, [message]);

    const returnISBooks = async (copiedId) => {
        try {
            const isConfirm = confirm("Are you sure?");
            if (isConfirm) {
                const { data } = await deleteIssuedBooks(copiedId);
                setMessage(data?.message);
                if (data?.success) {
                    setApiStatus(true);
                } else {
                    setApiStatus(false);
                }
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const renewISBooks = async (copiedId) => {
        try {
            const isConfirm = confirm("Are you sure you want to extend?");
            if (isConfirm) {
                const { data } = await renewIssuedBooks(copiedId);
                setMessage(data?.message);
                if (data?.success) {
                    setApiStatus(true);
                } else {
                    setApiStatus(false);
                }
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const onDateChange = (value) => {
        const changedDate = value?.toISOString().slice(0, 7);
        setDate(changedDate);
        const filteredBooks = issuedBooks?.filter(
            (book) =>
                (book.copiedId.toString().includes(search) ||
                    book.memberId.toString().includes(search)) &&
                book.issued_date.includes(changedDate)
        );
        setSearchedBooks(filteredBooks);
    };

    const onKeywordChange = (value) => {
        setKeyword(value);
        setSearch("");
    };

    const columns = [
        {
            title: "No.",
            render: (_, book, index) => <p> {index + 1} </p>,
        },
        {
            title: "Issued Books ID",
            dataIndex: "copiedId",
            key: "copiedId",
        },
        {
            title: "Member ID",
            dataIndex: "memberId",
            key: "memberId",
        },
        {
            title: "Issued Date",
            dataIndex: "issued_date",
            key: "issued_date",
            render: (_, book) => <p> {book?.issued_date.slice(0, 10)} </p>,
        },
        {
            title: "Due Date",
            dataIndex: "due_date",
            key: "due_date",
            render: (_, book) => <p> {book?.due_date.slice(0, 10)} </p>,
        },
        {
            title: "Extension Times",
            dataIndex: "extension_times",
            key: "extension_times",
            render: (_, book) => (
                <p>
                    {" "}
                    {book?.is_borrowed === "true"
                        ? book?.extension_times
                        : "-"}{" "}
                </p>
            ),
        },
        {
            title: "Status",
            dataIndex: "is_borrowed",
            key: "is_borrowed",
            render: (_, book) => (
                <p>
                    {" "}
                    {book?.is_borrowed === "true"
                        ? "Borrowed"
                        : "Returned"}{" "}
                </p>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_, book) =>
                book?.is_borrowed === "true" ? (
                    <Space size="middle">
                        {" "}
                        <ACTBtn
                            event={() => renewISBooks(book?.copiedId)}
                            title={"Renew"}
                            type={"edit"}
                        />
                        <ACTBtn
                            event={() => returnISBooks(book?.copiedId)}
                            title={"Return"}
                            type={"del"}
                        />{" "}
                    </Space>
                ) : (
                    ""
                ),
        },
    ];

    return (
        <section className="p-3">
            <TableTlt title={"Issued Books List"} />
            <div className="flex items-center justify-between my-3">
                <SearchForm
                    search={search}
                    setSearch={setSearch}
                    onChange={onSearchChange}
                />
                <div className="flex items-center gap-5">
                    <DatePicker
                        picker="month"
                        onChange={onDateChange}
                        defaultValue={dayjs()}
                        format={"MMMM/YYYY"}
                        allowClear={false}
                    />{" "}
                    <Select
                        defaultValue={"all"}
                        onChange={onKeywordChange}
                        options={[
                            {
                                label: "All Issued Books",
                                value: "all",
                            },
                            {
                                label: "Borrowed Books",
                                value: "bbl",
                            },
                            {
                                label: "Returned Books",
                                value: "rbl",
                            },
                        ]}
                    ></Select>
                    <AddNewIssuedBookForm
                        setMessage={setMessage}
                        setApiStatus={setApiStatus}
                    />
                </div>
            </div>
            {message !== null ? (
                <Alert
                    message={message}
                    type={apiStatus ? "success" : "error"}
                    showIcon
                />
            ) : (
                ""
            )}
            <div className="mt-3">
                <Table
                    bordered
                    columns={columns}
                    dataSource={
                        search?.trim().length > 0 ? searchedBooks : issuedBooks
                    }
                    loading={isISBLoading}
                />
            </div>
        </section>
    );
};

export default IssuedBooksList;
