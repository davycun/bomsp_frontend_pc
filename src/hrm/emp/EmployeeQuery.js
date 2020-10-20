import React from 'react';

import {RedoOutlined} from '@ant-design/icons';

import {Form, Row, Col, Input, DatePicker, TreeSelect, Switch} from "antd";
import {dictionaryStorage} from "../../base/Common";
import {request} from "../../base/CiiUtils";
import BaseQuery from "../../base/BaseQuery";

class EmployeeQuery extends BaseQuery {

    constructor(props) {
        super(props);
        this.state.depts = [];
    }

    componentDidMount() {
        this.reloadDepts();
    }

    reloadDepts = () => {
        request({
            conf: {
                url: 'dept/queryToTree',
                data: {}
            },
            success: (data) => {

                this.setState({
                    depts: data.result
                });
            }
        });
    }

    /**
     * 部门选择的渲染树
     * @param data
     * @returns {*}
     */
    renderDeptTree = (data) => data.map((item) => {
        if (item.children && item.children.length) {
            return (
                <TreeSelect.TreeNode title={item.deptName} key={item.id} value={item.id}>
                    {this.renderDeptTree(item.children)}
                </TreeSelect.TreeNode>
            )
        }
        return <TreeSelect.TreeNode title={item.deptName} key={item.id} value={item.id}/>
    });

    /**
     * 部门选中后的处理函数
     * @param value
     */
    onDeptSelectChange = (value, title) => {
        this.setState({
            ownerDeptName: title[0],
        });
    }

    getFormUI(form) {
        return (
            <Form ref={this.form}
                  labelCol={{span: 7}} wrapperCol={{span: 17}}>
                <Row>
                    <Col span={12}>
                        <Form.Item label="人员编码" name={"id"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="姓名" name={"empName"}>
                            <Input/>
                        </Form.Item>
                    </Col>

                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="电话" name={"empPhone"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="所属部门" name={"ownerDeptId"}>
                            <TreeSelect showSearch={true}
                                        allowClear={true}
                                        placeholder="选择部门"
                                        treeDefaultExpandAll
                                        suffixIcon={<RedoOutlined onClick={() => {
                                            this.reloadDepts()
                                        }}/>}
                                        onChange={this.onDeptSelectChange}>
                                {
                                    this.renderDeptTree(this.state.depts)
                                }
                            </TreeSelect>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="入职日期大于" name={"enterDateStart"}>
                            <DatePicker style={{width: '100%'}}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="入职日期小于" name={"enterDateEnd"}>
                            <DatePicker style={{width: '100%'}}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="转正日期大于" name={"regularDateStart"}>
                            <DatePicker style={{width: '100%'}}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="转正日期小于" name={"regularDateEnd"}>
                            <DatePicker style={{width: '100%'}}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="毕业日期" name={"graduationDateStart"}>
                            <DatePicker style={{width: '100%'}}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="毕业日期" name={"graduationDateEnd"}>
                            <DatePicker style={{width: '100%'}}/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Form.Item label="出生日期大于" name={"birthdayStart"}>
                            <DatePicker style={{width: '100%'}}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="出生日期小于" name={"birthdayEnd"}>
                            <DatePicker style={{width: '100%'}}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="性别" name={"sex"}>
                            {
                                dictionaryStorage.radio("com.ciiframework.common.dictionary.SexType")
                            }
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="婚姻状况" name={"marryType"}>
                            {
                                dictionaryStorage.radio("com.cii.bomsp.hrm.emp.dictionary.MarryType")
                            }
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label={"是否离职"} name={"hasQuit"} valuePropName={"checked"}>
                            <Switch checkedChildren="离职" unCheckedChildren="在职"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="学历" name={"educationType"}>
                            {
                                dictionaryStorage.selection("com.cii.bomsp.hrm.emp.dictionary.EducationType")
                            }
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Form.Item label="联系人1姓名" name={"linkManOneName"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="联系人1电话" name={"linkManOnePhone"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="联系人2姓名" name={"linkManTwoName"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="联系人2电话" name={"linkManTwoPhone"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default EmployeeQuery;