import React from 'react';
import BaseTable from "./BaseTable";
import {Button, Input, Space} from "antd";

class BaseToolbarTable extends BaseTable {

    constructor(props) {
        super(props);

        this.state.createModalVisible = false;
        this.state.queryModalVisible = false;

        this.state.keyword = null;

        this.getToolbar = this.getToolbar.bind(this);
        /*其他需要弹出框的Modal*/
        this.getOtherModal = this.getOtherModal.bind(this);

        /*关键字工具*/
        this.getKeywordUI = this.getKeywordUI.bind(this);
        this.getKeywordText = this.getKeywordText.bind(this);
        this.onKeywordClick = this.onKeywordClick.bind(this);
        this.onKeywordChange = this.onKeywordChange.bind(this);
        this.getKeywordPlaceholder = this.getKeywordPlaceholder.bind(this);

        /*查询工具*/
        this.getQueryUI = this.getQueryUI.bind(this);
        this.getQueryModal = this.getQueryModal.bind(this);
        this.onQueryClick = this.onQueryClick.bind(this);
        this.onQueryModalSubmitOk = this.onQueryModalSubmitOk.bind(this);
        this.onQueryModalCancel = this.onQueryModalCancel.bind(this);

        /*编辑工具*/
        this.getEditUI = this.getEditUI.bind(this);


        /*创建工具*/
        this.getCreateUI = this.getCreateUI.bind(this);
        this.getCreateModal = this.getCreateModal.bind(this);
        this.onCreateClick = this.onCreateClick.bind(this);
        this.onCreateModalSubmitOk = this.onCreateModalSubmitOk.bind(this);
        this.onCreateModalCancel = this.onCreateModalCancel.bind(this);

        this.getDetailUI = this.getDetailUI.bind(this);
    }

    /**
     * 返回工具条UI
     * @returns {*}
     */
    getToolbar() {
        return (
            <Space size="small"/>
        );
    }

    getOtherModal() {
        return <div></div>
    }


    /*关键字查询工具*/
    getKeywordUI() {
        return (
            <Input.Search size="small"
                          style={{width:300}}
                          placeholder={this.getKeywordPlaceholder()}
                          onSearch={this.onKeywordClick} onChange={this.onKeywordChange}
                          enterButton="搜索"/>
        );
    }

    onKeywordClick(value) {
        let qc = this.state.queryCondition;
        this.reload(1, qc);
    }

    onKeywordChange(e) {
        this.setState({keyword: e.currentTarget.value});
    }

    getKeywordText() {
        return this.state.keyword;
    }

    getKeywordPlaceholder(){
        return "关键字检索，相关文本内容条件都可以";
    }


    /*返回工具条更多查询VIEW*/
    getQueryUI() {
        return (
            <Button size="small" onClick={this.onQueryClick}>更多查询</Button>
        );
    }

    getQueryModal() {
        return <div></div>
    }

    onQueryClick() {
        this.setState({queryModalVisible: true});
    }

    onQueryModalSubmitOk(entityCondition) {
        let qc = {}
        qc.entity = entityCondition || {};
        if (this.state.queryCondition.keyword) {
            qc.keyword = this.state.queryCondition.keyword;
        }
        this.reload(1, qc);
        this.setState({queryModalVisible: false});
    }

    onQueryModalCancel() {
        this.setState({queryModalVisible: false})
    }


    /*返回工具条创建VIEW*/
    getCreateUI() {
        return (
            <Button size="small" onClick={this.onCreateClick}>新增</Button>
        );
    }
    getCreateModal() {
        return <div></div>
    }
    onCreateClick() {
        this.setState({
            createModalVisible: true
        })
    }
    onCreateModalSubmitOk(response) {
        this.reload(this.state.page.current, this.state.queryCondition);
        this.setState({createModalVisible: false});
    }
    onCreateModalCancel() {
        this.setState({createModalVisible: false})
    }

    /**
     * 编辑功能
     * @returns {*}
     */
    getEditUI() {
        return (
            <Button size="small" onClick={this.onEditClick}>编辑</Button>
        );
    }

    /*详情工具*/
    getDetailUI() {
        return (
            <Button size="small" onClick={this.onDetailClick}>详情</Button>
        );
    }
}

export default BaseToolbarTable;