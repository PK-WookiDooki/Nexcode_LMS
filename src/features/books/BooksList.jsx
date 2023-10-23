import { Link } from "react-router-dom";
import { useDeleteBooksMutation, useGetAllBooksQuery } from "./booksApi";
import { Alert, Space, Table } from "antd";
import AddNewBookForm from "./AddNewBookForm";
import { ConfirmBox, SearchForm, TableTlt, ActionBtn } from "@/components";
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

    const [message, setMessage] = useState(null);
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

    //fake Data
    const fakeData = [
        {
            id: 1,
            title: "The Law of Human Nature",
            totalBooks: 3,
            leftoverBooks: 2,
            totalIssuedBooks: 1,
            damagedBooks: 0,
        },
    ];

    const columns = [
        {
            title: "No.",
            render: (_, book, index) => <p> {index + 1} </p>,
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            render: (_, book) => (
                <div className="flex items-center gap-3">
                    <Link
                        to={`/books/${book?.id}`}
                        className="block text-darkBlue hover:text-darkBlue/80 duration-200"
                    >
                        {book?.title}
                    </Link>
                    <ChangeBookTitleForm book={book} setMessage={setMessage} />
                </div>
            ),
        },
        {
            title: "Book ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Total Books",
            dataIndex: "totalBooks",
            key: "totalBooks",
        },
        {
            title: "Leftover Books",
            dataIndex: "leftoverBooks",
            key: "leftoverBooks",
        },
        {
            title: "Total Issued Books",
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
                        setMessage={setMessage}
                        setAddedCPBooks={setAddedCPBooks}
                    />
                    <ConfirmBox
                        event={() => deleteBooks({ id: book?.id, token })}
                        setMessage={setMessage}
                    />
                </Space>
            ),
        },
    ];

    return (
        <section className="px-10">
            {message ? (
                <Alert
                    message={message}
                    type={"success"}
                    showIcon
                    className="mb-11"
                />
            ) : (
                ""
            )}
            <div className="flex items-center gap-6 mb-11 ">
                <TableTlt title={"Books List"} />
                <AddNewBookForm
                    setMessage={setMessage}
                    setAddedCPBooks={setAddedCPBooks}
                />
            </div>
            <SearchForm
                search={search}
                setSearch={setSearch}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={"Search by Book ID / Title"}
            />
            <div className="my-3">
                {addedCPBooks?.length > 0 ? (
                    <AddedCopiedBooksList copiedBooks={addedCPBooks} />
                ) : (
                    ""
                )}

                <Table
                    bordered
                    columns={columns}
                    dataSource={
                        search?.trim().length > 0 ? searchedBooks : books
                    }
                    //dataSource={fakeData}
                    loading={isBLoading}
                    rowKey={(record) => record?.id}
                />
            </div>
        </section>
    );
};

export default BooksList;
