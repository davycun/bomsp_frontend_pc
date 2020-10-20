import React from 'react';
import BaseManager from "../../base/BaseManager";
import {request} from "../../base/CiiUtils";
import {Table, Tooltip, message} from "antd";
import DictionaryEditor from "./DictionaryEditor";

class DictionaryManager extends BaseManager {

    constructor(props) {
        super(props);
        this.state.dictionary = {};
        this.state.selectedRowKeys = [];
        this.state.selectedRows = [];
        this.state.editCurrentData = {};
    }

    getRequestUrl() {
        return "dictionary/queryAllSupportDbParentDic";
    }

    onCreateClick() {
        if (!this.state.selectedRows || this.state.selectedRows.length < 1) {
            message.error("请选要添加字典的类型");
            return;
        }
        this.setState({currentData: this.state.selectedRows[0]})
        super.onCreateClick();
    }

    onCreateModalSubmitOk(response) {
        this.onTableExpand(true, this.state.selectedRows[0])
        this.setState({createModalVisible: false})
    }

    onEditClick(record) {
        this.setState({editCurrentData: record, editModalVisible: true});
    }

    onEditModalSubmitOk(response) {
        // this.onTableExpand(true, this.state.selectedRows[0])
        this.setState({editModalVisible: false})
    }

    getCreateModal() {
        return (
            <DictionaryEditor editor={false}
                              title={"新增字典"}
                              size={0.5}
                              currentData={this.state.currentData}
                              onSubmitOk={this.onCreateModalSubmitOk}
                              onCancel={this.onCreateModalCancel}
                              visible={this.state.createModalVisible}>
            </DictionaryEditor>
        );
    }

    getEditModal() {
        return (
            <DictionaryEditor editor={true}
                              size={0.5}
                              title={"字典编辑"}
                              currentData={this.state.editCurrentData}
                              visible={this.state.editModalVisible}
                              onSubmitOk={this.onEditModalSubmitOk}
                              onCancel={this.onEditModalCancel}>
            </DictionaryEditor>
        );
    }

    getQueryUI() {
        return;
    }

    getTableRowKey() {
        return "key";
    }

    getColumns() {
        const columns = [{
            title: 'key值',
            dataIndex: 'key',
            width: 100,
            align: 'center',
            render(text, record) {
                return (
                    <Tooltip title={text}>
                        <div className="result-columns-div">{text}</div>
                    </Tooltip>
                );
            }
        }, {
            title: '编码',
            dataIndex: 'code',
            width: 100
        }, {
            title: '名称',
            dataIndex: 'name',
            width: 100
        }, {
            title: '是否支持独立配置',
            dataIndex: 'supportAlone',
            width: 100,
            render: (text, record) => {
                return <span>{record["supportAlone"] ? "是" : "否"}</span>
            }
        }, {
            title: '父编码',
            dataIndex: 'parentCode',
            width: 100
        }]

        return columns;
    }

    getRowSelection() {
        let rowSelection = {
            type: "radio",
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange
        }
        return rowSelection;
    }

    getTableCanExpanded() {
        return true;
    }

    getTableExpandQueryUrl() {
        return "dictionary/queryByKey";
    }

    getTableExpandQueryData(record) {
        return {
            entity: {
                key: record.key
            }
        };
    }

    getTableExpandDataFromResponse(response) {
        return response.result.children;
    }

    getTableExpandColumns(record) {
        const cl = [{
            title: 'ID',
            dataIndex: 'id',
            width: 100,
            align: 'center',
            render(text, record) {
                return (
                    <Tooltip title={text}>
                        <div className="result-columns-div">{text}</div>
                    </Tooltip>
                );
            }
        }, {
            title: 'key值',
            dataIndex: 'key',
            width: 100,
            align: 'center',
            render(text, record) {
                return (
                    <Tooltip title={text}>
                        <div className="result-columns-div">{text}</div>
                    </Tooltip>
                );
            }
        }, {
            title: '编码',
            dataIndex: 'code',
            width: 120,
            render(text, record) {
                return (
                    <Tooltip title={text}>
                        <div className="result-columns-div">{text}</div>
                    </Tooltip>
                );
            }
        }, {
            title: '名称',
            dataIndex: 'name',
            width: 120,
            render(text, record) {
                return (
                    <Tooltip title={text}>
                        <div className="result-columns-div">{text}</div>
                    </Tooltip>
                );
            }
        }, {
            title: '父编码',
            dataIndex: 'parentCode',
            width: 100,
            render(text, record) {
                return (
                    <Tooltip title={text}>
                        <div className="result-columns-div">{text}</div>
                    </Tooltip>
                );
            }
        }, {
            title: '操作',
            width: 100,
            align: "center",
            render: (text, record) => (
                <div style={{margin: 'auto', textAlign: 'center'}}>
                    <a onClick={() => this.onEditClick(record)}>编辑</a>
                </div>
            )
        }];
        return cl;
    }

