
import React, {useEffect, useState} from "react";
import {loadFile, separator, createArrayConfItems} from "../data/LoadFile";



interface ConfItems {
    id: string
    key: string
    value: string
    selected?: boolean
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

        //setFileContent((items) =>items.filter((element,pos) => pos !== index) );
        if(e.className === 'Prev-DataItem-Container') {
            e.className = 'Prev-DataItem-Container Selected'
            let newState = [...fileContent];
            newState[index].selected = true;
            setFileContent(newState);
            setCountSelected(countSelected + 1);

        }

        else {
            e.className = 'Prev-DataItem-Container'
            let newState = [...fileContent];
            newState[index].selected = false;
            setFileContent(newState)
            setCountSelected(countSelected - 1)
        }

    }

    function  handleClickTrash() {

        if(countSelected > 0)
        {
            setFileContent((items) => items.filter((element) =>
                element.selected === false || element.selected === undefined));
            setCountSelected(0);
        }

            let input = document.querySelector('input');
            if(input && input.files?.length) {
                input.value = '';
            }
    }

    const [fileName, setFileName] = useState('none')
    const [fileContent, setFileContent] = useState(new Array<ConfItems>());
    const [countSelected, setCountSelected] = useState(0);


    useEffect(() => {

    },[fileContent])


    return (
        <div className="ImportData-Wrapper">
            <div className='Import-Header'>
                <span className="Import-Header-Text">Pick File .cfg</span>
            </div>
            <div className="Import-Body">
                <i className="bx bxs-file-import Open-Icon" onClick={() => fileInput.current?.click()}/>
                {fileName !== 'none' && fileContent.length !== 0 && <span className="File-Item">{fileName}</span>}
            </div>
                {fileContent.length !== 0 && <div className="Import-Preview">
                    <div className="Import-Preview-Header">
                        <span>Data Preview</span>
                        <span>Current: {fileContent.length}</span>
                        <span>Selected: {countSelected}</span>
                        <button
                            className="Import-Preview-Header-Del-Button"
                            onClick={() => handleClickTrash()}>
                            DEL selected
                        </button>
                    </div>
                    <div className="Import-Preview-Body">
                        <React.Fragment>
                            {fileContent.map(item => <div
                                              key={item.id}
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
