import React from 'react';
import BaseManager from "../../base/BaseManager";
import {Tooltip} from "antd";
import {Utils} from "../../base/CiiUtils";
import EditLogQuery from "./EditLogQuery";

class EditLogManager extends BaseManager {

    constructor(props) {
        super(props);
    }

    getRequestUrl() {
        return "editLog/query";
    }

    getQueryModal() {
        return (
            <EditLogQuery title={"日志查询条件"}
                          size={0.6}
                          visible={this.state.queryModalVisible}
                          onSubmitOk={this.onQueryModalSubmitOk}
                          onCancel={this.onQueryModalCancel}>
            </EditLogQuery>
        );
    }

    getColumns() {
        const columns = [{
            title: "ID",
            dataIndex: "id",
            width: 100,
            align: "center",
            render: (text, record) => {
                return (
                    <Tooltip title={text}>
                        <div className="result-columns-div">{text}</div>
                    </Tooltip>
                );
            }
        }, {
            title: "业务ID",
            dataIndex: "bizId",
            width: 100,
            align: "center",
            render: (text, record) => {
                return (
                    <Tooltip title={text}>
                        <div className="result-columns-div">{text}</div>
                    </Tooltip>
                );
            }
        }, {
            title: "修改类型",
            dataIndex: "cls",
            width: 100,
            align: "center",
            render: (text, record) => {
                return (
                    <Tooltip title={text}>
                        <div className="result-columns-div">{text}</div>
                    </Tooltip>
                );
            }
        }, {
            title: "类型名称",
            dataIndex: "clsName",
            width: 120,
            align: "center",
            render: (text, record) => {
                return (
                    <Tooltip title={text}>
                        <div className="result-columns-div">{text}</div>
                    </Tooltip>
                );
            }
        }, {
            title: "修改内容",
            dataIndex: "remark",
            width: 300,
            align: "center",
            render: (text, record) => {
                return (
                    <Tooltip title={text}>
                        <div className="result-columns-div">{text}</div>
                    </Tooltip>
                );
            }
        }, {
            title: "修改时间",
            dataIndex: "createTime",
            width: 160,
            align: "center",
            render: (text, record) => {
                return Utils.dateFormat(new Date(text), "yyyy-MM-dd hh:mm:ss");
            }
        }, {
            title: "修改人",
            dataIndex: "createName",
            width: 100,
            align: "center",
            render: (text, record) => {
                return (
                    <Tooltip title={text}>
                        <div className="result-columns-div">{text}</div>
                    </Tooltip>
                );
            }
        }, {
            title: "所属部门",
            dataIndex: "createDeptName",
            width: 100,
            align: "center",
            render: (text, record) => {
                return (
                    <Tooltip title={text}>
                        <div className="result-columns-div">{text}</div>
                    </Tooltip>
                );
            }
        }];

        return columns;
    }

    getTableCanExpanded() {
        return true;
    }

    getTableExpandQueryUrl() {
        return "editLogDetail/query"
    }

    getTableExpandQueryData(record) {
        return {
            entity: {
                editId: record.id
            }
        }
    }

    getTableExpandColumns(record) {
        const columns = [{
            title: "修改的字段",
            dataIndex: "fieldName",
            width: 100,
            align: "center",
            render: (text, record) => {
                return (
                    <Tooltip title={text}>
                        <div className="result-columns-div">{text}</div>
                    </Tooltip>
                );
            }
        }, {
            title: "修改前的值",
            dataIndex: "oldValue",
            width: 120,
            align: "center",
            render: (text, record) => {
                return (
                    <Tooltip title={text}>
                        <div className="result-columns-div">{text}</div>
                    </Tooltip>
                );
            }
        }, {
            title: "修改后的值",
            dataIndex: "newValue",
            width: 120,
            align: "center",
            render: (text, record) => {
                return (
                    <Tooltip title={text}>
                        <div className="result-columns-div">{text}</div>
                    </Tooltip>
                );
            }
        }];

        return columns;
    }


}

export default EditLogManager;