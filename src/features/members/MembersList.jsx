import { Link } from "react-router-dom";
import { useDeleteMembersMutation, useGetAllMembersQuery } from "./membersApi";
import { Alert, Select, Space, Table } from "antd";
import AddNewMemberForm from "./AddNewMemberForm";
import { ACTBtn, SearchForm, TableTlt } from "../../components";
import { useEffect, useState } from "react";
import EditMemberForm from "./EditMemberForm";

const MembersList = () => {
    const [keyword, setKeyword] = useState("all");
    const [message, setMessage] = useState(null);
    const [apiStatus, setApiStatus] = useState(null);
    const [search, setSearch] = useState("");
    const { data, isLoading } = useGetAllMembersQuery(keyword);
    const members = data?.data;

    const [searchedMembers, setSearchMembers] = useState([]);
    const onSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        const filteredMembers = members?.filter(
            (member) =>
                member?.name.toLowerCase().includes(value.toLowerCase()) ||
                member.id.toString().includes(value) ||
                member.phone.toString().includes(value)
        );
        setSearchMembers(filteredMembers);
    };

    useEffect(() => {
        if (message !== null) {
            setTimeout(() => {
                setMessage(null);
            }, 5000);
        }
    }, [message]);

    const onChangeKeyword = (value) => {
        setKeyword(value);
        setSearch("");
    };

    const [deleteMembers] = useDeleteMembersMutation();
    const deleteMembersAccount = async (memberId) => {
        try {
            const { data } = await deleteMembers(memberId);
            setMessage(data?.message);
            if (data?.success) {
                setApiStatus(true);
            } else {
                setApiStatus(false);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

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
            render: (_, member) => (
                <Link to={`/members/${member?.id}`}>{member?.name}</Link>
            ),
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
            dataIndex: "borrowedBooks",
            key: "borrowedBooks",
        },
        {
            title: "Action",
            key: "action",
            render: (_, member) => (
                <Space size="middle">
                    <EditMemberForm
                        setMessage={setMessage}
                        memberId={member?.id}
                    />
                    <ACTBtn
                        event={() => deleteMembersAccount(member?.id)}
                        title={"Delete"}
                        type={"del"}
                    />
                </Space>
            ),
        },
    ];

    return (
        <section className="p-3">
            <TableTlt title={"Members List"} />
            <div className="flex items-center justify-between my-3">
                <SearchForm
                    search={search}
                    setSearch={setSearch}
                    onChange={onSearchChange}
                />
                <div className="flex items-center gap-5">
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
                                value: "bbm",
                            },
                        ]}
                    ></Select>
                    <AddNewMemberForm
                        setMessage={setMessage}
                        setApiStatus={setApiStatus}
                    />
                </div>
            </div>
            <div className="mt-3">
                {message ? (
                    <Alert
                        message={message}
                        type={apiStatus ? "success" : "error"}
                        showIcon
                        className="mb-3"
                    />
                ) : (
                    ""
                )}
                <Table
                    columns={columns}
                    dataSource={
                        search?.trim().length > 0 ? searchedMembers : members
                    }
                    loading={isLoading}
                />
            </div>
        </section>
    );
};

export default MembersList;
