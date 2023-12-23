import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import ProductCard from '../Product-Card/ProductCard';
import './productRecommender.scss';

function ProductRecommender({accessToken}) {
    const [productsRecommender, setProductsRecommender] = useState([]);
    
    const fetchProductsRecommender = async(accessToken)=>{
        const response = await fetch('/api/product/recommender',{
            method: 'get',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        if(data.length > 0) setProductsRecommender(data);
    }

    useEffect(()=>{
        if(accessToken) fetchProductsRecommender(accessToken);
    }, []);

    return (
        <>
            <div className='product__recommender'>
                <Swiper
                    spaceBetween={30}
                    slidesPerView={4}
                    loop={true}
                    rewind={true}
                    speed={1000}
                    autoplay={{
                        delay: 1000,
                        disableOnInteraction: false,
                    }}
                    
                    // navigation={true} 
                    modules={[Autoplay, Navigation]}
                    >
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            {productsRecommender.length > 0 && productsRecommender.map((product, index)=>{
                                    return(
                                        <SwiperSlide key={index}>
                                            <ProductCard key={index} items={product} fullCol={false}/>
                                        </SwiperSlide>
                                    )
                                })
                            }

                        </div>
                    </div>
                </Swiper>
            </div>
        </>
        
    );
}

export default ProductRecommender;