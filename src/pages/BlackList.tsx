import React, {useState} from "react";
import SideBar from "../components/SideBar";
import SupplierTable from "../components/SupplierTable";

function BlackList() {
    const [selectedCategory, setSelectedCategory] = useState("Черный список");

    return (
        <div className="app-container">
            <SideBar selectedCategory={selectedCategory}/>
            <SupplierTable selectedCategory={selectedCategory}/>
        </div>
    );
}

export default BlackList;