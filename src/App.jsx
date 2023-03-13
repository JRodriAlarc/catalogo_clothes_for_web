
import { Login, Register, AdminAddProduct } from "./pages/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";


export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/addProduct"
                    element={<AdminAddProduct />}
                />
            </Routes>
        </BrowserRouter>
    )
}
