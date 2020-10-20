import React from 'react';
import {Button, Spin, Tree,message} from "antd";
import RoleEditor from './RoleEditor';
import {request} from "../../base/CiiUtils";

import BaseTreeTableSplitManager from "../../base/BaseTreeTableSplitManager";

const {TreeNode} = Tree;

class RoleManager extends BaseTreeTableSplitManager {

    constructor(props) {
        super(props);
        this.state.loading = false;
        this.state.menus = [];
        this.state.menuSelectedKeys = [];
        this.state.menuExpandedKeys = ["menuCode"];
        this.state.menuAutoExpandParent = true;
        this.state.menuCheckedKeys = [];
    }

    init() {
        this.reloadMenuTree();
    }

    getTreeConfig() {

        return {
            queryUrl:'role/query',
            code:'id',
            name:'roleName'
        }
    }

    onTreeSelectChange(currentData) {
        this.setState({currentData:currentData})
        this.reloadRoleCheckedMenu(currentData.id)
    }

    getRightPaneSplit() {
        return false;
    }

    onCreateClick() {
        this.setState({createModalVisible: true});
    }

    getCreateModal() {
        return (
            <RoleEditor title={"新增角色"}
                        editor={false}
                        size={0.4}
                        visible={this.state.createModalVisible}
                        onSubmitOk={this.onCreateModalSubmitOk}
                        onCancel={this.onCreateModalCancel} >
            </RoleEditor>
        );
    }

    getEditModal() {
        return (
            <RoleEditor title={"新增角色"}
                        editor={true}
                        size={0.4}
                        currentData={this.state.currentData}
                        visible={this.state.editModalVisible}
                        onSubmitOk={this.onEditModalSubmitOk}
                        onCancel={this.onEditModalCancel} >
            </RoleEditor>
        );
    }

    getSplitPaneMaxSize() {
        return -250;
    }

    getRightPane() {

        return (
            <Spin size={"large"} spinning={this.state.loading} >
                <div style={{
                    float: 'left',
                    width: 200,
                    overflowY: 'auto',
                    borderRight: '2px solid #F0F2F5',
                    height: this.state.height
                }}>
                    <Tree
                        checkable
                        checkStrictly={true}
                        autoExpandParent={this.state.menuAutoExpandParent}
                        checkedKeys={this.state.menuCheckedKeys}
                        expandedKeys={this.state.menuExpandedKeys}
                        onCheck={this.onMenuCheck}
                        onExpand={this.onMenuExpand}>
                        {this.renderMenuTree(this.state.menus)}
                    </Tree>
                </div>
                <div style={{float: 'left', marginTop: 20, paddingLeft: 13}}>
                    <Button onClick={this.saveRoleMenu}>保存分配</Button>
                </div>
            </Spin>
        );
    }


    /**
     * 接口调用重新加载右侧菜单树
     */
    reloadMenuTree = () => {
        request({
            conf: {
                url: 'menu/queryMyAllotMenu',
                data: {}
            },
            success: (data) => {
                this.setState({
                    menus: data.result
                });
            }
        });
    }

    /**
     * 渲染右侧菜单树
     * @param data
     * @returns {*}
     */
    renderMenuTree = (data) => data.map((item) => {
        if (item.children && item.children.length) {
            return (
                <TreeNode title={item.menuName} key={item.id} dataRef={item}>
                    {this.renderMenuTree(item.children)}
                </TreeNode>
            )
        }
        return <TreeNode title={item.menuName} key={item.id} dataRef={item}/>;
    });


    /**
     * 保存角色分配的菜单
     */
    saveRoleMenu = () => {

        this.setState({loading: true});
        request({
            conf: {
                url: 'roleMenu/update',
                data: {
                    roleId: this.state.currentData.id,
                    menuIds: this.state.menuCheckedKeys
                }
            },
            success: (data) => {
                message.success("操作成功")
            },
            finally:()=>{
                this.setState({loading: false});
            }
        });
    }

    /**
     * 当点击角色的树的时候，去加载当前角色配置的菜单
     */
    reloadRoleCheckedMenu = (roleId) => {
        if (roleId) {
            request({
                conf: {
                    url: 'menu/queryRoleMenuCode',
                    data: {
                        entity: {
                            roleId: roleId
                        }
                    }
                },
                success: (data) => {
                    this.setState({
                        // menuCheckedKeys: {
                        //     checked:data.result,
                        //     halfChecked:[]
                        // }
                        menuCheckedKeys: data.result
                    });
                }
            });
        }
    }
    onMenuExpand = (expandedKeys) => {

        this.setState({
            menuExpandedKeys: expandedKeys,
            menuAutoExpandParent: false
        });

    }
    /**
     * 如果checkStrictly设置为true，
     * 那么选中可以包含在参数checkedKeys中的checked属性，
     * 否则选中的key直接就是参数checkedKeys
     * @param checkedKeys
     * @param info
     */
    onMenuCheck = (checkedKeys, info) => {
        this.setState({
            // menuCheckedKeys: checkedKeys
            menuCheckedKeys: checkedKeys.checked
        });
    }
}

export default RoleManager;