import React, {useState} from "react";
import SideBar from "../components/SideBar";
import ProductTable from "../components/ProductTable";
import "../css/NotProcessedProducts.css";

function NotProcessedProducts() {
    const [selectedCategory] = useState("NOT_PROCESSED");

    return (
        <div className="app-container">
            <SideBar selectedCategory={selectedCategory}/>
            <ProductTable selectedCategory={selectedCategory}/>
        </div>
    );
}

export default NotProcessedProducts;