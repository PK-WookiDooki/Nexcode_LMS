import { Skeleton, Space, Table } from "antd";
import { ACTBtn, TableTlt } from "../../components";
import { useRenewIssuedBooksMutation } from "./issuedBooksApi";

const ODDBooksList = ({ oddBooks, isISBLoading, isOODBLoading }) => {
    const [renewIssuedBooks] = useRenewIssuedBooksMutation();

    const renewISBooks = async (copiedId) => {
        try {
            const { data } = await renewIssuedBooks(copiedId);
            data?.success && alert(data?.message);
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
            title: "Issued Books ID",
            dataIndex: "copiedId",
            key: "copiedId",
        },
        {
            title: "Member ID",
            dataIndex: "memberId",
            key: "memberId",
        },
        {
            title: "Due Date",
            dataIndex: "due_date",
            key: "due_date",
            render: (_, book) => <p> {book?.due_date.slice(0, 10)} </p>,
        },
    ];

    return (
        <section className="p-3">
            <TableTlt title={"Overdue Date Books List"} />

            <div className="mt-3">
                <Table
                    columns={columns}
                    dataSource={oddBooks}
                    loading={isISBLoading || isOODBLoading}
                />
            </div>
        </section>
    );
};

export default ODDBooksList;
