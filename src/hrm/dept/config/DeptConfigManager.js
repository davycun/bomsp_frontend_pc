import React from 'react';
import BaseManager from "../../../base/BaseManager";
import {Tooltip} from "antd";
import DeptConfigEditor from "./DeptConfigEditor";

class DeptConfigManager extends BaseManager {

    constructor(props) {
        super(props);
    }

    getRequestUrl() {
        return "deptConfig/query";
    }

    getQueryUI() {
        return <div></div>
    }

    getCreateModal() {
        return (
            <DeptConfigEditor title={"部门配置新增"}
                              editor={false}
                              size={0.5}
                              visible={this.state.createModalVisible}
                              onSubmitOk={this.onCreateModalSubmitOk}
                              onCancel={this.onCreateModalCancel}>
            </DeptConfigEditor>
        );
    }
    getEditModal() {
        return (
            <DeptConfigEditor title={"部门配置新增"}
                              editor={true}
                              size={0.5}
                              currentData={this.state.currentData}
                              visible={this.state.editModalVisible}
                              onSubmitOk={this.onEditModalSubmitOk}
                              onCancel={this.onEditModalCancel}>
            </DeptConfigEditor>
        );
    }

    getOperationWidth() {
        return 100;
    }
    getOperations(record) {
        let opts = [{
            name:"编辑",
            onClick:this.onEditClick
        }];

        return opts;
    }
    getTableScrollX() {
        return 600;
    }
    getColumns() {
        let columns = [{
            title: 'ID',
            dataIndex: 'id',
            width: 100,
            align: 'center',
            render: (text, record) => {
                return (
                    <Tooltip title={text}>
                        <div className="result-columns-div">{text}</div>
                    </Tooltip>
                );
            }
        }, {
            title: '部门ID',
            dataIndex: "deptId",
            width: 100,
            align: 'center',
            render: (text, record) => {
                return (
                    <Tooltip title={text}>
                        <div className="result-columns-div">{text}</div>
                    </Tooltip>
                );
            }
        }, {
            title: '部门名称',
            dataIndex: "deptName",
            width: 120,
            align: 'center',
            render: (text, record) => {
                return (
                    <Tooltip title={text}>
                        <div className="result-columns-div">{text}</div>
                    </Tooltip>
                );
            }
        }, {
            title: '部门可见级别',
            dataIndex: "areaTypeName",
            width: 120,
            align:'center'
        }];

        return columns;
    }

}

export default DeptConfigManager;