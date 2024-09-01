import { getServerSession } from "next-auth"
import LoginBtn from "@/components/loginlogout/loginBtn";
import LogoutBtn from "@/components/loginlogout/logoutBtn";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ReplyForm from "@/components/reply/replyform";
import Config from "../../../config/config.export";
import PopupLoginBtn from "@/components/loginlogout/popuploginbtn";

export async function getData(){
    try{
        const response = await fetch(`${Config().baseUrl}/api/reply`, { next: { revalidate: 3600 } });
        const result = await response.json();

        return result.replies;
    } catch(error) {
        console.log(error)
    }
};

export default async function ReplyTest(){

    const session = await getServerSession(authOptions);
    const data = await getData();

    session ?? console.log(session)

    return(
        <div style={{ width: "100%", height: "fit-content", backgroundColor: "gray"}}>

            {/* {session ? (<div>로그아웃 <LogoutBtn /></div>) : (<div>로그인 <LoginBtn /></div> )} */}
            <PopupLoginBtn serverSession={session}/>
            
            <ReplyForm replies={data} serverSession={session}/>

        </div>
    )
}