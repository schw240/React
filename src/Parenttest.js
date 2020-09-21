import React from 'react';

function Parenttest()
{

    return (
      <>
        <Childtest 
               x = {10}
               y = {10}
        />
      </>
    )
}

function Childtest({x, y})
{
//   console.log(x)
//   console.log(y)

  return(
    <>
        <div >{x+y}</div>
    </>
  )
}

export default Parenttest;