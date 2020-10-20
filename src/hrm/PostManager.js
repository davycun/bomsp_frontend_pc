import React from 'react';
import PostEditor from "./PostEditor";
import BaseManager from "../base/BaseManager";


class PostManager extends BaseManager {

    constructor(props) {
        super(props);
    }

    // getToolbar() {
    //     return (
    //         <div className="toolbar">
    //             <Row align={'middle'} style={{width: 600}}>
    //                 <Col span={14}>
    //                     {
    //                         this.getKeywordUI()
    //                     }
    //                 </Col>
    //                 <Col style={{marginLeft:5}} span={3}>
    //                     {
    //                         this.getCreateUI()
    //                     }
    //                 </Col>
    //                 {
    //                     this.getCreateModal()
    //                 }
    //                 {
    //                     this.getEditModal()
    //                 }
    //                 {
    //                     this.getDetailModal()
    //                 }
    //                 {
    //                     this.getOtherModal()
    //                 }
    //             </Row>
    //         </div>
    //     );
    // }

    getRequestUrl() {
        return 'post/query';
    }

    getTableScrollX() {
        return 500;
    }

    getCreateModal() {
        return (
            <PostEditor title={"岗位新增"}
                        editor={false}
                        visible={this.state.createModalVisible}
                        size={0.5}
                        onSubmitOk={this.onCreateModalSubmitOk}
                        onCancel={this.onCreateModalCancel} />
        );
    }

    getEditModal() {
        return (
            <PostEditor title={"编辑岗位"}
                        editor={true}
                        currentData={this.state.currentData}
                        visible={this.state.editModalVisible}
                        size={0.5}
                        onSubmitOk={this.onEditModalSubmitOk}
                        onCancel={this.onEditModalCancel}  />
        );
    }

    getColumns = () => {
        const columns = [{
            title: "岗位编码",
            dataIndex: "id",
            width: 250
        }, {
            title: "岗位名称",
            dataIndex: "postName",
            width: 200
        }, {
            title: "备注",
            dataIndex: "remark"
        }];


        return columns;
    }

    getOperationWidth() {
        return 80;
    }

    getOperations(record) {
        let opts = [{
            name:"编辑",
            onClick:this.onEditClick
        }];

        return opts;
    }
}

export default PostManager;