import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import NotProcessedProducts from "./pages/NotProcessedProducts";
import ProcessedProducts from "./pages/ProcessedProducts";
import NonProcessedProducts from "./pages/NonProcessedProducts";
import BlackList from "./pages/BlackList";
import ProductDetails from "./pages/ProductDetails";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />

                {/* Защищенные маршруты */}
                <Route element={<PrivateRoute />}>
                    <Route path="/not_processed" element={<NotProcessedProducts />} />
                    <Route path="/processed" element={<ProcessedProducts />} />
                    <Route path="/non_processed" element={<NonProcessedProducts />} />
                    <Route path="/black_list" element={<BlackList />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
