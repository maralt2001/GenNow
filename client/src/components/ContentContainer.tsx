
import React from 'react';
import { createGlobalState } from 'react-hooks-global-state';
import {Header} from "./Headerbar";
import {ImportData} from "./ImportData";
import {Home} from "./Home";

const initialState = { index: 0, setter: 'none' };
const { useGlobalState } = createGlobalState(initialState);

function ContentContainer() {
    const [index,] = useGlobalState('index');

    return (
    <div className="Content-Wrapper">
       <Header data={index}/>
        {index === 1 && <Home/>}
        {index === 2 && <ImportData/>}
    </div>);
}

export {ContentContainer, useGlobalState}