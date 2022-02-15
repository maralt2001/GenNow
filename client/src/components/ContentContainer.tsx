
import React from 'react';
import { createGlobalState } from 'react-hooks-global-state';
import {Header} from "./Headerbar";
import {ImportData} from "./ImportData";

const initialState = { index: 0 };
const { useGlobalState } = createGlobalState(initialState);

function ContentContainer() {
    const [index,] = useGlobalState('index');
    return (
    <div className="Content-Wrapper">
       <Header data={index}/>
        {index === 2 && <ImportData/>}
    </div>);
}

export {ContentContainer, useGlobalState}