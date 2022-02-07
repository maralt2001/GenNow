
import React, {useState} from "react";

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
        
    }

    item:LinkItem;

    handleLog = (m:string) => {
        console.log(m);
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
        return(
            <li>
            <div className="link" onClick={(e) => this.handleClick(e.currentTarget)}
                 ref={React.createRef<HTMLDivElement>()}>
                <i className={this.item.iconClass}/>
                <span className="link-name">{this.item.linkName}</span>
            </div>
        </li>);
        
    }
}





