import React from 'react';
import BaseModalEditor from "../../base/BaseModalEditor";
import {Form, Col, Input, Row, DatePicker} from "antd";

class EmployeeQuitEditor extends BaseModalEditor {

    constructor(props) {
        super(props);

    }

    getRequestUrl(isEditor) {
        return isEditor ? "employeeQuit/update" : "employeeQuit/create";
    }

    getRefreshFormData(data) {
        return {
            empId: data.id
        }
    }

    getFormUI(form) {

        return (
            <Form ref={this.form}
                  initialValues={this.getRefreshFormData(this.props.currentData||{})}
                  wrapperCol={{span: 20}} labelCol={{span: 4}}>
                <Row>
                    <Col span={24}>
                        <Form.Item label={"员工ID"} name={"empId"}>
                            <Input disabled={true}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label={"离职日期"}
                                   rules={[{
                                       required: true,
                                       message: '离职日期必填'
                                   }]}
                                   name={"quitDate"}>
                            <DatePicker style={{width: '100%'}}></DatePicker>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label={"离职备注"} name={"remark"}>
                            <Input.TextArea rows={2} style={{width: '100%'}}></Input.TextArea>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        );
    }

}

export default EmployeeQuitEditor;