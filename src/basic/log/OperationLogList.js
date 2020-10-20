import React from 'react';
import BaseList from "../../base/BaseList";
import {Tooltip} from "antd";
import {Utils} from "../../base/CiiUtils";

class OperationLogList extends BaseList{

    constructor(props) {
        super(props);

    }

    getRequestUrl() {
        return "operationLog/query";
    }

    getTableScrollX() {
        return 700;
    }

    getColumns() {
        const columns = [{
            title:'操作类型',
            dataIndex:'optTypeName',
            width:100,
            align:'center'
        },{
            title:'操作内容',
            dataIndex:'content',
            align:'center',
            width:200,
            render:(text,record)=>{
                return (
                    <Tooltip title={text}>
                        <div className="result-columns-div">{text}</div>
                    </Tooltip>
                );
            }
        },{
            title:'操作人',
            dataIndex:'createName',
            align:'center',
            width:100
        },{
            title:'操作时间',
            dataIndex:'createTime',
            align:'center',
            width:160,
            render:(text,record)=>{
                let dt = Utils.dateFormat(new Date(record.createTime),"yyyy-MM-dd hh:mm:ss");
                return (
                    <Tooltip title={dt}>
                        <div className="result-columns-div">{dt}</div>
                    </Tooltip>
                );
            }
        }];

        return columns;
    }

}

export default OperationLogList;