import {ConfItems} from "../components/ImportData";
import {v4 } from 'uuid'

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
        let filter_1 = input.replace(/(\r\n|\n|\r)/gm, " ");
        let filter_2 = filter_1.split(' ').filter(item => item !== "");
        return filter_2.map(item => item.split(sep))
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