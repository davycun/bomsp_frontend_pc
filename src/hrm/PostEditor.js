import React from 'react';
import {Form, Col, Input, Row} from "antd";

import BaseModalEditor from "../base/BaseModalEditor";

class PostEditor extends BaseModalEditor {

    constructor(props) {
        super(props);
    }

    getRequestUrl(isEditor) {
        return isEditor ? "post/update" : "post/create"
    }


    getFormUI(form) {
        return (
            <Form ref={this.form}
                  initialValues={this.getRefreshFormData(this.props.currentData||{})}
                  wrapperCol={{span: 20}}
                  labelCol={{span: 4}}>
                <Row>
                    <Col span={24}>
                        <Form.Item label="岗位编码" name={"id"}>
                            <Input disabled={true}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="岗位名称"
                                   rules={[{
                                       required: true,
                                       message: "岗位名称必填"
                                   }]}
                                   name={"postName"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="岗位描述" name={"remark"}>
                            <Input.TextArea/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default PostEditor;