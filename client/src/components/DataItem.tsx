
import React from "react";
import {ConfItems} from "./ImportData";
import styled from "styled-components";

export interface dataItemProps {
    item: ConfItems
    clicked: boolean

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
  background-color: rgba(22, 25, 46, 0.85);
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-right: 2px solid gainsboro;
  overflow-x: hidden;
  &.click {
    opacity: 0.8;
    color: #73e038;
  }
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
  z-index: 100;
  background-color:  rgba(19, 29, 92, 1);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow: hidden;
  &.click {
    opacity: 0.8;
    color: #73e038;
  }
`
const DataItem = (props:dataItemProps) => {
    const {item, clicked} = props
    return(

            <DataItemContainer>
                <DataItemContainerKey className={clicked? "click": ''}>
                    {item.key}
                </DataItemContainerKey>
                <DataItemContainerValue className={clicked? "click": ''}>
                    {item.value}
                </DataItemContainerValue>
            </DataItemContainer>
    )
}

export {DataItem}