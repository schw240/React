import React from "react";
import { PlusOutlined, RestOutlined } from '@ant-design/icons';
import {
    Form,
    Input,
    Radio,
    Button,
    List,
    Modal,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
  } from 'antd';
import axios from 'axios';

export default function Todo(){
    const [group, setGroup] = React.useState([]);
    const [form] = Form.useForm();
    const [state, setState] = React.useState({visible:false});

    const showModal = () => {
        setState({
        visible: true,
        });
    };

    const handleOk = e => {
        console.log(e);
        setState({
        visible: false,
        });
    };

    const handleCancel = e => {
        console.log(e);
        setState({
        visible: false,
        });
    };

    const [todos, setTodos] = React.useState({
        pending: [],
        inprogress: [],
        end: []
    });


    React.useEffect(()=>{
        axios.get("http://127.0.0.1:8000/blog/allTodo").then(res=>{
            console.log(res)
            const {data} = res;
            setTodos(prev => data);
        })
    },[])

    React.useEffect(()=>{
        axios.get("http://127.0.0.1:8000/blog/todogroup/").then(res=>{
            console.log('asfasfasfasfasfasf')
            console.log(res)
            const {data} = res;
            setGroup(prev => data);
        })

    },[])

    const onFinish = e => {        
        e.end_date = e.end_date.format("YYYY-MM-DD")
        console.log(e);

        axios.post("http://127.0.0.1:8000/blog/todo/", e).then(res=>{
            return axios.get("http://127.0.0.1:8000/blog/allTodo")
        }).then(
            res=>{
                const {data} = res;
                setTodos(prev => data);
                form.resetFields();
                setState(prev => ({
                    visible: false
                }));                
            }
        )
    }

    const deleteTodo = (seq) => {

        axios.delete("http://127.0.0.1:8000/blog/todo/" + seq +"/").then(res=>{
            return axios.get("http://127.0.0.1:8000/blog/allTodo")
        }).then(
            res=>{
                const {data} = res;
                setTodos(prev => data);
            }
        )
    }

    return (
        <>
            <div id="add">
                <Button icon={<PlusOutlined />} onClick={showModal}>추가</Button>
            </div>
            <div>
            <List
                header={<div>할일</div>}
                style={{width:"300px",float:"left",paddingRight:"5px"}}
                itemLayout="horizontal"
                dataSource={todos.pending}
                renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                    title={<span>{item.name}</span>}
                    description={<>
                                    <span>{item.group_name}</span> / <span>{item.reg_date}</span>
                                    <Button onClick={()=>{deleteTodo(item.seq)}} style={{float:"right"}} shape="circle" icon={<RestOutlined />} />
                                </>
                                }
                    />
                </List.Item>
                )}
            />
            <List
                header={<div>진행중</div>}
                style={{width:"300px",float:"left",paddingRight:"5px"}}
                itemLayout="horizontal"
                dataSource={todos.inprogress}
                renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                    title={<span>{item.name}</span>}
                    description={<>
                                    <span>{item.group_name}</span> / <span>{item.reg_date}</span>
                                    <Button onClick={()=>{deleteTodo(item.seq)}} style={{float:"right"}} shape="circle" icon={<RestOutlined />} />
                                </>
                                }
                    />
                </List.Item>
                )}
            />
            <List
                header={<div>종료</div>}
                style={{width:"300px",float:"left",paddingRight:"5px"}}
                itemLayout="horizontal"
                dataSource={todos.end}
                renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                    title={<span>{item.name}</span>}
                    description={<>
                                    <span>{item.group_name}</span> / <span>{item.reg_date}</span>
                                    <Button onClick={()=>{deleteTodo(item.seq)}} style={{float:"right"}} shape="circle" icon={<RestOutlined />} />
                                </>
                                }
                    />
                </List.Item>
                )}
            />
            </div>
            <Modal
              title="추가"
              visible={state.visible}
              footer={null}
              onOk={handleOk}
              onCancel={handleCancel}
            >
            <Form form={form} onFinish={onFinish} labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal">        
            <Form.Item  name="name" label="이름">
              <Input />
            </Form.Item>
            <Form.Item  name="status" label="상태">
              <Select>
                <Select.Option value="">선택</Select.Option>
                <Select.Option value="pending">할일</Select.Option>
                <Select.Option value="inprogress">진행중</Select.Option>
                <Select.Option value="end">완료</Select.Option>
              </Select>
            </Form.Item>
                <Form.Item  name="end_date" label="종료일">
                <DatePicker />
            </Form.Item>
            <Form.Item name="group" label="그룹">
              <Select>
              <Select.Option value="">선택</Select.Option>
                  {group.map((v)=>{
                      return <Select.Option value={v.seq}>{v.name}</Select.Option>            
                  })}
              </Select>
              </Form.Item>      
              <Button type="primary" htmlType="submit">
                등록
              </Button>
              <Button onClick={handleCancel}>
                취소
              </Button>
              </Form>
            </Modal>
        </>
        )
    }