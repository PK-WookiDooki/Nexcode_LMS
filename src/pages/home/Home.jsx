import { useState } from "react";
import { IssuedBooks, ODDBooks } from "../../features";
import {
    useGetAllIssuedBooksQuery,
    useGetAllOverDueBooksQuery,
} from "../../features/issuedBooks/issuedBooksApi";
import { DataTable } from "../../components";

const Home = () => {
    const [date, setDate] = useState(
        new Date(Date.now()).toISOString().slice(0, 7)
    );
    const { data: issuedBooksData, isLoading: isISBLoading } =
        useGetAllIssuedBooksQuery({ keyword: "bbl", date });

    const set = new Set();
    const members = issuedBooksData?.data?.filter((book) => {
        if (!set.has(book.memberId)) {
            set.add(book.memberId);
            return true;
        }
        return false;
    });

    const { data: overDueBooks, isLoading: isOODBLoading } =
        useGetAllOverDueBooksQuery();
    return (
        <section className="">
            <div className="p-3">
                <DataTable
                    issuedBooks={issuedBooksData?.data}
                    isISBLoading={isISBLoading}
                    members={members}
                />
            </div>

            <IssuedBooks
                issuedBooks={issuedBooksData?.data}
                isISBLoading={isISBLoading}
                setDate={setDate}
            />

            <ODDBooks
                oddBooks={overDueBooks?.data}
                isISBLoading={isISBLoading}
                isOODBLoading={isOODBLoading}
            />
        </section>
    );
};

export default Home;
