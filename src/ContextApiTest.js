import React from 'react';


const CntContext = React.createContext(0);

const reducer = (prev, action) => {
    const { type, value } = action;
    if (type === "CHANGE") {
        return value;
    }
}

export default function ContextApiTest() {

    const [cnt, dispatch] = React.useReducer(reducer, 100);

    // const changeCnt = (number) => {
    //     setCnt(number)
    // }


    return (
        <>
            {cnt}
            <div>
                <CntContext.Provider value={{cnt, dispatch}}>
                    <Child1/>
                </CntContext.Provider>
            </div>
        </>
    )
}
function Child1(){
    return(
        <div>
            Child1
            <Child2/>
        </div>
    )
}
function Child2(){
    return(
        <div>
            Child2
            <Child3/>
        </div>
    )
}
function Child3(){
    const {cnt, dispatch} = React.useContext(CntContext)
    const click = () => {
        // changeCnt(100000)
        dispatch({type:"CHANGE", value:10000});
    }
    return(
        <div>
            {cnt}
            <button onClick={click}>변경</button>
        </div>
        // <CntContext.Consumer>
        // {
        //     (cnt) => (
        //         <>
        //             <div>부모에서 보낸 숫자는?</div>
        //             <div>{cnt}</div>
        //         </>
        //     )
        // }
        // </CntContext.Consumer>
    )
}