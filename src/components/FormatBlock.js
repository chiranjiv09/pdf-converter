import React from 'react';
import '../home.css';


const FormatBlock = ({selectedFormat, onPopupFunction, items, allPageArray}) => {
    return (
        <div className="FormatBlockMainCon">
                <span className="radioInputContant" >Select the format you want to download your image!</span>
                <div  className="radioInputsHoldingCon">
                    <button
                        id="jpeg"
                        value="jpeg"
                        name="format"
                        onClick={(e)=>onPopupFunction(e)}
                        className={`formatBtn ${selectedFormat.format != undefined && selectedFormat.format != null && selectedFormat.format == "jpeg" ? "selectedFormatBtn" : "" }`}
                    >
                        JPEG
                    </button>

                    <button
                        id="jpg"
                        value="jpg"
                        name="format"
                        onClick={(e)=>onPopupFunction(e)}
                        className={`formatBtn ${selectedFormat.format != undefined && selectedFormat.format != null && selectedFormat.format == "jpg" ? "selectedFormatBtn" : "" }`}
                    >
                        JPG
                    </button>

                    <button
                        id="png"
                        value="png"
                        name="format"
                        onClick={(e)=>onPopupFunction(e)}
                        className={`formatBtn ${selectedFormat.format != undefined && selectedFormat.format != null && selectedFormat.format == "png" ? "selectedFormatBtn" : "" }`}
                    >
                        PNG
                    </button>
                </div>

        {/* displaying Selected Pages */}
                <div id="pagesDispalyScrollCon" className="displayingPagesCon">
                    {/* Each Page */}
                    {allPageArray && allPageArray.length != undefined && allPageArray.length > 0 && 
                    allPageArray.map((eachPage, index)=>{
                        if(items.includes(`${eachPage.pageNumber}`)){
                        return(
                            <div key={index} className="eachPageCon">
                                
                                <div className="imageHoldingCon">
                                    {/* Delete while hover */}
                                    <div className="modificationCon" id={`imageBox_${eachPage.pageNumber}`} >
                                        <button name="remove" className="editCircleCon" value={eachPage.pageNumber} onClick={(e)=>onPopupFunction(e, eachPage)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                                <path d="M7.55554 7.11111H24.4444V8.88889H7.55554V7.11111Z" fill="white"/>
                                                <path d="M13.7778 7.11111V5.33333H18.2222V7.11111M22.6667 11.1111V24.8889C22.6667 25.3604 22.4794 25.8126 22.146 26.146C21.8126 26.4794 21.3604 26.6667 20.8889 26.6667H11.1111C10.6396 26.6667 10.1874 26.4794 9.85402 26.146C9.52062 25.8126 9.33332 25.3604 9.33332 24.8889V11.1111M18.2222 12.5556V24.4444M13.7778 12.5556V24.4444M7.55554 7.11111H24.4444V8.88888H7.55554V7.11111Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </button>
                                    </div>      
                                    <img className="eachPageImgCon" src={eachPage.fileUrl} alt="pageImg" />
                                </div>

                                <div className="eachPageBottomCon">
                                    <input id={"input"+eachPage.pageNumber} type="text" value={eachPage.fileName != undefined ? eachPage.fileName : ""} />
                                </div>
                            </div>
                          )
                        }
                        })}  
                </div>

                <div className="arrowIconsCon">
                    <button name="scrollLeft" onClick={(e)=>onPopupFunction(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="29" viewBox="0 0 30 29" fill="none">
                            <path d="M7.74998 14.5H23.4583" stroke="black" stroke-width="2" stroke-linecap="round"/>
                            <path d="M11.375 19.3333L6.54167 14.5L11.375 9.66666" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>

                    <button name="scrollRight" onClick={(e)=>onPopupFunction(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="29" viewBox="0 0 30 29" fill="none">
                            <path d="M22.25 14.5H6.54169" stroke="black" stroke-width="2" stroke-linecap="round"/>
                            <path d="M18.625 19.3333L23.4583 14.5L18.625 9.66666" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>

                <button name='Download' onClick={(e)=>onPopupFunction(e)} className='innerDownloadButton'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <rect x="0.5" width="24" height="24" rx="10" fill="white"/>
                        <path d="M13.5 11.641L14.621 10.521C14.8095 10.3387 15.062 10.2377 15.3242 10.2398C15.5864 10.2419 15.8373 10.3469 16.0228 10.5322C16.2084 10.7175 16.3137 10.9682 16.3162 11.2304C16.3186 11.4926 16.218 11.7453 16.036 11.934L13.207 14.763C13.1143 14.8562 13.0042 14.9301 12.8829 14.9806C12.7615 15.0311 12.6314 15.057 12.5 15.057C12.3686 15.057 12.2385 15.0311 12.1171 14.9806C11.9958 14.9301 11.8857 14.8562 11.793 14.763L8.964 11.934C8.87116 11.841 8.79753 11.7307 8.74734 11.6092C8.69714 11.4878 8.67135 11.3577 8.67144 11.2263C8.67154 11.0949 8.69751 10.9648 8.74788 10.8435C8.79825 10.7221 8.87202 10.6118 8.965 10.519C9.05798 10.4262 9.16833 10.3525 9.28976 10.3023C9.41119 10.2521 9.54131 10.2264 9.67271 10.2264C9.8041 10.2265 9.93419 10.2525 10.0555 10.3029C10.1769 10.3532 10.2872 10.427 10.38 10.52L11.5 11.641V6C11.5 5.73478 11.6054 5.48043 11.7929 5.29289C11.9804 5.10536 12.2348 5 12.5 5C12.7652 5 13.0196 5.10536 13.2071 5.29289C13.3946 5.48043 13.5 5.73478 13.5 6V11.641ZM6.5 17H18.5C18.7652 17 19.0196 17.1054 19.2071 17.2929C19.3946 17.4804 19.5 17.7348 19.5 18C19.5 18.2652 19.3946 18.5196 19.2071 18.7071C19.0196 18.8946 18.7652 19 18.5 19H6.5C6.23478 19 5.98043 18.8946 5.79289 18.7071C5.60536 18.5196 5.5 18.2652 5.5 18C5.5 17.7348 5.60536 17.4804 5.79289 17.2929C5.98043 17.1054 6.23478 17 6.5 17Z" fill="#9294C6"/>
                    </svg>
                    Download
                </button>

            </div>
    )
}

export default FormatBlock;