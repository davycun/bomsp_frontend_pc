import React from 'react';
import {Col, Input, Row, Form} from "antd";
import BaseModalEditor from "../../base/BaseModalEditor";

class DictionaryEditor extends BaseModalEditor {

    constructor(props) {
        super(props);

    }

    getRequestUrl(isEditor) {
        return isEditor ? "dictionary/update" : "dictionary/create";
    }

    getRefreshFormData(data) {

        let v = {}
        if (this.props.editor) {
            v = data;
        } else {
            v.key = data.key;
            v.parentCode = data.code;
        }
        return v;
    }

    resetEditor() {
    }

    getFormUI(form) {
        return (
            <Form ref={this.form}
                  initialValues={this.getRefreshFormData(this.props.currentData||{})}
                  wrapperCol={{span: 20}} labelCol={{span: 4}}>
                <Row>
                    <Col span={24}>
                        <Form.Item label={"key值"} name={"key"} rules={[{
                            required: true,
                            message: 'key值必填'
                        }]}>
                            <Input disabled={true}/>
                        </Form.Item>
                    </Col>

                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label={"父编码"} name={"parentCode"} rules={[{
                            required: true,
                            message: '父编码必填'
                        }]}>
                            <Input disabled={true}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label={"编码"} name={"code"}>
                            <Input disabled={this.props.editor ? true : false} placeholder={"可以不填，系统自动生成，或者填写英文"}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label={"名称"} name={"name"} rules={[{
                            required: true,
                            message: '名称必填'
                        }]}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>

            </Form>
        );
    }

}

export default DictionaryEditor;