    getTableExpandRowKey() {
        return "id";
    }

    // getTableExpandedRowRender(record, index, indent, expanded) {
    //     const cl = [{
    //         title: 'ID',
    //         dataIndex: 'id',
    //         width: 100,
    //         align: 'center',
    //         render(text, record) {
    //             return (
    //                 <Tooltip title={text}>
    //                     <div className="result-columns-div">{text}</div>
    //                 </Tooltip>
    //             );
    //         }
    //     }, {
    //         title: 'key值',
    //         dataIndex: 'key',
    //         width: 100,
    //         align: 'center',
    //         render(text, record) {
    //             return (
    //                 <Tooltip title={text}>
    //                     <div className="result-columns-div">{text}</div>
    //                 </Tooltip>
    //             );
    //         }
    //     }, {
    //         title: '编码',
    //         dataIndex: 'code',
    //         width: 120,
    //         render(text, record) {
    //             return (
    //                 <Tooltip title={text}>
    //                     <div className="result-columns-div">{text}</div>
    //                 </Tooltip>
    //             );
    //         }
    //     }, {
    //         title: '名称',
    //         dataIndex: 'name',
    //         width: 120,
    //         render(text, record) {
    //             return (
    //                 <Tooltip title={text}>
    //                     <div className="result-columns-div">{text}</div>
    //                 </Tooltip>
    //             );
    //         }
    //     }, {
    //         title: '父编码',
    //         dataIndex: 'parentCode',
    //         width: 100,
    //         render(text, record) {
    //             return (
    //                 <Tooltip title={text}>
    //                     <div className="result-columns-div">{text}</div>
    //                 </Tooltip>
    //             );
    //         }
    //     }, {
    //         title: '操作',
    //         width: 100,
    //         align: "center",
    //         render: (text, record) => (
    //             <div style={{margin: 'auto', textAlign: 'center'}}>
    //                 <a onClick={() => this.onEditClick(record)}>编辑</a>
    //             </div>
    //         )
    //     }];
    //
    //     {/*<Table bordered={false}*/}
    //     {/*       rowKey={"code"}*/}
    //     {/*       size={"small"}*/}
    //     {/*       columns={cl}*/}
    //     {/*       scroll={{x: 800}}*/}
    //     {/*       pagination={false}*/}
    //     {/*       dataSource={this.state.dictionary[record.key]}>*/}
    //     {/*</Table>*/}
    //
    //     return (
    //
    //
    //         <Table bordered={false}
    //                rowKey={this.getTableExpandRowKey()}
    //                size={"small"}
    //                scroll={{x: this.getTableScrollX(), y: this.getTableExpandScrollY()}}
    //                columns={this.getTableExpandColumns(record)}
    //                pagination={this.getTableExpandPagination()}
    //                dataSource={this.state.tableExpandData[record[this.getTableRowKey()]]}>
    //         </Table>
    //     );
    // }
    //
    // onTableExpand(expanded, record) {
    //     if (expanded) {
    //         request({
    //             conf: {
    //                 url: 'dictionary/queryByKey',
    //                 data: {
    //                     entity: {
    //                         key: record.key
    //                     }
    //                 }
    //             },
    //             success: (data) => {
    //                 // let fl = this.state.dictionary;
    //                 let fl = this.state.tableExpandData;
    //                 fl[record.key] = data.result.children;
    //
    //                 this.setState({
    //                     tableExpandData: fl
    //                 })
    //             }
    //         });
    //     } else {
    //
    //     }
    // }

}

export default DictionaryManager;