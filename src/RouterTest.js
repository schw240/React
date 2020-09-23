import React from 'react';
import queryString from 'query-string';
import { BrowserRouter, Route, Link, NavLink, Switch } from 'react-router-dom'
import API from 'Api';
import { Menu } from 'antd';


export default function RouterTest() {
    
    const [students, setStudents] = React.useState([]);
    const [id, setId] = React.useState(null);
    const active = {
        color:"skyblue",
    }
    React.useEffect(()=>{
        API.get("study/students/")
        .then(res => {
            console.log(res);
            const { data } = res;
            setStudents(data);
        }).catch(error=>{
            console.log(error);
        })
    }, [])

    const click = (e) => {
        console.log(e.target.id);
        setId(e.target.id);
    }

    return (        
        <>
        <div id="menu" style={{borderBottom:"1px solid lightgray"}}>
        <Menu  style={{display:"inline-block", margin: "20px", marginLeft:"40px", fontSize:"20px"}}  mode="horizontal">
            <Menu.Item><NavLink exact to="/" activeStyle={active}>홈</NavLink></Menu.Item>
            <Menu.Item><NavLink to="/students" activeStyle={active}>학생</NavLink></Menu.Item>
            <Menu.Item><NavLink to="/scores" activeStyle={active}>점수</NavLink></Menu.Item>
        </Menu>
        </div>
        <div id="content">
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/students/:id" component={Detail}/>
            <Route path="/students" component={Students}/>    
            <Route path="/scores" component={Scores}/>                
            <Route component={NoPage}/>
        </Switch>
        </div>
        </>        
    )
}
function Layout({children}) {
    return (
        <>
        <div>디자인다지인~</div>
        {children}
        </>
    )
}
function Home()
{
    
    return(
        <div style={{margin:"10px", fontSize:"20px"}}>
            Home
        </div>
    )
}
function NoPage({history, location, match})
{
    console.dir(location)
    console.dir(match)
    return(
        <div>
            NoPage
        </div>
    )
}
function Students({location, match, history})
{

    const [students, setStudents] = React.useState([]);
    const [id, setId] = React.useState(null);
    
    React.useEffect(()=>{
        API.get("study/students/")
        .then(res => {
            console.log(res);
            const { data } = res;
            setStudents(data);
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
            <div>
            {
                students.map((v)=>{
                    return <div id={v.id} 
                                onClick={click}
                                style={{margin:"15px", borderBottom:"1px solid lightgray", marginTop:"30px"}}
                                >{v.name}
                                <p style={{color:"lightgray", fontSize:"10px"}}>{v.address} / {v.email}</p>
                            </div>    
                })
            }
            </div>
        </div>
    )
}

function Scores({location, match, history})
{
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
                    return <div id={v.id} 
                                onClick={click}
                                style={{margin:"15px", borderBottom:"1px solid lightgray", marginTop:"30px"}}
                                >{v.name}
                                <p style={{color:"lightgray", fontSize:"12px"}}>수학: {v.math} / 과학: {v.science} / 영어: {v.english}/</p>
                                </div>
                })
            }
        </div>
    )
}

function Detail({location, match, history})
{
    console.dir(match);
    console.log(location.search);
    console.log(match.params);
    const qs = queryString.parse(location.search);
    console.dir(qs)
    return(
        <div>
            {match.params.id}
            {qs.name}
            {qs.age}
        </div>
    )
}

