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


export default function FavouriteGroup() {
    const [form] = Form.useForm();
    const [fv_groups, setFv_groups] = React.useState([]);
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
        axios.post("http://127.0.0.1:8000/blog/favouritegroup/", e).then(res=>{
            return axios.get("http://127.0.0.1:8000/blog/favouritegroup/")
        }).then(
            res=>{
                const {data} = res;
                setFv_groups(prev => data);
                form.resetFields();
                setState(prev => ({
                    visible: false
                }));                
            }
        )
    }

    React.useEffect(()=>{

        axios.get("http://127.0.0.1:8000/blog/favouritegroup/", {
            headers: {
                Authorization: "JWT " + window.localStorage.getItem("token")//getToken()
            }
        }).then(res=>{
            const {data} = res;
            setFv_groups(prev => data);
        })

    },[])

    const deleteFv_group = (seq) => {

        axios.delete("http://127.0.0.1:8000/blog/favouritegroup/" + seq +"/").then(res=>{
            return axios.get("http://127.0.0.1:8000/blog/favouritegroup/")
        }).then(
            res=>{
                const {data} = res;
                setFv_groups(prev => data);
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
                onOk={handleOk}
                okText="등록"
                footer={null}
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
                    dataSource={fv_groups}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        title={<span style={{fontWeight:"bolder"}}>{item.name}</span>}
                        description={<>
                                        <span>{item.reg_date}</span>
                                        <Button onClick={()=>{deleteFv_group(item.seq)}} style={{float:"right"}} shape="circle" icon={<RestOutlined />} />
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
