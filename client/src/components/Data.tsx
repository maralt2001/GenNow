import React, {useEffect, useState} from "react";
import {ConfItems} from "./ImportData";
import {useGlobalState} from "./ContentContainer";
import styled from "styled-components";
import {checkArrayDiffOrig,setPrefixConfItems} from "../data/LoadFile";
import {v4 } from 'uuid'
import {DataItem} from "./DataItem";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import FilterAltIcon from '@mui/icons-material/FilterAlt';


interface ActiveSpan {
    active: boolean

}
const DataWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: nowrap;
  align-items: flex-start;
  overflow-x: hidden;
  height: 90vh;
  margin-top: 2rem;
  padding-bottom: 5em;
  padding-inline: 10px;
`
const DataHeader = styled.div`
  position: sticky;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-inline: 2em;
  padding-block: 3px;
  background-color: rgba(28, 36, 97, 0.6);
  border-radius: 5px;
  gap: 1em;
`
const DataBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 1em;
  width: 60%;
`
const DataContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
`
const DataContentMeta = styled.div`
  position: relative;
  display: flex;
  margin-top: 4em;
  margin-left: 2em;
  padding-top: 1em;
  height: 44em;
  width: 25%;
  padding-inline: 1em;
  background-color: rgba(28, 36, 97, 0.2);
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
  margin-top: 1em;
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
    const [activeFilter, setActiveFilter] = useState(false)
    const [dataFiltered, setDataFiltered] = useState(new Array<ConfItems>())



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

    function handleClickFilter(itemID: string) {

            let result = data.find(ele => ele.meta.id === itemID)
            if(result?.meta.prefix !== undefined  && !activeFilter) {

                let filter = data.filter(item => item.meta.prefix === result?.meta.prefix)
                setDataFiltered(filter)
                setActiveFilter(true)

            }
            else {

                setActiveFilter(false)
            }
    }




    //Component unmount
    useEffect(() => {

        // fired component will unmount
        return () => {setData(new Array<ConfItems>());}


    },[setData]);



    return (
        <DataWrapper className="Data-Wrapper">
            {data.length !== 0 && <DataHeader>
                <DataHeaderOriginText className="Data-Header-Text">Available Data(Origin):</DataHeaderOriginText>
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
            </DataHeader>}
            <DataContent>
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
                            {!activeFilter &&
                            <DataItemContainerBody>
                                {data.filter(ele => ele.meta.origin === item).map(e =>
                                   <DataItem item={e} onClickItem={(id) => handleClickDataItem(id)} key={e.meta.id}/>
                                )}
                            </DataItemContainerBody>}
                            {activeFilter &&
                            <DataItemContainerBody>
                                {dataFiltered.map(e =>
                                    <DataItem item={e} onClickItem={(id) => handleClickDataItem(id)} key={e.meta.id}/>
                                )}
                            </DataItemContainerBody>}
                        </AccordionDetails>
                    </Accordion>
                </React.Fragment>)}
                </DataBody>
                <DataContentMeta>
                    <Box sx={{ width: 500}}>
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
                            <IconButton aria-label="filter-prefix" color="primary" onClick={() =>
                                handleClickFilter(dataItemClicked)}>
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
                                       value={data.filter(item => item.meta.id === dataItemClicked).map(item => item.meta.column)}/>
                            <IconButton aria-label="edit-column" color="secondary">
                                <EditIcon/>
                            </IconButton>
                            <IconButton aria-label="filter-column" color="primary">
                                <FilterAltIcon/>
                            </IconButton>
                        </Stack>
                    </Box>

                </DataContentMeta>
            </DataContent>

        </DataWrapper>

    )
}

export {Data}