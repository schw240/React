import React from 'react';

function Statechange2() {
    const [number, setNumber] = React.useState([1,2,3,4,5,6,7,8,9]);


    const click2 = () => {
        setNumber([...number.slice(0,4), 0, 0, ...number.slice(6,9)])
    }

    return (
        <>
            <div>{JSON.stringify(number)}<button onClick={click2}>클릭</button></div>
        </>
    )
}

export default Statechange2;