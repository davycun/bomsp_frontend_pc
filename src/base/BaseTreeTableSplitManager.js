import React from 'react';
import {Col, message, Row, Space} from "antd";
import TreeManager from "../component/TreeManager";
import BaseSplitManager from "./BaseSplitManager";

/**
 * 默认只是支持创建功能及列表中的关键字查询功能
 * 可扩展的方法
 * getCreateModal()
 * getToolbarCreateUI()
 * getTreeDataQueryUrl()
 * getColumns()
 * getRequestUrl()
 * getTreeConfig()
 */
class BaseTreeTableSplitManager extends BaseSplitManager {

    constructor(props) {
        super(props);
        this.state.selectedKeys = [];
        this.state.expandedKeys = ['rootNode'];
        this.state.treeData = [];

        this.state.treeQueryCondition = {};

        this.getTreeConfig = this.getTreeConfig.bind(this);
        this.onTreeSelectChange = this.onTreeSelectChange.bind(this);

    }

    init() {

    }

    getToolbar() {
        return (
            <div className="toolbar">
                <Space size={"small"}>
                    {
                        this.getCreateUI()
                    }
                    {
                        this.getEditUI()
                    }
                    {
                        this.getCreateModal()
                    }
                    {
                        this.getEditModal()
                    }
                </Space>
            </div>
        );
    }

    onEditClick(record) {
        const cd = this.state.currentData[this.getTreeConfig()["code"]];
        if (cd && cd != "0") {
            this.setState({editModalVisible: true});
        } else {
            message.error("请先选择左侧数")
        }
    }

    onEditModalSubmitOk(response) {
        this.setState({editModalVisible: false, treeQueryCondition: {}});
    }

    onCreateClick() {
        const cd = this.state.currentData[this.getTreeConfig()["code"]];
        if (cd) {
            this.setState({createModalVisible: true});
        } else {
            message.error("请先选择部门")
        }
    }

    onCreateModalSubmitOk(response) {
        this.setState({createModalVisible: false, treeQueryCondition: {}});
    }

    getLeftPane() {
        const {name, code, children, queryUrl} = this.getTreeConfig();

        return (
            <TreeManager queryUrl={queryUrl}
                         name={name}
                         code={code}
                         children={children ? children : 'children'}
                         queryCondition={this.state.treeQueryCondition}
                         onSelectChange={this.onTreeSelectChange}>
            </TreeManager>
        );
    }

    getTreeConfig() {
        return {
            queryUrl: "",
            code: "id",
            name: "name",
            children: "children"
        }
    }

    onTreeSelectChange(currentData) {
        this.setState({currentData: currentData});
    }

    /**
     * 采用默认的split作为内容返回左边区域内容
     * @returns {*}
     */
    getRightPaneSplit() {
        return true;
    }

    getRightPaneTop() {
    }

    getRightPaneBottom() {
        return (
            <div>
                <Row style={{width: 350}}>
                    {
                        this.getKeywordUI()
                    }
                </Row>
                {
                    this.getTable()
                }
            </div>
        );
    }
}

export default BaseTreeTableSplitManager;