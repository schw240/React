import React from 'react';


export default function Exam1() {

  
    const students = [
      {name:'이수만', age:'60', address:'인천'},
      {name:'유희열', age:'45', address:'서울'},
      {name:'방시혁', age:'43', address:'부산'},
      {name:'박진영', age:'34', address:'광주'}
    ]
  
  
    return (
      <>
        <table>
          <tr>
            <th>이름</th>
            <th>나이</th>
            <th>주소</th>
          </tr>
          {students.map((student, index) => {
            return <tr><td>{student.name}</td> <td>{student.age}</td> <td>{student.address}</td></tr>
        })}
        </table>
  
      </>
    );
}