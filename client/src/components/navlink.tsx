
import React from "react";
import {SidebarState} from "./sidebar";


export interface LinkItem {
    iconClass: string
    linkName: string
}

let lastClickedElement: HTMLDivElement[] = [];

/**
 * NavLink Component only one link can be active
 */
export class NavLink extends React.Component {
    constructor(props:LinkItem) {
        super(props)
        this.item = props;
        this.state = {collapsed: false}
    }
    item:LinkItem;
    state: SidebarState

    handleCollapseSidebar = (status:boolean) => {
        this.setState({collapsed: status})
    }




    handleClick = (e:HTMLDivElement) => {

        if(lastClickedElement.length > 0)
        {
            lastClickedElement[0].className = "link"
            lastClickedElement.pop();
            e.className = "link clicked";
            lastClickedElement.push(e);
        }
        else {
            e.className = "link clicked";
            lastClickedElement.push(e);
        }
    };

    render() {
        let linkObject;
        if(!this.state.collapsed) {
            linkObject = <span className="link-name">{this.item.linkName}</span>
        }
        return(
        <li>
            <div className="link" onClick={(e) => this.handleClick(e.currentTarget)}
                 ref={React.createRef<HTMLDivElement>()}>
                <i className={this.item.iconClass}/>
                {linkObject}
            </div>
        </li>);
        
    }
}





