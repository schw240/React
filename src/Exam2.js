import React from 'react';
import API from 'Api';

let url = "https://api.github.com/users?since=1000"


export default function Exam2() {

    const [users, setUsers] = React.useState([]);

    React.useEffect(()=>{
        API.get(url)
        .then(res => {
            const { data } = res;
            console.log(res);
            setUsers(data);
        }).catch(error=>{
            console.log(error);
        })
    }, [])

  
    return (
        <div>
            {
                users.map((v)=>{
                return <div id={v.id}><img style={{width:'30px', height: '30px', borderRadius: '70%'}} src={v.avatar_url}/> {v.login}</div>
                })
            }
        </div>
    );
}
