import { Link } from "react-router-dom";

const DashboardCard = ({ title, count, path, event }) => {
    return (
        <Link
            to={path}
            onClick={event}
            className="p-3 rounded-md bg-lightBlue font-medium shadow-md shadow-[#C5CFE9] w-full hover:shadow-md duration-200 "
        >
            <p> {title} </p>
            <h2 className="text-center text-[40px] my-4">
                {" "}
                {count > 0 ? count : 0}{" "}
            </h2>
        </Link>
    );
};

export default DashboardCard;
