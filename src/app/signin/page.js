import GoogleLogin from "@/components/loginlogout/googlelogin"

export default function SigninPage(){

    return(
        <GoogleLogin />
    )
}

// export default function SigninPage(props){

//     return(
//         <GoogleLogin error={props.searchParams?.error} />
//     )
// }