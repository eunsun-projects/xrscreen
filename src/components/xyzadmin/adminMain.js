"use client"
import { useState, React, useMemo, lazy, Suspense, memo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Dropdown, DropdownButton, Navbar, Container, Nav} from 'react-bootstrap';
import CoordInspector from "./coord-inspec";
import DbConsole from './dbConsole';
const ObjInspector = lazy(() => import('./obj-inspec.js'));
import styles from './styles.module.css';

const AdminMain = memo(function AdminMain({mpModels}) {
    const [ model, setModel ] = useState([]);
    const [ selected, setSelected] = useState({});
    const [ isOpen, setIsOpen ] = useState(true);
    const [ isCoord, setIsCoord ] = useState(false);
    const [ isObj, setIsObj ] = useState(false);
    const [ isConsole, setIsConsole ] = useState(false);

    const handleSelect = (item) => {
        setSelected(item);
        sessionStorage.setItem('sid', item.sid);
    };
    const handleMainClick = () => {
        setIsObj(false);
        setIsCoord(false);
        setIsConsole(false);
        setIsOpen(true);
    };

    const handleConsoleClick = () =>{
        setIsObj(false);
        setIsCoord(false);
        setIsOpen(false);
        setIsConsole(true);
    };

    const handleCoordClick = () => {
        if(selected.sid !== undefined && selected.sid !== null && Object.keys(selected).length !== 0){
            setIsObj(false);
            setIsCoord(true);
            setIsConsole(false);
            setIsOpen(false);
        }else {
            alert('모델먼저선택할것');
        }  
    };
    const handleObjClick = () => {
        if(selected.sid !== undefined && selected.sid !== null && Object.keys(selected).length !== 0 ){
            setIsObj(true);
            setIsCoord(false);
            setIsConsole(false);
            setIsOpen(false);
        }else {
            alert('모델먼저선택할것');
        }        
    }

    useMemo(()=>{
        const result = mpModels.map((e,i)=>{
            return {title : e.name, sid : e.sid}
        });
        setModel(result);
    },[mpModels])

    return(
        <div className={styles.admin_container} >
            <Navbar bg="dark" data-bs-theme="dark" style={{ padding : "0" }}>
                <Container>
                    <Navbar.Brand onClick={handleMainClick} style={{cursor:'pointer'}}>SCREEN-ADMIN-CONSOLE</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link onClick={handleConsoleClick}>dbConsole</Nav.Link>
                            <Nav.Link onClick={handleCoordClick}>GetCoord</Nav.Link>
                            <Nav.Link onClick={handleObjClick} >ObjSimul</Nav.Link>
                        </Nav>
                </Container>
            </Navbar>
            {isConsole && model.length > 0 && ( <DbConsole models={model}/> )}
            <Suspense fallback={<div className='loading'>loading</div>}>
            {isObj && ( <ObjInspector /> )}
            </Suspense>
            {isCoord && ( <CoordInspector selected={selected}/> )}
            {isOpen && (
                <>
                    <div className={styles.heading}>
                        <h1 style={{ color : "#88fd93", textDecoration : "underline"}}>screenxyz&apos;s console!</h1>
                    </div>
                        {model.length > 0 && (
                            <>
                                <h5 className='col-md-6 mx-auto' style={{ paddingTop : '5vh', textAlign : 'center' }}>드롭다운에서 모델을 선택하세요</h5>
                                <DropdownButton className='mx-auto' style={{ display : "flex", justifyContent : "center", alignItems : "center", height : "100px"}} id="dropdown-basic-button" title="====== Select Sid =====">
                                    {model.map((item)=>{
                                            return <Dropdown.Item onClick={() => handleSelect(item)} key={item.title}>{item.title}</Dropdown.Item>
                                        })}
                                </DropdownButton>
                                {Object.keys(selected).length > 0 && (
                                    <div className='selected-model' style={{ textAlign : "center" }}>
                                        <h4>선택된 모델은</h4>
                                        <h2><span style={{ color:'blue'}}>{selected.title}</span>, 고유번호는 <span style={{ color:'blue'}}>{selected.sid}</span> 입니다</h2>
                                    </div>
                                )}         
                                <div className={`${styles.go_wrapper} col-md-6 mx-auto`} style={{ marginBottom : "5vh" }}>
                                    <Button variant="secondary" className={styles.gogo} onClick={handleCoordClick}>좌표시뮬레이터로 가기</Button>
                                    <Button variant="secondary" className={styles.gogo} onClick={handleObjClick}>객체시뮬레이터로 가기</Button>
                                </div>
                                <div className={`${styles.go_wrapper} col-md-6 mx-auto`}>
                                    <Button variant="success" className={styles.gogo} onClick={handleConsoleClick}>데이터베이스 콘솔로 가기</Button>
                                </div>

                            </>
                        )}
                </>
            )}
        </div>
    )
});
export default AdminMain;