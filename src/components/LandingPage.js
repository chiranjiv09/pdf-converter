import React from 'react';
import FileImage from '../images/File.png';


const LandingPage = () => {
    return (
        <div className="landingPageMainCon">
            <div className='landingPageImgCon'>
            <img src={FileImage} className="landingPageImg" alt="side Imgs" />
            </div>
            <p className='landingPageText'>Pdf to Image Convertor</p>
        </div>
    )
};

export default LandingPage;