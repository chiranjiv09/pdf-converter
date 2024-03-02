import React, {useState} from 'react';
import Header from './Header';
import '../home.css';
import BasicSteps from './Steps';
import UploadedBlock from './UploadedBlock';

const HomePage = () => {
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null)

    const onChangeFile = (e, identifier) => {
        if(identifier == "U"){
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
                <input id="inputFile" onChange={(e)=>onChangeFile(e, "U")} type="file" accept='.pdf' style={{display: 'none'}} />
                <img src="" className="HomePageSideImgs" alt="side Imgs" />
                <div className="HomePageTopMiddleCon">
                    <div className="logoImagebox">
                        <img src="" className="logoImage" alt="side Imgs" />
                    </div>
                    <p className="pageText">PDF TO IMAGE CONVERTOR</p>

                    {file != undefined && file != null ?
                    <React.Fragment>
                        <p className='successfullyText'>Your file converted to images successfully!</p>
                        <p className='successfullyTextContant'>( You can download all the pages and separate page too )</p>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <label htmlFor="inputFile" className="inputFileButton" >
                            <img src="" className="" alt="upload" />
                            Select PDF file
                        </label>
                        <p className="dragAndDropText">or drag and drop file here</p>
                    </React.Fragment>
                    }    

                </div>
                <img src="" className="HomePageSideImgs" alt="side Imgs" />
            </div>
            
            {file != undefined && file != null ?
                <UploadedBlock file={file} fileUrl={fileUrl} onChangeFile={onChangeFile}/>
            :
                <BasicSteps />
            }
               

        </div>
    )
};

export default HomePage;