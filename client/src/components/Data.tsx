import React, {useEffect, useState} from "react";
import {ConfItems} from "./ImportData";
import {useGlobalState} from "./ContentContainer";
import {checkArrayDiffOrig} from "../data/LoadFile";
import {v4 } from 'uuid'

const Data = () => {
    //global state
    const [data,setData] = useGlobalState('data')
    // local state
    const [showOrigins, setShowOrigins] = useState(false)
    const [showCheckOriginIcon, setShowOriginIcon] = useState(false)
    const [diffOrigin, setDiffOrigin] = useState([] as string[])

    function handleClickHeaderButton() {
        setShowOrigins(!showOrigins)
        setDiffOrigin(checkArrayDiffOrig(data))
    }

    function handleCheckOrigin() {
        setShowOriginIcon(!showCheckOriginIcon)

    }

    useEffect(() => {

        // fired component will unmount
        return () => {setData(new Array<ConfItems>());}


    },[setData]);

    return (
        <div className="Data-Wrapper">
            {data.length !== 0 && <div className="Data-Header">
                <button className="Header-Filter-Button"
                        onClick={() => handleClickHeaderButton()}><i className="bx bx-filter-alt"/>Fil. Origins
                </button>
            </div> }
            {showOrigins && <div className="Data-Header-Body">
                <React.Fragment>
                    {diffOrigin.map(item => <span className="Origin-Filter-Item" onClick={() => handleCheckOrigin()} key={v4()}>
                        {showCheckOriginIcon && <i className="bx bx-check"/>}
                        {item}
                    </span>)}
                </React.Fragment>

            </div> }
        </div>

    )
}

export {Data}