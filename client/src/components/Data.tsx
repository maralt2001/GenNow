import React, {useEffect, useState} from "react";
import {ConfItems} from "./ImportData";
import {useGlobalState} from "./ContentContainer";
import styled from "styled-components";
import {checkArrayDiffOrig,setPrefixConfItems} from "../data/LoadFile";
import {v4 } from 'uuid'

interface ActiveSpan {
    active: boolean

}
const DataWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: nowrap;
  align-items: center;
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
const DataPreview = styled.div `
  display: flex;
  position: relative;
  width: 100%;
  height: 90%;
  margin-top: 1em;
  padding: 1em 1em;
  background-color: rgba(17, 54, 140, 0.1);
`
const DataPreviewContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  
`


const Data = () => {
    //global state
    const [data,setData] = useGlobalState('data')
    //local state
    const [diffOrigin] = useState(checkArrayDiffOrig(data))
    const [activeItems, setActiveItems] = useState(new Array<string>())
    const [tempData, setTempData] = useState(new Array<ConfItems>())



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
       let result = setPrefixConfItems(data)
       let temp = result.filter(item => item.meta.prefix !== "" &&
                                        item.meta.prefix !== undefined)
                        .map(item => item)
        setTempData(temp)


    }
    //Component unmount
    useEffect(() => {

        // fired component will unmount
        return () => {setData(new Array<ConfItems>());}


    },[setData]);

    useEffect(() => {
        console.log(tempData)
    },[tempData])

    return (
        <DataWrapper className="Data-Wrapper">
            {data.length !== 0 && <DataHeader>
                <DataHeaderOriginText className="Data-Header-Text">Available Data(Origin):</DataHeaderOriginText>
                {diffOrigin.length > 0?
                    diffOrigin.map(item =>
                        <DataHeaderOriginItem
                            key={v4()}
                            active={activeItems.includes(item)}
                            onClick={(e) => handleClickOriginItem(e.currentTarget)}
                            >
                            {item}
                        </DataHeaderOriginItem>)
                :"empty"}
            </DataHeader>}
            <DataPreview>
                {activeItems.length > 0 && data.length > 0 && activeItems.map(origin =>
                <React.Fragment>
                    <DataPreviewContainer key={origin}>
                        {data[1].value}
                    </DataPreviewContainer>
                </React.Fragment>)}
            </DataPreview>
        </DataWrapper>

    )
}

export {Data}