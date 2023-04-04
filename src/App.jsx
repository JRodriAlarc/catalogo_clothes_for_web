
import { Login, Register, AdminAddProduct, LoadingApp, HomeUserCloths, HomeUserAcount } from "./pages/"

import { AwaitLoading, ProctectedRoute, UserProvider } from "./components/index";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Products, Acount, Favorites } from "./pages/pages/index";
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
                        path={`/homeCloths`}
                        element={
                            <ProctectedRoute>

                                <HomeUserCloths />

                            </ProctectedRoute>
                        }
                    />

                    <Route
                        path={`/homeAcount`}
                        element={
                            <ProctectedRoute>

                                <HomeUserAcount />

                            </ProctectedRoute>
                        }
                    />





                </Routes>
            </BrowserRouter>
        </UserProvider>

    )
}

