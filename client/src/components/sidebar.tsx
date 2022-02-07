import React from "react";
import {NavLink, LinkItem} from "./navlink";

const item1: LinkItem = {iconClass: "bx bx-home", linkName: "Home"}
const item2: LinkItem = {iconClass: "bx bx-import", linkName: "Import"}
const item3: LinkItem = {iconClass: "bx bx-data", linkName: "DataView"}

export interface SidebarState {

    collapsed: boolean
};
export class Sidebar extends React.Component {
    constructor(props:any) {
        super(props)
        this.state = {collapsed: false}
        this.linkRef1 = React.createRef()
        this.linkRef2 = React.createRef()
        this.linkRef3 = React.createRef()
    }
    
    state: SidebarState;
    linkRef1: React.RefObject<NavLink>
    linkRef2: React.RefObject<NavLink>
    linkRef3: React.RefObject<NavLink>

    

    
    handleSidebarToggle():void {
        this.setState(() => {
            if(this.state.collapsed) {
             return (
                {collapsed: false}
             )}
            else {
              return (
                {collapsed: true}
              )}
        });

        this.linkRef1.current?.handleLog("hello child1");
       
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
                        <NavLink {...item1} ref={this.linkRef1}/>
                        <NavLink {...item2} ref={this.linkRef2}/>
                        <NavLink {...item3} ref={this.linkRef3}/>
                    </ul>
                </div>
            </div>
        </nav>
        );
    }
}



