
import React from 'react';
import { createGlobalState } from 'react-hooks-global-state';
import {Header} from "./Headerbar";
import {ImportData, ConfItems} from "./ImportData";
import {Home} from "./Home";
import {Data} from "./Data";

const initialState = { index: 0, setter: 'none', data: new Array<ConfItems>()};
const { useGlobalState } = createGlobalState(initialState);

function ContentContainer() {
    const [index,] = useGlobalState('index');

    return (
    <div className="Content-Wrapper">
       <Header data={index}/>
        {index === 1 && <Home/>}
        {index === 2 && <ImportData/>}
        {index === 3 && <Data/>}
    </div>);
}

export {ContentContainer, useGlobalState}