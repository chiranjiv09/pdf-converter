import React, { useState } from 'react';
import '../home.css';

import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css";

import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
//import samplePDF from '../test.pdf';

const UploadedBlock = ({fileUrl, onChangeFile}) => {
    const [numPages, setNumPages] = useState(null);
    const [items, setItems] = useState([]);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const onSelectItems = (e) =>{
        let prevItems = [...items];
        let isChecked = e.target.checked;
        let value = e.target.value;
        if(isChecked){
            prevItems.push(value);
        }else{
            prevItems = prevItems.filter(prevItem => prevItem !== value);
        }
        setItems(prevItems);
    };


    const onDownload = (identifier) => {
        if(identifier == "S"){
            //Selected

        }else{
            //All
        }
    }

    const options = { workerSrc: "/pdf.worker.js" };

    return (
        <div className="HomePageBottomCon">
            <div className="pdfPageHeader">
                <div>
                    <label htmlFor="inputFile" className="replaceText">Replace and upload new</label>
                    <span onClick={()=>onChangeFile(undefined, "R")} >Delete</span>
                </div>
                <div className="downloadBtnsCon">
                    <button className="downloadBtn" onClick={()=>onDownload("S")}>
                        <div className="downloadIconCon">

                        </div>
                        Download Selection
                    </button>
                    <button className="downloadBtn downloadAllBtn" onClick={()=>onDownload("A")}>
                        <div className="downloadIconCon downloadAllIconCon">

                        </div>
                        Download All Images
                    </button>
                </div>
            </div>

            <Document 
                file={fileUrl}
                options={options}
                onLoadSuccess={onDocumentLoadSuccess}
            >   
                <div className="pdfPageCardsCon">
                {numPages != undefined && numPages != null &&
                Array.from(new Array(numPages)).map((each, index)=>{
                    return(
                        <div key={`pageBox_${index}`} className="pdfPageCard">
                            <input 
                                key={`checkBox_${index+1}`}
                                className='checkBox' 
                                onChange={(e)=>onSelectItems(e)} 
                                type='checkbox'
                                value={index}
                                id={`checkBox_${index}`} 
                                //checked={items.includes(index)}
                            />
                            <Page 
                                key={`page_${index + 1}`} 
                                pageNumber={index + 1} 
                                renderTextLayer={false} 
                                renderAnnotationLayer={false}
                                wrap={false}
                                size="A4" 
                            />
                            <div className="pdfPageCardTextCon">
                                <p>Page <span>{index+1}</span></p>
                                <React.Fragment>

                                </React.Fragment>
                            </div>
                        </div>
                    )
                })}  
                </div>             
            </Document>
        </div>
    )
};

export default UploadedBlock;



 