
import React from "react";
import {ConfItems} from "./ImportData";

const DataPreview = (props:any) => {

    const elements:ConfItems[] = props.data;

    return (
        <div className="Data-Preview">
                {elements.map(item => <p key={elements.indexOf(item)}>
                    {item.key} {"=>"} {item.value}
                </p>)}
        </div>
    )
}

export {DataPreview}