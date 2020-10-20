import React from 'react';
import {Tooltip} from "antd";
import CompanyEditor from "./CompanyEditor";
import BaseManager from "../../base/BaseManager";


class CompanyManager extends BaseManager {

    constructor(props) {
        super(props);
    }

    getRequestUrl() {
        return "cpy/query";
    }

    getTableRowKey() {
        return "cpyCode";
    }

    getQueryUI() {
        return;
    }

    getEditModal() {
        return (
            <CompanyEditor title={"人员编辑"}
                           editor={true}
                           currentData={this.state.currentData}
                           visible={this.state.editModalVisible}
                           size={0.6}
                           onSubmitOk={this.onEditModalSubmitOk}
                           onCancel={this.onEditModalCancel}/>
        );
    }

    getCreateModal() {
        return (
            <CompanyEditor title={"新增人员"}
                           editor={false}
                           visible={this.state.createModalVisible}
                           size={0.6}
                           onSubmitOk={this.onCreateModalSubmitOk}
                           onCancel={this.onCreateModalCancel}/>
        );
    }

    getColumns = () => {

        const columns = [{
            title: '企业ID',
            dataIndex: 'id',
            width: 200
        }, {
            title: '企业编码',
            dataIndex: 'cpyId',
            width: 200
        }, {
            title: '企业别名',
            dataIndex: 'aliasCode',
            width: 200,
            render: (text, record) => {
                return (
                    <Tooltip title={record.aliasCode}>
                        <div className="result-columns-div">{record.aliasCode}</div>
                    </Tooltip>
                );
            }
        }, {
            title: '企业名称',
            dataIndex: 'cpyName',
            width: 200,
            render: (text, record) => {
                return (
                    <Tooltip title={record.cpyName}>
                        <div className="result-columns-div">{record.cpyName}</div>
                    </Tooltip>
                );
            }
        }, {
            title: '备注',
            dataIndex: 'remark',
            width: 200,
            render: (text, record) => {
                return (
                    <Tooltip title={record.remark}>
                        <div className="result-columns-div">{record.remark}</div>
                    </Tooltip>
                );
            }
        }];

        return columns;

    }

    getOperations(record) {
        return [{
            name: "编辑",
            onClick: this.onEditClick
        }];
    }

}

export default CompanyManager;