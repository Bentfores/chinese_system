import React, {useEffect, useState} from "react";
import search from "../images/search.png";
import "../css/ProductDetails.css";
import {changeSuppliersStatus, getSuppliers} from "../api/ApiManagement";

const SupplierTable: React.FC<{ selectedCategory: string }> = ({selectedCategory}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
    const [suppliers, setSuppliers] = useState<blackListSupplier[]>([])
    const [searchText, setSearchText] = useState("");
    const itemsPerPage = 10;

    useEffect(() => {
        fetchBlackSuppliers()
    }, []);

    const fetchBlackSuppliers = (): void => {
        getSuppliers(["BLACKLISTED"])
            .then((response) => {
                setSuppliers(response.data)
            })
            .catch((err: Error) => alert(err))
    }

    const sendToNotCooperating = async () => {
        changeSuppliersStatus(selectedCheckboxes, "NOT_COOPERATING", null, null)
            .then(({status}) => {
                if (status !== 200) {
                    throw new Error("Error! Suppliers not sent to NOT_COOPERATING")
                }
                fetchBlackSuppliers()
            })
            .catch(err => alert(err))
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleCheckboxChange = (id: string) => {
        setSelectedCheckboxes((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const filteredSuppliers = suppliers.filter((supplier) =>
        supplier.name.toLowerCase().includes(searchText.toLowerCase()) ||
        supplier.comment.toLowerCase().includes(searchText.toLowerCase())
    );

    const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);

    const currentData = filteredSuppliers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <main className="main-content">
            <header className="header">
                <h1 className="header-title">Поставщики</h1>
                <div className="header-user">
                    <span className="user-name">Irina G</span>
                </div>
            </header>
            <div className="search-button">
                <div className="search-bar">
                    <img src={search} alt="Clock Icon" className="sidebar-icon not-processed"/>
                    <input
                        type="text"
                        placeholder="Поиск"
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>
                {selectedCheckboxes.length > 0 && (
                    <button className="action-button" onClick={sendToNotCooperating}>Восстановить</button>
                )}
            </div>
            <div className="container">
                <table className="content-table">
                    {currentData.length > 0 && (
                        <thead>
                        <tr>
                            <th className="column-supplier-name">Наименование</th>
                            <th className="column-supplier-comment">Комментарий</th>
                        </tr>
                        </thead>
                    )}
                    <tbody>
                    {currentData.length > 0 ? (
                        currentData.map((supplier) => (
                            <tr key={supplier.supplierId}>
                                <td className="column-supplier-name">
                                    <input
                                        type="checkbox"
                                        onChange={() => handleCheckboxChange(supplier.supplierId)}
                                        checked={selectedCheckboxes.includes(supplier.supplierId)}
                                    />
                                    {supplier.name}
                                </td>
                                <td className="column-supplier-comment">{supplier.comment}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={2} style={{textAlign: "center", padding: "20px", color: "#999"}}>
                                Нет поставщиков
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                {filteredSuppliers.length > 0 && (
                    <div className="product">
                        <div className="product-count">
                            Показано {currentData.length} из {suppliers.length} поставщиков
                        </div>
                        <div className="pagination">
                            {Array.from({length: totalPages}, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={currentPage === index + 1 ? "active" : ""}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default SupplierTable;
