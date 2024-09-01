import axios from "axios"
import Config from "../../../config/config.export";
import dynamic from 'next/dynamic'
const ModelViewer = dynamic(() => import("@/components/model-viewer/modelViewer"), { ssr: false })
// import Dummy from "@/components/dummy"
// import { storage, auth, firebaseInitModelViewer } from "@/firebase/firebaseServer"; // 클라이언트에서 다시 app 초기화 반드시 필요함
// import { ref, getDownloadURL, listAll } from "firebase/storage";

export const getData = async () => {
    try {
        // const result = await axios.get(`${Config().baseUrl}/api/firebase`); 
        // return result.data.viewer;
        const response = await fetch(`${Config().baseUrl}/api/firebase`); 
        const result = await response.json();

        return result.viewer;

    } catch(err) {
        console.log(err)
    }
}

export default async function ModelViewerPage() {
    
    const models = await getData();

    return(
        <>
            <ModelViewer models={models}/> 
            {/* {models && <ModelViewer db={models}/> } */}
            {/* <Dummy db={models}/> */}
        </>
    )
}