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

function separation(input:string, sep:string):Promise<Array<string[]>> {
    return new Promise((resolve, reject) => {
        try {
            let slb = voca.split(input, '\n')
            let noWhiteSpace = slb.map(item => voca.trim(item))
            let deleteEmpty = noWhiteSpace.filter(item => item !== '')
            resolve(deleteEmpty.map(item => voca.split(item,sep)))
        }
       catch (err) {
            reject(err);
       }
    });
}

// Iterate of every entry in outer array, item set as Type ConfItems
function createArrayConfItems(items: Array<string[]>,fileName:string): Array<ConfItems> {
    let container: Array<ConfItems> = [];
    for(let i = 0; i < items.length; i++) {
        container.push({meta: {id: v4(), origin: fileName}, key: items[i][0],value: items[i][1]})
    }
    return container;
}

function checkArrayDiffOrig(items: ConfItems[]):string[] {
   return items.map(item => item.meta.origin).filter((val,index,self) => self.indexOf(val) === index )

}

function setPrefixConfItems(items: ConfItems[]): ConfItems[] {
    //match only digits (without white space) from start and ends with underline (positive lookahead)
    //let regex = new RegExp('[^\\n]\\d*(?=_)');
    //let regex = new RegExp('^\\S\\d*(?=_)')
    let regex = new RegExp('^[\\d]\\d*(?=_)')
    items.forEach((ele,index) => {
        regex.exec(ele.key)?.map(e => items[index].meta.prefix = e)
    })

    return items
}

function getKeyWithoutPrefix(item: ConfItems):string {

    let prefix = item.meta.prefix;
    return voca.substr(item.key, voca.count(prefix))

}

function isKeyEndsWith(item: ConfItems, endsWith:string): boolean {
    return voca.endsWith(item.key, endsWith)
}


export {loadFile,separator,separation, createArrayConfItems,
    checkArrayDiffOrig, setPrefixConfItems, getKeyWithoutPrefix, isKeyEndsWith}