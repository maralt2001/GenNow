
import React, {useState, useEffect, useRef} from 'react';
import {useGlobalState} from "./ContentContainer";


export const Sidebar = () => {
    // internal Component State
    const [collapsed, setCollapsed] = useState(false);
    const [clickedLinkIndex, setClickedLinkIndex] = useState(0)
    const [currentActiveLink, setCurrentActiveLink] = useState({} as HTMLDivElement)
    const container = useRef<HTMLDivElement>(null)

    // Global App State
    const [LinkNumberGlobal,setLinkNumberGlobal] = useGlobalState('index');
    const [globalSetter,setGlobalSetter] = useGlobalState('setter')

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

    function handleChangeSetter (pos:number) {
        let elements = container.current?.children as HTMLCollection;
        let result = Array.from(elements).filter(items => items.className === "Link"
                                                || items.className === "Link LinkActive") as HTMLDivElement[];
        result[pos -1].click()


    }

    // Called when Component is rerender
    useEffect(() => {

        if(globalSetter === 'Home') {
            handleChangeSetter(LinkNumberGlobal);
            setGlobalSetter('none')
        }


    },[LinkNumberGlobal,globalSetter, setGlobalSetter]);

    return (
        <div className={collapsed? "Sidebar-Wrapper Collapsed": "Sidebar-Wrapper"}>
            <nav>
                <div className="Sidebar-Header">
                    <h2 className="Header-Brand">GenNow</h2>
                    <i className="bx bx-menu Header-Icon" onClick={() => handleToggleMenu()}/>
                </div>
                <div className="Sidebar-Body" ref={container}>
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
