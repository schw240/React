import React from 'react';
import 'App.css';
import 'antd/dist/antd.css';
// import Count from 'Count';
// import Hello from 'Hello';
// import Buttontest from 'Buttontest';
// import Welcome from 'Welcome';
// import Students from 'Students';
// import Toggle from 'Toggle';
// import Statechange from 'Statechange';
// import Statechange2 from 'Statechange2';
// import Statechange3 from 'Statechange3';
import Hovertest from 'Hovertest';
// import Parenttest from 'Parenttest';
import Gugudan from 'Gugudan';
// import TodoList from 'TodoList';
// import Add from 'Add';
import TestEvent from 'TestEvent';
import TodoList2 from 'TodoList2';
import CountArray from 'CountArray';
import Clock from 'Clock';
import Master from 'Master';
import ClockAdd from 'ClockAdd';
import Game from 'Game';
import './CssGame.css'

function Parents()
{
  const [num, setNum] = React.useState(50)
  const changeNumber = (number) => {
    setNum(number);
  }
  return (
    <>
      {num}
      <Child changeNumber={changeNumber} 
             color={"red"}
             number={10}
             student={{name:'홍길동', age:35, address:'인천'}}
      />
    </>
  )
}
function Child({changeNumber, color, number, student})
{
  // const x = {name:"홍길동", age:35};
  // const {name, age} = x;  
  console.log(number)
  console.log(color)
  console.log(student)
  const click = () => {
    changeNumber(10)
  }
  return(
    <>
    <button onClick={click}>클릭</button>
    </>
  )
}

function StateTest() {
  const [x1, setX1] = React.useState(10)
  const [x2, setX2] = React.useState("안녕하세요")
  const [x3, setX3] = React.useState({name:"홍길동", age:35, address:"서울시"})
  const [x4, setX4] = React.useState([1,2,3,4,5,6])

  //이 방식은 기존 데이터를 다 없애고 데이터를 집어넣게 됨
  const click = () => {
    //... spread 함수를 이용하면 나머지는 유지되고 변경 요소 하나만 변경이됨
    // ...은 전에 있던거를 하나로 쫙 펼친다는 의미
    setX3({...x3,age:40});
    setX4([...x4.slice(0,2  ),0 ,0, ...x4.slice(4,6)]);
  }

  return (
    <>
      <div>{x1}</div>
      <div>{x2}</div>
      <div>{x3.name} {x3.age}</div>
      <div>{x4[0]} {x4[1]} {x4[2]} {x4[3]}</div>
      <button onClick={click}>클릭</button>

      <div>{JSON.stringify(x3)}</div>
      <div>{JSON.stringify(x4)}</div>

    </>
  )
  
}


function JsxTest() {

  
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

function Button() {
  const [state, setState] = React.useState("True 입니다.")
  
  const change = (e) => {
    setState(e.target.getAttribute("name"))
  }


  return (        
    <>
        <div>{state}</div>
        {
          (()=> {
            if (state == "False 입니다.")
              return <div><button data="True" name="True 입니다." onClick={change}>클릭</button></div>
            else if(state == "True 입니다.")
              return <div><button data="False" name="False 입니다." onClick={change}>클릭</button></div>
          })()
        }
    </>
  )
}

function App() {

//   let click = () => {
//     alert('이벤트발생')
// }

  return (
    <div>
      {/* <TestEvent onClick={click}/> */}
      {/* <Gugudan/> */}
      {/* <TestEvent/> */}
      {/* <Hovertest/>
      <TodoList2/> */}
      {/* <CountArray/> */}
      {/* <Clock/> */}
      {/* <Master/> */}
      <Game/>
    </div>
  );
}

export default App;
