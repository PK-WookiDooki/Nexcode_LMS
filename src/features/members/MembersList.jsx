import { useDeleteMembersMutation, useGetAllMembersQuery } from "./membersApi";
import { Select, Space, Table } from "antd";
import AddNewMemberForm from "./AddNewMemberForm";
import { ConfirmBox, SearchForm, TableTlt } from "@/components";
import { useEffect, useState } from "react";
import EditMemberForm from "./EditMemberForm";
import { useSelector } from "react-redux";
import {formatPhoneNumber} from "@/core/functions/formatPhoneNumber.js";

const searchedOptions = [
    {label : "Member Id", value : "id"},
    {label:  "Name", value: "name"}, {label : "Phone", value : "phone"}

]

const MembersList = () => {
    const { token } = useSelector((state) => state.authSlice);

    const [keyword, setKeyword] = useState("all");
    const [search, setSearch] = useState("");
    const [selectedSearchedOpt, setSelectedSearchedOpt] = useState("id")

    const { data, isLoading } = useGetAllMembersQuery({ token, keyword });
    const members = data;

    const [searchedMembers, setSearchMembers] = useState([]);


    useEffect(() => {
        const filteredMembers = members?.filter(
            book => book[selectedSearchedOpt].toString().toLowerCase().includes(search?.toLowerCase())
        )
        setSearchMembers(filteredMembers);
    }, [search]);

    const onChangeKeyword = (value) => {
        setKeyword(value);
        setSearch("");
    };

    const onSearchedOptChange = (value) => {
        setSelectedSearchedOpt(value)
    }

    const [deleteMembers] = useDeleteMembersMutation();

    const columns = [
        {
            title: "No.",
            render: (_, member, index) => <p> {index + 1} </p>,
        },
        {
            title: "Member ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
            render: (_, member) => <p> {formatPhoneNumber(member?.phone)} </p>
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
            render: (_, member) => (
                <p> {member?.address ? member?.address : "Unknown"} </p>
            ),
        },
        {
            title: "Total Issued Books",
            dataIndex: "totalIssued",
            key: "totalIssued",
        },
        {
            title: "Action",
            key: "action",
            render: (_, member) => (
                <Space size="middle" className={`flex justify-center`} >
                    <EditMemberForm member={member} setSearch={setSearch} />
                    <ConfirmBox
                        event={() => deleteMembers({ id: member?.id, token })}
                        type={"member"}
                    />
                </Space>
            ),
        },
    ];

    return (
        <section className="px-10 pb-10">
            <div className="flex items-center gap-6 mb-8">
                <TableTlt title={"Members"} />
                <AddNewMemberForm />
            </div>
            <div className="flex items-center gap-6 mb-6">
                <SearchForm
                    search={search}
                    setSearch={setSearch}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={"Search member"}
                    searchedOptions={searchedOptions}
                    onSearchedOptChange={onSearchedOptChange}
                />

                <Select
                    onChange={onChangeKeyword}
                    defaultValue={"all"}
                    options={[
                        {
                            label: "All",
                            value: "all",
                        },
                        {
                            label: "Borrowed Books Members",
                            value: "issued",
                        },
                    ]}
                ></Select>
            </div>
            <div className="mt-3">
                <Table
                    bordered
                    columns={columns}
                    dataSource={
                        search?.trim().length > 0 ? searchedMembers : members
                    }
                    // dataSource={testData}
                    loading={isLoading}
                    rowKey={(record) => record?.id}
                />
            </div>
        </section>
    );
};

export default MembersList;
