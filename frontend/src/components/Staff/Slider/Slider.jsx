import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../../assets/img/logo.png'
import Menus from '../Menus/Menus';
import './slider.scss';

function Slider(props) {
    return (
        <div className='slider'>
            <div className="slider__header">
                <Link to="/staff" className="slider__header-link">
                    <img src= {logo} alt="logo" className="logo" />      
                </Link>
            </div>
            <Menus />
        </div>
    );
}

export default Slider;