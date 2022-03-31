
import React, {useEffect, useState} from "react";
import {loadFile, separator, createArrayConfItems} from "../data/LoadFile";
import {useGlobalState} from "./ContentContainer";


import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import {Container, Stack, Button, CssBaseline, Chip, Typography, ButtonGroup} from '@mui/material';
import AttachFileIcon from "@mui/icons-material/AttachFile";



interface ConfItemsMeta {
    id: string
    origin: string
    alias?: string
    prefix?: string
    column?: string
}

interface ConfItems {
    selected?: boolean
    key: string
    value: string
    meta: ConfItemsMeta

}

const ImportData = () => {

    const fileInput = React.createRef<HTMLInputElement>();

    function handleFileSelect(e:HTMLInputElement) {
        if(e.files) {
            let origin = e.files[0].name;
            setFileName(origin);
            loadFile(e).then((result) => setFileContent(generateMap(result,origin)))
                       .catch((err) => console.log(err));
        }
    }

    function generateMap(fileString:string, originFile:string):ConfItems[] {

        let result = separator(fileString, '=');
        return createArrayConfItems(result,originFile)
    }

    function handleClickItem(e:HTMLDivElement, index:number) {

        let keyContainer = e.children.item(0) as HTMLDivElement
        let valueContainer = e.children.item(1) as HTMLDivElement
        //setFileContent((items) =>items.filter((element,pos) => pos !== index) );
        if(e.className === 'Prev-DataItem-Container') {
            e.className = 'Prev-DataItem-Container Selected'
            keyContainer.className = 'Prev-DataItem-Key-Container Selected'
            valueContainer.className = 'Prev-DataItem-Value-Container Selected'
            let newState = [...fileContent];
            newState[index].selected = true;
            setFileContent(newState);
            setCountSelected(countSelected + 1);

        }

        else {
            e.className = 'Prev-DataItem-Container'
            keyContainer.className = 'Prev-DataItem-Key-Container'
            valueContainer.className = 'Prev-DataItem-Value-Container'
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

    function handleTransferData() {
        setIndex(3);
        setSetter('Import');
        setData(fileContent);
    }
    //local states
    const [fileName, setFileName] = useState('none')
    const [fileContent, setFileContent] = useState(new Array<ConfItems>());
    const [countSelected, setCountSelected] = useState(0);
    //global states
    const [,setIndex] = useGlobalState('index');
    const [,setSetter] = useGlobalState('setter')
    const [,setData] = useGlobalState('data')

    const KeyContainer = React.createRef<HTMLDivElement>()


    useEffect(() => {

    },[fileContent])


    return (
        <div className="ImportData-Wrapper">
            <CssBaseline/>
            <Container maxWidth="xl">
                <div className="Import">
                    <div className='Import-Header'>
                        <span className="Import-Header-Text">Pick File [.cfg]</span>
                    </div>
                </div>
            </Container>
            <Container maxWidth="xl">
                <div className="Import-Body">
                    <i className="bx bxs-file-import Open-Icon" onClick={() => fileInput.current?.click()}/>
                    {fileName !== 'none' && fileContent.length !== 0 && <Chip label={fileName} size="medium" style={{color: "gainsboro"}} variant="outlined" color="primary" icon={<AttachFileIcon/>}/>}
                </div>
            </Container>
            <Container maxWidth="xl">
            {fileContent.length !== 0 && <div className="Import-Preview">
            <Container maxWidth="xl">
                <Stack direction="column" overflow={"hidden"}
                       spacing={1} mt={2} paddingX={2} paddingBottom={2} borderBottom={1} borderColor={"grey.100"}>
                    <Stack direction="row" spacing={3}>
                        <Typography style={{fontWeight: "bold"}} variant="subtitle2" display="block"  color={"gainsboro"}>
                            Current: {fileContent.length}
                        </Typography>
                        <Typography style={{fontWeight: "bold"}} variant="subtitle2" display="block"  color={"gainsboro"}>
                            Current: {countSelected}
                        </Typography>


                    </Stack>
                    <ButtonGroup fullWidth>
                        <Button variant="contained"
                                size="small"
                                color="error"
                                startIcon={<DeleteIcon/>}
                                onClick={() => handleClickTrash()}>
                            Delete selected
                        </Button>
                        <Button variant="contained"
                                size="small"
                                startIcon={<SendIcon/>}
                                color="primary"
                                onClick={() => handleTransferData()}>
                            Send to Data
                        </Button>
                    </ButtonGroup>

                </Stack>
            </Container>
                <div className="Import-Preview-Body">
                    <React.Fragment>
                        {fileContent.map(item => <div
                                          key={item.meta.id}
                                          className="Prev-DataItem-Container"
                                          ref={React.createRef}
                                          onClick={(e) =>
                                                    handleClickItem(e.currentTarget, fileContent.indexOf(item))}>
                            <div className="Prev-DataItem-Key-Container" ref={KeyContainer}>
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
            </Container>
        </div>

    );
}

export {ImportData};
export type { ConfItems, ConfItemsMeta };
