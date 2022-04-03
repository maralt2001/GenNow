import React, {useEffect, useState} from "react";
import {ConfItems} from "./ImportData";
import {useGlobalState} from "./ContentContainer";
import styled from "styled-components";
import {checkArrayDiffOrig,setPrefixConfItems, getKeyWithoutPrefix, isKeyEndsWith} from "../data/LoadFile";
import {DataItem} from "./DataItem";
import {ColumnSetter} from "./Setter/ColumnSetter";
import {AliasSetter} from "./Setter/AliasSetter";

/*MaterialUI*/
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {
    Container, Stack, Box, TextField, CssBaseline, Accordion, AccordionDetails,
    AccordionSummary, IconButton, Chip, Typography, Button
} from '@mui/material';





export interface EditColumnName{
    itemID: string
    originColumn: string
    handleChange: Function
    handleConfirm: Function
}

export interface EditAliasName {
    itemID: string
    originAlias: string
    handleChange: Function
    handleConfirm: Function
}

export interface DataElementActive{
    id: string
    isActive: boolean
}

const DataWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  padding-inline: 10%;
  margin-top: 2%;
`
const DataHeader = styled.div`
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-inline: 15px;
  padding-block: 4px;
  background-color: rgba(20, 25, 64, .95);
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  
`
const DataBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 70%;
`
const DataItemContainerBody = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 70vh;
  margin-bottom: 0.5em;
  padding-left: 0.5em;
  padding-right: 0.5em;
  overflow-x: hidden;
  overflow-y: auto;
  gap: 0.3em;
  padding-top: 5px;
  
