import React from 'react';
import {Button, message, Row, Col, Popconfirm, Space} from "antd";
import UserSelector from '../../ums/UserSelector';

import {request} from "../../base/CiiUtils";
import BaseTreeTableSplitManager from "../../base/BaseTreeTableSplitManager";


/**
 * 角色分配给用户,使用示例如下，
 */
class RoleUserManager extends BaseTreeTableSplitManager {

    constructor(props) {
        super(props);
        this.state.userSelectorVisible = false;
    }

    getRequestUrl() {
        return "userEmployee/queryRoleUser";
    }

    getTreeConfig() {
        return {
            queryUrl: 'role/query',
            code: 'id',
            name: 'roleName'
        }
    }
    onTreeSelectChange(currentData) {
        this.setState({currentData: currentData})
        this.reload(1, {entity: {roleId: currentData.id}})
    }
    getToolbar() {
        return (
            <div className="toolbar">
                <Space size={"small"}>
                    <Button size="small" onClick={this.onAllotClick}>分配</Button>
                    <Button size="small" onClick={() => {
                        this.setState({treeQueryCondition: {}})
                    }}>刷新</Button>
                </Space>
            </div>
        );
    }
    getRightPaneSplit() {
        return false;
    }
    onKeywordClick(value) {
        if (!this.state.currentData.id) {
            message.error("请先选择角色再查询");
            return;
        }
        let qc = this.state.queryCondition;
        if (!qc.entity || !qc.entity.roleId){
            qc.entity = {
                roleId : this.state.currentData.id
            }
        }
        this.reload(1, qc);
    }

    onAllotClick = () => {
        const cd = this.state.currentData[this.getTreeConfig()["code"]];
        if (cd && cd != "0") {
            this.setState({userSelectorVisible: true});
        } else {
            message.error("请先选择角色")
        }
    }

    /**
     * 用户选择器选中
     * @param selectedRowKeys
     * @param selectedRows
     */
    onUserSelectorOk = (keys, rows) => {

        this.setState({userSelectorVisible: false});

        const {id} = this.state.currentData;

        request({
            conf: {
                url: 'roleUser/allot',
                data: {
                    roleId: id,
                    userIds: keys
                }
            },
            success: (data) => {
                message.success(data.message);
                this.reload(1, {roleId: id})
            }
        });

    }
    deleteRoleUser = (record) => {
        request({
            conf: {
                url: 'roleUser/delete',
                data: {
                    entity: {
                        roleId: this.state.currentData.id,
                        userId: record.id
                    }
                }
            },
            success: () => {
                message.success("删除成功");
                this.reload(1, {entity:{roleId: this.state.currentData.id}})
            }
        });
    }



    getOtherModal() {
        return (
            <UserSelector title={"用户角色分配"}
                          selectType={"checkbox"}
                          size={0.7}
                          visible={this.state.userSelectorVisible}
                          onSubmitOk={this.onUserSelectorOk}
                          onCancel={() => {
                              this.setState({userSelectorVisible: false})
                          }}>
            </UserSelector>
        );
    }

    getColumns() {
        const columns = [{
            title: '姓名',
            dataIndex: 'userName',
            align: 'left',
            width: 200,
        }, {
            title: '电话',
            dataIndex: 'userPhone',
            align: 'left',
            width: 180,
        }, {
            title: '部门',
            dataIndex: 'ownerDeptName',
            align: 'left'
        }, {
            title: '操作',
            fixed: 'right',
            width: 100,
            render: (text, record) => (
                <Popconfirm title="确定要删除?" onConfirm={() => {
                    this.deleteRoleUser(record)
                }}>
                    <a>删除</a>
                </Popconfirm>
            )
        }];


        return columns;
    }

}

export default RoleUserManager;