
import React from "react";
import {ConfItems} from "./ImportData";
import styled from "styled-components";

interface dataItemProps {
    item: ConfItems
    onClickItem(id:string):void
}
const DataItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  height: 30px;
  border-radius: 10px;
  align-items: center;
  justify-content: flex-start;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`
const DataItemContainerKey = styled.div`
  display: flex;
  color: gainsboro;
  align-items: center;
  padding-left: 10px;
  min-height: 2em;
  max-height: 2em;
  max-width: 45%;
  min-width: 45%;
  background-color: rgba(22, 25, 46, 0.8);
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-right: 2px solid gainsboro;
  overflow-x: hidden;
  
`
const DataItemContainerValue = styled.div`
  display: flex;
  color: gainsboro;
  align-items: center;
  padding-left: 10px;
  min-height: 2em;
  max-height: 2em;
  max-width: 55%;
  min-width: 55%;
  background-color: rgba(28, 36, 97, 0.9);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow: hidden;
`
const DataItem = (props:dataItemProps) => {

    const {item, onClickItem} = props
    const localClickItem = (id:string) => onClickItem(id)

    return(
        <DataItemContainer onClick={() =>localClickItem(item.meta.id)}>
            <DataItemContainerKey>
                {item.key}
            </DataItemContainerKey>
            <DataItemContainerValue>
                {item.value}
            </DataItemContainerValue>
        </DataItemContainer>
    )
}


export {DataItem}