import React, {useState} from "react";
import SideBar from "../components/SideBar";
import ProductTable from "../components/ProductTable";
import "../css/NotProcessedProducts.css";

function ProcessedProducts() {
    const [selectedCategory, setSelectedCategory] = useState("processed");

    return (
        <div className="app-container">
            <SideBar onCategoryChange={setSelectedCategory}/>
            <ProductTable selectedCategory={selectedCategory}/>
        </div>
    );
}

export default ProcessedProducts;