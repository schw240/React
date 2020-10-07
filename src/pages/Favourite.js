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


export default function Favourite() {
    const [form] = Form.useForm();
    const [favourites, setFavourites] = React.useState([]);
    const [state, setState] = React.useState({visible:false});
    const [group, setGroup] = React.useState([]);

    
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
        axios.post("ec2-13-125-22-16.ap-northeast-2.compute.amazonaws.com:8000/blog/favourite/", e).then(res=>{
            return axios.get("ec2-13-125-22-16.ap-northeast-2.compute.amazonaws.com:8000/blog/favourite/")
        }).then(
            res=>{
                const {data} = res;
                setFavourites(prev => data);
                form.resetFields();
                setState(prev => ({
                    visible: false
                }));                
            }
        )
    }

    React.useEffect(()=>{

        axios.get("ec2-13-125-22-16.ap-northeast-2.compute.amazonaws.com:8000/blog/favouritegroup/", {
            headers: {
                Authorization: "JWT " + window.localStorage.getItem("token")//getToken()
            }
        }).then(res=>{
            const {data} = res;
            setGroup(prev => data);
        })

    },[])

    React.useEffect(()=>{
        axios.get("ec2-13-125-22-16.ap-northeast-2.compute.amazonaws.com:8000/blog/favourite/")
        .then(res => {
            const { data } = res;
            setFavourites(prev => data);
        }).catch(error=>{
            console.log(error);
        })
    }, [])


    
    const deleteFavourite = (seq) => {

        axios.delete("ec2-13-125-22-16.ap-northeast-2.compute.amazonaws.com:8000/blog/favourite/" + seq +"/").then(res=>{
            return axios.get("ec2-13-125-22-16.ap-northeast-2.compute.amazonaws.com:8000/blog/favourite/")
        }).then(
            res=>{
                const {data} = res;
                setFavourites(prev => data);
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
                        <Form.Item  name="memo" label="메모">
                            <Input />
                        </Form.Item>
                        <Form.Item  name="url" label="URL">
                            <Input />
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
            </div>
            <div>
                <List
                    style={{width:"900px", fontWeight:"light"}}
                    dataSource={favourites}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        title={<span style={{fontWeight:"bolder"}}>{item.name}</span>}
                        description={<>
                                        <span>{item.group_name}</span> / <span>{item.reg_date}</span>
                                        <Button onClick={()=>{deleteFavourite(item.seq)}} style={{float:"right"}} shape="circle" icon={<RestOutlined />} />
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
