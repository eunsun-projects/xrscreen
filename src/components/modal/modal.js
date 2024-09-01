"use client"

export default function Modal({children}){
    
    return(
        <dialog style={{display: "block"}}>
            {children}
        </dialog>
    )
}