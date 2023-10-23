import { useEffect, useRef, useState } from "react";
import { IssuedBooks, ODDBooks } from "@/features";
import { useGetAllBooksQuery } from "@/features/books/booksApi";
import { useGetAllIssuedRecordsByFilterQuery } from "@/features/issuedBooks/issuedBooksApi";
import { useGetAllMembersQuery } from "@/features/members/membersApi";
import { StatisticCard } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
    useGetAllOverdueBooksQuery,
    useGetTotalIssuedBooksQuery,
} from "../../features/issuedBooks/issuedBooksApi";
import { Alert } from "antd";
import { useLocation } from "react-router-dom";
import { setIssuedMessage } from "../../features/issuedBooks/issuedSlice";

const Home = () => {
    const { token } = useSelector((state) => state.authSlice);
    const [date, setDate] = useState(dayjs());

    const { issuedMessage } = useSelector((state) => state.issuedSlice);

    const { data: issuedBooksData, isLoading: isISBLoading } =
        useGetAllIssuedRecordsByFilterQuery({
            keyword: "issued",
            date: date.toISOString().slice(0, 7),
            token,
        });

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

    const location = useLocation().pathname;
    const dispatch = useDispatch();

    useEffect(() => {
        if (location) {
            dispatch(setIssuedMessage({ msgType: null, msgContent: null }));
        }
    }, [location]);

    useEffect(() => {
        const scrollTo = () => {
            if (ref.current /* + other conditions */) {
                ref.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        };

        if (window.location.href.includes("#odb")) {
            scrollTo();
        }
    }, [ref, window.location.href]);

    return (
        <section className="flex flex-col gap-11">
            {issuedMessage.msgType && issuedMessage.msgContent ? (
                <div className="px-10">
                    <Alert
                        message={issuedMessage.msgContent}
                        type="success"
                        showIcon
                    />
                </div>
            ) : (
                ""
            )}

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

export default Home;
