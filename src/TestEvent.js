import React, { useState } from 'react';


export default function TestEvent() {
    
    const [todoList, setTodoList] = useState([]);
    const [text, setText] = useState("");
    // const ex = (e) => {
    //     setText(e.target.value)
    // }

    const click = () => {
        setTodoList([...todoList,text]);
        setText("");
    }

    return (
        <>
        <input value={text}
               onChange={(e)=>setText(e.target.value)}/>
        <button onClick={click}>구구단</button>
        {
            todoList.map((v, i)=>{
                return <Test i={i} v={v}/>
            })
        }
        </>
    )
}

function Test({i, v}){
    const num = []

    for(let i=1; i<10; i++) {
        num.push(<div>{v} X {i} = {v*i}</div>)
    }

    return (
        <div>
            {num}
        </div>
    )
}