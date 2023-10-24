import { useDeleteMembersMutation, useGetAllMembersQuery } from "./membersApi";
import { Alert, Select, Space, Table } from "antd";
import AddNewMemberForm from "./AddNewMemberForm";
import { ConfirmBox, SearchForm, TableTlt, ActionBtn } from "@/components";
import { useEffect, useState } from "react";
import EditMemberForm from "./EditMemberForm";
import { useSelector } from "react-redux";

const MembersList = () => {
    const { token } = useSelector((state) => state.authSlice);

    const [keyword, setKeyword] = useState("all");
    const [search, setSearch] = useState("");

    const { data, isLoading } = useGetAllMembersQuery({ token, keyword });
    const members = data;

    const [searchedMembers, setSearchMembers] = useState([]);


    useEffect(() => {
        const filteredMembers = members?.filter(
            (member) =>
                member.name.toLowerCase().includes(search.toLowerCase()) ||
                member.id.toString().includes(search) ||
                member.phone.toString().includes(search)
        );
        setSearchMembers(filteredMembers);
    }, [search]);

    const onChangeKeyword = (value) => {
        setKeyword(value);
        setSearch("");
    };

    const [deleteMembers] = useDeleteMembersMutation();
    const columns = [
        {
            title: "No.",
            render: (_, member, index) => <p> {index + 1} </p>,
        },

        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Member ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
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
            title: "Total Borrowed Books",
            dataIndex: "totalIssued",
            key: "totalIssued",
        },
        {
            title: "Action",
            key: "action",
            render: (_, member) => (
                <Space size="middle">
                    <EditMemberForm member={member} />
                    <ConfirmBox
                        event={() => deleteMembers({ id: member?.id, token })}
                    />
                </Space>
            ),
        },
    ];

    return (
        <section className="px-10">
            <div className="flex items-center gap-6 mb-11">
                <TableTlt title={"Members List"} />
                <AddNewMemberForm />
            </div>
            <div className="flex items-center gap-6 my-3">
                <SearchForm
                    search={search}
                    setSearch={setSearch}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={"Search by Member ID / Name / Phone"}
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
                    columns={columns}
                    dataSource={
                        search?.trim().length > 0 ? searchedMembers : members
                    }
                    loading={isLoading}
                    rowKey={(record) => record?.id}
                />
            </div>
        </section>
    );
};

export default MembersList;
