import React, {useState} from "react";
import SideBar from "../components/SideBar";
import ProductTable from "../components/ProductTable";
import "../css/NotProcessedProducts.css";

function IgnoredProducts() {
    const [selectedCategory, setSelectedCategory] = useState("IGNORED");

    return (
        <div className="app-container">
            <SideBar selectedCategory={selectedCategory}/>
            <ProductTable selectedCategory={selectedCategory}/>
        </div>
    );
}

export default IgnoredProducts;