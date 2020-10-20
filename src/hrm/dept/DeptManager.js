import React from 'react';
import {Tooltip, Descriptions} from "antd";
import DeptEditor from './DeptEditor';
import BaseTreeTableSplitManager from "../../base/BaseTreeTableSplitManager";

class DeptManager extends BaseTreeTableSplitManager {

    constructor(props) {
        super(props);
    }

    getRequestUrl() {
        return "emp/query";
    }

    getTreeConfig() {
        return {
            queryUrl:'dept/queryToTree',
            code:'id',
            name:'deptName'
        }
    }

    getTableScrollX() {
        return 1900;
    }

    getColumns() {
        const columns = [{
            title: '姓名',
            dataIndex: 'empName',
            align:'center',
            width: 100
        }, {
            title: '人员编码',
            dataIndex: 'id',
            width: 150,
            render: (text, record) => {
                return (
                    <Tooltip title={record.id}>
                        <div className="result-columns-div">{record.id}</div>
                    </Tooltip>
                );
            }
        }, {
            title: '电话',
            dataIndex: 'empPhone',
            align:'center',
            width: 150
        }, {
            title: '性别',
            dataIndex: 'sexName',
            align:'center',
            width: 100
        }, {
            title: '工号',
            dataIndex: 'workNumber',
            align:'center',
            width: 150
        }, {
            title: '邮箱',
            dataIndex: 'email',
            align:'center',
            width: 150,
            render: (text, record) => {
                return (
                    <Tooltip title={record.email}>
                        <div className="result-columns-div">{record.email}</div>
                    </Tooltip>
                );
            }
        }, {
            title: '身份证号',
            dataIndex: 'idCard',
            align:'center',
            width: 150,
            render: (text, record) => {
                return (
                    <Tooltip title={record.idCard}>
                        <div className="result-columns-div">{record.idCard}</div>
                    </Tooltip>
                );
            }
        }, {
            title: '入职日期',
            dataIndex: 'enterDate',
            align:'center',
            width: 150,
            render: (text) => {
                if (text) {
                    return text.substr(0, 10);
                }
            }
        }, {
            title: '转正日期',
            dataIndex: 'regularDate',
            align:'center',
            width: 150,
            render: (text) => {
                if (text) {
                    return text.substr(0, 10);
                }
            }
        }, {
            title: '合同签订开始日期',
            dataIndex: 'contractStartDate',
            align:'center',
            width: 150,
            render: (text) => {
                if (text) {
                    return text.substr(0, 10);
                }
            }
        }, {
            title: '合同签订结束日期',
            dataIndex: 'contractEndDate',
            align:'center',
            width: 150,
            render: (text) => {
                if (text) {
                    return text.substr(0, 10);
                }
            }
        }];

        return columns;
    }

    onTreeSelectChange(currentData) {
        this.setState({currentData:currentData});
        this.reload(1, {entity: {ownerDeptId: currentData.id}})
    }

    getCreateModal() {
        return (
            <DeptEditor editor={false}
                        title={"新增部门"}
                        size={0.6}
                        currentData={this.state.currentData}
                        visible={this.state.createModalVisible}
                        onSubmitOk={this.onCreateModalSubmitOk}
                        onCancel={this.onCreateModalCancel}>
            </DeptEditor>
        );
    }

    getEditModal() {
        return (
            <DeptEditor editor={true}
                        title={"部门信息修改"}
                        size={0.6}
                        currentData={this.state.currentData}
                        visible={this.state.editModalVisible}
                        onSubmitOk={this.onEditModalSubmitOk}
                        onCancel={this.onEditModalCancel}>
            </DeptEditor>
        );
    }
    getRightPaneTop() {
        const dept = this.state.currentData;
        return (
            <Descriptions column={3} bordered={true} size="small" title={"部门基本信息"}>
                <Descriptions.Item label={"部门编码"}>
                    {dept.id}
                </Descriptions.Item>
                <Descriptions.Item label={"部门名称"}>
                    {dept.deptName}
                </Descriptions.Item>
                <Descriptions.Item label={"负责人"}>
                    {dept.leaderName}
                </Descriptions.Item>
                <Descriptions.Item span={3} label={"部门地址"}>
                    {dept.address}
                </Descriptions.Item>
            </Descriptions>
        );
    }
}

export default DeptManager;