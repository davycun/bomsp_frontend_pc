import React from 'react';
import BaseModalEditor from "../../base/BaseModalEditor";
import {Form, Col, DatePicker, Input, Row} from "antd";
import TreeSelectManager from "../../component/TreeSelectManager";

class EmployeeRehireEditor extends BaseModalEditor {

    constructor(props) {
        super(props);

        this.state.ownerDeptName = "";
    }

    getRequestUrl(isEditor) {
        return "emp/rehire";
    }

    getRefreshFormData(data) {
        return {
            id: data.id
        }
    }

    getRequestEntity(values) {

        values.ownerDeptName = this.state.ownerDeptName;
        return values;
    }

    getFormUI(form) {

        return (
            <Form ref={this.form}
                  initialValues={this.getRefreshFormData(this.props.currentData||{})}
                  wrapperCol={{span: 20}} labelCol={{span: 4}}>
                <Row>
                    <Col span={24}>
                        <Form.Item label={"员工ID"} name={"id"}>
                            <Input disabled={true}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label={"入职日期"}
                                   rules={[{
                                       required: true,
                                       message: '返聘日期必填'
                                   }]}
                                   name={"enterDate"}>
                            <DatePicker style={{width: '100%'}}></DatePicker>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="所属部门"
                                   rules={[{
                                       required: true,
                                       message: '部门必填',
                                   }]}
                                   name={"ownerDeptId"}>
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

export default EmployeeRehireEditor;