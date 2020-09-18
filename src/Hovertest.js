import React from 'react';

function Hovertest() {
    const style={
        width:'100px',
        height:'100px',
        fontSize:'20px',
        backgroundColor:'yellow',
        textAlign:'center',
        lineHeight:'100px'
    }

    const [state, setState] = React.useState();

    const onHover = (e) => {
        setState(1);
    }     
    
    const offHover = (e) => {
        setState(0);
    }
    return(
        <>
            {state ? <div style={style} onMouseOver={onHover} onMouseOut={offHover}>{state}</div> : <div style={style} onMouseOver={onHover} onMouseOut={offHover}>{state}</div>}
        </>
    )
        
}

export default Hovertest;