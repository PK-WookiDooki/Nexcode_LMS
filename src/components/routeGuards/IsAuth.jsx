import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const IsAuth = ({ children }) => {
    const { token } = useSelector((state) => state.authSlice);

    if (token) {
        return children;
    } else {
        return <Navigate to={"/login"} />;
    }
};

export default IsAuth;
