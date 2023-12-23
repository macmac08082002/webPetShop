import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from '../../../components/Customer/Product-List/ProductList';
import ProductRecommender from '../../../components/Customer/Product-Recommender/ProductRecommender';
import Contact from '../../../components/Customer/Contact/Contact';
import Category from '../../../components/Customer/Category/Category';
import Cart from '../../../components/Customer/Cart/Cart';
import { getCategoryId, setDisplayToast } from '../../../actions/user';

import './home.scss';

function Home(props) {
    const [categories, setCategories] = useState([]);
    const accessToken = JSON.parse(sessionStorage.getItem("accessToken"));
    const dispatch = useDispatch();
    const isToast = useSelector(state => state.user.isToast);

    const fetchCategory = async () =>{
        const response = await fetch('/api/category/');
        const data = await response.json();

        if (data) {
            const categoryActive = data.filter((item)=>item.is_active);
            if(categoryActive.length > 0) setCategories(categoryActive);
            
            const categoryFirst = data.find((item)=> {
                if(item.is_active) return item.id;
            });

            const action = getCategoryId(categoryFirst.id);
            dispatch(action);
        }
    }

    useEffect(()=>{
        fetchCategory();
    }, []);

    useEffect(()=>{
        if(isToast) {
            toast.success('Sản phẩm thêm vào giỏ');
            dispatch(setDisplayToast(!isToast));
            return;
        }
    }, [isToast]);

    return (
        <> 
            <ToastContainer 
                position="top-right"
                autoClose={3000}
            /> 
            <Cart accessToken={accessToken}/>
            <Container className='block-product mt-3'>
                {
                    accessToken && (
                        <>
                        <div className="danhmuc">
                            <h2>Gợi ý cho bạn</h2>
                        </div>
                        <ProductRecommender accessToken={accessToken}/>
                        </>
                    )
                }

                <div className="my-5 text-center"> {/* Vertical spacing of 5rem and centering */}
                <div className="danhmuc">
                <h2>Thú cưng</h2>
                </div>
                    <div className="mt-7">
    <Category categories={categories}/>
</div>

                </div>
                <ProductList />
                <Contact />
            </Container>
        </>
    );
}

export default Home;
