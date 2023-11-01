import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { HomePage, PNFPage } from "./pages";
import {
    AccountLogin,
    AdminSettings,
    AllIssuedBooks,
    Books,
    CopiedBooksByOrgBookId,
    Members,
    ResetPassword,
} from "./features";
import { IsAuthenticated, IsNotAuthenticated } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { ConfigProvider, message } from "antd";
import { useEffect } from "react";
import { setMessage } from "./core/global/context/notiSlice";

const App = () => {
    const { message: apiMessage } = useSelector((state) => state.notiSlice);
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch();

    useEffect(() => {
        if (apiMessage.msgType && apiMessage.msgContent) {
            messageApi.open({
                type: apiMessage.msgType,
                content: apiMessage.msgContent,
                duration: 5,
            });
            dispatch(setMessage({ msgType: null, msgContent: null }));
        }
    }, [apiMessage]);

    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        controlHeight: 40,
                        controlHeightSM: 30,
                    },
                    Input: {
                        controlHeight: 40,
                        fontFamily: "Inter",
                        fontSize: 14,
                        colorBorder: "#BFBFBF",
                    },
                    InputNumber: {
                        fontFamily: "Inter",
                        fontSize: 14,
                    },
                    Select: {
                        fontFamily: "Inter",
                    },
                },
            }}
        >
            <BrowserRouter>
                {contextHolder}
                <Routes>
                    <Route
                        path="/"
                        element={
                            // <IsAuthenticated>
                            <MainLayout />
                            // </IsAuthenticated>
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

                        {/* issued books*/}
                        <Route path="issuedBooks">
                            <Route index element={<AllIssuedBooks />} />
                        </Route>


                        {/* members */}
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
                    />
                    <Route
                        path="/resetPassword"
                        element={
                            <IsNotAuthenticated>
                                <ResetPassword />
                            </IsNotAuthenticated>
                        }
                    />
                    <Route path="*" element={<PNFPage />} />
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    );
};

export default App;
