import React, { useEffect, useState } from 'react';
import FileImage from '../images/File.png';


const LandingPage = () => {
    const [show, setShow] = useState({img: false, text:false});

    useEffect(()=>{
        setTimeout(()=>{
            setShow({img: true, text:false});
        },500);

        setTimeout(()=>{
            setShow({img: true, text:true});
        },1000);
    },[]);

    return (
        <div className="landingPageMainCon">
            <div className='landingPageImgCon'>
                <img src={FileImage}  className={`landingPageImg hidden ${show.img ? "vissible" : ""}`} alt="side Imgs" />
            </div>
            <p className={`landingPageText hidden ${show.text ? "vissible" : ""}`}>Pdf to Image Convertor</p>
        </div>
    )
};

export default LandingPage;