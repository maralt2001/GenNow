
import React from "react";
import {useGlobalState} from "./ContentContainer";


function Home (props:any)  {

    const [,setIndex] = useGlobalState('index');
    const [,setSetter] = useGlobalState('setter')

    function handleCardClick(pos:number) {
        setIndex(pos);
        setSetter('Home');

    }

    return (
        <div className="Home">
          <div className="Home-Card-One">
              <div className="Home-Card-One-Header">
                <i className="bx bx-news"/>
                  <span>Update</span>
              </div>
          </div>
          <div className="Home-Card-Two" onClick={() => handleCardClick(2)}>
            <div className="Home-Card-Two-Header">
                <i className="bx bx-import"/>
                <span>Import</span>
            </div>
          </div>
          <div className="Home-Card-Three" onClick={() => handleCardClick(3)}>
            <div className="Home-Card-Three-Header">
                <i className="bx bx-data"/>
                <span>Data</span>
            </div>
          </div>

        </div>

    );
}

export {Home}