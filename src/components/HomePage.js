import React, {useEffect, useState} from 'react';
import Header from './Header';
import '../home.css';
import BasicSteps from './Steps';
import UploadedBlock from './UploadedBlock';

import fileImg from '../images/File.png';
import fileFrame from '../images/Frame.png';


const HomePage = () => {
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [allPageArray,setAllPageArray] = useState([]);
    const [loadingStatus, setLoadingStatus ] = useState(null);

    const convertPdfToJpeg = (fileUrl)=> {
        return window.pdfjsLib.getDocument(fileUrl).promise.then(pdf => {
          const totalPages = pdf.numPages;
          const conversionResults = []; // Array to store conversion results
      
          const promises = [];
      
          const convertPageToJpeg = (pageNumber) => {
            return pdf.getPage(pageNumber).then(page => {
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
                    // Create a File object for each page
                    const fileExtension = 'jpeg'; // You can customize the file extension
                    const file = new File([blob], `image-${pageNumber}.${fileExtension}`, {
                      type: `image/${fileExtension}`
                    });
      
                    const fileUrl = URL.createObjectURL(file);
      
                    // Create an object containing page information
                    const pageObj = {
                      pageNumber,
                      file,
                      fileUrl,
                      fileType: fileExtension,
                      fileName: `image-${pageNumber}.${fileExtension}`
                    };
      
                    // Push the object to the conversion results array
                    conversionResults.push(pageObj);
      
                    // Resolve the promise
                    resolve(pageObj);
                  }, 'image/jpeg');
                }).catch(error => {
                  console.error(`Error rendering PDF page ${pageNumber}:`, error);
                  resolve(null);
                });
              });
            }).catch(error => {
              console.error(`Error fetching page ${pageNumber}:`, error);
              return null;
            });
          };
      
          for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
            promises.push(convertPageToJpeg(pageNumber));
          }
      
          return Promise.all(promises).then(() => {
            // Now `conversionResults` contains an array of objects with information about each converted page
            return conversionResults;
          });
        });
      }
      
    const onChangeFile = (e, identifier) => {
        if (identifier === "U") {
            let file = e.target.files[0];
            setFile(file);
            const pdfUrl = URL.createObjectURL(file);
            setFileUrl(pdfUrl);
        
            convertPdfToJpeg(pdfUrl).then(result => {
                setAllPageArray(result);
            });
        } else {
            setFileUrl(null);
            setFile(null);
            setAllPageArray([]);
        }
    };

    useEffect(()=>{
        console.log(allPageArray);
    },[allPageArray])
      

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
                <img src={fileFrame} className="HomePageSideImgs" alt="side Imgs" />
                <div className="HomePageTopMiddleCon">
                    <div className="logoImagebox">
                        <img src={fileImg} className="logoImage" alt="side Imgs" />
                    </div>
                    <p className="pageText">PDF TO IMAGE CONVERTOR</p>

                    {loadingStatus == null ?
                    <React.Fragment>
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
                    </React.Fragment>
                    :
                    <div className="loaderContainer">     
                        {/* Loading... */}
                        <div className="loaderTopContainer">
                          <span>Uploading file</span>
                          <span>{loadingStatus}%</span>
                        </div>
                        <div className="loaderBottomContainer">
                          <div className="loaderStatus" style={{width:`${loadingStatus}%`}}></div>
                        </div>
                    </div>
                  }

                </div>
                <img src={fileFrame} className="HomePageSideImgs" alt="side Imgs" />
            </div>
            
            {file !== undefined && file !== null && allPageArray.length != undefined && allPageArray.length > 0 ?
                <UploadedBlock 
                fileUrl={fileUrl} 
                allPageArray={allPageArray} 
                setAllPageArray = {setAllPageArray}
                onChangeFile={onChangeFile}
                setLoadingStatus={setLoadingStatus}
                setFileUrl={setFileUrl}
                setFile={setFile}
                />
            :
                <BasicSteps />
            }
               

        </div>
    )
};

export default HomePage;