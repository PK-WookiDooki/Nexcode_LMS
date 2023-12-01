import { DatePicker, Select, Table } from "antd";
import { SearchForm, TableTlt } from "@/components";
import AddNewIssuedBookForm from "./AddNewIssuedBooksForm";
import { useGetAllIssuedRecordsByFilterQuery } from "./issuedBooksApi";
import { useEffect, useState } from "react";
import "./issued.css";
import dayjs from "dayjs";
import RenewIssuedBooks from "./RenewIssuedBooks";
import ReturnIssuedBooks from "./ReturnIssuedBooks";
import { formatDateArray } from "@/core/functions/formatDateArray";
import { useSelector } from "react-redux";
import {formatPhoneNumber} from "@/core/functions/formatPhoneNumber.js";

const searchedOptions = [
    {label:  "Copied Id", value: "generatedId"}, {label : "Member Id", value : "memberId"},
    {label:  "Name", value: "name"}, {label : "Phone", value : "phone"}

]

const IssuedBooksList = () => {
    const { token } = useSelector((state) => state.authSlice);
    const [keyword, setKeyword] = useState("all");
    const [date, setDate] = useState(dayjs());
    const [search, setSearch] = useState("");
    const [searchedBooks, setSearchedBooks] = useState([]);
    const [selectedSearchedOpt, setSelectedSearchedOpt] = useState("generatedId")
    const { data, isLoading: isISBLoading } =
        useGetAllIssuedRecordsByFilterQuery({
            keyword,
            date: date.format("YYYY-MM"),
            token,
        });
    const issuedBooks = data;


    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const rowSelection = {
        selectedRowKeys,
        onChange: (row) => {
            setSelectedRowKeys(row);
        },
        getCheckboxProps: (record) => ({
            disabled: record?.issued === false,
        }),
    };

    // searching issued books with `copiedId`, `memberId` , `member's name` & `member's phone number`
    useEffect(() => {
        const filteredBooks = issuedBooks?.filter(
            book => book[selectedSearchedOpt].toString().toLowerCase().includes(search?.toLowerCase())
        )

        setSearchedBooks(filteredBooks);

    }, [search]);



    const onDateChange = (value) => {
        setDate(value);
        setSearch("");
    };

    const onKeywordChange = (value) => {
        setKeyword(value);
        setSearch("");
    };

    const onSearchedOptChange = (value) => {
        setSelectedSearchedOpt(value)
    }

    // tables columns
    const columns = [
        {
            title: "Copied Book ID",
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
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
            render: (_, book) => <p> {formatPhoneNumber(book?.phone)} </p>
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
            render: (_, book) => <p> {formatDateArray(book?.dueDate)} </p>,
        },
        {
            title: "Extension Times",
            dataIndex: "extensionTimes",
            key: "extensionTimes",
            render: (_, book) => (
                <p  > {book?.issued ? book?.extensionTimes : "-"} </p>
            ),
        },
    ];

    return (
        <section className="px-10 pb-10">
            <div className="flex items-center gap-6 mb-8">
                <TableTlt title={"Issued Books"} />
                <AddNewIssuedBookForm />
            </div>
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <SearchForm
                        search={search}
                        setSearch={setSearch}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={"Search issued list"}
                        searchedOptions={searchedOptions}
                        onSearchedOptChange={onSearchedOptChange}
                    />
                    <DatePicker
                        picker="month"
                        onChange={onDateChange}
                        defaultValue={dayjs()}
                        format={"MMMM YYYY"}
                        allowClear={false}
                        inputReadOnly={true}
                    />{" "}
                    <Select
                        defaultValue={keyword}
                        onChange={onKeywordChange}
                        options={[
                            {
                                label: "All Issued Books",
                                value: "all",
                            },
                            {
                                label: "Issued Books",
                                value: "issued",
                            },
                            {
                                label: "Returned Books",
                                value: "returned",
                            },
                        ]}
                    ></Select>
                </div>
                <div className="flex items-center gap-5">
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

            <Table
                bordered
                columns={columns}
                dataSource={
                    search?.trim().length > 0 ? searchedBooks : issuedBooks
                }
                loading={isISBLoading}
                rowKey={(record) => record?.id}
                rowSelection={rowSelection}
            />
        </section>
    );
};

export default IssuedBooksList;
