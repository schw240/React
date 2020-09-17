import React from 'react';

function Button() {

    const [text, inputFruit] = React.useState('')
    
    const click1 = () => {
      inputFruit("딸기")
    }

    const click2 = () => {
        inputFruit("바나나")
      }

    const click3 = () => {
        inputFruit("사과")
    }

    return (
        <>
        <div>
            {text}
        </div>
        <div>
            <button onClick={click1}>딸기</button>
            <button onClick={click2}>바나나</button>
            <button onClick={click3}>사과</button>
        </div>
        </>  
    );

  }
  export default Button;