"use client"
import { useState, useEffect, React, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import { setDoc, doc } from 'firebase/firestore';
import { Timestamp } from "firebase/firestore"; 
import { db, storage } from '@/firebase/firebaseClient';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const buttons = [
    ["공개여부", "isPublic"],
    ["오브젝트여부", "object"],
    ["인포로고여부", "logo"],
    ["평면삽입여부", "plane"],
    ["로딩페이지로고여부", "downLogo"],
    ["비디오삽입여부", "video"],
    ["음악삽입여부", "isBgm"],
    ["음악썸네일여부", "bgmLogo"]
];

const top = [
    ["모델 이름", "name", "모델이름적용"],
    ["모델 타이틀(첫화면노출)", "title", "모델타이틀적용"],
    ["모델 sid", "sid", "모델sid적용"]
];

const bottom = [
    ["키워드", "keywords", "키워드적용"],
    ["SEO 설명", "description", "모델설명적용"]
];

function DbConsole({models}){

    const inputRef = useRef();
    // const [top, setTop] = useState(topInput);
    // const [buttons, setButtons] = useState(buttonArr);
    // const [bottom, setBottom] = useState(bottomInput);
    const [ready, setReady] = useState(false);
    const [dataMap, setDataMap] = useState([]);
    const [checked, setChecked] = useState(false);
    const [input, setInput] = useState(false);
    const [selec, setSelec] = useState('');
    const [values, setValues] = useState({
        name : "",
        title : "",
        sid : "",
        isPublic : false,
        object : false,
        logo : false,
        plane : false,
        video : false,
        bgm : false,
        filename : '',
        downLogo : false,
        isBgm : false,
        keywords : '',
        description : "",
    });

    // 필드 방문 상태를 관리한다
    const [touched, setTouched] = useState({
        email: false,
        password: false,
    });

    const [data, setData] = useState({
        name : "",
        title : "",
        sid : "",
        route : "",
        time : '',
        isPublic : false,
        back : "",
        object : [false, ''],
        logo : [false, ''],
        plane : [false, ''],
        video : [false, ''],
        downLogo : [false, ''],
        isBgm : [false, ''],
        keywords : '',
        description : "",
        url : ''
    });

    const [packages, setPackages] = useState({
        back: [],
        logo: [],
        downLogo: [],
        bgmLogo: [],
        isBgm: [],
        video: [],
        object: [],
        plane: [],
    });

    const [files, setFiles] = useState([]);

    const handleChange = e => {
            setValues({
                ...values,
                [e.target.name]: e.target.value,
            })
    };

    const handleClick = e => {
        const names = ["object", "logo", "plane", "downLogo", "video", "isBgm", "bgmLogo"];
            if(e.target.textContent === 'true'){
                setValues({
                    ...values,
                    [e.target.name]: true,
                });
                if(names.includes(e.target.name)){
                    setInput(true);
                    setSelec(e.target.name);
                }
                setChecked(!checked);
            }else if(e.target.textContent === 'false'){
                setValues({
                    ...values,
                    [e.target.name]: false,
                })
                if(names.includes(e.target.name)){
                    setInput(false);
                }
                setChecked(!checked);
            }
    };

    // blur 이벤트가 발생하면 touched 상태를 true로 바꾼다
    const handleBlur = e => {
        setTouched({
            ...touched,
            [e.target.name]: true,
        })
    };

    const handleCheck = e => {
        setChecked(!checked);
        let str = 'name' || 'title' || 'sid' || 'filename' || 'keywords' || 'description';
        if(e.target.name === str){
            setValues({
                ...values,
                [e.target.name]: values[e.target.name]
            })
        }
    };

    const handleSubmit = () =>{
        //JSON.stringify(data, null, 1))
        function callConfirm(){
            if(window.confirm('위의 db 내용이 정확합니까?')){
                alert('서버로 전송합니다');
                [data].forEach((e)=>{
                    setDoc(doc(db, 'mp_models', e.name), e)
                        .then(()=>{
                            alert('전송 성공적');
                        })
                        .catch(err=>console.log(err));
                })
            }else{
                alert('다시하세요');
            }
        }
        callConfirm();
    };

    const handleDelete = (i) => () => {
        const newFiles = [...files.slice(0, i), ...files.slice(i + 1)];

        const store = new DataTransfer();
        newFiles.forEach((file) => store.items.add(file));

        if(inputRef.current){
            inputRef.current.files = store.files; // 새로운 파일리스트로 교체
        }

        setFiles(newFiles)
    };

    const handleFileTransfer = () => {
        const backRef = ref(storage, 'images/assets/background');
        const logoRef = ref(storage, 'images/assets/logo');
        const downLogoRef = ref(storage, `images/assets/downLogo${data.route}`);
        const bgmLogoRef = ref(storage, `images/assets/bgmLogo${data.route}`);
        const glbsRef = ref(storage, `glbs/assets${data.route}`);
        const bgmsRef = ref(storage, `bgms/assets${data.route}`);
        const planesRef = ref(storage, `planes/assets${data.route}`);
        const videosRef = ref(storage, `videos/assets${data.route}`);
        if(window.confirm('위의 files 목록이 정확합니까?')){
            alert('서버로 전송합니다')
            for(let pack in packages){
                let store;
                switch(pack){
                    case "back" :
                        store = backRef;
                        break;
                    case "logo" :
                        store = logoRef;
                        break;
                    case "downLogo" :
                        store = downLogoRef;
                        break;
                    case "bgmLogo" :
                        store = bgmLogoRef;
                        break;
                    case "object" :
                        store = glbsRef;
                        break;
                    case "isBgm" :
                        store = bgmsRef;
                        break;
                    case "plane" :
                        store = planesRef;
                        break;
                    case "video" :
                        store = videosRef;
                        break;
                    default :
                        store = backRef;
                        break;
                }
                fileUpload(packages[pack], store, pack);
            };
        }else{
            alert('다시하세요')
        }
    
        function fileUpload(pack, store, key){
            if(pack.length > 0){
                pack.forEach((e)=>{
                    let refer = ref(store, e.name);
                    const uploadTask = uploadBytesResumable(refer, e);
                    uploadTask.on('state_changed',
                        (snapshot) => {
                            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log('Upload is ' + progress + '% done');
                            switch (snapshot.state) {
                                case 'paused':
                                    console.log('Upload is paused');
                                break;
                                case 'running':
                                    console.log('Upload is running');
                                break;
                            }
                        }, 
                        (error) => {
                            // A full list of error codes is available at
                            // https://firebase.google.com/docs/storage/web/handle-errors
                            switch (error.code) {
                                case 'storage/unauthorized':
                                // User doesn't have permission to access the object
                                break;
                                case 'storage/canceled':
                                // User canceled the upload
                                break;
                                case 'storage/unknown':
                                // Unknown error occurred, inspect error.serverResponse
                                break;
                            }
                        }, 
                        () => {
                            console.log('파일 전송 완료');
                            // Upload completed successfully, now we can get the download URL
                            // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            //     console.log('File available at', downloadURL);
                            // })
                        }
                    )
                }); // foreach end
            }else{
                console.log(`"${key}" = no data`);
            }
        }
    };

    const handleReady = () => {
        setReady(true);
    }

    useEffect(()=>{
        setData({
            name : `${models.length+1}_${values['name']}`,
            title : values['title'],
            sid : values['sid'],
            route : `/${values['name']}`,
            isPublic : values['isPublic'],
            time : new Date(Timestamp.now().seconds*1000).toLocaleDateString(),
            back : `/assets/background/${values['name']}.webp`, // 배경은 무조건 webp
            object : [values['object'], values['object'] ? `models-${values['name']}.js` : '' ],
            logo : [values['logo'], values['logo'] ? `${values['name']}_logo.jpg`:''], // 로고는 무조건 jpg
            plane : [values['plane'], values['plane'] ? `planes-${values['name']}.js`:''],
            video : [values['video'], values['video'] ? values['filename']: ''],
            downLogo : [values['downLogo'], values['downLogo'] ? `${values['name']}_downlogo.png`:''],
            isBgm :[values['isBgm'], '' ], //values['isBgm']? `bgms-${values['name']}.js`: '
            keywords : values['keywords'],
            description : values['description'],
            url : `https://xr.screenxyz.net/${values['name']}`,
            unique : values['name']
        });        

    },[checked, models.length, values])

    useEffect(()=>{
        if(data.name.length > 0 || data.sid.length > 0){
            const keys = Object.keys(data);
            const valuess = Object.values(data);
            setDataMap(keys.map((e,i)=>{
                return (
                    <p key={i}>
                        <span style={{ textDecoration: "underline", fontWeight : "800", color : "rgb(200, 50, 100)" }}>&quot;{e}&quot;</span>
                        <span style={{ whiteSpace : "pre-wrap"}}>     :    </span>
                        <span style={{ fontWeight : "500", color : "rgb(200, 1, 180)"}} >&quot;{ Array.isArray(valuess[i]) ? (valuess[i].toString().replace(',', ' , ')) : valuess[i].toString()}&quot;</span>  
                    </p>)
            }));
        }
    },[data])

    useEffect(()=>{
        if(selec.length > 0 ){
            setPackages((prevPackages) => ({
                ...prevPackages,
                [selec]: files,
            }));    
        }
    },[files, selec])

    return(
        <div className='col-md-10 mx-auto' style={{ marginTop : "3vh"}}>

            <div style={{ backgroundColor : "lightGrey", height: "5.2rem", marginBottom : "0.5rem", borderRadius : "5px", paddingTop : "10px"}}>
                <InputConsole setFiles={setFiles} inputRef={inputRef} files={files} selec={"back"} setInput={setInput} setSelec={setSelec}/> 
            </div>

            {input && ( 
                <div style={{ backgroundColor : "#88fd93", height: "5.2rem", marginBottom : "0.5rem", borderRadius : "5px", paddingTop : "10px"}}>
                    <InputConsole setFiles={setFiles} inputRef={inputRef} files={files} selec={selec} setInput={setInput} setSelec={setSelec}/> 
                </div>
            )}

            {top.map((e,i)=>(
                <InputGroup className="mb-3" key={e[1]}>
                    <Form.Control
                        placeholder={e[0]}
                        aria-label={e[1]}
                        aria-describedby="basic-addon2"
                        name={e[1]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <Button variant="outline-secondary" id="button-addon2" name='name' onClick={handleCheck}>{e[2]}</Button>
                </InputGroup>
            ))}

            <div style={{ display : "flex", justifyContent : "center", gap : "0.7rem", margin : " 1.3rem 0rem "}}>
                {buttons.map((e,i)=>(
                    <DropdownButton
                        key={e[1]}
                        variant="outline-secondary"
                        title={e[0]}
                        id="input-group-dropdown-1"
                        style={{ display : "inline"}}
                    >
                        <Dropdown.Item href="#" name={e[1]} onClick={handleClick}>true</Dropdown.Item>
                        <Dropdown.Item href="#" name={e[1]} onClick={handleClick}>false</Dropdown.Item>
                    </DropdownButton>
                ))}
            </div>

            {bottom.map((e)=>(
                <InputGroup className="mb-3" key={e[1]}>
                    <Form.Control
                        placeholder={e[0]}
                        aria-label={e[1]}
                        aria-describedby="basic-addon2"
                        name={e[1]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <Button variant="outline-secondary" id="button-addon2" name='keywords' onClick={handleCheck}>{e[2]}</Button>
                </InputGroup>

            ))}

            <div>
                {dataMap.map((e,i)=>{
                    return <div key={e+i}>{e}</div>
                })}

                <div className='d-flex justify-content-md-center' style={{ marginBottom : "5vh"}}>
                    <Button variant="primary" onClick={handleSubmit}>DB전송</Button>
                </div>

                <br></br>
                <ul style={{ marginBlockStart : "0px", paddingLeft : "0px"}}>
                    <p style={{ fontWeight : "800" }}>== 전송 대기 파일 목록 ==</p>
                    { files.length > 0 && files.map((e, i)=>(
                        <li key={e.name} style={{ listStyle : "none", width : "80%", display : "flex", marginBottom : "3px" }}>
                            <span style={{whiteSpace : "pre-wrap", flexBasis : "10%"}}>{i}  :  </span>
                            <span style={{flexBasis : "35%"}}>{e.name}</span>
                            <span style={{whiteSpace : "pre-wrap"}}>    </span>
                            <Button variant="success" onClick={handleDelete(i)}>삭제</Button>
                        </li>
                    ))}
                </ul>

                <div className='d-flex justify-content-md-center' style={{ marginBottom : "2.5vh"}}>
                    {ready ? <Button variant="primary" onClick={handleFileTransfer}>File전송</Button> : <Button variant="primary" onClick={handleReady}>준비완료?</Button>}
                </div>
            </div>
        </div>
    )
}
export default DbConsole;

function InputConsole({setFiles, inputRef, files, selec, setInput, setSelec}){

    const handleFiles = e => {
        e.preventDefault();
        let copy;
        if(files.length > 0){
            copy = [...files];
        }else{
            copy = [];
        }

        if(!window.confirm(`선택을 완료하셨습니까?`)){
            return;
        } else {
            copy.push(...e.target.files);
            setSelec(selec)
            setFiles(copy);
            setInput(false);
        }
    };

    return(
        <>        
            {selec === "back" ? (
                <Form.Group controlId="formFileMultiple" className="mb-3" style={{ textAlign : "center" }}>
                    <Form.Label >{selec} 용 사진파일(webp만 가능)선택요망.</Form.Label>
                    <Form.Control name={selec} type="file" multiple ref={inputRef} onChange={handleFiles}/>
                </Form.Group>
            ) : (
                <Form.Group controlId="formFileMultiple" className="mb-3" style={{ textAlign : "center" }}>
                    <Form.Label >{selec} 용 파일 선택요망. 여러 파일을 선택할 수 있습니다.</Form.Label>
                    <Form.Control name={selec} type="file" multiple ref={inputRef} onChange={handleFiles}/>
                </Form.Group>
            )}
        </>
    )
}