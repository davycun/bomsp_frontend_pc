import React from 'react';
import BaseModalEditor from "../../base/BaseModalEditor";
import {Col, Form, Input, Row} from "antd/lib/index";
import {Utils} from "../../base/CiiUtils";

class EmployeeUpdatePhoneEditor extends BaseModalEditor{

    constructor(props) {
        super(props);
    }

    getRequestUrl(isEditor) {
        return "emp/updatePhone";
    }

    getRefreshFormData(data) {
        return {
            id:data.id
        }
    }

    getFormUI(form) {

        return (
            <Form ref={this.form}
                  initialValues={this.getRefreshFormData(this.props.currentData||{})}
                  wrapperCol={{span:20}} labelCol={{span:4}}>
                <Row>
                    <Col span={24}>
                        <Form.Item label={"员工ID"} name={"id"}>
                            <Input disabled/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label={"旧手机号码"}
                                   rules={[{
                                       required:true,
                                       message:"旧手机号必填",
                                       pattern:Utils.phoneReg
                                   }]}
                                   name={"oldPhone"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label={"新手机号码"}
                                   rules={[{
                                       required:true,
                                       message:"新手机号必填",
                                       pattern:Utils.phoneReg
                                   }]}
                                   name={"newPhone"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        );
    }

}

export default EmployeeUpdatePhoneEditor;