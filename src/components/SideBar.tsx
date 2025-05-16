import React, {FC, useEffect, useState} from "react";
import processed from "../images/clipboardTickInactive.png";
import processedActive from "../images/clipboardTickActive.png";
import nonProcessing from "../images/folderCrossInactive.png";
import nonProcessingActive from "../images/folderCrossActive.png";
import blackList from "../images/blackList.png";
import blackListActive from "../images/blackListActive.png";
import notProcessedInactive from "../images/notProcessedInactive.png";
import notProcessedActive from "../images/notProcessedActive.png"
import {useNavigate} from "react-router-dom";
import {postChangeProductsNumber} from "../api/ApiExternal";

interface ProductTableProps {
    selectedCategory: string;
}

const SideBar: FC<ProductTableProps> = ({ selectedCategory }) => {
    const [activeItem, setActiveItem] = useState<string>("");
    const navigate = useNavigate();
    const defaultValue = localStorage.getItem("itemsPerPage") || "300";
    const [selectedValue, setSelectedValue] = useState(defaultValue);

    const menuItems = [
        {
            id: "1",
            label: "Не обработанные",
            path: "/not_processed",
            icon: {
                active: notProcessedActive,
                inactive: notProcessedInactive,
            },
        },
        {
            id: "2",
            label: "Обработанные",
            path: "/processed",
            icon: {
                active: processedActive,
                inactive: processed,
            },
        },
        {
            id: "3",
            label: "Не обрабатываемые",
            path: "/non_processed",
            icon: {
                active: nonProcessingActive,
                inactive: nonProcessing,
            },
        },
        {
            id: "4",
            label: "Черный список",
            path: "/black_list",
            icon: {
                active: blackListActive,
                inactive: blackList,
            },
        }
    ];

    const getNextQuarterStartDate = (): string => {
        const today = new Date();
        const currentMonth = today.getMonth();

        const nextQuarterMonth = Math.floor(currentMonth / 3 + 1) * 3;
        const startMonth = nextQuarterMonth % 12;

        const month = (startMonth + 1).toString().padStart(2, "0");
        return `01.${month}`;
    };

    const changeProductsNumber = async (number: string) => {
        postChangeProductsNumber(number)
            .then(({status}) => {
                if (status !== 200) {
                    throw new Error("Error! Can't change products number");
                }
                setSelectedValue(number)
                localStorage.setItem("itemsPerPage", number);
            })
            .catch(err => alert(err))
    };

    useEffect(() => {
        if (selectedCategory === "IGNORED") {
            setActiveItem("3");
        } else if (selectedCategory === "PROCESSED") {
            setActiveItem("2");
        } else if (selectedCategory === "NOT_PROCESSED") {
            setActiveItem("1");
        } else {
            setActiveItem("4");
        }
    }, [selectedCategory]);

    const handleItemClick = (id: string, path: string) => {
        setActiveItem(id);
        navigate(path);
    };

    return (
        <aside className="sidebar">
            <ul className="sidebar-list">
                {menuItems.map((item) => (
                    <li
                        key={item.id}
                        className={`sidebar-item ${activeItem === item.id ? "active" : "not-processed"}`}
                        onClick={() => handleItemClick(item.id, item.path)}
                    >
                        <img
                            src={activeItem === item.id ? item.icon.active : item.icon.inactive}
                            alt="icon"
                            className="sidebar-icon"
                        />
                        {item.label}
                    </li>
                ))}
            </ul>
            <div className="pagination-settings">
                <p>Следующая выгрузка: {getNextQuarterStartDate()}</p>
                <div className="pagination-options">
                    {["200", "300", "400"].map((value) => (
                        <button
                            key={value}
                            className={selectedValue === value ? "active" : ""}
                            onClick={() => changeProductsNumber(value)}
                        >
                            {value}
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default SideBar;
