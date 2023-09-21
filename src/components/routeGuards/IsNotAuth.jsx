import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const IsAuth = ({ children }) => {
    const { token } = useSelector((state) => state.authSlice);

    if (token) {
        return <Navigate to={"/"} />;
    } else {
        return children;
    }
};

export default IsAuth;
