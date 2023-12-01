import { Button, Table } from "antd";
import { TableTlt } from "@/components";
import { formatDateArray } from "@/core/functions/formatDateArray";
import { forwardRef, useEffect, useState } from "react";
import { useAddOverdueBooksToCheckListMutation } from "./issuedBooksApi";
import { useDispatch, useSelector } from "react-redux";
import { setMessage} from "@/core/global/context/notiSlice.js";
import {formatPhoneNumber} from "@/core/functions/formatPhoneNumber.js";

const ODDBooksList = forwardRef(function ODDBooksList(
    { oddBooks, isISBLoading, isOODBLoading },
    ref
) {
    const { token } = useSelector((state) => state.authSlice);
    const contactedList = oddBooks
        ?.filter((book) => book.checked === true)
        .map((book) => book.issuedBookId);

    const dispatch = useDispatch();

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    useEffect(() => {
        if (oddBooks && !isOODBLoading) {
            const selectableIds = selectedRowKeys?.filter(
                (id) => !contactedList.includes(id)
            );
            setSelectedRowKeys(selectableIds);
        }
    }, [oddBooks]);

    // console.log(oddBooks)

    const onSelectChange = (record) => {
        setSelectedRowKeys(record);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        getCheckboxProps: (record) => ({
            disabled: record?.checked === true,
        }),
    };

    const [addOverdueBooksToCheckList] =
        useAddOverdueBooksToCheckListMutation();

    const addOBBToContactedList = async () => {
        try {
            const { data, error } = await addOverdueBooksToCheckList({
                ids: selectedRowKeys,
                token,
            });
            if (data?.success) {
                setSelectedRowKeys([]);
                dispatch(
                    setMessage({
                        msgType: "success",
                        msgContent: data?.message,
                    })
                );
            } else {
                dispatch(
                    setMessage({
                        msgType: "error",
                        msgContent: error?.data?.message || error?.error,
                    })
                );
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const columns = [
        {
            title: "Copied Books ID",
            dataIndex: "generatedId",
            key: "generatedId",
        },
        {
            title: "Book Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Member ID",
            dataIndex: "memberId",
            key: "memberId",
        },
        {
            title: "Member Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
            render: (_, book) => <p> {formatPhoneNumber(book?.phone)} </p>
        },
        {
            title: "Issued Date",
            dataIndex: "issuedDate",
            key: "issuedDate",
            render: (_, book) => <p> {formatDateArray(book?.issuedDate)} </p>,
        },
        {
            title: "Due Date",
            dataIndex: "dueDate",
            key: "dueDate",
            render: (_, book) => <p>{formatDateArray(book?.dueDate)}</p>,
        },
    ];

    return (
        <section ref={ref} className="p-3 px-10" id="odb">
            <div className="flex items-center justify-between mb-6">
                <TableTlt title={"Overdue Books"} />
                <Button
                    type="primary"
                    onClick={addOBBToContactedList}
                    disabled={selectedRowKeys?.length === 0}
                    className={` border ${
                        selectedRowKeys?.length <= 0
                            ? "disabled-btn"
                            : "confirm-btn"
                    } `}
                >
                    Contact
                </Button>
            </div>

            <Table
                bordered
                columns={columns}
                dataSource={oddBooks}
                loading={isISBLoading || isOODBLoading}
                rowKey={(record) => record.id}
                rowSelection={rowSelection}
            />
        </section>
    );
});

export default ODDBooksList;
