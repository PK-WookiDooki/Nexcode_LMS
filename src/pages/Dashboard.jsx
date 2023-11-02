import { useEffect, useRef, useState } from "react";
import { IssuedBooks, ODDBooks } from "@/features/index.js";
import { useGetAllBooksQuery } from "@/features/books/booksApi.js";
import { useGetAllIssuedRecordsByFilterQuery } from "@/features/issuedBooks/issuedBooksApi.js";
import { useGetAllMembersQuery } from "@/features/members/membersApi.js";
import { StatisticCard } from "@/components/index.js";
import dayjs from "dayjs";
import {
    useGetAllOverdueBooksQuery,
    useGetTotalIssuedBooksQuery,
} from "../features/issuedBooks/issuedBooksApi.js";
import {useSelector} from "react-redux";

const Dashboard = () => {
    const { token } = useSelector((state) => state.authSlice);
    const [date, setDate] = useState(dayjs());


    const { data: issuedBooksData, isLoading: isISBLoading } =
        useGetAllIssuedRecordsByFilterQuery({
            keyword: "issued",
            date: date.format("YYYY-MM"),
            token,
        });

    // const allIssuedBooks = [
    //     {
    //         "id": 1,
    //         "generatedId": "1B2C",
    //         "title": "Under a Latent Moon",
    //         "memberId": 5,
    //         "issued": true,
    //         "name": "Ei Khaing Phyo",
    //         "phone": "09969609760",
    //         "issuedDate": [
    //             2023,
    //             10,
    //             10
    //         ],
    //         "checked": false,
    //         "dueDate": [
    //             2023,
    //             10,
    //             21
    //         ],
    //         "extensionTimes": 1
    //     },
    //     {
    //         "id": 3,
    //         "generatedId": "3B3C",
    //         "title": "Into the Pit",
    //         "memberId": 4,
    //         "issued": false,
    //         "name": "Watermelon",
    //         "phone": "09969609761",
    //         "issuedDate": [
    //             2023,
    //             10,
    //             12
    //         ],
    //         "checked": false,
    //         "dueDate": [
    //             2023,
    //             10,
    //             23
    //         ],
    //         "extensionTimes": 1
    //     },
    //
    // ]

    const { data: allIssuedBooks } = useGetTotalIssuedBooksQuery(token);

    const totalIssuedBooks = allIssuedBooks?.filter(
        (book) => book?.issued === true
    )?.length;

    const { data: overDueBooks, isLoading: isOODBLoading } =
        useGetAllOverdueBooksQuery(token);

    const { data: books } = useGetAllBooksQuery(token);

    const { data: members } = useGetAllMembersQuery({
        token,
        keyword: "all",
    });

    const ref = useRef();

    useEffect(() => {
        if (window.location.href.includes("#odb")) {
            ref.current.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }, [ ref, window.location.href]);

    const scrollIntoView = () => {
        document.getElementById("odb").scrollIntoView({behavior: "smooth"})
    }

    return (
        <section className="flex flex-col gap-11">

            <div className="grid grid-cols-4 px-10 justify-items-center gap-10 ">
                <StatisticCard
                    title={"Total Books"}
                    count={books?.length}
                    path={"/books"}
                />
                <StatisticCard
                    title={"Total Members"}
                    count={members?.length}
                    path={"/members"}
                />
                <StatisticCard
                    title={"Total Issued Books"}
                    count={totalIssuedBooks}
                    path={"/issuedBooks"}
                />
                <StatisticCard
                    title={"Total Overdue Books"}
                    count={overDueBooks?.length}
                    path={"#odb"}
                    event={scrollIntoView}
                />
            </div>

            <IssuedBooks
                issuedBooks={issuedBooksData}
                setDate={setDate}
                isISBLoading={isISBLoading}
                isOODBLoading={isOODBLoading}
            />

            <ODDBooks
                ref={ref}
                oddBooks={overDueBooks}
                isISBLoading={isISBLoading}
                isOODBLoading={isOODBLoading}
            />
        </section>
    );
};

export default Dashboard;
