import {MdOutlineLocalLibrary} from "react-icons/md";

const QuoteText = () => {
    return (
        <div className="mb-6 text-[#1890FF] ">
            <h2 className="text-3xl flex items-center gap-2 justify-center mb-4">
                {" "}
                <MdOutlineLocalLibrary className="text-[42px]" />{" "}
                LIBRARY
            </h2>
            <p className="text-center text-sm">
                The library is your gateway to a universe of ideas
                and inspiration.
            </p>
        </div>
    );
};

export default QuoteText;
