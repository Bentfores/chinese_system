import React, {FC, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import search from "../images/search.png";
import {changeProductsStatus, getProducts} from "../api/ApiManagement";

interface ProductTableProps {
    selectedCategory: string;
}

const ProductTable: FC<ProductTableProps> = ({selectedCategory}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
    const [products, setProducts] = useState<product[]>([])
    const [searchText, setSearchText] = useState("");
    const [firstButton, setFirstButton] = useState("");
    const [secondButton, setSecondButton] = useState("");
    const [firstStatus, setFirstStatus] = useState("");
    const [secondStatus, setSecondStatus] = useState("");
    const itemsPerPage = 10;

    useEffect(() => {
        fetchProducts()
        if (selectedCategory === "IGNORED") {
            setFirstButton("В необработанные");
            setSecondButton("В обработанные");
            setFirstStatus("NOT_PROCESSED")
            setSecondStatus("PROCESSED")
        } else if (selectedCategory === "PROCESSED") {
            setFirstButton("В необработанные");
            setSecondButton("В необрабатываемые");
            setFirstStatus("NOT_PROCESSED")
            setSecondStatus("IGNORED")
        } else {
            setFirstButton("В обработанные");
            setSecondButton("В необрабатываемые");
            setFirstStatus("PROCESSED")
            setSecondStatus("IGNORED")
        }
    }, []);

    const fetchProducts = (): void => {
        getProducts(selectedCategory)
            .then((response) => {
                setProducts(response.data)
            })
            .catch((err: Error) => alert("Ошибка при получении товаров"))
    }

    const changeStatus = async (statusToChange: string) => {
        changeProductsStatus(selectedCheckboxes, statusToChange)
            .then(({status}) => {
                if (status !== 200) {
                    throw new Error("Error! Products not sent to processed")
                }
                fetchProducts()
                setSelectedCheckboxes([]);
            })
            .catch(err => alert("Ошибка при изменении статуса товаров"))
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

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.article.toLowerCase().includes(searchText.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const currentData = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const navigate = useNavigate();
    const handleRowClick = (prod: product) => {
        navigate(`/product/${prod.article}`, {state: {prod}});
    };

    return (
        <main className="main-content">
            <header className="header">
                <h1 className="header-title">Товары</h1>
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
                    <button className="action-button" onClick={() => changeStatus(firstStatus)}>{firstButton}</button>
                )}
                {selectedCheckboxes.length > 0 && (
                    <button className="action-button" onClick={() => changeStatus(secondStatus)}>{secondButton}</button>
                )}
            </div>
            <div className="container">
                <table className="content-table">
                    {currentData.length > 0 && (
                        <thead>
                        <tr>
                            <th className="column-article">Артикул</th>
                            <th className="column-img">Картинка</th>
                            <th className="column-name">Наименование</th>
                        </tr>
                        </thead>
                    )}
                    <tbody className="body">
                    {currentData.length > 0 ? (
                        currentData.map((product) => (
                            <tr
                                key={product.article}
                                className="clickable-row"
                                onClick={() => handleRowClick(product)}
                            >
                                <td className="column-article">
                                    <input
                                        type="checkbox"
                                        onClick={(e) => e.stopPropagation()}
                                        onChange={() => handleCheckboxChange(product.article)}
                                        checked={selectedCheckboxes.includes(product.article)}
                                    />
                                    {product.article}
                                </td>
                                <img src={product.imageUrl} alt="Image" className="column-image"/>
                                <td className="column-name">
                                    {product.name}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={2}
                                style={{
                                    textAlign: "center",
                                    padding: "20px",
                                    color: "#999",
                                    fontWeight: "bold",
                                    textDecoration: "none"
                                }}
                            >
                                Нет товаров
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                {filteredProducts.length > 0 && (
                    <div className="product">
                        <div className="product-count">
                            Показано {currentData.length} из {products.length} товаров
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

export default ProductTable;
