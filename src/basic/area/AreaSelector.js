import React from 'react';
import BaseSelector from "../../base/BaseSelector";
import {Tooltip} from "antd";
import AreaQuery from "./AreaQuery";

class AreaSelector extends BaseSelector{
    constructor(props) {
        super(props);
    }
    getRequestUrl() {
        return "area/query"
    }
    getQueryModal() {
        return (
            <AreaQuery title={"区域查询"}
                       visible={this.state.queryModalVisible}
                       size={0.6}
                       onCancel={this.onQueryModalCancel}
                       onSubmitOk={this.onQueryModalSubmitOk}>
            </AreaQuery>
        );
    }
    getColumns() {
        const columns = [{
            title: '区域ID',
            dataIndex: 'id',
            width: 60,
            align: 'center'
        }, {
            title: '父区域ID',
            dataIndex: 'parentId',
            width: 60,
            align: 'center'
        }, {
            title: '区域级别',
            dataIndex: 'areaTypeName',
            width: 60,
            align: 'center'
        }, {
            title: '区域名字',
            dataIndex: 'areaName',
            width: 120,
            render(text, record) {
                return (
                    <Tooltip title={text}>
                        <div className="result-columns-div">{text}</div>
                    </Tooltip>
                );
            }
        }, {
            title: '区域简称',
            dataIndex: 'shortName',
            width: 120,
            render(text, record) {
                return (
                    <Tooltip title={text}>
                        <div className="result-columns-div">{text}</div>
                    </Tooltip>
                );
            }
        }, {
            title: '是否启用',
            dataIndex: 'isDeleted',
            width: 100,
            render: (text, record) => {
                return record.isDeleted ? '否' : '是'
            }
        }];
        return columns;
    }
}

export default AreaSelector;