
import React, {useState} from "react";
import {loadFile, separator, createArrayConfItems} from "../data/LoadFile";
import {DataPreview} from "./DataPreview";

interface ConfItems {
    key: string
    value: string
}

const ImportData = (props:any) => {

    const fileInput = React.createRef<HTMLInputElement>();

    function handleFileSelect(e:HTMLInputElement) {
        if(e.files) {
            setFileName(e.files[0].name);
            loadFile(e).then((result) => setFileContent(generateMap(result)))
                       .catch((err) => console.log(err));
        }
    }

    function generateMap(fileString:string):Array<ConfItems> {
        let result = separator(fileString, '=');
        return createArrayConfItems(result)
    }

    const [fileName, setFileName] = useState('none')
    const [fileContent, setFileContent] = useState(new Array<ConfItems>());

    return (
        <div className="ImportData-Wrapper">
            <div className='Import-Header'>
                <span className="Import-Header-Text">Pick File .cfg</span>
            </div>
            <div className="Import-Body">
                <i className="bx bxs-file-import Open-Icon" onClick={() => fileInput.current?.click()}/>
                {fileName !== 'none' && <span className="File-Item">{fileName}</span>}
            </div>
                {fileContent.length !== 0 && <div className="Import-Append">
                    <DataPreview data={fileContent}/>
            </div>}
            <input ref={fileInput}
                   type="file"
                   name="data"
                   style={{display: "none"}}
                   accept=".cfg"
                   onChange={(e) => handleFileSelect(e.target)}/>
        </div>

    );
}

export {ImportData};
export type { ConfItems };
