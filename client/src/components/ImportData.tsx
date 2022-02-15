
import React from "react";

const ImportData = (props:any) => {

    const fileInput = React.createRef<HTMLInputElement>();

    return (
        <div>
            <input ref={fileInput}
                   type="file"
                   name="data"
                   style={{display: "none"}}/>
            <button className="Import-Button"
                    onClick={() => fileInput.current?.click()}>Select File</button>
        </div>

    );
}

export {ImportData}