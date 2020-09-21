import React, { useEffect } from 'react';

export default function ClockAdd() {

    const [timer, setTimer] = React.useState([]);
    const [cnt, setCnt] = React.useState(-1);


    
    const click = () => {
        setTimer([...timer, new Date()])
    }


    React.useEffect(() => {
        setCnt(cnt+1)
    }, [timer])
  

    return (
        <>
            타이머개수: {cnt} 
            <button onClick={click}>추가</button>
            {
                timer.map((v) => {
                    return <ClockAddTime startTime={v}/>
                })
            }
        </>
    )
}

function ClockAddTime({startTime}) {

    const [timer, setTimer] = React.useState(0);

    React.useEffect(()=>{
        //컴포넌트가 생성될 때 한번만 실행됨
        setInterval(()=> {
            setTimer(new Date().getTime() - startTime.getTime())
        }, 1000)
    }, [])

    return (
        <div>
            {startTime.toISOString()} / {parseInt(timer / 1000)}  초 지남
        </div>
    )
}