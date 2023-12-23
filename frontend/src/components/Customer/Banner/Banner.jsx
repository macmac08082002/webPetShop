import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './banner.scss';
import banner1 from '../../../assets/img/banner1.jpg';
import banner2 from '../../../assets/img/banner2.jpg';
import banner3 from '../../../assets/img/banner3.jpg';
import banner4 from '../../../assets/img/banner4.jpg';
import { Container } from 'react-bootstrap';

function Banner(props) {
    const { isDisplay } = props;
    const [key, setKey] = useState('');
    const navigate = useNavigate();

    const images = [banner1, banner2, banner3, banner4];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);
        return () => clearInterval(intervalId);
    }, []);

    if (isDisplay) {
        return (
            <div className='banner'>
                <img
                    src={images[currentImageIndex]}
                    alt={`Banner ${currentImageIndex + 1}`}
                    style={{ width: '100%', height: 'auto' }}
                />
            </div>
        );
    } else {
        return <></>;
    }
}

export default Banner;
