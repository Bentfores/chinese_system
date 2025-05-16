import React, {useState} from "react";
import SideBar from "../components/SideBar";
import ProductTable from "../components/ProductTable";
import "../css/NotProcessedProducts.css";

function ProcessedProducts() {
    const [selectedCategory, setSelectedCategory] = useState("PROCESSED");

    return (
        <div className="app-container">
            <SideBar selectedCategory={selectedCategory}/>
            <ProductTable selectedCategory={selectedCategory}/>
        </div>
    );
}

export default ProcessedProducts;