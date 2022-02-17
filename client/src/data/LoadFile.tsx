

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

function separator(input:string, sep:string):string[] {
    try {
        return input.split(sep)
    }
    catch {
        return [];
    }

}

export {loadFile,separator}