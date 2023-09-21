import { Link } from "react-router-dom";
import {
    useDeleteBooksMutation,
    useGetAllBooksQuery,
    useUpdateBooksMutation,
} from "./booksApi";
import { Alert, Button, Form, Input, Modal, Space, Table } from "antd";
import AddNewBookForm from "./AddNewBookForm";
import { ACTBtn, FormTlt, SearchForm, TableTlt } from "../../components";
import { useEffect, useState } from "react";

const BooksList = () => {
    const { data: booksData, isLoading: isBLoading } = useGetAllBooksQuery();
    const books = booksData?.data;

    const [search, setSearch] = useState("");
    const [message, setMessage] = useState(null);
    const [apiStatus, setApiStatus] = useState(null);
    const [amount, setAmount] = useState(0);
    const [bookId, setBookId] = useState(null);
    const [searchedBooks, setSearchedBooks] = useState([]);

    const onSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        const filteredBooks = books?.filter(
            (book) =>
                book?.title.toLowerCase().includes(value.toLowerCase()) ||
                book?.id.toString().includes(value)
        );
        setSearchedBooks(filteredBooks);
    };

    //row selection

    const [deleteBooks] = useDeleteBooksMutation();
    const [updateBooks] = useUpdateBooksMutation();

    useEffect(() => {
        if (message !== null) {
            setTimeout(() => {
                setMessage(null);
            }, 5000);
        }
    }, [message]);

    const deleteBooksFromDB = async (bookId) => {
        try {
            const { data } = await deleteBooks(bookId);
            console.log(data);
            setMessage(data?.message);
            if (data?.success) {
                setApiStatus(true);
            } else {
                setApiStatus(false);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const updateBookAmount = async () => {
        try {
            const book = { bookId, amount: parseInt(amount) };
            console.log(book);
            const { data } = await updateBooks(book);
            console.log(data);
            setMessage(data?.message);
            if (data?.success) {
                setApiStatus(true);
            } else {
                setApiStatus(false);
            }
            setAmount(null);
            setBookId(null);
        } catch (error) {
            throw new Error(error);
        }
    };

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
                <Link to={`/books/${book?.id}`}>{book?.title}</Link>
            ),
        },
        {
            title: "Book ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Total Books",
            dataIndex: "amount",
            key: "amount",
        },
        {
            title: "Leftover Books",
            dataIndex: "leftoverBooks",
            key: "leftoverBooks",
        },
        {
            title: "Borrowed Books",
            dataIndex: "borrowedBooks",
            key: "borrowedBooks",
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
                    <button
                        className="px-3 py-1 rounded-md bg-blue-600 text-white"
                        onClick={() => setBookId(book?.id)}
                    >
                        Edit
                    </button>
                    <ACTBtn
                        event={() => deleteBooksFromDB(book?.id)}
                        title={"Delete"}
                        type={"del"}
                    />
                </Space>
            ),
        },
    ];

    return (
        <section className="p-3">
            <TableTlt title={"Books List"} />
            <div className="flex items-center justify-between my-3 ">
                <SearchForm
                    search={search}
                    setSearch={setSearch}
                    onChange={onSearchChange}
                />
                <AddNewBookForm
                    setMessage={setMessage}
                    setApiStatus={setApiStatus}
                />
            </div>
            <Modal
                centered
                open={bookId !== null}
                onCancel={() => setBookId(null)}
                footer={null}
                style={{ minWidth: "550px", width: "100%" }}
            >
                <Form onFinish={updateBookAmount}>
                    <FormTlt title={"Add Books"} />
                    <div className="flex items-center gap-3">
                        <Form.Item
                            className="mb-0 w-full"
                            rules={[
                                {
                                    min: 1,
                                    message:
                                        "Book amount should have at least 1.",
                                },
                                {
                                    max: 100,
                                    message:
                                        "Book amount can't be more than 100!",
                                },
                            ]}
                        >
                            <Input
                                type="number"
                                onChange={(value) => setAmount(value)}
                                defaultValue={amount}
                                placeholder="Enter book amount . . ."
                            />
                        </Form.Item>
                        <Button
                            htmlType="submit"
                            type="primary"
                            className="submit-btn"
                        >
                            {" "}
                            Submit{" "}
                        </Button>
                    </div>
                </Form>
            </Modal>

            <div className="mt-3">
                {message ? (
                    <Alert
                        message={message}
                        type={apiStatus ? "success" : "error"}
                        showIcon
                        className="mb-3"
                    />
                ) : (
                    ""
                )}
                <Table
                    bordered
                    columns={columns}
                    dataSource={
                        search?.trim().length > 0 ? searchedBooks : books
                    }
                    loading={isBLoading}
                />

                {apiStatus}
            </div>
        </section>
    );
};

export default BooksList;
