import React, {FC} from "react";
import rope1 from "../images/rope1.png";
import refresh from "../images/refresh.png";
import star from "../images/star.png";
import teacher from "../images/teacher.png";
import yuan from "../images/yuan.png";
import external from "../images/external.png";
import badSupplier from "../images/badSupplier.png";
import wrongSearch from "../images/wrongSearch.png";
import contact from "../images/contact.png";
import goodSearch from "../images/goodSearch.png";

interface ProductTableProps {
    selectedCategory: string;
}

const ProductDetails: FC<ProductTableProps> = () => {

    interface Data {
        image: string;
        rating: number;
        years: number;
        price: string;
        minOrder: string;
    }

    const cooperationData: Data[] = [
        {
            image: rope1, // Replace with actual image path
            rating: 4.9,
            years: 11,
            price: "3.86",
            minOrder: "100 шт",
        },
    ];

    const alibabaSuppliers: Data[] = [
        {
            image: rope1, // Replace with actual image path
            rating: 4.9,
            years: 10,
            price: "0.30",
            minOrder: "500 шт",
        },
        {
            image: rope1,
            rating: 4.8,
            years: 8,
            price: "0.35",
            minOrder: "200 шт",
        },
        {
            image: rope1,
            rating: 4.9,
            years: 7,
            price: "1.50",
            minOrder: "50 шт",
        },
    ];

    const incorrectSuppliers: Data[] = [
        {
            image: rope1,
            rating: 4.9,
            years: 5,
            price: "3.86",
            minOrder: "100 шт",
        },
    ];

    const renderSupplierRow = (data: Data) => (
        <tr className="supplier-row">
            <td>
                <img src={data.image} alt="Product" className="supplier-image"/>
            </td>
            <td>
                <div className="row-container" style={{width: '180px', verticalAlign: 'center'}}>
                    <img src={star} alt="Product" style={{width: '24px', height: '24px'}}/>
                    <span style={{fontWeight: 'bold', marginTop: '3px'}}>{data.rating}</span>
                </div>
            </td>
            <td>
                <div className="row-container" style={{width: '180px'}}>
                    <img src={teacher} alt="Product" className="star-row" style={{width: '50px', height: '50px'}}/>
                    <div className="text">
                        <span style={{fontWeight: 'bold', fontSize: "20px", color: '#303972'}}>{data.years} лет</span>
                        <br/>
                        <span style={{fontSize: "15px", color: '#999999'}}>Период продаж</span>
                    </div>
                </div>
            </td>
            <td>
                <div className="row-container" style={{width: '180px'}}>
                    <img src={yuan} alt="Product" className="star-row" style={{width: '50px', height: '50px'}}/>
                    <div className="text">
                        <span style={{fontWeight: 'bold', fontSize: "20px", color: '#303972'}}>{data.price}</span>
                        <br/>
                        <span style={{fontSize: "15px", color: '#999999'}}>≥ {data.minOrder}</span>
                    </div>
                </div>
            </td>
            <td>
                <img src={external} alt="Product" className="external-link" style={{width: '50px', height: '50px'}}/>
            </td>
            <td>
                <div className="row-container" style={{width: '180px'}}>
                    <div className="icon-row">
                        <img alt="Product" className="external-link"
                             style={{width: '45px', height: '45px', visibility: 'hidden'}}/>
                        <img src={badSupplier} alt="Product" className="external-link"
                             style={{width: '45px', height: '45px'}}/>
                        <img alt="Product" className="external-link"
                             style={{width: '45px', height: '45px', visibility: 'hidden'}}/>
                    </div>
                </div>
            </td>
        </tr>
    );

    const renderPendingSupplierRow = (data: Data) => (
        <tr className="supplier-row">
            <td>
                <img src={data.image} alt="Product" className="supplier-image"/>
            </td>
            <td>
                <div className="row-container" style={{width: '180px', verticalAlign: 'center'}}>
                    <img src={star} alt="Product" style={{width: '24px', height: '24px'}}/>
                    <span style={{fontWeight: 'bold', marginTop: '3px'}}>{data.rating}</span>
                </div>
            </td>
            <td>
                <div className="row-container" style={{maxWidth: '180px', marginRight: '0'}}>
                    <img src={teacher} alt="Product" className="star-row" style={{width: '50px', height: '50px'}}/>
                    <div className="text">
                        <span style={{fontWeight: 'bold', fontSize: "20px", color: '#303972'}}>{data.years} лет</span>
                        <br/>
                        <span style={{fontSize: "15px", color: '#999999'}}>Период продаж</span>
                    </div>
                </div>
            </td>
            <td>
                <div className="row-container" style={{width: '180px'}}>
                    <img src={yuan} alt="Product" className="star-row" style={{width: '50px', height: '50px'}}/>
                    <div className="text">
                        <span style={{fontWeight: 'bold', fontSize: "20px", color: '#303972'}}>{data.price}</span>
                        <br/>
                        <span style={{fontSize: "15px", color: '#999999'}}>≥ {data.minOrder}</span>
                    </div>
                </div>
            </td>
            <td>
                <img src={external} alt="Product" className="external-link" style={{width: '45px', height: '45px'}}/>
            </td>
            <td>
                <div className="row-container" style={{width: '180px'}}>
                    <div className="icon-row">
                        <img src={badSupplier} alt="Product" className="external-link"
                             style={{width: '45px', height: '45px'}}/>
                        <img src={wrongSearch} alt="Product" className="external-link"
                             style={{width: '45px', height: '45px'}}/>
                        <img src={contact} alt="Product" className="external-link"
                             style={{width: '45px', height: '45px'}}/>
                    </div>
                </div>
            </td>
        </tr>
    );

    const renderWrongSupplierRow = (data: Data) => (
        <tr className="supplier-row">
            <td>
                <img src={data.image} alt="Product" className="supplier-image"/>
            </td>
            <td>
                <div className="row-container" style={{width: '180px', verticalAlign: 'center'}}>
                    <img src={star} alt="Product" style={{width: '24px', height: '24px'}}/>
                    <span style={{fontWeight: 'bold', marginTop: '3px'}}>{data.rating}</span>
                </div>
            </td>
            <td>
                <div className="row-container" style={{maxWidth: '180px', marginRight: '0'}}>
                    <img src={teacher} alt="Product" className="star-row" style={{width: '50px', height: '50px'}}/>
                    <div className="text">
                        <span style={{fontWeight: 'bold', fontSize: "20px", color: '#303972'}}>{data.years} лет</span>
                        <br/>
                        <span style={{fontSize: "15px", color: '#999999'}}>Период продаж</span>
                    </div>
                </div>
            </td>
            <td>
                <div className="row-container" style={{width: '180px'}}>
                    <img src={yuan} alt="Product" className="star-row" style={{width: '50px', height: '50px'}}/>
                    <div className="text">
                        <span style={{fontWeight: 'bold', fontSize: "20px", color: '#303972'}}>{data.price}</span>
                        <br/>
                        <span style={{fontSize: "15px", color: '#999999'}}>≥ {data.minOrder}</span>
                    </div>
                </div>
            </td>
            <td>
                <img src={external} alt="Product" className="external-link" style={{width: '45px', height: '45px'}}/>
            </td>
            <td>
                <div className="row-container" style={{width: '180px'}}>
                    <div className="icon-row">
                        <th></th>
                        <img src={badSupplier} alt="Product" className="external-link"
                             style={{width: '45px', height: '45px'}}/>
                        <img src={goodSearch} alt="Product" className="external-link"
                             style={{width: '45px', height: '45px'}}/>
                    </div>
                </div>
            </td>
        </tr>
    );

    const fetchProductInfo = (): void => {
        getProductInfo(selectedCategory)
            .then((response) => {
                setProducts(response.data)
            })
            .catch((err: Error) => alert("Ошибка при получении товаров"))
    }

    return (
        <div className="product-details-page">
            <button className="back-button">← Товары</button>
            <div className="product-header">
                <div className="product-main-details">
                    <div className="product-info">
                        <span className="product-id">3270</span>
                        <h1 className="product-title">Веревка с узлом, 25 г/15 см, Trixie (3270)</h1>
                    </div>
                    <img src={rope1} alt="Product" className="main-product-image"/>
                </div>
            </div>
            <div className="product">
                <div className="product-count">
                    Показывать по
                </div>
                <div className="pagination">
                    <button
                        //onClick={() => handlePageChange(1)}
                        //className={currentPage === 1 ? "active" : ""}
                    >
                        10
                    </button>
                    <button
                        //onClick={() => handlePageChange(2)}
                        //className={currentPage === 2 ? "active" : ""}
                    >
                        20
                    </button>
                    <button
                        //onClick={() => handlePageChange(3)}
                        //className={currentPage === 3 ? "active" : ""}
                    >
                        30
                    </button>
                    <img src={refresh} alt="refresh" className="refresh"/>
                </div>
            </div>
            <h2>Сотрудничество с</h2>
            <table className="content-table">
                <thead>
                <tr>
                    <th className="column-article">Картинка</th>
                    <th></th>
                    <th></th>
                    <th className="column-img">Стоимость</th>
                    <th className="column-link">Ссылка</th>
                    <th></th>
                </tr>
                </thead>
                <tbody className="body">
                {cooperationData.map(renderSupplierRow)}
                </tbody>
            </table>

            <h2>Поставщики на <b>Alibaba</b></h2>
            <table className="content-table">
                <thead>
                <tr>
                    <th className="column-article">Картинка</th>
                    <th></th>
                    <th></th>
                    <th className="column-img">Стоимость</th>
                    <th className="column-link">Ссылка</th>
                    <th></th>
                </tr>
                </thead>
                <tbody className="body">
                {alibabaSuppliers.map(renderPendingSupplierRow)}
                </tbody>
            </table>

            <h2>Ошибочные поставщики</h2>
            <table className="content-table">
                <thead>
                <tr>
                    <th className="column-article">Картинка</th>
                    <th></th>
                    <th></th>
                    <th className="column-img">Стоимость</th>
                    <th className="column-link">Ссылка</th>
                    <th></th>
                </tr>
                </thead>
                <tbody className="body">
                {incorrectSuppliers.map(renderWrongSupplierRow)}
                </tbody>
            </table>
        </div>
    );
};

export default ProductDetails;
