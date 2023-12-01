import {Table} from "antd"
import {SearchForm, TableTlt} from "@/components";
import { useGetCopiedBooksByOrgIdQuery } from "./copiedBooksApi";
import {useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdArrowBack } from "react-icons/md";
import SetDamagedBooks from "./SetDamagedBooks";

const searchedOptions = [{label : "Copied Id", value : "generatedId"}]

const CopiedBooksList = () => {
    const { bookId } = useParams();
    const { token } = useSelector((state) => state.authSlice);
    const { data, isLoading } = useGetCopiedBooksByOrgIdQuery({
        bookId,
        token,
    });
    const copiedBooks = data;

    const [search, setSearch]= useState("")
    const [filteredBooks, setFilteredBooks] = useState([])
    const [selectedSearchedOpt, setSelectedSearchedOpt] = useState("generatedId")

    useEffect(() => {
        if(search?.trim().length > 0){
            const searchedBooks = copiedBooks?.filter(book => book[selectedSearchedOpt].toLowerCase().includes(search.toLowerCase()));
            setFilteredBooks(searchedBooks)
        }
    }, [search]);

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
                    className={` flex items-center justify-center gap-2 ${
                        book?.issued || book?.damaged
                            ? "text-danger"
                            : " text-c52 "
                    } `}
                >
                    <span
                        className={`block h-2 w-2 rounded-full ${
                            book?.issued || book?.damaged
                                ? "bg-danger"
                                : "bg-c52"
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
                    className={` flex items-center justify-center gap-2 ${
                        book?.damaged ? "text-danger" : " text-c52 "
                    } `}
                >
                    <span
                        className={`block h-2 w-2 rounded-full ${
                            book?.damaged ? "bg-danger" : "bg-c52"
                        }`}
                    ></span>
                    {book?.damaged ? "Damaged" : "Fine"}{" "}
                </p>
            ),
        },
    ];

    return (
        <section className="px-10 pb-10">
            <Link
                to={".."}
                className="flex items-center gap-1 font-medium  text-black hover:text-black/80 duration-200 w-fit mb-4"
            >
                {" "}
                <MdArrowBack className="text-xl" /> Books List
            </Link>
            <TableTlt title={`Copied Books ID List`} />
            <div className="flex items-center justify-between mb-6 mt-8">
            <SearchForm
                search={search}
                setSearch={setSearch}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={"Search by Copied Book ID"}
                searchedOptions={searchedOptions}
                onSearchedOptChange={(value) => setSelectedSearchedOpt(value)}
            /> <SetDamagedBooks
                generatedIds={selectedRowKeys}
                setSelectedRowKeys={setSelectedRowKeys}
            />
            </div>

            <Table
                bordered
                className="copied-table"
                columns={columns}
                dataSource={search?.trim().length > 0 ? filteredBooks : copiedBooks}
                loading={isLoading}
                rowSelection={rowSelection}
                rowKey={(record) => record?.generatedId}
            />
        </section>
    );
};

export default CopiedBooksList;
