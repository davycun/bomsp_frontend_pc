import React from 'react';

import { Form,Input } from "antd";
import BaseModalEditor from "../../base/BaseModalEditor";


class RoleEditor extends BaseModalEditor {

    constructor(props) {
        super(props);
    }

    getRequestUrl(isEditor) {
        return isEditor ? 'role/update' : 'role/create';
    }

    getFormUI(form) {

        return (
            <Form ref={this.form}
                  initialValues={this.getRefreshFormData(this.props.currentData||{})}
                  labelCol={{span: 6}} wrapperCol={{span: 18}}>
                <Form.Item label="角色编码" name={"id"}>
                    <Input disabled={true}/>
                </Form.Item>
                <Form.Item label="角色名称"
                           rules={[{
                               required: true,
                               message: "角色名称必填"
                           }]}
                           name={"roleName"}>
                    <Input/>
                </Form.Item>
            </Form>
        );
    }
}

export default RoleEditor;