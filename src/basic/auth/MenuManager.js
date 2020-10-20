import React from 'react';
import {Descriptions} from "antd";
import MenuEditor from './MenuEditor';

import './MenuManager.css';
import BaseTreeTableSplitManager from "../../base/BaseTreeTableSplitManager";



class MenuManager extends BaseTreeTableSplitManager {

    constructor(props) {
        super(props);
    }

    getTreeConfig() {
        return {
            queryUrl:'menu/queryAll',
            code:'id',
            name:'menuName'
        }
    }

    getEditModal() {
        return (
            <MenuEditor title={"菜单编辑"}
                        editor={true}
                        size={0.7}
                        currentData={this.state.currentData}
                        visible={this.state.editModalVisible}
                        onCancel={this.onEditModalCancel}
                        onSubmitOk={this.onEditModalSubmitOk}>
            </MenuEditor>
        );
    }

    getCreateModal() {
        return (
            <MenuEditor title={"新增菜单"}
                        editor={false}
                        size={0.7}
                        currentData={this.state.currentData}
                        visible={this.state.createModalVisible}
                        onCancel={this.onCreateModalCancel}
                        onSubmitOk={this.onCreateModalSubmitOk}>
            </MenuEditor>
        );
    }

    getRightPaneSplit() {
        return false;
    }

    getRightPane() {
        const menu = this.state.currentData;
        return (
            <Descriptions column={2} bordered={true} size="small" title={"部门基本信息"}>
                <Descriptions.Item label={"父菜单编码必填"}>
                    {menu.parentId}
                </Descriptions.Item>
                <Descriptions.Item label={"菜单编码"}>
                    {menu.id}
                </Descriptions.Item>
                <Descriptions.Item label={"菜单名称"}>
                    {menu.menuName}
                </Descriptions.Item>
                <Descriptions.Item label={"菜单类型"}>
                    {menu.menuTypeName}
                </Descriptions.Item>
                <Descriptions.Item label={"菜单层级"}>
                    {menu.level}
                </Descriptions.Item>
                <Descriptions.Item label={"菜单排序"}>
                    {menu.sort}
                </Descriptions.Item>
                <Descriptions.Item label={"ItemId"}>
                    {menu.itemId}
                </Descriptions.Item>
                <Descriptions.Item label={"ItemIcon"}>
                    {menu.itemIcon}
                </Descriptions.Item>
                <Descriptions.Item label={"ItemClass"}>
                    {menu.itemClass}
                </Descriptions.Item>
                <Descriptions.Item label={"ItemPack"}>
                    {menu.itemPack}
                </Descriptions.Item>
                <Descriptions.Item label={"remark"}>
                    {menu.remark}
                </Descriptions.Item>
            </Descriptions>
        );
    }
}

export default MenuManager;