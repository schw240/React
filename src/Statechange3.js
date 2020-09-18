import React from 'react';

function Statechange3() {
    const [num, setNum] = React.useState(0);
    const [num2, setNum2] = React.useState(0);
    const [num3, setNum3] = React.useState(0);

    return (
        <>
            <div>
                <input value={num} onChange={e => setNum(e.target.value)}/>
                +
                <input value={num2} onChange={e => setNum2(e.target.value)}/>
                =
                <input value={Number(num)+Number(num2)}/>
            </div>
        </>
    )
}

export default Statechange3;