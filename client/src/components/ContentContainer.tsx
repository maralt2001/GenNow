
import React from 'react';
import { createGlobalState } from 'react-hooks-global-state';

const initialState = { count: 0 };
const { useGlobalState } = createGlobalState(initialState);




function ContentContainer() {
    const [count, setCount] = useGlobalState('count');
    return (

        <div>
            <span>Counter: {count}</span>
            {/* update state by passing callback function */}
            <button onClick={() => setCount(v => v + 1)}>+1</button>
            {/* update state by passing new value */}
            <button onClick={() => setCount(count - 1)}>-1</button>
        </div>
    )
}



export {ContentContainer}