
import { Login, Register, AdminAddProduct, LoadingApp, HomeUser } from "./pages/index"

import { AwaitLoading, ProctectedRoute, UserProvider } from "./components/index";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export const App = () => {

    return (

        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<LoadingApp />}
                    />

                    <Route
                        path="/awaitloading"
                        element={<AwaitLoading />}
                    />

                    <Route
                        path="/login"
                        element={<Login />}
                    >

                    </Route>

                    <Route
                        path="/register"
                        element={<Register />}
                    />

                    <Route
                        path="/addProduct"
                        element={
                            <ProctectedRoute>
                                <AdminAddProduct />
                            </ProctectedRoute>}
                    />


                    <Route
                        path="/homeUser"
                        element={
                            <ProctectedRoute>
                                <HomeUser />
                            </ProctectedRoute>}
                    />

                </Routes>
            </BrowserRouter>
        </UserProvider>

    )
}

