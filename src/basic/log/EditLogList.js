import React from 'react';
import BaseList from "../../base/BaseList";
import {Tooltip} from "antd";
import {Utils} from "../../base/CiiUtils";

class EditLogList extends BaseList{

    constructor(props) {
        super(props);
    }

    getRequestUrl() {
        return "editLog/query";
    }

    getTableScrollX() {
        return 1200;
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
    
}

export default EditLogList;