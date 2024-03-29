import React, {useState} from 'react';
import Header from './Header';
import '../home.css';
import BasicSteps from './Steps';
import UploadedBlock from './UploadedBlock';

import fileImg from '../images/File.png';

const HomePage = () => {
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null)

    const onChangeFile = (e, identifier) => {
        if(identifier === "U"){
            let file = e.target.files[0];
            setFile(file);
            setFileUrl(URL.createObjectURL(file));
        }else{
            setFileUrl(null);
            setFile(null);
        }
        
    }

    return (
        <div className="HomePageMainCon">
            <Header />
            <div className="HomePageTopCon">
                <input 
                    id="inputFile" 
                    onChange={(e)=>onChangeFile(e, "U")} 
                    type="file" accept='.pdf' 
                    style={{display: 'none'}}
                    onClick={(e)=>e.target.value = ""}
                />
                <img src={""} className="HomePageSideImgs" alt="side Imgs" />
                <div className="HomePageTopMiddleCon">
                    <div className="logoImagebox">
                        <img src={fileImg} className="logoImage" alt="side Imgs" />
                    </div>
                    <p className="pageText">PDF TO IMAGE CONVERTOR</p>

                    {file !== undefined && file !== null ?
                    <React.Fragment>
                        <p className='successfullyText'>Your file converted to images successfully!</p>
                        <p className='successfullyTextContant'>( You can download all the pages and separate page too )</p>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <label htmlFor="inputFile" className="inputFileButton" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                                <path d="M16.5 25.5H19.5V19.2L21.9 21.6L24 19.5L18 13.5L12 19.5L14.1 21.6L16.5 19.2V25.5ZM6 30C5.175 30 4.469 29.7065 3.882 29.1195C3.295 28.5325 3.001 27.826 3 27V9C3 8.175 3.294 7.469 3.882 6.882C4.47 6.295 5.176 6.001 6 6H15L18 9H30C30.825 9 31.5315 9.294 32.1195 9.882C32.7075 10.47 33.001 11.176 33 12V27C33 27.825 32.7065 28.5315 32.1195 29.1195C31.5325 29.7075 30.826 30.001 30 30H6ZM6 27H30V12H16.7625L13.7625 9H6V27Z" fill="white"/>
                            </svg>
                            Select PDF file
                        </label>
                        <p className="dragAndDropText">or drag and drop file here</p>
                    </React.Fragment>
                    }    

                </div>
                <img src="" className="HomePageSideImgs" alt="side Imgs" />
            </div>
            
            {file !== undefined && file !== null ?
                <UploadedBlock file={file} fileUrl={fileUrl} onChangeFile={onChangeFile}/>
            :
                <BasicSteps />
            }
               

        </div>
    )
};

export default HomePage;