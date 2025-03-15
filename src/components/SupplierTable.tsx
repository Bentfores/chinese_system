import React, {useState} from "react";
import search from "../images/search.png";
import "../css/ProductDetails.css";

interface Supplier {
    id: number;
    name: string;
    comment: string;
}

const mockData: Supplier[] = [
    { id: 1, name: "Huai'an One Pet Products Co., Ltd.", comment: "Поставщик не отправил товар в течение 2 месяцев" },
    { id: 2, name: "Henan Kangdar Pet Products Co., Ltd.", comment: "Перестал отвечать на сообщения" },
    { id: 3, name: "Yiwu Sanan Pet Products Co., Ltd.", comment: "Очень очень очень очень очень очень длинный текст длинный текст длинный текст" },
    { id: 4, name: "Guangzhou Aodu Trading Co., Ltd.", comment: "Комментарий" },
    { id: 5, name: "Shanghai Meow Pet Supplies Co., Ltd.", comment: "Отправка задержана из-за отсутствия документов" },
    { id: 6, name: "Chengdu Pets Paradise Co., Ltd.", comment: "Перестал отвечать после первого заказа" },
    { id: 7, name: "Zhejiang Happy Pets Co., Ltd.", comment: "Отправил поврежденный товар" },
    { id: 8, name: "Fujian Comfort Pet Products Co., Ltd.", comment: "Длительное время ответа на запросы" },
    { id: 9, name: "Shenzhen Pet World Trading Co., Ltd.", comment: "Успешное сотрудничество, но высокие цены" },
    { id: 10, name: "Guangdong Furry Friends Supplies Co., Ltd.", comment: "Хорошая упаковка, но длительная доставка" }
];

const SupplierTable: React.FC<{ selectedCategory: string }> = ({selectedCategory}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState<number[]>([]);
    const itemsPerPage = 10;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleCheckboxChange = (id: number) => {
        setSelectedCheckboxes((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id) // Remove if already selected
                : [...prev, id] // Add if not selected
        );
    };

    const currentData = mockData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

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
                    <button className="action-button">Восстановить</button>
                )}
            </div>
            <div className="container">
                <table className="content-table">
                    <thead>
                    <tr>
                        <th className="column-supplier-name">Наименование</th>
                        <th className="column-supplier-comment">Комментарий</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentData.map((product) => (
                        <tr key={product.id}>
                            <td className="column-supplier-name">
                                <input
                                    type="checkbox"
                                    onChange={() => handleCheckboxChange(product.id)}
                                    checked={selectedCheckboxes.includes(product.id)}
                                />
                                {product.name}
                            </td>
                            <td className="column-supplier-comment">{product.name}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="product">
                    <div className="product-count">
                        Показано {currentData.length} из {mockData.length} товаров
                    </div>
                    <div className="pagination">
                        <button
                            onClick={() => handlePageChange(1)}
                            className={currentPage === 1 ? "active" : ""}
                        >
                            1
                        </button>
                        <button
                            onClick={() => handlePageChange(2)}
                            className={currentPage === 2 ? "active" : ""}
                        >
                            2
                        </button>
                        <button
                            onClick={() => handlePageChange(3)}
                            className={currentPage === 3 ? "active" : ""}
                        >
                            3
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default SupplierTable;
