import { Alert, DatePicker, Select, Space, Table } from "antd";
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

const IssuedBooksList = () => {
    const { token } = useSelector((state) => state.authSlice);
    const [keyword, setKeyword] = useState("all");
    const [date, setDate] = useState(dayjs());
    const [search, setSearch] = useState("");
    const [searchedBooks, setSearchedBooks] = useState([]);
    const { data, isLoading: isISBLoading } =
        useGetAllIssuedRecordsByFilterQuery({
            keyword,
            date: date.toISOString().slice(0, 7),
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

    useEffect(() => {
        const filteredBooks = issuedBooks?.filter(
            (book) =>
                book.generatedId
                    .toString()
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                book.memberId.toString().includes(search) ||
                book.name.toLowerCase().includes(search.toLowerCase())
        );
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

    const columns = [
        {
            title: "No.",
            render: (_, book, index) => <p> {index + 1} </p>,
        },
        {
            title: "Issued Books ID",
            dataIndex: "generatedId",
            key: "generatedId",
        },
        {
            title: "Member ID",
            dataIndex: "memberId",
            key: "memberId",
        },
        {
            title: "Name",
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
            render: (_, book) => <p> {formatDateArray(book?.dueDate)} </p>,
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
        <section className="px-10">
            <div className="flex items-center gap-6 mb-11">
                <TableTlt title={"Issued Books List"} />
                <AddNewIssuedBookForm />
            </div>
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <SearchForm
                        search={search}
                        setSearch={setSearch}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={
                            "Search by Copy Book ID / Member ID / Name"
                        }
                    />
                    <DatePicker
                        picker="month"
                        onChange={onDateChange}
                        defaultValue={dayjs()}
                        format={"MMMM YYYY"}
                        allowClear={false}
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
                    />
                    <ReturnIssuedBooks
                        issuedBookIds={selectedRowKeys}
                        setSelectedRowKeys={setSelectedRowKeys}
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
