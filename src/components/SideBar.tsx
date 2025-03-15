import React, {useState} from "react";
import processed from "../images/clipboardTickInactive.png";
import nonProcessing from "../images/folderCrossInactive.png";
import blackList from "../images/blackList.png";
import notProcessedInactive from "../images/notProcessedInactive.png";
import {useNavigate} from "react-router-dom";

interface SidebarProps {
    onCategoryChange: (category: string) => void;
}

const SideBar: React.FC<SidebarProps> = ({ onCategoryChange }) => {
    const [activeItem, setActiveItem] = useState<string>("");
    const navigate = useNavigate();

    const menuItems = [
        { id: "1", label: "Не обработанные", icon: notProcessedInactive, path: "/not_processed" },
        { id: "2", label: "Обработанные", icon: processed, path: "/processed" },
        { id: "3", label: "Не обрабатываемые", icon: nonProcessing, path: "/non_processed" },
        { id: "4", label: "Черный список", icon: blackList, path: "/black_list" },
    ];

    const handleItemClick = (id: string, path: string) => {
        setActiveItem(id); // Set the active item
        navigate(path); // Navigate to the corresponding page
    };

    return (
        <aside className="sidebar">
            <ul className="sidebar-list">
                {menuItems.map((item) => (
                    <li
                        key={item.id}
                        className={`sidebar-item ${activeItem === item.id ? "active" : ""}`}
                        onClick={() => handleItemClick(item.id, item.path)}
                    >
                        <img src={item.icon} alt="Clock Icon" className="sidebar-icon not-processed"/>
                        {item.label}
                    </li>
                ))}
            </ul>
            <div className="pagination-settings">
                <p>Следующая выгрузка: 01.09</p>
                <div className="pagination-options">
                    <button>200</button>
                    <button className="active">300</button>
                    <button>400</button>
                </div>
            </div>
        </aside>
    );
};

export default SideBar;
