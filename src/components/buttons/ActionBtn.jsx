const ActionBtn = ({ event, title, type }) => {
    return (
        <button
            onClick={event}
            className={` px-3 py-1 rounded-md text-white duration-200 ${
                type === "edit"
                    ? "bg-blue-600 hover:bg-blue-500"
                    : type === "del"
                    ? "bg-red-600 hover:bg-red-500"
                    : "bg-slate-900 hover:bg-slate-800"
            } `}
        >
            {" "}
            {title}{" "}
        </button>
    );
};

export default ActionBtn;
