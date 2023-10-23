import { Link } from "react-router-dom";

const DashboardCard = ({ title, count, path }) => {
    return (
        <Link
            to={path}
            className="p-3 rounded-md bg-lightBlue font-medium shadow w-full hover:shadow-md duration-200 "
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
