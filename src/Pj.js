import React, { useState } from 'react';
import 'App.css';
import 'antd/dist/antd.css';
import jwt from 'jwt-decode';
import { Menu, Button, Input, DatePicker } from 'antd';
import queryString from 'query-string';
import API from 'Api';
import { HeartOutlined, BarsOutlined, PlusOutlined } from '@ant-design/icons';
import { BrowserRouter, Route, Link, NavLink, Switch } from 'react-router-dom';
import { List, Avatar } from 'antd';
import Home from 'pages/Home';
import Favourite from 'pages/Favourite';
import FavouriteGroup from 'pages/FavouriteGroup';
import Todo from 'pages/Todo';
import TodoGroup from 'pages/TodoGroup';
import Login from 'account/Login';
import Empty from 'Empty';
import LoginContext from 'account/Util'



const { SubMenu } = Menu;



export default function Pj() {
    const [state, setState] = React.useState({visible:false});
    const [favourite, setFavourite] = useState({name:''});
    const {name} = favourite;

    const change = (e) => {
        const {name, value} = e.target;
        setFavourite(prevState=> ({
            ...prevState,
            [name]:value,
        })); 
    }

    const handleClick = e => {
        console.log('click ', e);
      };

    const [isLogin, setIsLogin] = React.useState(false);

    React.useEffect(()=>{
  
      const token = window.localStorage.getItem("token")

    

      if (token!=null){
  
        const decode_token = jwt(token);
        const now = new Date();
        
  
        if(decode_token.exp * 1000 < now.getTime())
        {        
          console.log("기간이 지난토큰");
          window.localStorage.removeItem("token");
          setIsLogin(false);
        }
          
  
      }else{
        setIsLogin(false);
      }
      
    });

    const logout = () => {
      window.localStorage.removeItem("token");
      setIsLogin(false);
    }

      return (
        <>
        <div id="header">
            Todo Project
        </div>
        <LoginContext.Provider value={{isLogin, setIsLogin}}>
        <div id="menu">
        <Menu
            onClick={handleClick}
            style={{ width: '270px', height: '100%' }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <HeartOutlined />
                  <span>즐겨찾기</span>
                </span>
              }
            >
                <Menu.Item key="1">
                  <Link to="/favouritegroup">그룹관리</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="favourite">즐겨찾기</Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <BarsOutlined />
                  <span>할일</span>
                </span>
              }
            >
              <Menu.Item key="3">            
                  <Link to="/todogroup">그룹관리</Link>            
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/todo">할일</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </div>
        {/* <div id="add">
            <Button type="primary" onClick={showModal}>
                추가
            </Button>
            <Modal
            title="등록"
            visible={state.visible}
            onCancel={handleCancel}
            onOk={handleOk}
            okText="등록"
            cancelText="취소"
            >
            <div class="modal">
                <p>명칭:<input style={{border: '1px solid lightgray',height: '30px',marginLeft: '20px', width:'80%'}} type="text"></input></p>
                <p>상태:<select style={{border: '1px solid lightgray',height: '30px',marginLeft: '20px', width:'80%'}} name="state">
                            <option value=""></option>
                            <option value="할일">할일</option>
                            <option value="진행중">진행중</option>
                            <option value="종료">종료</option>
                        </select>
                </p>
                <p>종료일: <DatePicker style={{marginLeft:'2px'}} /></p>
                <p>그룹:<select style={{border: '1px solid lightgray',height: '30px',marginLeft: '20px', width:'80%'}} name="group">
                            <option value=""></option>
                            <option value="할일">할일</option>
                            <option value="진행중">진행중</option>
                            <option value="종료">종료</option>
                        </select>
                </p>
            </div>
            </Modal>
        </div> */}
        <div>
          { isLogin ? 
            <div>
              <a onClick={logout}>로그아웃</a>
            </div> : 
            <div>
              <Link to="/login">로그인</Link>
            </div>
          }
        </div>
        <div id="content">
          <Switch>
            <Route exact path="/" component={Favourite}/>
            <Route path="/home" component={Home}/>
            <Route path="/favourite" component={Favourite}/>
            <Route path="/favouritegroup" component={FavouriteGroup}/>                
            <Route path="/todo" component={Todo}/>
            <Route path="/todogroup" component={TodoGroup}/>    
            <Route path="/Login" component={Login}/>        
          </Switch>
          <Route path="/" component={Empty}/>
        </div>
        </LoginContext.Provider>
        </>
      );
}
