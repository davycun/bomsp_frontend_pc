import React from 'react';
import BaseModalEditor from "../../base/BaseModalEditor";
import {Col, Form, Input, Row} from "antd";
import TreeSelectManager from "../../component/TreeSelectManager";

class EmployeeTransferEditor extends BaseModalEditor {

    constructor(props) {
        super(props);
        this.state.ownerDeptName = "";
    }

    getRequestEntity(values) {

        values.toDeptName = this.state.ownerDeptName;
        return values;
    }

    getRequestUrl(isEditor) {
        return isEditor ? "employeeTransfer/update" : "employeeTransfer/create";
    }

    getRefreshFormData(data) {
        return {
            empId: data.id,
            empName: data.empName
        }
    }

    getFormUI(form) {
        return (
            <Form ref={this.form}
                  initialValues={this.getRefreshFormData(this.props.currentData || {})}
                  wrapperCol={{span: 20}} labelCol={{span: 4}}>
                <Row>
                    <Col span={24}>
                        <Form.Item label={"员工ID"} name={"empId"}>
                            <Input disabled/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label={"员工姓名"} name={"empName"}>
                            <Input disabled/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="异动部门"
                                   rules={[{
                                       required: true,
                                       message: '异动后部门必填',
                                   }]}
                                   name={"toDeptId"}>
                            <TreeSelectManager queryUrl={"dept/queryToTree"}
                                               name={"deptName"}
                                               code={"id"}
                                               onTreeChange={(value, label) => {
                                                   this.setState({ownerDeptName: label[0]})
                                               }}
                                               children={'children'}>
                            </TreeSelectManager>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default EmployeeTransferEditor;