import Config from "../../../config/config.export";
import IframeTest from "./iframetest";
// import TestTest from "./testpage"

export async function getData(){
    try {

            const response = await fetch(`${Config().baseUrl}/api/firebase`); 
            const result = await response.json();

            return result;

    } catch(err) {
        console.log(err)
    }
}

export default async function TestPage(){

    const data = await getData();

    return(
        <IframeTest />
        // <TestTest />
    )
}