import React, { useState } from 'react';
import '../home.css';

import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css";

import Modal from 'react-modal';

import { Document, Page, pdfjs } from 'react-pdf';
import FormatBlock from './FormatBlock';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
//import samplePDF from '../test.pdf';

const UploadedBlock = ({fileUrl, onChangeFile, allPageArray}) => {
    const [numPages, setNumPages] = useState(null);
    const [items, setItems] = useState([]);
    const [selectedFormat, setSelectedFormat] = useState({});

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal(identifier) {
        if(identifier === "OPEN"){
            setIsOpen(true);
        }else{
            setIsOpen(false);
        }
        
    }

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

    // const convertPDFToImageFiles = (fileUrl, conversionRequests, progressCallback) => {
    //     const totalRequests = conversionRequests.length;
    //     let completedRequests = 0;
    //     progressCallback(completedRequests);
    
    //     window.pdfjsLib.getDocument(fileUrl).promise.then(pdf => {
    //         const totalPages = pdf.numPages;
    //         const promises = [];
    
    //         const downloadFile = (file, fileName) => {
    //             return new Promise(resolve => {
    //                 const a = document.createElement('a');
    //                 const url = URL.createObjectURL(file);
    //                 a.href = url;
    //                 a.download = fileName;
    //                 document.body.appendChild(a);
    //                 a.click();
    //                 document.body.removeChild(a);
    //                 URL.revokeObjectURL(url);
    //                 resolve();
    //             });
    //         };
    
    //         conversionRequests.forEach(request => {
    //             const { id, pageNumber, outputFileType, fileName } = request;
    //             const fileExtension = outputFileType.toLowerCase();
    
    //             if (pageNumber >= 1 && pageNumber <= totalPages) {
    //                 promises.push(
    //                     pdf.getPage(pageNumber).then(page => {
    //                         return new Promise(resolve => {
    //                             const canvas = document.createElement('canvas');
    //                             const context = canvas.getContext('2d');
    
    //                             const viewport = page.getViewport({ scale: 1 });
    //                             canvas.width = viewport.width;
    //                             canvas.height = viewport.height;
    
    //                             const renderContext = {
    //                                 canvasContext: context,
    //                                 viewport: viewport,
    //                             };
    //                             page.render(renderContext).promise.then(() => {
    //                                 canvas.toBlob(blob => {
    //                                     const file = new File([blob], fileName, { type: `image/${fileExtension}` });
    //                                     resolve({
    //                                         file,
    //                                         pageNumber
    //                                     });
    //                                 }, `image/${fileExtension}`);
    //                             }).catch(error => {
    //                                 console.error(`Error rendering PDF page ${pageNumber}:`, error);
    //                                 resolve(null);
    //                             });
    //                         });
    //                     }).catch(error => {
    //                         console.error(`Error fetching page ${pageNumber}:`, error);
    //                         return null;
    //                     })
    //                 );
    //             } else {
    //                 console.warn(`Invalid pageNumber (${pageNumber}) for conversion request with id ${id}. Skipping.`);
    //             }
    //         });
    
    //         Promise.all(promises).then(async filesData => {
    //             const validFiles = filesData.filter(data => data !== null);
    //             const files = validFiles.map(data => data.file);
    //             const pageNumbers = validFiles.map(data => data.pageNumber);
    
    //             // Handle the downloaded files and page numbers as needed
    //             console.log('Downloaded files:', files);
    //             console.log('Corresponding page numbers:', pageNumbers);
    
    //             // Download files asynchronously with progress
    //             for (let i = 0; i < files.length; i++) {
    //                 const progress = Math.floor((++completedRequests / totalRequests) * 100);
    //                 progressCallback(progress);
    
    //                 await downloadFile(files[i], files[i].name);
    //             }
    
    //             // Reset progress after completion
    //             progressCallback(100);
    //         }).catch(error => {
    //             console.error('Error processing PDF pages:', error);
    //         });
    //     }).catch(error => {
    //         console.error('Error loading PDF document:', error);
    //     });
    // }
    
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
    
    const onPopupFunction = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        
        const divEl = document.getElementById("pagesDispalyScrollCon");

        switch(name){
            case "format":
                console.log(name);
                setSelectedFormat((selectedFormat)=>({...selectedFormat, [name]: value}));
                break;
            case "Download":
                console.log(name);
                break; 
            case "scrollLeft":
                console.log(name);
                if(divEl != undefined && divEl != null){
                    divEl.scrollLeft -= 200;
                }
                break; 
            case "scrollRight":
                console.log(name);
                if(divEl != undefined && divEl != null){
                    divEl.scrollLeft += 200;
                }
                break; 
            case "rename":
                console.log(name);
                break; 
            case "edit":
                console.log(name);
                break; 
            case "remove":
                console.log(name);
                break; 
        }
    }


    const onDownload = (identifier) => {
        if(items.length > 0){
            openModal("OPEN");
        }
        
        if(identifier === "S"){
            // convertPDFToImageFiles(fileUrl, conversionRequests, updateProgress);
        }else{
            //All
        }
    }

    const options = { workerSrc: "/pdf.worker.js" };

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          
        },
        overlay: {
            zIndex:"4",
        },
    };

    return ( 
        <div className="HomePageBottomCon">
{/* Popups Block */}
        <Modal
            isOpen={modalIsOpen}
            // onAfterOpen={afterOpenModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div className="modalMainCon">
                <svg className='popupCross' onClick={()=>openModal("CLOSE")} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M14 0C6.2 0 0 6.2 0 14C0 21.8 6.2 28 14 28C21.8 28 28 21.8 28 14C28 6.2 21.8 0 14 0ZM19.4 21L14 15.6L8.6 21L7 19.4L12.4 14L7 8.6L8.6 7L14 12.4L19.4 7L21 8.6L15.6 14L21 19.4L19.4 21Z" fill="#FF1400"/>
                </svg>
                <FormatBlock 
                    key="downloadBlock"
                    selectedFormat={selectedFormat} 
                    onPopupFunction={onPopupFunction}
                    allPageArray={allPageArray}
                    items={items}
                />
            </div>
        </Modal>
                <div className="pdfPageHeader">
                    <div className='newFileCon'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M11 17H13V12.8L14.6 14.4L16 13L12 9L8 13L9.4 14.4L11 12.8V17ZM4 20C3.45 20 2.97933 19.8043 2.588 19.413C2.19667 19.0217 2.00067 18.5507 2 18V6C2 5.45 2.196 4.97933 2.588 4.588C2.98 4.19667 3.45067 4.00067 4 4H10L12 6H20C20.55 6 21.021 6.196 21.413 6.588C21.805 6.98 22.0007 7.45067 22 8V18C22 18.55 21.8043 19.021 21.413 19.413C21.0217 19.805 20.5507 20.0007 20 20H4ZM4 18H20V8H11.175L9.175 6H4V18Z" fill="#0066DA"/>
                        </svg>
                        <label htmlFor="inputFile" className="replaceText">Replace and upload new</label>
                        <svg  onClick={()=>onChangeFile(undefined, "R")}  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z" fill="#FF1400"/>
                        </svg>
                    </div>
                    <div className="downloadBtnsCon">
                        <button className="downloadBtn" onClick={()=>onDownload("S")}>
                            <div className="downloadIconCon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M8 6.641L9.121 5.521C9.30947 5.3387 9.562 5.23773 9.82421 5.23982C10.0864 5.24191 10.3373 5.3469 10.5228 5.53218C10.7084 5.71746 10.8137 5.9682 10.8162 6.2304C10.8186 6.49259 10.718 6.74527 10.536 6.934L7.707 9.763C7.61435 9.85618 7.50419 9.93013 7.38285 9.9806C7.26152 10.0311 7.13141 10.057 7 10.057C6.86859 10.057 6.73848 10.0311 6.61715 9.9806C6.49581 9.93013 6.38565 9.85618 6.293 9.763L3.464 6.934C3.37116 6.84102 3.29753 6.73067 3.24734 6.60924C3.19714 6.48781 3.17135 6.35769 3.17144 6.22629C3.17154 6.0949 3.19751 5.96481 3.24788 5.84345C3.29825 5.72209 3.37202 5.61184 3.465 5.519C3.55798 5.42616 3.66833 5.35253 3.78976 5.30234C3.91119 5.25214 4.04131 5.22635 4.17271 5.22644C4.3041 5.22654 4.43419 5.25251 4.55555 5.30288C4.67691 5.35325 4.78716 5.42702 4.88 5.52L6 6.641V1C6 0.734784 6.10536 0.48043 6.29289 0.292893C6.48043 0.105357 6.73478 0 7 0C7.26522 0 7.51957 0.105357 7.70711 0.292893C7.89464 0.48043 8 0.734784 8 1V6.641ZM1 12H13C13.2652 12 13.5196 12.1054 13.7071 12.2929C13.8946 12.4804 14 12.7348 14 13C14 13.2652 13.8946 13.5196 13.7071 13.7071C13.5196 13.8946 13.2652 14 13 14H1C0.734784 14 0.48043 13.8946 0.292893 13.7071C0.105357 13.5196 0 13.2652 0 13C0 12.7348 0.105357 12.4804 0.292893 12.2929C0.48043 12.1054 0.734784 12 1 12Z" fill="white"/>
                                </svg>
                            </div>
                            Download Selection
                        </button>
                        <button className="downloadBtn downloadAllBtn" onClick={()=>onDownload("A")}>
                            <div className="downloadIconCon downloadAllIconCon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <rect width="24" height="24" rx="10" fill="white"/>
                                <path d="M13 11.641L14.121 10.521C14.3095 10.3387 14.562 10.2377 14.8242 10.2398C15.0864 10.2419 15.3373 10.3469 15.5228 10.5322C15.7084 10.7175 15.8137 10.9682 15.8162 11.2304C15.8186 11.4926 15.718 11.7453 15.536 11.934L12.707 14.763C12.6143 14.8562 12.5042 14.9301 12.3829 14.9806C12.2615 15.0311 12.1314 15.057 12 15.057C11.8686 15.057 11.7385 15.0311 11.6171 14.9806C11.4958 14.9301 11.3857 14.8562 11.293 14.763L8.464 11.934C8.37116 11.841 8.29753 11.7307 8.24734 11.6092C8.19714 11.4878 8.17135 11.3577 8.17144 11.2263C8.17154 11.0949 8.19751 10.9648 8.24788 10.8435C8.29825 10.7221 8.37202 10.6118 8.465 10.519C8.55798 10.4262 8.66833 10.3525 8.78976 10.3023C8.91119 10.2521 9.04131 10.2264 9.17271 10.2264C9.3041 10.2265 9.43419 10.2525 9.55555 10.3029C9.67691 10.3532 9.78716 10.427 9.88 10.52L11 11.641V6C11 5.73478 11.1054 5.48043 11.2929 5.29289C11.4804 5.10536 11.7348 5 12 5C12.2652 5 12.5196 5.10536 12.7071 5.29289C12.8946 5.48043 13 5.73478 13 6V11.641ZM6 17H18C18.2652 17 18.5196 17.1054 18.7071 17.2929C18.8946 17.4804 19 17.7348 19 18C19 18.2652 18.8946 18.5196 18.7071 18.7071C18.5196 18.8946 18.2652 19 18 19H6C5.73478 19 5.48043 18.8946 5.29289 18.7071C5.10536 18.5196 5 18.2652 5 18C5 17.7348 5.10536 17.4804 5.29289 17.2929C5.48043 17.1054 5.73478 17 6 17Z" fill="#9294C6"/>
                                </svg>
                            </div>
                            Download All Images
                        </button>
                    </div>
                </div> 
                <div className="pdfPageCardsCon">
                    {allPageArray && allPageArray.length != undefined && allPageArray.length > 0 && 
                    allPageArray.map((eachPage, index)=>{
                        return(
                            <div key={`pageBox_${index}`} className="pdfPageCard">
                                <input 
                                    key={`checkBox_${index+1}`}
                                    className='checkBox' 
                                    onChange={(e)=>onSelectItems(e)} 
                                    type='checkbox'
                                    value={index+1}
                                    id={`checkBox_${index}`} 
                                    //checked={items.includes(index)}
                                />
                                <img alt='page' src={eachPage.fileUrl} className='' />
                                <div className="pdfPageCardTextCon">
                                    <p>Page <span>{index+1}</span></p>
                                    <React.Fragment>

                                    </React.Fragment>
                                </div>
                            </div>
                        )
                    })}  
                    </div>             
            </div>
        
    )
};

export default UploadedBlock;



 