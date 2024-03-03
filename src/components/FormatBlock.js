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
                                <img className="eachPageImgCon" src={eachPage.fileUrl} alt="pageImg" />                         
                                <div className="eachPageBottomCon">
                                    <span>Page {eachPage.pageNumber}</span>
                                    <div className="eachPageBottomRightSideCon">
                                        <button className="renameBtn" name="rename" value={eachPage.pageNumber} onClick={(e)=>onPopupFunction(e)}>Rename</button>
                                        <button name="edit" className="editAndRemoveIconBtns" value={eachPage.pageNumber} onClick={(e)=>onPopupFunction(e)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                <path d="M1.75 12.25H12.25M7.1295 3.39967L8.77917 1.75L11.6667 4.6375L10.017 6.28717M7.1295 3.39967L3.85875 6.67042C3.74935 6.77979 3.68787 6.92814 3.68783 7.08283V9.72883H6.33383C6.48853 9.7288 6.63688 9.66732 6.74625 9.55792L10.017 6.28717M7.1295 3.39967L10.017 6.28717" stroke="#9294C6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </button>
                                        <button name="remove" className="editAndRemoveIconBtns" value={eachPage.pageNumber} onClick={(e)=>onPopupFunction(e)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M4.00001 12.6667C4.00001 13.0203 4.14049 13.3594 4.39053 13.6095C4.64058 13.8595 4.97972 14 5.33334 14H10.6667C11.0203 14 11.3594 13.8595 11.6095 13.6095C11.8595 13.3594 12 13.0203 12 12.6667V4.66667H4.00001V12.6667ZM5.33334 6H10.6667V12.6667H5.33334V6ZM10.3333 2.66667L9.66668 2H6.33334L5.66668 2.66667H3.33334V4H12.6667V2.66667H10.3333Z" fill="#FF1400"/>
                                            </svg>
                                        </button>
                                    </div>
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