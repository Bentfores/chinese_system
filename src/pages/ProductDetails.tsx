import React, {FC, useEffect, useState} from "react";
import refresh from "../images/refresh.png";
import handshake from "../images/handshake.png"
import star from "../images/star.png";
import teacher from "../images/teacher.png";
import yuan from "../images/yuan.png";
import external from "../images/external.png";
import badSupplier from "../images/badSupplier.png";
import wrongSearch from "../images/wrongSearch.png";
import contact from "../images/contact.png";
import goodSearch from "../images/goodSearch.png";
import {getSuppliersInfo, postSearchSuppliers, postSendMessage} from "../api/ApiAnalysis";
import {useLocation, useNavigate} from "react-router-dom";
import {changeSuppliersStatus} from "../api/ApiManagement";

const ProductDetails: FC = () => {
    const location = useLocation();
    const prod = location.state?.prod as product;
    const [cooperationData, setCooperationData] = useState<supplier[]>([]);
    const [alibabaSuppliers, setAlibabaSuppliers] = useState<supplier[]>([]);
    const [incorrectSuppliers, setIncorrectSuppliers] = useState<supplier[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(null);
    const [commentText, setCommentText] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchProductInfo()
    }, []);

    const fetchProductInfo = (): void => {
        getSuppliersInfo(prod.article)
            .then((response) => {
                categorizeSuppliers(response.data)
            })
            .catch((err: Error) => alert(err))
    }

    const categorizeSuppliers = (data: supplier[]) => {
        const cooperating: supplier[] = [];
        const notCooperating: supplier[] = [];
        const incorrect: supplier[] = [];

        data.forEach((item) => {
            switch (item.status) {
                case "COOPERATING":
                    cooperating.push(item);
                    break;
                case "NOT_COOPERATING":
                    notCooperating.push(item);
                    break;
                case "MESSAGE_SENT":
                    notCooperating.push(item);
                    break;
                case "WRONG":
                    incorrect.push(item);
                    break;
            }
        });

        setCooperationData(cooperating);
        setAlibabaSuppliers(notCooperating);
        setIncorrectSuppliers(incorrect);
    };

    const handleRefresh = async () => {
        postSearchSuppliers(prod.article)
            .then(({status}) => {
                if (status !== 200) {
                    throw new Error("Error! Suppliers not refreshed")
                }
                fetchProductInfo()
            })
            .catch(err => alert(err))
    };

    const changeStatus = async (supplierId: string, status: string, comment: string) => {
        changeSuppliersStatus([supplierId], status, prod.article, comment)
            .then(({status}) => {
                if (status !== 204) {
                    if (status !== 200)
                        throw new Error(`Error! Suppliers not sent to ${status}`)
                }
                fetchProductInfo()
            })
            .catch(err => alert(err))
    };

    const sendMessage = async (productUrl: string, supplierId: string) => {
        postSendMessage(productUrl, supplierId, prod.article)
            .then(({status}) => {
                if (status !== 204) {
                    throw new Error("Error! Message not sent")
                }
                fetchProductInfo()
            })
            .catch(err => alert(err))
    }

    const getYearLabel = (years: number): string => {
        const lastDigit = years % 10;
        const lastTwoDigits = years % 100;

        if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
            return "лет";
        }
        if (lastDigit === 1) {
            return "год";
        }
        if (lastDigit >= 2 && lastDigit <= 4) {
            return "года";
        }
        return "лет";
    };

    const renderSupplierRow = (data: supplier) => (
        <tr className={`supplier-row ${data.status === "MESSAGE_SENT" ? "message-sent-row" : ""}`}>
            <td>
                <img src={data.supplierImageUrl} alt="Product" className="supplier-image"/>
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
                        <span style={{
                            fontWeight: 'bold',
                            fontSize: "20px",
                            color: '#303972'
                        }}>{data.years} {getYearLabel(data.years)}</span>
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
                <a href={data.supplierProductUrl} target="_blank" rel="noopener noreferrer">
                    <img src={external} alt="Product" className="external-link"
                         style={{width: '45px', height: '45px'}}/>
                </a>
            </td>
            <td>
                <div className="row-container" style={{width: '180px'}}>
                    <div className="icon-row">
                        <img alt="Product" className="external-link"
                             style={{width: '45px', height: '45px', visibility: 'hidden'}}/>
                        <img
                            src={badSupplier}
                            alt="Mark as Wrong"
                            className="external-link"
                            style={{width: '45px', height: '45px', cursor: 'pointer'}}
                            onClick={() => {
                                setSelectedSupplierId(data.supplierId);
                                setIsModalOpen(true);
                            }}
                        />
                        <img alt="Product" className="external-link"
                             style={{width: '45px', height: '45px', visibility: 'hidden'}}/>
                    </div>
                </div>
            </td>
        </tr>
    );

    const renderPendingSupplierRow = (data: supplier) => (
        <tr className={`supplier-row ${data.status === "MESSAGE_SENT" ? "message-sent-row" : ""}`}>
            <td>
                <img src={data.supplierImageUrl} alt="Product" className="supplier-image"/>
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
                        <span style={{
                            fontWeight: 'bold',
                            fontSize: "20px",
                            color: '#303972'
                        }}>{data.years} {getYearLabel(data.years)}</span>
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
                <a href={data.supplierProductUrl} target="_blank" rel="noopener noreferrer">
                    <img src={external} alt="Product" className="external-link"
                         style={{width: '45px', height: '45px'}}/>
                </a>
            </td>
            <td>
                <div className="row-container" style={{width: '180px'}}>
                    <div className="icon-row">
                        <img
                            src={badSupplier}
                            alt="Mark as Wrong"
                            className="external-link"
                            style={{width: '45px', height: '45px', cursor: 'pointer'}}
                            onClick={() => {
                                setSelectedSupplierId(data.supplierId);
                                setIsModalOpen(true);
                            }}

                        />
                        <img
                            src={wrongSearch}
                            alt="Mark as Wrong"
                            className="external-link"
                            style={{width: '45px', height: '45px', cursor: 'pointer'}}
                            onClick={() => changeStatus(data.supplierId, "WRONG", commentText)}
                        />
                        {data.status === "MESSAGE_SENT" ? (
                            <img
                                src={handshake}
                                alt="Message sent"
                                className="external-link"
                                style={{width: '45px', height: '45px', cursor: 'pointer'}}
                                onClick={() => changeStatus(data.supplierId, "COOPERATING", "")}
                            />
                        ) : (
                            <img
                                src={contact}
                                alt="Send message"
                                className="external-link"
                                style={{ width: 45, height: 45, cursor: "pointer" }}
                                onClick={() => sendMessage(data.supplierProductUrl, data.supplierId)}
                            />
                        )}
                    </div>
                </div>
            </td>
        </tr>
    );

    const renderWrongSupplierRow = (data: supplier) => (
        <tr className={`supplier-row ${data.status === "MESSAGE_SENT" ? "message-sent-row" : ""}`}>
            <td>
                <img src={data.supplierImageUrl} alt="Product" className="supplier-image"/>
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
                        <span style={{
                            fontWeight: 'bold',
                            fontSize: "20px",
                            color: '#303972'
                        }}>{data.years} {getYearLabel(data.years)}</span>
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
                <a href={data.supplierProductUrl} target="_blank" rel="noopener noreferrer">
                    <img src={external} alt="Product" className="external-link"
                         style={{width: '45px', height: '45px'}}/>
                </a>
            </td>
            <td>
                <div className="row-container" style={{width: '180px'}}>
                    <div className="icon-row">
                        <th></th>
                        <img
                            src={badSupplier}
                            alt="Mark as Wrong"
                            className="external-link"
                            style={{width: '45px', height: '45px', cursor: 'pointer'}}
                            onClick={() => {
                                setSelectedSupplierId(data.supplierId);
                                setIsModalOpen(true);
                            }}

                        />
                        <img
                            src={goodSearch}
                            alt="Mark as Wrong"
                            className="external-link"
                            style={{width: '45px', height: '45px', cursor: 'pointer'}}
                            onClick={() => changeStatus(data.supplierId, "NOT_COOPERATING", commentText)}
                        />
                    </div>
                </div>
            </td>
        </tr>
    );

    return (
        <div className="product-details-page">
            <button className="back-button" onClick={() => navigate(-1)}>← Товары</button>
            <div className="product-header">
                <div className="product-main-details">
                    <div className="product-info">
                        <span className="product-id">{prod.article}</span>
                        <h1 className="product-title">{prod.name}</h1>
                    </div>
                    <img src={prod.imageUrl} alt="Product" className="main-product-image"/>
                </div>
            </div>
            {cooperationData.length > 0 && (
                <>
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
                </>
            )}

            <div className="product">
                <div className="product-count">
                    Показывать по
                </div>
                <div className="pagination">
                    {[10, 20, 30].map((count) => (
                        <button
                            key={count}
                            onClick={() => setItemsPerPage(count)}
                            className={itemsPerPage === count ? "active" : ""}
                        >
                            {count}
                        </button>
                    ))}
                    <img
                        src={refresh}
                        alt="refresh"
                        className="refresh"
                        style={{cursor: "pointer"}}
                        onClick={handleRefresh}
                    />
                </div>
            </div>

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
                {alibabaSuppliers.slice(0, itemsPerPage).map(renderPendingSupplierRow)}
                </tbody>
            </table>

            {incorrectSuppliers.length > 0 && (
                <>
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
                </>
            )}

            {isModalOpen && (
                <div className="modal-overlay" onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        setIsModalOpen(false);
                        setCommentText("");
                    }
                }}>
                    <div className="modal-content">
                        <h1 className="modal-title">Комментарий</h1>
                        <textarea
                            className="modal-textarea"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Укажите причину"
                        />
                        <button
                            className="modal-save-button"
                            onClick={() => {
                                if (selectedSupplierId) {
                                    changeStatus(selectedSupplierId, "BLACKLISTED", commentText.trim());
                                }
                                setIsModalOpen(false);
                                setCommentText("");
                            }}
                        >
                            Сохранить
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
