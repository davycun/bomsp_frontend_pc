import React from 'react';
import { KeyOutlined, PhoneOutlined } from '@ant-design/icons';
import { Col, Input, message, Row, Button,Form } from "antd";

import './Login.css';

import {request} from "./base/CiiUtils";
import HeightAdapter from "./base/HeightAdapter";

class LoginForm extends HeightAdapter {

    constructor(props) {
        super(props);
        this.form = React.createRef();
        window.addEventListener('resize', this.updateHeight);
    }

    getTop = () => {
        return (this.state.height - 250) / 2;
    }

    onFinish = (values)=>{

        // console.log(this.formRef);
        request({
            conf: {
                url: 'userEmployee/login',
                data: {
                    entity: values
                }
            },
            success: (data) => {
                const {loginSuccess} = this.props;
                if (loginSuccess) {
                    loginSuccess();
                }
            }
        });
    }

    onFinishFailed = (errorInfos)=>{
        // message.error(errorInfos);
        console.log(this.form);
    }

    /**
     * 考勤打卡响应事件
     */
    onAttendanceClick = () => {

    }

    render() {

        return (
            <div className="login-form" style={{top: this.getTop()}}>
                <Form onFinish={this.onFinish}
                      ref={this.form}
                      onFinishFailed={this.onFinishFailed}>
                    <Row>
                        <Col span={24}>
                            <Form.Item name={"userPhone"} rules={[{
                                required:true,
                                message:"请输入正确的号码"
                            }]}>
                                <Input style={{height: 40, marginTop: 20}}
                                       prefix={<PhoneOutlined />}
                                       placeholder="请输入电话号码"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item name={"secure"} rules={[{
                                required: true,
                                message: '密码必填'
                            }]}>
                                <Input.Password style={{height: 40, marginTop: 20}} prefix={<KeyOutlined />}
                                                placeholder="输入密码"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} style={{paddingRight: '5px'}}>
                            <Form.Item>
                                <Button style={{width: '100%', height: 40, marginTop: 20}}
                                        type={"primary"}
                                        htmlType={"submit"}>登录</Button>
                            </Form.Item>

                        </Col>
                        <Col span={12} style={{paddingLeft: '5px'}}>
                            <Form.Item>
                                <Button type={"primary"}
                                        style={{width: '100%', height: 40, marginTop: 20}}
                                        onClick={this.onAttendanceClick}
                                        htmlType={"button"}>打卡</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }

}

export default LoginForm;