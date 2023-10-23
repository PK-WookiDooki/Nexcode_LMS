import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <section
            className={`min-h-screen w-full flex items-center justify-center bg-[url("src/assets/imgs/img_noData.svg")] bg-local bg-no-repeat bg-center`}
        >
            <div className="flex flex-col gap-8 items-center p-5 bg-white/10 rounded backdrop-blur-sm ">
                <h2 className="text-7xl font-bold "> Oops! </h2>
                <p className=" uppercase text-3xl font-semibold">
                    {" "}
                    404 page not found!{" "}
                </p>
                <p className="text-lg font-medium">
                    {" "}
                    The page you were looking is not found!{" "}
                </p>
                <Link
                    to={"/"}
                    className=" py-2 px-5 rounded-md bg-primary hover:bg-primary/80 duration-200 text-white "
                >
                    {" "}
                    Go to Home{" "}
                </Link>
            </div>
        </section>
    );
};

export default PageNotFound;
