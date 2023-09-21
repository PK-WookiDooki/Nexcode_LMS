import { Space, Table } from "antd";
import { useState } from "react";
import { ACTBtn } from "..";
const DataTable = ({ issuedBooks, members }) => {
    const [memberId, setMemberId] = useState(null);

    console.log(memberId);

    const handleExpend = (expended, record) => {
        if (expended) {
            setMemberId(record.memberId);
        } else {
            setMemberId(null);
        }
    };

    const expandedRowRender = () => {
        const columns = [
            {
                title: "Book Copied ID",
                dataIndex: "copiedId",
                key: "copiedId",
            },
            {
                title: "Issued Date",
                dataIndex: "issued_date",
                key: "issued_date",
            },
            {
                title: "Due Date",
                dataIndex: "due_date",
                key: "due_date",
            },
            {
                title: "Extension Times",
                dataIndex: "extension_times",
                key: "extension_times",
            },
            {
                title: "Action",
                key: "action",
                render: (_, book) =>
                    book?.is_borrowed === "true" ? (
                        <Space size="middle">
                            {" "}
                            <button
                                onClick={() => alert(book?.memberId)}
                                className="text-blue-600"
                            >
                                {" "}
                                Renew{" "}
                            </button>
                            <button
                                onClick={() => alert(book?.memberId)}
                                className="text-green-600"
                            >
                                {" "}
                                Return{" "}
                            </button>
                        </Space>
                    ) : (
                        ""
                    ),
            },
        ];

        const filteredBooks = issuedBooks?.filter(
            (book) => book?.memberId == memberId
        );

        return (
            <Table
                columns={columns}
                dataSource={filteredBooks}
                pagination={false}
                rowKey={(record) => record.id}
            />
        );
    };

    const columns = [
        {
            title: "No.",
            render: (_, data, index) => <p> {index + 1} </p>,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },

        {
            title: "Member ID",
            dataIndex: "memberId",
            key: "memberId",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Total Borrowed Books",
            dataIndex: "borrowedBooks",
            key: "borrowedBooks",
        },
    ];
    return (
        <>
            <Table
                columns={columns}
                expandable={{
                    expandedRowRender,
                    expandedRowKeys: [memberId],
                    expandRowByClick: true,
                    onExpand: handleExpend,
                }}
                dataSource={members}
                rowKey={(record) => record.memberId}
            />
        </>
    );
};
export default DataTable;
