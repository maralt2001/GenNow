
import React, {useState} from "react";
import {loadFile} from "../data/LoadFile";


const ImportData = (props:any) => {

    const fileInput = React.createRef<HTMLInputElement>();
    function handleFileSelect(e:HTMLInputElement) {
        if(e.files) {
            setFileName(e.files[0].name);
            loadFile(e).then((result) => setFileContent(result))
                       .catch((err) => console.log(err));
        }
    }

    const [fileName, setFileName] = useState('none')
    const [fileContent, setFileContent] = useState('');

    return (
        <div className="ImportData-Wrapper">
            <div className='Import-Header'>
                <span className="Import-Header-Text">Pick File .cfg</span>
            </div>
            <div className="Import-Body">
                <i className="bx bxs-file-import Open-Icon" onClick={() => fileInput.current?.click()}/>
                {fileName !== 'none' && <span className="File-Item">{fileName}</span>}
                {fileContent !== '' && <span>{fileContent}</span>}
            </div>
            <input ref={fileInput}
                   type="file"
                   name="data"
                   style={{display: "none"}}
                   accept=".cfg"
                   onChange={(e) => handleFileSelect(e.target)}/>

        </div>

    );
}

export {ImportData}