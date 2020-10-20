import React from 'react';
import { Input, Row, Col, InputNumber,Form } from "antd";

import UserSelector from '../../ums/UserSelector';

import BaseModalEditor from "../../base/BaseModalEditor";

class DeptEditor extends BaseModalEditor {

    constructor(props) {
        super(props);

        this.state.leaderSelectorVisible = false;
        this.state.leader = {};
    }

    getRequestUrl(isEditor) {
        return isEditor ? "dept/update" : "dept/create";
    }

    getRequestEntity(values) {
        values.leaderId = this.state.leader.id;
        values.leaderName = this.state.leader.userName;
        return values;
    }

    onCurrentDataChange(data) {
        if (data.leaderId) {
            this.setState({
                leader: {
                    id: data.leaderId,
                    userName: data.leaderName
                }
            })
        }
    }

    getRefreshFormData(data) {
        if (!this.props.editor) {
            return {
                parentId: data.id,
                parentName: data.deptName
            }
        }
        return data;
    }


    /**
     * 点击选择负责人选择的相应方法
     * @param value
     */
    onLeaderSelectorClick = (value) => {
        this.setState({leaderSelectorVisible: true});
    }

    /**
     * 用户选择器取消
     */
    onLeaderSelectorCancel = () => {
        this.setState({leaderSelectorVisible: false});
    }

    /**
     * 用户选择器选中
     * @param selectedRowKeys
     * @param selectedRows
     */
    onLeaderSelectorOk = (keys, rows) => {
        this.setState({leaderSelectorVisible: false, leader: rows[0]});
        this.form.current.setFieldsValue({
            leaderName: rows[0].userName
        });
    }

    getOtherModal() {

        return (
            <UserSelector title={"选择负责人"}
                          size={0.7}
                          onCancel={this.onLeaderSelectorCancel}
                          onSubmitOk={this.onLeaderSelectorOk}
                          visible={this.state.leaderSelectorVisible}/>
        );
    }

    getFormUI(form) {
        return (
            <Form ref={this.form}
                  initialValues={this.getRefreshFormData(this.props.currentData||{})}
                  wrapperCol={{span: 20}} labelCol={{span: 4}}>
                <Row>
                    <Col span={24}>
                        <Form.Item label="父部门编码"
                                   rules={[{
                                       required: true,
                                       message: '父部门编码必填'
                                   }]}
                                   name={"parentId"}>
                            <Input disabled={true}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="父部门名称" name={"parentName"}>
                            <Input disabled={true}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="部门编码" name={"id"}>
                            <Input disabled={true}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="部门名称"
                                   rules={[{
                                       required: true,
                                       message: "部门名称必填"
                                   }]}
                                   name={"deptName"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="负责人" name={"leaderName"}>
                            <Input readOnly={true}
                                   onClick={this.onLeaderSelectorClick}/>
                        </Form.Item>

                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="排序"
                                   rules={[{
                                       required: true,
                                       message: "排序必填"
                                   }]}
                                   name={"sort"}>
                            <InputNumber style={{width: '100%'}}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="部门地址"
                                   rules={[{
                                       required: true,
                                       message: "地址必填"
                                   }]}
                                   name={"address"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default DeptEditor;