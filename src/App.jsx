import { Route, Routes } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}></Route>
        </Routes>
    );
};

export default App;
