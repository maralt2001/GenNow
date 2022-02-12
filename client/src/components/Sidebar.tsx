
import React, {RefObject} from 'react';


interface SidebarState {
    collapsed: boolean
}

class Sidebar extends React.Component {
    constructor(props:any) {
        super(props);
        this.elements = props;
        this.state = {collapsed: false}
        this.linkRefArray.push(
            React.createRef<HTMLDivElement>(),
            React.createRef<HTMLDivElement>(),
            React.createRef<HTMLDivElement>()
        );
    }

    elements:any;
    linkRefArray: RefObject<HTMLDivElement>[] = [];
    lastClickedLink: HTMLDivElement[] = [];
    state: SidebarState;

    handleMenuToggle() {
        this.setState((status:SidebarState) => {

            if(status.collapsed) {

                return (
                    {collapsed: false}
                )
            }
            else {

                return (
                    {collapsed: true}
                )
            }
        })
    }

    handleClickedLink(e:HTMLDivElement) {
        if(this.lastClickedLink.length === 0) {
            e.className = "Link LinkActive"
            this.lastClickedLink.push(e);
        }
        else {
            this.lastClickedLink[0].className = 'Link'
            this.lastClickedLink = [];
            e.className = "Link LinkActive"
            this.lastClickedLink.push(e);
        }
    }

    render() {
        return(
           <div className={this.state.collapsed ? "Sidebar-Wrapper Collapsed": "Sidebar-Wrapper"}>
               <nav>
                   <div className="Sidebar-Header">
                       <h2 className="Header-Brand">GenNow</h2>
                       <i className="bx bx-menu Header-Icon" onClick={() => this.handleMenuToggle()}/>
                   </div>
                   <div className="Sidebar-Body">
                        <div className="Link"
                             ref={this.linkRefArray[0]}
                             onClick={(e) => this.handleClickedLink(e.currentTarget)}>
                            <i className="bx bx-home Link-Icon"/>
                            {!this.state.collapsed && <span className="Link-Text">Home</span>}
                        </div>
                       <div className="Link"
                            ref={this.linkRefArray[1]}
                            onClick={(e) => this.handleClickedLink(e.currentTarget)}>
                            <i className="bx bx-import Link-Icon"/>
                            {!this.state.collapsed && <span className="Link-Text">Import</span>}
                       </div>
                       <div className="Link"
                            ref={this.linkRefArray[3]}
                            onClick={(e) => this.handleClickedLink(e.currentTarget)}>
                            <i className="bx bx-data Link-Icon"/>
                            {!this.state.collapsed && <span className="Link-Text">ViewData</span>}
                       </div>
                   </div>
               </nav>
           </div>
        );
    }
}

export {Sidebar}

//TODO Check Props of Sidebar