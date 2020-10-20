import React from 'react';
import BaseManager from "../../base/BaseManager";
import {Tooltip} from "antd";
import OperationLogQuery from "./OperationLogQuery";

import {Utils} from "../../base/CiiUtils";

class OperationLogManager extends BaseManager{

    constructor(props) {
        super(props);
    }

    getRequestUrl() {
        return "operationLog/query";
    }

    getQueryModal() {
        return (
            <OperationLogQuery title={"日志查询条件"}
                               size={0.6}
                               visible={this.state.queryModalVisible}
                               onSubmitOk={this.onQueryModalSubmitOk}
                               onCancel={this.onQueryModalCancel}>
            </OperationLogQuery>
        );
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
            width:300,
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
            width:100,
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

export default OperationLogManager;