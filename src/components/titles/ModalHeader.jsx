import { RxCross1 } from "react-icons/rx";
import FormTitle from "./FormTitle";

const ModalHeader = ({ title, event }) => {
    return (
        <div className="flex items-center justify-between p-6 bg-lightBlue">
            <FormTitle isCenter={false} title={title} />
            <button
                className="text-2xl text-black/50"
                type="button"
                onClick={event}
            >
                {" "}
                <RxCross1 />{" "}
            </button>
        </div>
    );
};

export default ModalHeader;
