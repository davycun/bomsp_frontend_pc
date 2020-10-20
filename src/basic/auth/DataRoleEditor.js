import React from 'react';

import {Form, Input} from "antd";
import BaseModalEditor from "../../base/BaseModalEditor";


class DataRoleEditor extends BaseModalEditor {

    constructor(props) {
        super(props);
    }

    getRequestUrl(isEditor) {
        return isEditor ? 'dataRole/update' : 'dataRole/create';
    }

    getFormUI(form) {
        return (
            <Form ref={this.form}
                  initialValues={this.getRefreshFormData(this.props.currentData||{})}
                  labelCol={{span: 8}} wrapperCol={{span: 16}}>
                <Form.Item label="数据角色ID" name={"id"}>
                    <Input disabled={true}/>
                </Form.Item>
                <Form.Item label="数据角色名称"
                           rules={[{
                               required: true,
                               message: "数据角色名称必填"
                           }]}
                           name={"roleName"}>
                    <Input/>
                </Form.Item>
            </Form>
        );
    }
}

export default DataRoleEditor;