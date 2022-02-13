
import React, {useState, useEffect} from 'react';
import {useGlobalState} from "./ContentContainer";


export const Sidebar = () => {
    // internal Component State
    const [collapsed, setCollapsed] = useState(false);
    const [clickedLinkIndex, setClickedLinkIndex] = useState(0)
    const [currentActiveLink, setCurrentActiveLink] = useState({} as HTMLDivElement)
    // Global App State
    const [,setLinkNumberGlobal] = useGlobalState('index');

    function handleToggleMenu() {
        if(collapsed) {
            setCollapsed(false)
        }
        else {
            setCollapsed(true)
        }
    }

    function handleClickedLink(index:number,e:HTMLDivElement) {
        setClickedLinkIndex(index);
        if(currentActiveLink) {
            currentActiveLink.className = "Link";
            e.className = "Link LinkActive"
            setCurrentActiveLink(e);
            setLinkNumberGlobal(index);
        }
    }

    // Called when Component is rerender
    useEffect(() => {

    },[clickedLinkIndex,currentActiveLink]);

    return (
        <div className={collapsed? "Sidebar-Wrapper Collapsed": "Sidebar-Wrapper"}>
            <nav>
                <div className="Sidebar-Header">
                    <h2 className="Header-Brand">GenNow</h2>
                    <i className="bx bx-menu Header-Icon" onClick={() => handleToggleMenu()}/>
                </div>
                <div className="Sidebar-Body">
                    <div className="Link"
                         ref={React.createRef<HTMLDivElement>()}
                         onClick={(e) => handleClickedLink(1, e.currentTarget)}>
                        <i className="bx bx-home Link-Icon"/>
                        {!collapsed && <span className="Link-Text">Home</span> }
                    </div>
                    <div className="Link"
                         ref={React.createRef<HTMLDivElement>()}
                          onClick={(e) => handleClickedLink(2, e.currentTarget)}>
                        <i className="bx bx-import Link-Icon"/>
                        {!collapsed && <span className="Link-Text">Import</span> }
                    </div>
                    <div className="Link"
                          ref={React.createRef<HTMLDivElement>()}
                          onClick={(e) => handleClickedLink(3,e.currentTarget)}>
                        <i className="bx bx-data Link-Icon"/>
                        {!collapsed && <span className="Link-Text">ViewData</span> }
                    </div>
                </div>
            </nav>
        </div>
    )
}
