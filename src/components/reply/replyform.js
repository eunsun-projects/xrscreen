'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './page.module.css'
import { doc, query, onSnapshot, collection, orderBy } from "firebase/firestore";
import { db } from '@/firebase/firebaseClient';
import toLocalISOString from '@/utils/tolocaltimestring';
import { useSession, } from "next-auth/react";

const ReplyForm = ({replies, serverSession}) => {

    const [allReplies, setAllReplies] = useState([]);
    const [submitCount, setSumbitCount] = useState(0);
    const form = useRef();
    
    const { data: session, status } = useSession();

    const sanitizeInput = (input) => {
        return input.replace(/[{}()<>`~!@#$%^&*|\[\]\\\'\";:\/?|]/gim, '');
    };

    // send mail
    const onSubmitForm = async (event) => {
        event.preventDefault();

        try {

            if(status === "unauthenticated"){
                alert('로그인 해주세요');
                return;
            }

            const name = sanitizeInput(form.current.name.value);
            const message = sanitizeInput(form.current.message.value);

            const formpack = {
                name: name,
                message: message
            };

            const req = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formpack)
            };

            const response = await fetch(`/api/reply`, req );

            if (response.ok) {
                const result = await response.json();
                console.log('댓글작성 성공:', result);
                setSumbitCount((prev)=> prev + 1);
            } else {
                alert('댓글 작성 서버에서 실패!');
            }
            

        } catch (error) {
            alert('댓글 작성이 실패하였습니다.');
        }
    }

    useEffect(()=>{

        const q = query(collection(db, "replies"), orderBy("timestamp"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newReplies = snapshot.docs.map((doc) => {
                let data = doc.data();
                    const time = new Date(data.timestamp.seconds * 1000);
                    const formatted = toLocalISOString(time);
                    data.time = formatted;
                    delete data.timestamp;
                return data;
            });
            setAllReplies(newReplies);
        });

        return () => {
            unsubscribe();
        }
    },[submitCount])

    return (
        <div className={styles.contactbox}>
            <p>하고싶은이야기를 남겨보세요↓</p>

            <div>
                {allReplies.length === 0 ? 
                    replies.map((e,i) => (
                        <div key={i}>
                            <p>{e.name} : {e.message} {e.time}</p>
                        </div>
                    )) : 
                    allReplies.map((e,i)=>(
                        <div key={i}>
                            <p>{e.name} : {e.message} {e.time}</p>
                        </div>
                    ))
                }
            </div>

            <form ref={form} className={styles.contactform} onSubmit={onSubmitForm}>
                <label>Name <span className={styles.labelstar}>*</span></label>
                <input type="text" name="name" required/>

                <label>Message <span className={styles.labelstar}>*</span></label>
                <textarea className={styles.textarea} name="message" required />

                <input className={styles.consendbtn} style={{width:'5rem', margin:'1rem auto 0'}}
                    type="submit"
                    value="send"
                />
            </form>
            
        </div>
    )
}

export default ReplyForm

// const validateEmail = (email) => {
//     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//     return emailRegex.test(email);
// };


// const getReplies = async () => {
    
// };
// const q = query(collection(db, "replies"));
// const unsubscribe = onSnapshot(q, (snapshot) => {
//     snapshot.docChanges().forEach((change) => {
//         if (change.type === "added") {
//             let data = change.doc.data();
//                 data.time = new Date(data.timestamp.seconds * 1000).toDateString();
//                 delete data.timestamp;
//             setAllReplies([...allReplies, data]);

//             console.log("New reply: ", data);
//         }
//         if (change.type === "modified") {
//             console.log("Modified reply: ", change.doc.data());
//         }
//         if (change.type === "removed") {
//             console.log("Removed reply: ", change.doc.data());
//         }
//     });
// });