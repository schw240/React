import React from 'react';

const classContext = React.createContext("");


export default function ContextApiTest2() {

    const [className, setClassName] = React.useState("");

    return (
        <classContext.Provider value={className}>
        <div>
            과정명 <input onChange={(e)=>setClassName(e.target.value)}/>
        </div>
        </classContext.Provider>
    )
}



function Child1() {
    const [students, setStudents] = React.useState([]);
    const [student, setStudent] = React.useState({
        name:'',
        age:0
    });

    const change = (e) => {
        const {value, name} = e.target;
        setStudent({
            ...student,
            [name]:value
        })
    }

    const click = (e) => {

    }
    
    return(
        <div>
            <div>
                학생 이름 <input name="name" value={student.name} onChange={change}/>
                나이 <input name="age" value={student.age} onChange={change}/>
                <button>등록</button>
            </div>
        </div>
    )
}