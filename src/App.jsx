import { Route, Routes } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { HomePage } from "./pages";
import {
    AccountLogin,
    AdminSettings,
    AllIssuedBooks,
    Books,
    CopiedBooksByOrgBookId,
    Members,
} from "./features";
import { IsAuthenticated, IsNotAuthenticated } from "./components";

const App = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <IsAuthenticated>
                        <MainLayout />
                    </IsAuthenticated>
                }
            >
                <Route index element={<HomePage />} />

                <Route path="settings" element={<AdminSettings />} />

                {/* original books */}
                <Route path="books">
                    <Route index element={<Books />} />
                    <Route
                        path=":bookId"
                        element={<CopiedBooksByOrgBookId />}
                    />
                </Route>

                <Route path="issued_books">
                    <Route index element={<AllIssuedBooks />} />
                </Route>

                {/* original members */}
                <Route path="members">
                    <Route index element={<Members />} />
                </Route>
            </Route>
            <Route
                path="/login"
                element={
                    <IsNotAuthenticated>
                        <AccountLogin />
                    </IsNotAuthenticated>
                }
            ></Route>
        </Routes>
    );
};

export default App;
