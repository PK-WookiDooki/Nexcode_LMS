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
            title: "Issued Status",
            dataIndex: "issued",
            key: "issued",
            render: (_, book) => (
                <p
                    className={` flex items-center gap-2 ${
                        book?.issued ? "text-red-600" : " text-emerald-500 "
                    } `}
                >
                    <span
                        className={`block h-2 w-2 rounded-full ${
                            book?.issued ? "bg-red-600" : "bg-emerald-500"
                        }`}
                    ></span>
                    {book?.issued ? "Borrowed" : "Available"}{" "}
                </p>
            ),
        },
        {
            title: "Status",
            dataIndex: "damaged",
            key: "damaged",
            render: (_, book) => (
                <p
                    className={` flex items-center gap-2 ${
                        book?.damaged ? "text-red-600" : " text-emerald-500 "
                    } `}
                >
                    <span
                        className={`block h-2 w-2 rounded-full ${
                            book?.damaged ? "bg-red-600" : "bg-emerald-500"
                        }`}
                    ></span>
                    {book?.damaged ? "Damaged" : "Available"}{" "}
                </p>
            ),
        },
    ];

    return (
        <section>
            <TableTlt title={"Added Copied Books List"} />
            <div className="mt-3">
                <Table
                    columns={columns}
                    dataSource={copiedBooks}
                    rowKey={(record) => record?.generatedId}
                />
            </div>
        </section>
    );
};

export default AddedCopiedBooksList;
