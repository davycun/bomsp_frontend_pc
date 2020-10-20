import React from 'react';
import BaseTreeTableSplitManager from "../../base/BaseTreeTableSplitManager";
import DeptAreaEditor from "./DeptAreaEditor";
import {request} from "../../base/CiiUtils";

class DeptAreaManager extends BaseTreeTableSplitManager {

    constructor(props) {
        super(props);
    }

    getEditUI() {
        return <div></div>
    }

    getRequestUrl() {
        return "deptArea/query";
    }
    getTreeConfig() {
        return {
            queryUrl:'dept/queryToTree',
            code:'id',
            name:'deptName'
        }
    }
    getColumns() {
        const columns = [{
            title: '城市',
            dataIndex: 'cityName',
            width: 100
        }, {
            title: '区域',
            dataIndex: 'regionName',
            width: 150,
        },{
            title: '街道',
            dataIndex: 'streetName',
            width: 150,
        },{
            title: '社区',
            dataIndex: 'communityName',
            width: 150,
        }];
        return columns;
    }

    getOperationWidth() {
        return 80;
    }

    getOperations(record) {
        let opts = [{
            name:'删除',
            onClick:this.onDeletedDeptAreaClick,
            popConfirmTitle:"是否确认删除"
        }];

        return opts;
    }

    onTreeSelectChange(currentData) {
        this.setState({currentData:currentData});
        this.reload(1, {entity: {deptId: currentData.id}})
    }

    onCreateModalSubmitOk(response) {
        this.setState({createModalVisible:false});
        this.reload(1,this.state.queryCondition);
    }

    onDeletedDeptAreaClick = (record)=>{
        request({
            conf:{
                url:'deptArea/delete',
                data:{
                    entity:{
                        id:record.id
                    }
                }
            },
            success:(data)=>{
                this.reload(1,this.state.queryCondition);
            }
        })
    }

    getCreateModal() {
        return (
            <DeptAreaEditor editor={false}
                        title={"关联部门区域"}
                        size={0.6}
                        currentData={this.state.currentData}
                        visible={this.state.createModalVisible}
                        onSubmitOk={this.onCreateModalSubmitOk}
                        onCancel={this.onCreateModalCancel}>
            </DeptAreaEditor>
        );
    }

    getRightPaneSplit() {
        return false;
    }

    getContentRightBottomPane() {
        return this.getTable();
    }

}

export default DeptAreaManager;