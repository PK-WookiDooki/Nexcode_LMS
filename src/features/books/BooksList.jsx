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

const BooksList = () => {
    const { token } = useSelector((state) => state.authSlice);
    const { data: booksData, isLoading: isBLoading } =
        useGetAllBooksQuery(token);
    const books = booksData;

    const [search, setSearch] = useState("");
    const [searchedBooks, setSearchedBooks] = useState([]);
    const [addedCPBooks, setAddedCPBooks] = useState([]);

    useEffect(() => {
        const filteredBooks = books?.filter(
            (book) =>
                book?.title?.toLowerCase().includes(search.toLowerCase()) ||
                book?.id?.toString().includes(search)
        );
        setSearchedBooks(filteredBooks);
    }, [search]);

    const [deleteBooks] = useDeleteBooksMutation();

    // fake data
    // const testData = [
    //     {
    //         id : 1,
    //         title : "The Law of Human Nature",
    //         totalBooks: 5,
    //         leftoverBooks: 3,
    //         totalIssuedBooks : 2,
    //         damagedBooks : 0
    //     }
    // ]

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
                <Space size="middle">
                    <AddMoreBooksForm
                        bookId={book?.id}
                        setAddedCPBooks={setAddedCPBooks}
                    />
                    <ConfirmBox
                        event={() => deleteBooks({ id: book?.id, token })}
                        type={"book"}
                    />
                </Space>
            ),
        },
    ];

    return (
        <section className="px-10">
                {addedCPBooks?.length > 0 ? (
            <div className="mb-5">
                    <AddedCopiedBooksList copiedBooks={addedCPBooks} />
            </div>
                ) : (
                    ""
                )}
            <div className="flex items-center gap-6 mb-11 ">
                <TableTlt title={"Books List"} />
                <AddNewBookForm
                    setAddedCPBooks={setAddedCPBooks}
                />
            </div>
            <SearchForm
                search={search}
                setSearch={setSearch}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={"Search by Book ID / Title"}
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
