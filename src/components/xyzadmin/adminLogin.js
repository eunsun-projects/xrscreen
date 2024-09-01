"use client"
import { useState, useCallback, useEffect, React } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AdminMain from './adminMain.js';
import { auth, db } from '@/firebase/firebaseClient.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, getDocs } from 'firebase/firestore';

function AdminLogin({host}) {

    const [login, setLogin] = useState(false);
    const [mpModels, setMpModels] = useState([]);

    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    // 필드 방문 상태를 관리한다
    const [touched, setTouched] = useState({
        email: false,
        password: false,
    });
    
    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    };

    // blur 이벤트가 발생하면 touched 상태를 true로 바꾼다
    const handleBlur = e => {
        setTouched({
            ...touched,
            [e.target.name]: true,
        })
    };

    // 필드값을 검증한다.
    const validate = useCallback(() => {
        let errors = {
            email: "잘못된 이메일 입니다",
            password: "잘못된 비밀번호 입니다",
        }
        if (values.email === '' && values.password === '') {
            errors.email = "이메일을 입력하세요"
            errors.password = "비밀번호를 입력하세요"
        } else if (values.password === '') {
            errors.email = "잘못된 이메일 값입니다"
            errors.password = "비밀번호를 입력하세요"
        } else if (values.email === '') {
            errors.email = "이메일을 입력하세요"
            errors.password = "잘못된 비밀번호 값입니다"
        } else {
            // console.log('성공적')
            errors.email = ""
            errors.password = ""
        }
        return errors;
    }, [values]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // 모든 필드에 방문했다고 표시한다.
        setTouched({
            email: true,
            password: true,
        })
    
        // 필드 검사 후 잘못된 값이면 제출 처리를 중단한다.
        const errors = validate()
        // 오류 메세지 상태를 갱신한다
        setErrors(errors)
        // 잘못된 값이면 제출 처리를 중단한다.
        if (Object.values(errors).some(v => v)) {
            return;
        }

        // 서버로 로그인 요청 보내기
        try {
    
            const req = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                }),
            };

            const responseWork = async (response) => {
                if (response.ok) {
                    console.log(response)
                    const result = await response.json();
                    // 서버로부터 로그인 성공 응답을 받으면 처리
                    console.log('로그인 성공:', result);
                    return true;
                } else {
                    // 서버에서 로그인 실패 응답을 받으면 오류 메시지를 표시
                    alert('다시 제대로 입력하고 해라')
                    setErrors({
                        ...errors,
                        email: '권한이 없습니다!',
                        password: '잘못된 비밀번호 입니다!',
                    });
                    return false;
                }
            }

            const firebaseWork = (isSuccess, {email, password}) => {
                if(isSuccess){
                    let modelsCopy = [];
                    signInWithEmailAndPassword(auth, email, password)
                        .then(async (auth)=>{
                            console.log(auth.user)
                            const allModels = query(collection(db, 'mp_models'));
                            const querySnapshot = await getDocs(allModels);
                            querySnapshot.forEach((e)=>{
                                modelsCopy.push(e.data());
                            })
                            setMpModels(modelsCopy);
                        })
                        .then(()=>{
                            alert('어서오세요!')
                            setLogin(true);
                        })
                        .catch(err => console.log(err));
                }else{
                    console.log('로그인 중 에러 발생한 듯?')
                }  
            };

            const response = await fetch(`/api/adminlogin`, req );

            const isSuccess = await responseWork(response);
            firebaseWork(isSuccess, values);

        } catch (error) {
            console.error('로그인 요청 중 오류 발생:', error);
        }
    };

     // if(Config().baseUrl === "production"){
            //     const response = await fetch(`https://xr.screenxyz.net/api/adminlogin`, req );
            //     const result = await response.json();

            //     responseWork(response, result);
            //     firebaseWork(values);
            // }else{

             // } 

    // 입력값이 변경될때 마다 검증한다.
    useEffect(() => {
        validate();
    }, [validate])
    
    return (
        <>
        { login && ( <AdminMain mpModels={mpModels}/> )}
        { !login && (
                <Form className="col-md-5 mx-auto mt-5" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            name='email'
                            placeholder="Enter email" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.email && errors.email && <p>{errors.email}</p>}
                        <Form.Text className="text-muted" style={{ fontWeight : "800"}}>
                            Administrator Only.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            name='password'
                            placeholder="Password" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {/* 비밀번호 오류메시지를 출력한다 */}
                        {touched.password && errors.password && <span>{errors.password}</span>}
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            )}
        </>
    );
}

export default AdminLogin;