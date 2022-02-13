
import React from "react";


export const Header = (props:any) => {

    return (
        <div className="Header-Wrapper">
            <p>{`Link Index: ${props.data}`}</p>
        </div>
    )
}