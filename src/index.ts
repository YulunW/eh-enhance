// import {saveAs} from 'file-saver'
// import * as JSZip from 'jszip'

// let zip = new JSZip();
// zip.file("page_missing.txt", "123456")
// zip.generateAsync({type: "blob"})
//     .then(function (content) {
//         // see FileSaver.js
//         saveAs(content, "example.zip");
//     });

async function goCatch<Type>(promise: Promise<Type>): Promise<[Type?, Error?]> {
    try {
        const result = await promise;
        return [result, undefined];
    } catch (err) {
        return [undefined, err];
    }
}

export async function test(): Promise<Response | undefined> {
    const [response, error] = await goCatch(fetch("www.google.com"));
    if (error != undefined) {
        return undefined;
    }
    return response;
}