`

const Data = () => {
    //global state
    const [data,setData] = useGlobalState('data')
    //local state
    const [diffOrigin] = useState(checkArrayDiffOrig(data))
    const [activeItems, setActiveItems] = useState(new Array<string>())
    const [dataElementActive, setDataElementActive] = useState<DataElementActive>({id: "", isActive: false})
    const [expanded, setExpanded] = useState(false)
    const [activeFilter, setActiveFilter] = useState({active: false, typ: '' as string})
    const [dataFiltered, setDataFiltered] = useState(new Array<ConfItems>())
    const [editColumn, setEditColumn] = useState({active: false, columnName: '' as string})
    const [editAlias, setEditAlias] = useState({active: false, aliasName: '' as string})



    function handleClickOriginItem(item:HTMLDivElement) {

       //item is in activeItems => remove it
       if(activeItems.includes(item.innerText)) {
           let elements = activeItems.map((el => el)).filter(e => e !== item.innerText)
           setActiveItems(elements)
       }
       // item is not in activeItems => push it
       else {
           let elements = activeItems.map(el => el);
           elements.push(item.innerText)
           setActiveItems(elements)
       }
       //Todo Filter
       setPrefixConfItems(data)



    }

    function handleClickDataItem(itemID:string) {
        dataElementActive.id === itemID? setDataElementActive({id: "", isActive: false}):
                                         setDataElementActive({id: itemID, isActive: true})
    }

    function handleClickFilter(itemID: string, filterName: string) {

            let result = data.find(ele => ele.meta.id === itemID)
            switch (filterName) {
                case "prefix": {
                    if(result?.meta.prefix !== undefined && !activeFilter.active) {

                        let filter = data.filter(item => item.meta.prefix === result?.meta.prefix)
                        setDataFiltered(filter)
                        setActiveFilter({active: true, typ: filterName})
                        break

                    }
                    else {
                        setActiveFilter({active: false, typ: ''})
                        break
                    }
                }
                case "column": {
                    if(result?.meta.column !== undefined && !activeFilter.active) {

                        let filter = data.filter(item => item.meta.column === result?.meta.column)
                        setDataFiltered(filter)
                        setActiveFilter({active: true, typ: filterName})
                        break

                    }
                    else {

                        setActiveFilter({active: false, typ: ''})
                        break
                    }
                }
                case "alias": {
                    if(result?.meta.alias !== undefined && !activeFilter.active) {

                        let filter = data.filter(item => item.meta.alias === result?.meta.alias)
                        setDataFiltered(filter)
                        setActiveFilter({active: true, typ: filterName})
                        break

                    }
                    else {

                        setActiveFilter({active: false, typ: ''})
                        break
                    }
                }

            }



    }

   function handleEditColumn() {

        setEditColumn({active: !editColumn.active, columnName:''});
   }

   function handleEditAlias() {
        setEditAlias({active: !editAlias.active, aliasName: ''})
   }

   function handleChangeEditColumn(value: string) {
        if(editColumn.active) {
            setEditColumn({active: true, columnName: value})
        }

   }

   function handleChangeEditAlias(value:string) {
        if(editAlias.active) {
            setEditAlias({active: true, aliasName: value})
        }
   }

   function handleConfirmEditColumn(similar:boolean) {

        if(editColumn.active && !similar) {
            setEditColumn({active: false, columnName: editColumn.columnName})
            data.filter(item => item.meta.id === dataElementActive.id).map(ele => ele.meta.column = editColumn.columnName)
        }
        if(editColumn.active && similar) {

            setEditColumn({active: false, columnName: editColumn.columnName})
            let key:string;
            if(hasItemPrefix(dataElementActive.id)) {
                let item = data.filter(item => item.meta.id === dataElementActive.id)[0]
                key = (getKeyWithoutPrefix(item))
            }
            else {
                key = data.filter(item => item.meta.id === dataElementActive.id)[0].key

            }
            data.filter(item => isKeyEndsWith(item,key)).map(ele => ele.meta.column = editColumn.columnName)

        }

   }

   function handleConfirmEditAlias(similar:boolean) {
        if(editAlias.active && !similar) {
            setEditAlias({active: false, aliasName: editAlias.aliasName})
            setItemAlias(dataElementActive.id)
        }
        if(editAlias.active && similar) {
            setEditAlias({active: false, aliasName: editAlias.aliasName})

            if(hasItemPrefix(dataElementActive.id)) {

                const prefix = data.filter(item => item.meta.id === dataElementActive.id)[0].meta.prefix
                data.filter(el => el.meta.prefix === prefix).map(ele => ele.meta.alias = editAlias.aliasName)
            }
            else {
                setItemAlias(dataElementActive.id)
            }
        }
   }

   function hasItemPrefix(id: string): boolean {
       let item = data.filter(item => item.meta.id === id)[0];
       return item.meta.prefix !== undefined && item.meta.prefix !== "";

   }

   function getItemColumn(id: string):string {

        let item = data.filter(item => item.meta.id === id);
        if(item[0].meta.column) {
            return item[0].meta.column;
        }
        return ""

   }

   function getItemAlias(id:string):string {
       let item = data.filter(item => item.meta.id === id);
       if(!!item[0].meta.alias) {
           return item[0].meta.alias;
       }
       return ""
   }

   function setItemAlias(id:string) {
       data.filter(item => item.meta.id === id).map(ele => ele.meta.alias = editAlias.aliasName)
   }

   function handleDeleteItem(id: string) {
       let temp = [...data]
       let result = temp.filter(ele => ele.meta.id !== id).map(ele => ele)
       setData(result)
       setDataElementActive({id:"", isActive: false})

   }

    async function SaveAsJson() {
        let saveData = JSON.stringify(data,null,2)
        let element = document.createElement('a');
        element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(saveData));
        element.setAttribute('download', "test.json");
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    //Component unmount
    useEffect(() => {

        // fired component will unmount
        return () => {setData(new Array<ConfItems>());}


    },[setData]);



    return (
        <DataWrapper className="Data-Wrapper">
            <CssBaseline/>
            {/* Header */}
            <Container maxWidth="xl" disableGutters>
                <DataHeader>
                    <Stack direction="row" spacing={3} alignItems={"center"}>
                        <Typography variant="body2" display="block" color={"gainsboro"}>
                            Available data:
                        </Typography>
                        {diffOrigin.length > 0 && data.length !== 0?
                            diffOrigin.map(item => <Chip key={item} label={item} size="small" style={{color: "gainsboro"}} variant="outlined" color="primary" icon={<AttachFileIcon/>}
                                onClick={(item) => handleClickOriginItem(item.currentTarget)}/>
                                )
                            :<Chip label="empty" size="small" style={{color: "gainsboro"}} variant="outlined" color="primary" icon={<AttachFileIcon/>}/>}
                    </Stack>
                </DataHeader>
            </Container>
            {/* Data Items & Meta */}
            <Container maxWidth="xl" disableGutters>
                <Stack direction="row" spacing={1} borderTop={2} borderColor={"grey.100"} >
                    <DataBody>
                    {activeItems.length > 0 && activeItems.map(item =>
                            <Accordion key={item} expanded={expanded} onChange={() => setExpanded(!expanded)}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}
                                                  aria-controls="panel1aContent"
                                                  id="panel1aHeader">
                                <p style={{margin:0, color: "rgba(28, 36, 97,1)"}}>Data({activeItems.indexOf(item) +1})</p>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {!activeFilter.active &&
                                    <DataItemContainerBody>
                                        {data.filter(ele => ele.meta.origin === item).map(e =>
                                            <React.Fragment key={e.meta.id}>
                                                <div onClick={() => handleClickDataItem(e.meta.id)}>
                                                    <DataItem item={e} clicked={dataElementActive.isActive && e.meta.id === dataElementActive.id}/>
                                                </div>
                                            </React.Fragment>)}
                                    </DataItemContainerBody>}
                                    {activeFilter.active &&
                                    <DataItemContainerBody>
                                        {dataFiltered.map(e =>
                                            <React.Fragment key={e.meta.id}>
                                                <div onClick={() => handleClickDataItem(e.meta.id)}>
                                                    <DataItem item={e} clicked={dataElementActive.isActive && e.meta.id === dataElementActive.id}/>
                                                </div>
                                            </React.Fragment>)}
                                    </DataItemContainerBody>}
                                </AccordionDetails>
                            </Accordion>
                        )}
                        </DataBody>

                <Stack direction="column" padding={2} bgcolor={"whitesmoke"} overflow={"hidden"}>
                    <Box sx={{maxWidth: 500}}>
                        <TextField disabled
                                   id="outlined-disabled"
                                   size="small"
                                   label="id"
                                   fullWidth
                                   value={dataElementActive.id}/>
                        <TextField disabled
                                   id="field-origin"
                                   size="small"
                                   label="origin"
                                   margin="normal"
                                   fullWidth
                                   value={data.filter(item => item.meta.id === dataElementActive.id).map(item => item.meta.origin)}/>
                        <Stack direction="row" spacing={1}>
                                <TextField disabled
                                           id="field-alias"
                                           size="small"
                                           label="alias"
                                           margin="normal"
                                           fullWidth
                                           value={editAlias.active? editAlias.aliasName: data.filter(item => item.meta.id === dataElementActive.id).map(item => item.meta.alias)}/>
                                <IconButton aria-label="edit-alias" color="secondary" onClick={() => handleEditAlias()}>
                                    <EditIcon/>
                                </IconButton>
                                <IconButton aria-label="filter-alias" color={activeFilter.active && activeFilter.typ === "alias"? "success": "primary"} onClick={() => handleClickFilter(dataElementActive.id, "alias")}>
                                    <FilterAltIcon/>
                                </IconButton>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <TextField disabled
                                           id="field-prefix"
                                           size="small"
                                           label="prefix"
                                           margin="normal"
                                           fullWidth
                                           value={data.filter(item => item.meta.id === dataElementActive.id).map(item => item.meta.prefix)}/>
                                <IconButton aria-label="edit-prefix" color="secondary">
                                    <EditIcon/>
                                </IconButton>
                                <IconButton aria-label="filter-prefix"
                                            color={activeFilter.active && activeFilter.typ === "prefix"? "success": "primary"}
                                            onClick={() =>
                                    handleClickFilter(dataElementActive.id,"prefix")}>
                                    <FilterAltIcon/>
                                </IconButton>
                            </Stack>
                            <Stack direction="row" spacing={0}>
                                <TextField disabled
                                           id="field-column"
                                           size="small"
                                           label="column"
                                           margin="normal"
                                           fullWidth
                                           value={editColumn.active? editColumn.columnName: data.filter(item => item.meta.id === dataElementActive.id).map(item => item.meta.column)}/>
                                <IconButton aria-label="edit-column" color="secondary" onClick={() => handleEditColumn()}>
                                    <EditIcon/>
                                </IconButton>
                                <IconButton aria-label="filter-column" color={activeFilter.active && activeFilter.typ === "column"? "success": "primary"} onClick={() => handleClickFilter(dataElementActive.id, "column")}>
                                    <FilterAltIcon/>
                                </IconButton>
                            </Stack>
                            <Stack mt={2} direction="row" spacing={2}>
                                <Button disabled={!dataElementActive.isActive} variant="outlined" color="error" style={{background: "white"}}
                                        onClick={() => handleDeleteItem(dataElementActive.id)}>Delete Item</Button>
                                <Button variant="outlined" color="primary" style={{background: "white"}}>Load Data</Button>
                                <Button variant="outlined" color="secondary" style={{background: "white"}} onClick={() => SaveAsJson()}>Save Data</Button>
                            </Stack>
                        {editColumn.active && <ColumnSetter
                            itemID={dataElementActive.id}
                            originColumn={getItemColumn(dataElementActive.id)}
                            handleChange={(value:string) => handleChangeEditColumn(value)}
                            handleConfirm={(similar:boolean) => handleConfirmEditColumn(similar)}/>}
                        {editAlias.active && <AliasSetter
                            itemID={dataElementActive.id}
                            originAlias={getItemAlias(dataElementActive.id)}
                            handleChange={(value:string) => handleChangeEditAlias(value)}
                            handleConfirm={(similar:boolean) => handleConfirmEditAlias(similar)}/>}
                        </Box>

                    </Stack>

                </Stack>
            </Container>
        </DataWrapper>

    )
}

export {Data}