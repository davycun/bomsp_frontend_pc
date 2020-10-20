import React from 'react';

import {Input, Row, Col, Form} from "antd";
import BaseModalEditor from "../base/BaseModalEditor";

class ChangePassword extends BaseModalEditor {

    constructor(props) {
        super(props);
    }

    getRequestUrl(isEditor) {
        return "userEmployee/changePassword";
    }

    getFormUI(form) {
        return (
            <Form ref={this.form}
                  labelCol={{span: 6}}
                  wrapperCol={{span: 18}}>
                <Row>
                    <Col span={24}>
                        <Form.Item label="原密码" name={"oldPassword"} rules={[{
                            required:true,
                            message:"原密码必填"
                        }]}>
                            <Input.Password placeholder={"请输入原来的密码"}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="新密码" name={"newPassword"} rules={[{
                            required:true,
                            message:"新密码必填"
                        }]}>
                            <Input.Password placeholder={"请输入新的密码"}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        );

    }
}

export default ChangePassword;