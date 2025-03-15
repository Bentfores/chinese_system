import React, {useState} from "react";
import SideBar from "../components/SideBar";
import ProductTable from "../components/ProductTable";
import "../css/NotProcessedProducts.css";

function NotProcessedProducts() {
    const [selectedCategory, setSelectedCategory] = useState("unprocessed");

    return (
        <div className="app-container">
            <SideBar onCategoryChange={setSelectedCategory}/>
            <ProductTable selectedCategory={selectedCategory}/>
        </div>
    );
}

export default NotProcessedProducts;