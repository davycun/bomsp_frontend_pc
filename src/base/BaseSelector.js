import React from 'react';
import {message, Modal, Space, Spin} from "antd";
import {Size} from "./Size";
import BaseToolbarTable from "./BaseToolbarTable";

/**
 * <BaseSelector props.. />
 * 有如下属性：
 * 1、onCancel 函数 指定弹出对话框取消的处理函数
 * 2、selectType 字符串 "checkbox|radio"，多选或者单选
 * 3、scrollY 数值  表格高度，默认值是200
 * 4、onSubmitOk  选择框点击ok的处理函数，参数（selectedRowKeys,selectedRows）
 * 5、visible 布尔值 设置弹出框是否可见
 * 6、size 弹出窗口的大小
 *
 */
class BaseSelector extends BaseToolbarTable {

    constructor(props) {
        super(props);
        this.state.selectedRowKeys = [];
        this.state.selectedRows = [];

        this.onSelectChange = this.onSelectChange.bind(this);
        this.onSubmitOk = this.onSubmitOk.bind(this);
        this.getModalSize = this.getModalSize.bind(this);
    }

    getToolbar() {
        return (
            <div className="toolbar-selector">
                <Space size={"small"}>
                    {
                        this.getKeywordUI()
                    }
                    {
                        this.getQueryUI()
                    }
                </Space>
                {
                    this.getQueryModal()
                }
            </div>
        );
    }

    getRowSelection() {
        const {selectType} = this.props;
        let rowSelection = {
            type: selectType ? selectType : "radio",
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange
        }
        return rowSelection;
    }

    /**
     * 列表选择改变的处理函数
     * @param selectedRowKeys
     * @param selectedRows
     */
    onSelectChange(selectedRowKeys, selectedRows) {
        this.setState({
            selectedRowKeys,
            selectedRows
        });
    }

    onSubmitOk() {
        if (!this.state.selectedRows || this.state.selectedRows.length < 1) {
            message.error("请在列表中选择数据");
            return;
        }
        const {onSubmitOk} = this.props;
        if (onSubmitOk) {
            onSubmitOk(this.state.selectedRowKeys, this.state.selectedRows);
        }
    }

    getModalSize() {
        if (this.props.size && this.props.size < 1) {
            return this.props.size;
        }
        return 0.9;
    }

    getTablePageClassName() {
        return "modal-page";
    }

    getTableScrollY() {
        return Size.screenHeight() * this.getModalSize() - 125 - Size.pageHeight - Size.tableHeaderHeight - Size.toolbarHeight
    }

    render() {
        const {title, visible, onCancel} = this.props;
        return (
            <Modal title={title}
                   visible={visible}
                   onCancel={onCancel}
                   onOk={this.onSubmitOk}
                   style={{top: Size.screenHeight() * (1 - this.getModalSize()) / 2}}
                   bodyStyle={{height: Size.screenHeight() * this.getModalSize() - 110, overflow: 'auto'}}
                   width={Size.screenWidth() * this.getModalSize()}
                   okText={"确定"}>
                {
                    this.getToolbar()
                }
                <Spin size="large" spinning={this.state.tableLoading}>
                    {
                        this.getTable()
                    }
                </Spin>
            </Modal>
        );
    }
}

export default BaseSelector;