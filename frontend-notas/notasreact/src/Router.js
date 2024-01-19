import React from "react";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import New from "./components/New";
import Articles from "./components/Articles";

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            {/* Utiliza <Routes> para envolver las rutas */}
            <Routes>
                <Route path="/" element={<New/>} />
                <Route path="/articles" element={<Articles/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
