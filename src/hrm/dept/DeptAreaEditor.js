import React from 'react';
import BaseModalEditor from "../../base/BaseModalEditor";
import {Col, Input, Row, Form} from "antd";

class DeptAreaEditor extends BaseModalEditor {

    constructor(props) {
        super(props);

    }

    getRequestUrl(isEditor) {
        return "deptArea/create";
    }

    getRefreshFormData(data) {
        const {editor} = this.props;
        if (!editor) {
            return {
                deptId: data.id
            }
        }
        return data;
    }

    getRequestEntity(values) {
        Object.assign(values, this.state.area);
        return values;
    }

    getFormUI(form) {

        return (
            <Form ref={this.form}
                  initialValues={this.getRefreshFormData(this.props.currentData||{})}
                  wrapperCol={{span: 18}} labelCol={{span: 6}}>
                <Row>
                    <Col span={24}>
                        <Form.Item label={"部门ID"} name={"deptId"}>
                            <Input disabled={true}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label={"负责区域"}
                                   rules={[{
                                       required: true,
                                       message: '区域必填'
                                   }, {
                                       validator: (rule, value) => {
                                           if (value && value.length < 2) {
                                               return Promise.reject("必须选到区域!")
                                           } else {
                                               return Promise.resolve();
                                           }
                                       }
                                   }]}
                                   name={"location"}>
                            {
                                this.getAreaSelectUI()
                            }
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        );
    }

}

export default DeptAreaEditor;