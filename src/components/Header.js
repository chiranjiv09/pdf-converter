import React from 'react';
import '../home.css';

import fileImg from '../images/File.png';

const Header = () => {
    return (
        <div className="headerMainCon">
            <img src={fileImg} alt="Logo" />
            <span>Pdf to Image Convertor</span>
        </div>
    )
};

export default Header;