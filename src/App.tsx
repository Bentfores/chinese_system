import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import NotProcessedProducts from "./pages/NotProcessedProducts";
import ProcessedProducts from "./pages/ProcessedProducts";
import IgnoredProducts from "./pages/IgnoredProducts";
import BlackList from "./pages/BlackList";
import ProductDetails from "./pages/ProductDetails";
import {Helmet} from "react-helmet-async";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/not_processed" element={<NotProcessedProducts/>}/>
                <Route path="/processed" element={<ProcessedProducts/>}/>
                <Route path="/non_processed" element={<IgnoredProducts/>}/>
                <Route path="/black_list" element={<BlackList/>}/>
                <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
