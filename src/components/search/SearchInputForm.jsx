import { Input } from "antd";
import { RxCross1 } from "react-icons/rx";

const SearchInputForm = ({ search, onChange, setSearch }) => {
    const clearSearch = () => {
        setSearch("");
    };

    return (
        <div className="relative max-w-[250px] w-full">
            <Input
                value={search}
                onChange={onChange}
                className="px-2 h-10 rounded-md outline-none w-full font-sans text-[16px]"
                placeholder="Search Here . . . "
            />
            <button
                className={` ${
                    search.trim() ? "block" : " hidden"
                } text-xl absolute right-2 top-1/2 transform -translate-y-1/2`}
                onClick={clearSearch}
            >
                {" "}
                <RxCross1 />{" "}
            </button>
        </div>
    );
};

export default SearchInputForm;
