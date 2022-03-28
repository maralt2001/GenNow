import React, {useEffect, useState} from "react";
import {ConfItems} from "./ImportData";
import {useGlobalState} from "./ContentContainer";
import styled from "styled-components";
import {checkArrayDiffOrig,setPrefixConfItems, getKeyWithoutPrefix, isKeyEndsWith} from "../data/LoadFile";
import {v4 } from 'uuid'
import {DataItem} from "./DataItem";
import {ColumnSetter} from "./ColumnSetter";

/*MaterialUI*/
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {Container, Stack, Box, TextField, CssBaseline, Accordion, AccordionSummary, AccordionDetails, IconButton}
    from '@mui/material';


interface ActiveSpan {
    active: boolean

}

export interface EditColumnName{
    itemID: string
    originColumn: string
    handleChange: Function
    handleConfirm: Function

}
const DataWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  padding-inline: 10%;
  margin-top: 5%;
`
const DataHeader = styled.div`
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-height: 2.5em;
  padding-inline: 15px;
  padding-block: 4px;
  background-color: rgba(28, 36, 97, 0.8);
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  
`
const DataBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 70%;
`


const DataHeaderOriginText = styled.span`
  color: gainsboro;
  font-size: 1em;
`
const DataHeaderOriginItem = styled.span<ActiveSpan>`
  color: ${props => props.active? "#73e038": "gainsboro"};
  background: transparent;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 8em;
  border: ${props =>
    props.active? "2px solid #73e038":
        "1px solid gainsboro"};
  border-radius: 3px;
  padding: 0.25em 0.75em;
  margin: ${props => props.active? "-1px": ""};
  &:hover {
    cursor: pointer;
  }
`
const DataItemContainerBody = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 40em;
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
    const [dataItemClicked, setDataItemClicked] = useState('')
    const [expanded, setExpanded] = useState(false)
    const [activeFilter, setActiveFilter] = useState({active: false, typ: '' as string})
    const [dataFiltered, setDataFiltered] = useState(new Array<ConfItems>())
    const [editColumn, setEditColumn] = useState({active: false, columnName: '' as string})



    function handleClickOriginItem(item:HTMLSpanElement) {

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
        setDataItemClicked(itemID)

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

            }



    }

   function handleEditColumn() {

        setEditColumn({active: !editColumn.active, columnName:''});
   }

   function handleChangeEditColumn(value: string) {
        if(editColumn.active) {
            setEditColumn({active: true, columnName: value})
        }

   }

   function handleConfirmEditColumn(similar:boolean) {

        if(editColumn.active && !similar) {
            setEditColumn({active: false, columnName: editColumn.columnName})
            data.filter(item => item.meta.id === dataItemClicked).map(ele => ele.meta.column = editColumn.columnName)
        }
        if(editColumn.active && similar) {

            setEditColumn({active: false, columnName: editColumn.columnName})
            let key:string;
            if(hasItemPrefix(dataItemClicked)) {
                let item = data.filter(item => item.meta.id === dataItemClicked)[0]
                key = (getKeyWithoutPrefix(item))
            }
            else {
                key = data.filter(item => item.meta.id === dataItemClicked)[0].key

            }
            data.filter(item => isKeyEndsWith(item,key)).map(ele => ele.meta.column = editColumn.columnName)

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



    //Component unmount
    useEffect(() => {

        // fired component will unmount
        return () => {setData(new Array<ConfItems>());}


    },[setData]);



    return (
        <DataWrapper className="Data-Wrapper">
            <CssBaseline/>
            {/* Header */}
            <Container maxWidth="xl">
                {data.length !== 0 && <DataHeader>
                    <Stack direction="row" spacing={3} alignItems={"center"}>
                        <DataHeaderOriginText>Available Data(Origin):</DataHeaderOriginText>
                        {diffOrigin.length > 0?
                            diffOrigin.map(item =>
                                <DataHeaderOriginItem
                                    active={activeItems.includes(item)}
                                    onClick={(e) => handleClickOriginItem(e.currentTarget)}
                                    key={v4()}
                                >
                                    {item}
                                </DataHeaderOriginItem>)
                            :"empty"}
                    </Stack>
                </DataHeader>}
            </Container>
            {/* Data Items & Meta */}
            <Container maxWidth="xl">
                <Stack direction="row" spacing={1} borderTop={2} borderColor={"grey.100"} >
                    <DataBody>
                    {activeItems.length > 0 && activeItems.map(item =>
                        <React.Fragment key={v4()}>
                            <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}
                                                  aria-controls="panel1aContent"
                                                  id="panel1aHeader">
                                <p style={{margin:0, color: "rgba(28, 36, 97,1)"}}>Data({activeItems.indexOf(item) +1})</p>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {!activeFilter.active &&
                                    <DataItemContainerBody>
                                        {data.filter(ele => ele.meta.origin === item).map(e =>
                                           <DataItem item={e} onClickItem={(id) => handleClickDataItem(id)} key={e.meta.id}/>
                                        )}
                                    </DataItemContainerBody>}
                                    {activeFilter.active &&
                                    <DataItemContainerBody>
                                        {dataFiltered.map(e =>
                                            <DataItem item={e} onClickItem={(id) => handleClickDataItem(id)} key={e.meta.id}/>
                                        )}
                                    </DataItemContainerBody>}
                                </AccordionDetails>
                            </Accordion>
                        </React.Fragment>)}
                        </DataBody>

                <Stack direction="column" padding={2} bgcolor={"whitesmoke"} overflow={"hidden"}>
                    <Box sx={{maxWidth: 500}}>
                        <TextField disabled
                                   id="outlined-disabled"
                                   size="small"
                                   label="id"
                                   fullWidth
                                   value={dataItemClicked}/>
                        <TextField disabled
                                   id="field-origin"
                                   size="small"
                                   label="origin"
                                   margin="normal"
                                   fullWidth
                                   value={data.filter(item => item.meta.id === dataItemClicked).map(item => item.meta.origin)}/>
                        <Stack direction="row" spacing={1}>
                                <TextField disabled
                                           id="field-alias"
                                           size="small"
                                           label="alias"
                                           margin="normal"
                                           fullWidth
                                           value={data.filter(item => item.meta.id === dataItemClicked).map(item => item.meta.alias)}/>
                                <IconButton aria-label="edit-alias" color="secondary">
                                    <EditIcon/>
                                </IconButton>
                                <IconButton aria-label="filter-alias" color="primary">
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
                                           value={data.filter(item => item.meta.id === dataItemClicked).map(item => item.meta.prefix)}/>
                                <IconButton aria-label="edit-prefix" color="secondary">
                                    <EditIcon/>
                                </IconButton>
                                <IconButton aria-label="filter-prefix"
                                            color={activeFilter.active && activeFilter.typ === "prefix"? "success": "primary"}
                                            onClick={() =>
                                    handleClickFilter(dataItemClicked,"prefix")}>
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
                                           value={editColumn.active? editColumn.columnName: data.filter(item => item.meta.id === dataItemClicked).map(item => item.meta.column)}/>
                                <IconButton aria-label="edit-column" color="secondary" onClick={() => handleEditColumn()}>
                                    <EditIcon/>
                                </IconButton>
                                <IconButton aria-label="filter-column" color={activeFilter.active && activeFilter.typ === "column"? "success": "primary"} onClick={() => handleClickFilter(dataItemClicked, "column")}>
                                    <FilterAltIcon/>
                                </IconButton>
                            </Stack>
                        {editColumn.active && <ColumnSetter
                            itemID={dataItemClicked}
                            originColumn={getItemColumn(dataItemClicked)}
                            handleChange={(value:string) => handleChangeEditColumn(value)}
                            handleConfirm={(similar:boolean) => handleConfirmEditColumn(similar)}/>}
                        </Box>

                    </Stack>

                </Stack>
            </Container>
        </DataWrapper>

    )
}

export {Data}