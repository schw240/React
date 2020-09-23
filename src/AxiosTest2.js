import React from 'react';
import Axios from 'axios';
import API from 'Api';


export default function AxiosTest2() {

    const [scores, setScores] = React.useState([]);
    const [id, setId] = React.useState(null);
    
    React.useEffect(()=>{
        API.get("study/scores/")
        .then(res => {
            console.log(res);
            const { data } = res;
            setScores(data);
        }).catch(error=>{
            console.log(error);
        })
    }, [])

    const click = (e) => {   
        console.log(e.target.id);
        setId(e.target.id);
    }
    
    return(
        <div>
            {
                scores.map((v)=>{
                    return <div id={v.id} onClick={click}>{v.name}</div>
                })
            }
            <hr/>
            <AxiosTestDetail id={id}/>
        </div>
    )
}


function AxiosTestDetail({id}) {
    const [score, setScore] = React.useState(null)
    
    React.useEffect(()=> {
        API({
            method:"GET",
            url:"study/scores/" + id
        })
        .then(res => {
            console.log(res);   
            const { data } = res;  
            setScore(data);
        }).catch(error=>{
            console.log(error);
        })
    },[id])

    return(
    <div>
        {score && <div>
            <p>{score.name}</p>    
            <p>{score.math}</p>    
            <p>{score.english}</p>    
            <p>{score.science}</p>    
        </div>}
    </div>
    )
}

