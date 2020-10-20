import React from 'react';
import {Tooltip} from "antd";
import NewsEditor from "./NewsEditor";
import BaseManager from "../../base/BaseManager";
import NewsQuery from "./NewsQuery";


class NewsManager extends BaseManager {

    constructor(props) {
        super(props);
    }

    getRequestUrl() {
        return "news/query";
    }
    getTableRowKey() {
        return "newsCode"
    }
    getEditModal() {
        return (
            <NewsEditor title={"资讯编辑"}
                        editor={true}
                        currentData={this.state.currentData}
                        size={0.8}
                        visible={this.state.editModalVisible}
                        onCancel={this.onEditModalCancel}
                        onSubmitOk={this.onEditModalSubmitOk}/>
        );
    }

    getCreateModal() {
        return (
            <NewsEditor title={"资讯新增"}
                        editor={false}
                        size={0.8}
                        visible={this.state.createModalVisible}
                        onCancel={this.onCreateModalCancel}
                        onSubmitOk={this.onCreateModalSubmitOk}/>
        );
    }

    getQueryModal() {
        return (
            <NewsQuery title={"查询条件"}
                       size={0.55}
                       visible={this.state.queryModalVisible}
                       onCancel={this.onQueryModalCancel}
                       onSubmitOk={this.onQueryModalSubmitOk} >

            </NewsQuery>
        );
    }

    /**
     * 获取员工列表要展示的列信息
     * @returns {*[]}
     */
    getColumns(){
        const columns = [{
            title: '资讯ID',
            dataIndex: 'id',
            width: 200
        }, {
            title: '资讯标题',
            dataIndex: 'newsTitle',
            width: 200,
            render: (text, record) => {
                return (
                    <Tooltip title={record.newsTitle}>
                        <div className="result-columns-div">{record.newsTitle}</div>
                    </Tooltip>
                );
            }
        }, {
            title: '资讯类型',
            dataIndex: 'newsTypeName',
            width: 200
        }, {
            title: '资讯摘要',
            dataIndex: 'brief',
            width: 200,
            render: (text, record) => {
                return (
                    <Tooltip title={record.brief}>
                        <div className="result-columns-div">{record.brief}</div>
                    </Tooltip>
                );
            }
        }, {
            title: '资讯内容',
            dataIndex: 'content',
            width: 200,
            render: (text, record) => {
                return (
                    <div className="result-columns-div">{record.content}</div>
                );
            }
        }];

        return columns;
    }

    getOperationWidth() {
        return 50;
    }
    getOperations(record) {
        return [{
            name:"编辑",
            onClick:this.onEditClick
        }];
    }

}

export default NewsManager;