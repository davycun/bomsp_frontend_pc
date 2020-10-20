import React from 'react';
import {Col, Row, Spin,Space} from "antd";
import BaseToolbarTable from "./BaseToolbarTable";


/**
 * 最基本的用户，新增自己的Manager，然后重载函数getColumns,getRequestUrl即可
 */
class BaseManager extends BaseToolbarTable {

    constructor(props) {
        super(props);
    }

    getToolbar() {
        return (
            <div className="toolbar">
                <Space size="small">
                    {
                        this.getKeywordUI()
                    }
                    {
                        this.getQueryUI()
                    }
                    {
                        this.getCreateUI()
                    }
                </Space>
                {
                    this.getCreateModal()
                }
                {
                    this.getEditModal()
                }
                {
                    this.getQueryModal()
                }
                {
                    this.getDetailModal()
                }
            </div>
        );
    }

    render() {
        return (
            <div>
                {
                    this.getToolbar()
                }
                {
                    this.getOtherModal()
                }
                <div style={{height: this.state.height}} >
                    <Spin size="large" spinning={this.state.tableLoading}>
                        {
                            this.getTable()
                        }
                    </Spin>
                </div>
            </div>
        );
    }

}

export default BaseManager;