import { Link } from "react-router-dom";
import { useDeleteBooksMutation, useGetAllBooksQuery } from "./booksApi";
import { Space, Table } from "antd";
import AddNewBookForm from "./AddNewBookForm";
import { ConfirmBox, SearchForm, TableTlt } from "@/components";
import { useEffect, useState } from "react";
import AddMoreBooksForm from "./AddMoreBooksForm";
import ChangeBookTitleForm from "./ChangeBookTitleForm";
import AddedCopiedBooksList from "./AddedCopiedBooksList.jsx";
import { useSelector } from "react-redux";

const searchedOptions = [
    {label:  "Book Id", value: "id"}, {label : "Book Title", value : "title"}
]

const BooksList = () => {
    const { token } = useSelector((state) => state.authSlice);
    const { data: booksData, isLoading: isBLoading } =
        useGetAllBooksQuery(token);
    const books = booksData;

    const [search, setSearch] = useState("");
    const [searchedBooks, setSearchedBooks] = useState([]);
    const [addedCPBooks, setAddedCPBooks] = useState([]);
    const [selectedSearchedOpt, setSelectedSearchedOpt] = useState("id");

    const onSearchedOptChange = (value) => {
        setSelectedSearchedOpt(value)
    }

    useEffect(() => {
        const filteredBooks = books?.filter(
            book => book[selectedSearchedOpt].toString().toLowerCase().includes(search?.toLowerCase())
        )
        setSearchedBooks(filteredBooks);
    }, [search]);

    const [deleteBooks] = useDeleteBooksMutation();

    const columns = [
        {
            title: "No.",
            render: (_, book, index) => <p> {index + 1} </p>,
        },{
            title: "Book ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Book Title",
            dataIndex: "title",
            key: "title",
            render: (_, book) => (
                <div className="flex items-center gap-3">
                    <Link
                        to={`/books/${book?.id}/copiedIds`}
                        className="block text-darkBlue hover:text-darkBlue/80 duration-200"
                    >
                        {book?.title}
                    </Link>
                    <ChangeBookTitleForm book={book} />
                </div>
            ),
        },

        {
            title: "Total Books",
            dataIndex: "totalBooks",
            key: "totalBooks",
        },
        {
            title: "Available Books",
            dataIndex: "leftoverBooks",
            key: "leftoverBooks",
        },
        {
            title: "Issued Books",
            dataIndex: "totalIssuedBooks",
            key: "totalIssuedBooks",
        },
        {
            title: "Damaged Books",
            dataIndex: "damagedBooks",
            key: "damagedBooks",
        },
        {
            title: "Action",
            key: "action",
            render: (_, book) => (
                <Space size="middle" className={`flex justify-center`} >
                    <AddMoreBooksForm
                        bookId={book?.id}
                        setAddedCPBooks={setAddedCPBooks}
                    />
                    <ConfirmBox
                        event={() => {
                            deleteBooks({id: book?.id, token});
                            setAddedCPBooks([])
                        }}
                        type={"book"}
                    />
                </Space>
            ),
        },
    ];

    return (
        <section className="px-10 pb-10">
                {addedCPBooks?.length > 0 ? (
            <div className="mb-5">
                    <AddedCopiedBooksList copiedBooks={addedCPBooks} />
            </div>
                ) : (
                    ""
                )}
            <div className="flex items-center gap-6 mb-8 ">
                <TableTlt title={"Books"} />
                <AddNewBookForm
                    setAddedCPBooks={setAddedCPBooks}
                />
            </div>
            <SearchForm
                search={search}
                setSearch={setSearch}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={"Search book"}
                searchedOptions={searchedOptions}
                onSearchedOptChange={onSearchedOptChange}
            />
            <div className={`mt-6`} >
                <Table
                    bordered
                    columns={columns}
                    dataSource={
                        search?.trim().length > 0 ? searchedBooks : books
                    }
                    // dataSource={testData}
                    loading={isBLoading}
                    rowKey={(record) => record?.id}
                />
            </div>
        </section>
    );
};

export default BooksList;
