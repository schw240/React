import React from 'react';
import axios from 'axios';
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
import { RestOutlined, PlusOutlined } from '@ant-design/icons';


export default function TodoGroup() {
    const [form] = Form.useForm();
    const [todo_groups, setTodo_groups] = React.useState([]);
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

    const onFinish = e => {        
        axios.post("http://127.0.0.1:8000/blog/todogroup/", e).then(res=>{
            return axios.get("http://127.0.0.1:8000/blog/todogroup/")
        }).then(
            res=>{
                const {data} = res;
                setTodo_groups(prev => data);
                form.resetFields();
                setState(prev => ({
                    visible: false
                }));                
            }
        )
    }

    React.useEffect(()=>{
        axios.get("http://127.0.0.1:8000/blog/todogroup/", {
            headers: {
                Authorization: "JWT " + window.localStorage.getItem("token")//getToken()
            }
        })
        .then(res => {
            const { data } = res;
            setTodo_groups(prev => data);
        }).catch(error=>{
            console.log(error);
        })
    }, [])

    const deleteTodo_group = (seq) => {

        axios.delete("http://127.0.0.1:8000/blog/todogroup/" + seq +"/").then(res=>{
            return axios.get("http://127.0.0.1:8000/blog/todogroup/")
        }).then(
            res=>{
                const {data} = res;
                setTodo_groups(prev => data);
            }
        )
    }


    return(
        <>
            <div id="add">
                <Button icon={<PlusOutlined />} onClick={showModal}>추가</Button>
            </div>
            <div>
                <Modal
                title="등록"
                visible={state.visible}
                onCancel={handleCancel}
                footer={null}
                onOk={handleOk}
                okText="등록"
                cancelText="취소"
                >
                    <Form form={form} onFinish={onFinish} labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal">        
                        <Form.Item  name="name" label="명칭">
                            <Input />
                        </Form.Item>
                        <Button type="primary" htmlType="submit">
                            등록
                        </Button>
                        <Button onClick={handleCancel}>
                            취소
                        </Button>
                    </Form>
                </Modal>
            </div>
            <div>
                <List
                    style={{width:"900px", fontWeight:"light"}}
                    dataSource={todo_groups}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        title={<span style={{fontWeight:"bolder"}}>{item.name}</span>}
                        description={<>
                                        <span>{item.reg_date}</span>
                                        <Button onClick={()=>{deleteTodo_group(item.seq)}} style={{float:"right"}} shape="circle" icon={<RestOutlined />} />
                                    </>
                                    }
                        />
                    </List.Item>
                    )}
                />
            </div>
        </>
    )
}
