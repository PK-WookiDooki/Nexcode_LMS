import { DatePicker, Table } from "antd";
import { SearchForm, TableTlt } from "@/components";
import AddNewIssuedBookForm from "./AddNewIssuedBooksForm";
import { useEffect, useState } from "react";
import "./issued.css";
import dayjs from "dayjs";
import RenewIssuedBooks from "./RenewIssuedBooks";
import ReturnIssuedBooks from "./ReturnIssuedBooks";
import { formatDateArray } from "@/core/functions/formatDateArray";
import {formatPhoneNumber} from "@/core/functions/formatPhoneNumber.js";

const searchedOptions = [
        {label:  "Copied Id", value: "generatedId"}, {label : "Member Id", value : "memberId"},
    {label:  "Name", value: "name"}, {label : "Phone", value : "phone"}

]

const IssuedBooksList = ({
    issuedBooks,
    isISBLoading,
    isOODBLoading,
    setDate,
}) => {
    const [searchedBooks, setSearchedBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedSearchedOpt, setSelectedSearchedOpt] = useState("generatedId")
    const onSelectChange = (record) => {
        setSelectedRowKeys(record);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    useEffect(() => {
        const filteredBooks = issuedBooks?.filter(
            book => book[selectedSearchedOpt].toString().toLowerCase().includes(search?.toLowerCase())
        )
        setSearchedBooks(filteredBooks);
    }, [search]);

    const onSearchedOptChange = (value) => {
        setSelectedSearchedOpt(value)
    }

    const onDateChange = (value) => {
        setDate(value);
        setSearch("");
    };

    const columns = [
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
            title : "Phone",
            dataIndex: "phone",
            key: "phone",
            render: (_, book) => <p> {formatPhoneNumber(book?.phone)} </p>,
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
                <p className={` ${!book?.issued ? " text-center " : ""  } `} > {book?.issued ? book?.extensionTimes : "-"} </p>
            ),
        },
    ];

    return (
        <section className="p-3 px-10">
            <div className="flex items-center gap-6 mb-8">
                <TableTlt title={"Issued Books"} />{" "}
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
                            "Search issued list"
                        }
                        searchedOptions={searchedOptions}
                        onSearchedOptChange={onSearchedOptChange}
                    />
                    <DatePicker
                        picker="month"
                        defaultValue={dayjs()}
                        onChange={onDateChange}
                        format={"MMMM YYYY"}
                        allowClear={false}
                        className=" !shadow-none "
                        inputReadOnly={true}
                    />{" "}
                </div>
                <div className="flex gap-3">
                    <RenewIssuedBooks
                        issuedBookIds={selectedRowKeys}
                        setSelectedRowKeys={setSelectedRowKeys}
                        setSearch={setSearch}
                    />
                    <ReturnIssuedBooks
                        issuedBookIds={selectedRowKeys}
                        setSelectedRowKeys={setSelectedRowKeys}
                        setSearch={setSearch}
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
