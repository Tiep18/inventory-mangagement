import HomePage from "../pages/HomePage/HomePage";
import ReceiptPage from "../pages/ReceiptPage/ReceiptPage";

export const routes = [
    {
        path: "/",
        exact: true,
        element: <HomePage />,
    },
    {
        path: "/receipts",
        exact: true,
        element: <ReceiptPage />,
    },
];
