
import React from "react";
import {useGlobalState} from "./ContentContainer";


function Home (props:any)  {

    const [,setIndex] = useGlobalState('index');
    const [,setSetter] = useGlobalState('setter')

    function handleCardClick(pos:number) {
        setIndex(pos);
        setSetter('Home');

    }

    function handleExpandClick(pos:string, Icon:HTMLElement) {
        if(Icon.className === 'bx bx-plus Expand') {
            Icon.className = 'bx bx-minus Expand'
            let elements = document.getElementsByClassName(`Home-Card-${pos}-Body`) as HTMLCollection;
            let element = elements[0] as HTMLDivElement;
            element.className = `Home-Card-${pos}-Body Active`;

        }
        else {
            Icon.className = 'bx bx-plus Expand'
            let elements = document.getElementsByClassName(`Home-Card-${pos}-Body Active`) as HTMLCollection
            let element = elements[0] as HTMLElement
            element.className = `Home-Card-${pos}-Body`
        }
    }

    return (
        <div className="Home">
          <div className="Home-Card-One">
              <div className="Home-Card-One-Header">
                  <i className="bx bx-news"/>
                  <span>News</span>
                  <i className="bx bx-plus Expand"
                     ref={React.createRef()}
                     onClick={(e) => handleExpandClick('One',e.currentTarget)}/>
              </div>
              <div className="Home-Card-One-Body">
                <span>
                    This app was last updated on February 26th 2022.
                </span>
              </div>
          </div>
          <div className="Home-Card-Two" >
            <div className="Home-Card-Two-Header">
                <i className="bx bx-import" onClick={() => handleCardClick(2)}/>
                <span>Import</span>
                <i className="bx bx-plus Expand"
                   ref={React.createRef()}
                   onClick={(e) => handleExpandClick('Two',e.currentTarget)}/>
            </div>
              <div className="Home-Card-Two-Body">
                <span>
                    Data import module to add your configuration items via .cfg file.
                </span>
                  <i className='bx bxs-chevrons-left' onClick={() => handleCardClick(2)}/>
              </div>
          </div>
          <div className="Home-Card-Three">
            <div className="Home-Card-Three-Header">
                <i className="bx bx-data" onClick={() => handleCardClick(3)}/>
                <span>Data</span>
                <i className="bx bx-plus Expand"
                   ref={React.createRef()}
                   onClick={(e) => handleExpandClick('Three',e.currentTarget)}/>
            </div>
              <div className="Home-Card-Three-Body">
                <span>
                    Data view module. Before you can view the data you have to import them first.
                </span>
                  <i className='bx bxs-chevrons-left' onClick={() => handleCardClick(3)}/>
              </div>
        </div>
    </div>
    );
}

export {Home}