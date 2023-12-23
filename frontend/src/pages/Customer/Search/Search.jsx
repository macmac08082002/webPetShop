import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import nosearch from '../../../assets/img/nosearch.jpg';
import ProductCard from '../../../components/Customer/Product-Card/ProductCard';


import './search.scss';

function Search(props) {
    const location = useLocation();
    let key = location && location.search.substring(5);
    const [productSearch, setProductSearch] = useState([]);
    const [keyWords, setKeyWords] = useState('');

    const fetchSearch = async ()=>{
        const response = await fetch(`/api/product/search/${key}`);
        const data = await response.json();
        
        if(data) {
            setProductSearch(data);
        }
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        if(keyWords === '') return;
        window.location.href = `/search?key=${keyWords}`;
    }

    useEffect(()=>{
        fetchSearch();
    },[]);

    return (
        <div className='block__search container'>
            {
                productSearch && productSearch.length > 0  ? (
                    <div className="search__product">
                        { productSearch.length > 0 && <span className='search__product-quantity'>Tìm thấy {productSearch.length} phù hợp</span> }

                        <div className="search__product-list">
                            <Row>
                                {productSearch && productSearch.map((product, index)=>{
                                    return <ProductCard key={index} items={product} fullCol={true}/>
                                })}
                            </Row>
                        </div>
                    </div>
                )
                :
                (
                    <div className='search__no'>
                        <span>Rất tiếc, không có từ khóa nào phù hợp với tìm kiếm của Quý khách!</span>
                        <img src={nosearch} alt="" />
                    </div>
                )
            }
    
        </div>
    );
}

export default Search;