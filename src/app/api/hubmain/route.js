import adminReady from "../../../firebase/firebaseAdmin";
import { headers } from "next/headers";

export const dynamic = 'force-dynamic';

export async function GET (){

    try{
        // 요청 본문 파싱
        // const req = await request.json();
        // console.log(req)

        // 헤더에서 인증 토큰 추출
        const headersList = headers();
        const referer = headersList.get("authorization");
        const token = referer ? referer.split(' ')[1] : null;

        // 토큰 검증 로직 (예: 환경 변수에 저장된 토큰과 비교)
        if (!token || token !== process.env.POST_TOKEN) {
            return Response.json({message: '요청 헤더 토큰 확인하세요'} , {status: 401})
        }

        const firestore = adminReady.firestore();

        // get hubs data
        const hubsCollection = await firestore.collection('screenhub').get();
        const hubsData = hubsCollection.docs.map((doc)=> doc.data());

        const responseObject = {
            hubs : hubsData,
            message : '허브데이터 겟 성공'
        };

        return Response.json(responseObject, {status: 200});


    }catch(error){
        console.log('흠...무서워서 원', error.message)

        return Response.json({message: error.message} , {status: 401})
    }

}