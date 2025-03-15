import React, {FC, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import search from "../images/search.png";
import rope1 from "../images/rope1.png";
import {changeProductsStatus, getProducts} from "../api/ApiProducts";

const mockData: product[] = [
    {image_url: rope1, article: "3270", name: "Веревка с узлом, 25 г/15 см, Trixie (3270)"},
    {image_url: rope1, article: "60971", name: "Миска пластиковая для грызунов, Trixie (60 мл)"},
    {image_url: rope1, article: "P711", name: "Овощи, SmileDecor (шнуровка, P711)"},
    {image_url: rope1, article: "60971", name: "Миска пластиковая для грызунов, Trixie (60 мл)"},
    {image_url: rope1, article: "P711", name: "Овощи, SmileDecor (шнуровка, P711)"}
];

interface ProductTableProps {
    selectedCategory: string;
}

const ProductTable: FC<ProductTableProps> = ({selectedCategory}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
    const [products, setProducts] = useState<product[]>([])
    const itemsPerPage = 4;

    // useEffect(() => {
    //     fetchProducts()
    // }, []);

    const fetchProducts = (): void => {
        getProducts(selectedCategory)
            .then((response) => {
                setProducts(response.data)
            })
            .catch((err: Error) => alert("Ошибка при получении товаров"))
    }

    const sendToUnprocessed = async () => {
        changeProductsStatus(selectedCheckboxes, "processed")
            .then(({status}) => {
                if (status !== 200) {
                    throw new Error("Error! Products not sent to processed")
                }
                fetchProducts()
            })
            .catch(err => alert("Ошибка при отправке данных в обработанные"))
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleCheckboxChange = (id: string) => {
        setSelectedCheckboxes((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id) // Remove if already selected
                : [...prev, id] // Add if not selected
        );
    };

    const totalPages = Math.ceil(mockData.length / itemsPerPage);

    const currentData = mockData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const navigate = useNavigate();
    const handleRowClick = (id: string) => {
        navigate(`/product/${id}`);
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
                    <input type="text" placeholder="Поиск"/>
                </div>
                {selectedCheckboxes.length > 0 && (
                    <button className="action-button" onClick={sendToUnprocessed}>В необрабатываемые</button>
                )}
            </div>
            <div className="container">
                <table className="content-table">
                    <thead>
                    <tr>
                        <th className="column-article">Артикул</th>
                        <th className="column-img">Картинка</th>
                        <th className="column-name">Наименование</th>
                    </tr>
                    </thead>
                    <tbody className="body">
                    {currentData.map((product) => (
                        <tr
                            key={product.article}
                            className="clickable-row"
                            onClick={() => handleRowClick(product.article)}
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
                            <img src={product.image_url} alt="Image" className="column-image"/>
                            <td className="column-name">
                                {product.name}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="product">
                    <div className="product-count">
                        Показано {currentData.length} из {mockData.length} товаров
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
            </div>
        </main>
    );
};

export default ProductTable;
