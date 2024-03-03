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

    const convertPDFToImageFiles = (fileUrl, conversionRequests, progressCallback) => {
        const totalRequests = conversionRequests.length;
        let completedRequests = 0;
        progressCallback(completedRequests);
    
        window.pdfjsLib.getDocument(fileUrl).promise.then(pdf => {
            const totalPages = pdf.numPages;
            const promises = [];
    
            const downloadFile = (file, fileName) => {
                return new Promise(resolve => {
                    const a = document.createElement('a');
                    const url = URL.createObjectURL(file);
                    a.href = url;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    resolve();
                });
            };
    
            conversionRequests.forEach(request => {
                const { id, pageNumber, outputFileType, fileName } = request;
                const fileExtension = outputFileType.toLowerCase();
    
                if (pageNumber >= 1 && pageNumber <= totalPages) {
                    promises.push(
                        pdf.getPage(pageNumber).then(page => {
                            return new Promise(resolve => {
                                const canvas = document.createElement('canvas');
                                const context = canvas.getContext('2d');
    
                                const viewport = page.getViewport({ scale: 1 });
                                canvas.width = viewport.width;
                                canvas.height = viewport.height;
    
                                const renderContext = {
                                    canvasContext: context,
                                    viewport: viewport,
                                };
                                page.render(renderContext).promise.then(() => {
                                    canvas.toBlob(blob => {
                                        const file = new File([blob], fileName, { type: `image/${fileExtension}` });
                                        resolve({
                                            file,
                                            pageNumber
                                        });
                                    }, `image/${fileExtension}`);
                                }).catch(error => {
                                    console.error(`Error rendering PDF page ${pageNumber}:`, error);
                                    resolve(null);
                                });
                            });
                        }).catch(error => {
                            console.error(`Error fetching page ${pageNumber}:`, error);
                            return null;
                        })
                    );
                } else {
                    console.warn(`Invalid pageNumber (${pageNumber}) for conversion request with id ${id}. Skipping.`);
                }
            });
    
            Promise.all(promises).then(async filesData => {
                const validFiles = filesData.filter(data => data !== null);
                const files = validFiles.map(data => data.file);
                const pageNumbers = validFiles.map(data => data.pageNumber);
    
                // Handle the downloaded files and page numbers as needed
                console.log('Downloaded files:', files);
                console.log('Corresponding page numbers:', pageNumbers);
    
                // Download files asynchronously with progress
                for (let i = 0; i < files.length; i++) {
                    const progress = Math.floor((++completedRequests / totalRequests) * 100);
                    progressCallback(progress);
    
                    await downloadFile(files[i], files[i].name);
                }
    
                // Reset progress after completion
                progressCallback(100);
            }).catch(error => {
                console.error('Error processing PDF pages:', error);
            });
        }).catch(error => {
            console.error('Error loading PDF document:', error);
        });
    }
    
    const conversionRequests = [
        { id: '1', pageNumber: 1, outputFileType: 'jpeg', fileName: 'converted_image' },
        { id: '2', pageNumber: 2, outputFileType: 'jpeg', fileName: 'converted_image' },
        // Add more conversion requests as needed
    ];
    
    const updateProgress = (percentage) => {
        console.log(`Download progress: ${percentage}%`);
        // Update your loader UI with the current percentage
    };
    
    
    
    // // Example usage: download pages starting from page 1 in JPEG format
    // convertPDFToImageFiles(1, 'jpeg');
    


    const onDownload = (identifier) => {
        if(identifier === "S"){
            
    convertPDFToImageFiles(fileUrl, conversionRequests, updateProgress);

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
                {numPages !== undefined && numPages !== null &&
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



 