import React from "react";
import {NavLink, LinkItem} from "./navlink";

const item1: LinkItem = {iconClass: "bx bx-home", linkName: "Home"}
const item2: LinkItem = {iconClass: "bx bx-import", linkName: "Import"}
const item3: LinkItem = {iconClass: "bx bx-data", linkName: "DataView"}

export interface SidebarState {

    collapsed: boolean
}
export class Sidebar extends React.Component {
    constructor(props:any) {
        super(props)
        this.state = {collapsed: false}
        this.linkRefArray.push(React.createRef(),React.createRef(),React.createRef())
    }
    
    state: SidebarState;
    linkRefArray: React.RefObject<NavLink>[] = [];

    handleSidebarToggle():void {
        this.setState(() => {
            if(this.state.collapsed) {
                this.linkRefArray.forEach(x => x.current?.handleCollapseSidebar(false))
             return (
                {collapsed: false}
             )}
            else {
                this.linkRefArray.forEach(x => x.current?.handleCollapseSidebar(true))
              return (
                {collapsed: true}
              )}
        });

    }
 
    render() {
        return (
            <nav className="SidebarWrapper">
            <div className={this.state.collapsed ? "Sidebar Collapsed": "Sidebar"}>
                <div className="Sidebar-Header">
                    <i className='bx bx-lemon'/>
                    <span className="Sidebar-Brand">GenNow</span>
                    <i className="bx bx-sidebar" onClick={() => this.handleSidebarToggle()}/>
                </div>
                <div className="Sidebar-Body">
                    <ul className="Sidebar-Links">
                        <NavLink {...item1} ref={this.linkRefArray[0]}/>
                        <NavLink {...item2} ref={this.linkRefArray[1]}/>
                        <NavLink {...item3} ref={this.linkRefArray[2]}/>
                    </ul>
                </div>
            </div>
        </nav>
        );
    }
}



