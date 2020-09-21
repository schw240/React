import React, { useState } from 'react';

export default function TodoList2(){

    const [todoList, setTodoList] = useState([]);
    const [text, setText] = useState("");
    // const ex = (e) => {
    //     setText(e.target.value)
    // }

    const click = () => {
        setTodoList([...todoList,text]);
        setText("");
    }

    const press = (e) => {
        if(e.key == 'Enter') {
            click();
        }
    }


    const deleteTodo = (index) => {
        setTodoList([...todoList.slice(0,index),
                     ...todoList.slice(index+1, todoList.length)]);
        
    }


    return (
        <>
        <input value={text}
               onChange={(e)=>setText(e.target.value)} onKeyPress={press}/>
        <button onClick={click}>TodoList 추가</button>
        {
            todoList.map((v, i)=>{
                return <Todo i={i} v={v} deleteTodo={deleteTodo}/>
            })
        }
        </>
    )
}

function Todo({i, v, deleteTodo}){
    const list_delete = (e) => {
        deleteTodo(i)
    }

    return (
    <div>
        {i} {v} <button onClick={list_delete}>삭제</button>
    </div>
    )
}