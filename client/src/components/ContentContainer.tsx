
import React from 'react';
import { createGlobalState } from 'react-hooks-global-state';
import {Header} from "./Headerbar";

const initialState = { index: 0 };
const { useGlobalState } = createGlobalState(initialState);




function ContentContainer() {
    const [index,] = useGlobalState('index');
    return (
    <div className="Content-Wrapper">
       <Header data={index}/>
    </div>


    )
}



export {ContentContainer, useGlobalState}