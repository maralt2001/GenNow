
import React, {useState} from "react";
import {loadFile, separator, createArrayConfItems} from "../data/LoadFile";


interface ConfItems {
    key: string
    value: string
}

const ImportData = () => {

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

    function handleClickItem(e:HTMLDivElement, index:number) {
        setFileContent((items) =>items.filter((element,pos) => pos !== index) );
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
                {fileContent.length !== 0 && <div className="Import-Preview">
                    <div className="Import-Preview-Header">
                        <span>Data Preview</span>
                        <span>Current: {fileContent.length}</span>
                    </div>
                    <div className="Import-Preview-Body">
                        <React.Fragment>
                            {fileContent.map(item => <div key={fileContent.indexOf(item)}
                                              className="Prev-DataItem-Container"
                                              ref={React.createRef}
                                              onClick={(e) =>
                                                        handleClickItem(e.currentTarget, fileContent.indexOf(item))}>
                                <div className="Prev-DataItem-Key-Container">
                                    <span className="Prev-Data-Item-Key">{item.key}</span>
                                </div>
                                <div className="Prev-DataItem-Value-Container">
                                    <span className="Prev-Data-Item-Value">{item.value}</span>
                                </div>
                            </div>)}
                        </React.Fragment>
                    </div>

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
