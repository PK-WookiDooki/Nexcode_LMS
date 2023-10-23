import { Alert, DatePicker, Table } from "antd";
import { SearchForm, TableTlt } from "@/components";
import AddNewIssuedBookForm from "./AddNewIssuedBooksForm";
import { useEffect, useState } from "react";
import "./issued.css";
import dayjs from "dayjs";
import RenewIssuedBooks from "./RenewIssuedBooks";
import ReturnIssuedBooks from "./ReturnIssuedBooks";
import { formatDateArray } from "@/core/functions/formatDateArray";

const IssuedBooksList = ({
    issuedBooks,
    isISBLoading,
    isOODBLoading,
    setDate,
}) => {
    const [searchedBooks, setSearchedBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (record) => {
        setSelectedRowKeys(record);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    useEffect(() => {
        const filteredBooks = issuedBooks?.filter(
            (book) =>
                book.memberId.toString().includes(search) ||
                book.generatedId
                    .toString()
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                book.name.toLowerCase().includes(search.toLowerCase())
        );
        setSearchedBooks(filteredBooks);
    }, [search]);

    const onDateChange = (value) => {
        setDate(value);
        setSearch("");
    };

    const columns = [
        {
            title: "No.",
            render: (_, book, index) => <p> {index + 1} </p>,
        },
        {
            title: "Copied Books ID",
            dataIndex: "generatedId",
            key: "generatedId",
        },
        {
            title: "Book Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Member ID",
            dataIndex: "memberId",
            key: "memberId",
        },
        {
            title: "Member Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Issued Date",
            dataIndex: "issuedDate",
            key: "issuedDate",
            render: (_, book) => <p> {formatDateArray(book?.issuedDate)} </p>,
        },
        {
            title: "Due Date",
            dataIndex: "dueDate",
            key: "dueDate",
            render: (_, book) => <p>{formatDateArray(book?.dueDate)}</p>,
        },
        {
            title: "Extension Times",
            dataIndex: "extensionTimes",
            key: "extensionTimes",
            render: (_, book) => (
                <p> {book?.issued ? book?.extensionTimes : "-"} </p>
            ),
        },
    ];

    return (
        <section className="p-3 px-10">
            <div className="flex items-center gap-6 mb-11">
                <TableTlt title={"Issued Books List"} />{" "}
                <AddNewIssuedBookForm />
            </div>
            <div className="flex items-center justify-between mb-6">
                {" "}
                <div className="flex gap-5">
                    {" "}
                    <SearchForm
                        search={search}
                        setSearch={setSearch}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={
                            "Search by Copy Book Id/ Member Id/ Member Name"
                        }
                    />
                    <DatePicker
                        picker="month"
                        defaultValue={dayjs()}
                        onChange={onDateChange}
                        format={"MMMM YYYY"}
                        allowClear={false}
                        className=" !shadow-none "
                    />{" "}
                </div>
                <div className="flex gap-3">
                    <RenewIssuedBooks
                        issuedBookIds={selectedRowKeys}
                        setSelectedRowKeys={setSelectedRowKeys}
                    />
                    <ReturnIssuedBooks
                        issuedBookIds={selectedRowKeys}
                        setSelectedRowKeys={setSelectedRowKeys}
                    />
                </div>
            </div>

            <div className="mt-3">
                <Table
                    bordered
                    columns={columns}
                    dataSource={
                        search?.trim().length > 0 ? searchedBooks : issuedBooks
                    }
                    rowSelection={rowSelection}
                    loading={isISBLoading || isOODBLoading}
                    rowKey={(record) => record?.id}
                />
            </div>
        </section>
    );
};

export default IssuedBooksList;
