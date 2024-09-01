import { compare } from 'bcryptjs';
// import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs';

export async function POST(req){
    try{
        const envpassword = process.env.BASICPW;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(envpassword, salt);

        const { email, password } = await req.json(); // next js 공식문서에서 이렇게 쓰랍니다...
        const isValid = await compare(password, hash); // 비밀번호를 비교하는 함수는 비동기일 수 있음

        // 이메일 검증 (예시로만 제공됨)
        if (email !== 'hello@screenxyz.net') {

            throw new Error("wrongEmail");

        } else if (!isValid) {

            throw new Error('wrongPassword');

        } else {

            // 검증 성공
            // return NextResponse.json(
            //     { message: '로그인 성공!' },
            //     { status: 200 }
            // );

            return Response.json({ message: '로그인 성공!' })

        }
        
    } catch(error) {
        const statusText = error.message === 'wrongEmail' ? '잘못된 이메일입니다!' : error.message === 'wrongPassword' ? '잘못된 비밀번호입니다!' : '인증 오류 발생';

        return Response.json({ message: statusText }, {status: 401});

        // return NextResponse.json(
        //     { error: statusText },
        //     { status: 401 }
        // );
    }
}

// const { email, password } = req.body;

// console.log(email)
// console.log(password)
// console.log(process.env.BASICPW)

// if (password !== process.env.BASICPW) {
//     return NextResponse.json(
//         { error: '잘못된 비밀번호 입니다!' },
//         { 
//             status: 401,
//             statusText : 'wrongPassword'
//         }
//     );
// }

// export async function GET(req){
//     try{
        
//         return Response.json({ message: "is this work?"});

//     }catch(error){

//         return Response.json({ message: "An error occurred", error: error });

//     }
// }