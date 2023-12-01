import { Table } from "antd";
import { TableTlt } from "@/components";

const AddedCopiedBooksList = ({ copiedBooks }) => {
    const columns = [
        {
            title: "No.",
            render: (_, book, index) => <p> {index + 1} </p>,
        },
        {
            title: "Generated ID",
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
                        book?.issued ? "text-danger" : " text-c52 "
                    } `}
                >
                    <span
                        className={`block h-2 w-2 rounded-full ${
                            book?.issued ? "bg-danger" : "bg-c52"
                        }`}
                    ></span>
                    {book?.issued ? "Borrowed" : "Available"}{" "}
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
                            book?.damaged ? " bg-danger " : " bg-c52 " 
                        }`}
                    ></span>
                    {book?.damaged ? "Damaged" : "Fine"}{" "}
                </p>
            ),
        },
    ];

    return (
        <section>
            <TableTlt title={"Added Copied Books List"} />
            <div className="mt-3">
                <Table
                    bordered
                    columns={columns}
                    dataSource={copiedBooks}
                    rowKey={(record) => record?.generatedId}
                />
            </div>
        </section>
    );
};

export default AddedCopiedBooksList;
