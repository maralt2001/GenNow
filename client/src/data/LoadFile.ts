import {ConfItems} from "../components/ImportData";
import {v4 } from 'uuid'
import voca from 'voca'

// Load File from Input HTML Element type file
function loadFile(element:HTMLInputElement):Promise<string> {
    return new Promise<string>((resolve,reject) => {
        const reader = new FileReader();
        if(element.files) {
            reader.readAsText(element.files[0],'utf8');
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = () => reject();
        }
        else {
            reject();
        }

    })

}

// First remove line breaks and white space, second split by separator. Returns Array<string[]>
function separator(input:string, sep:string):Array<string[]> {

    try {
        //separate string by line breaks
        let slb = voca.split(input, '\n')
        // delete white spaces
        let noWhiteSpace = slb.map(item => voca.trim(item))
        let deleteEmpty = noWhiteSpace.filter(item => item !== '')
        //separate by equal
        return deleteEmpty.map(item => voca.split(item,sep))
    }
    catch {
        return [];
    }
}



// Iterate of every entry in outer array, item set as Type ConfItems
function createArrayConfItems(items: Array<string[]>): Array<ConfItems> {
    let container: Array<ConfItems> = [];
    for(let i = 0; i < items.length; i++) {

        container.push({id: v4(), key: items[i][0],value: items[i][1]})
    }
    return container;
}


export {loadFile,separator, createArrayConfItems}