import React from 'react';
import BaseManager from "../../base/BaseManager";
import {Tooltip, message, Breadcrumb, Row, Col, Space} from "antd";
import AreaEditor from "./AreaEditor";
import AreaQuery from "./AreaQuery";

class AreaManager extends BaseManager {

    constructor(props) {
        super(props);

        this.state.breadcrumbArea = [{areaName: "全部", id: 0, parentId: 0}];
        this.state.queryCurrentData = {};

    }

    getRequestUrl() {
        return "area/query"
    }

    getToolbar() {
        return (
            <div className="toolbar">
                <Space size={"small"}>
                    {
                        this.getKeywordUI()
                    }
                    {
                        this.getQueryUI()
                    }
                    {
                        this.getCreateUI()
                    }
                    <Breadcrumb separator={">"}>
                        {
                            this.readerBreadcrumbArea(this.state.breadcrumbArea)
                        }
                    </Breadcrumb>
                </Space>
                {
                    this.getCreateModal()
                }
                {
                    this.getEditModal()
                }
                {
                    this.getQueryModal()
                }
                {
                    this.getDetailModal()
                }
                {
                    this.getOtherModal()
                }
            </div>
        );
    }

    getEditModal() {
        return (
            <AreaEditor editor={true}
                        title={"区域编辑"}
                        size={0.7}
                        visible={this.state.editModalVisible}
                        currentData={this.state.currentData}
                        onCancel={this.onEditModalCancel}
                        onSubmitOk={this.onEditModalSubmitOk}>
            </AreaEditor>
        );
    }

    getQueryModal() {
        return (
            <AreaQuery title={"区域查询"}
                       visible={this.state.queryModalVisible}
                       size={0.6}
                       onCancel={this.onQueryModalCancel}
                       onSubmitOk={this.onQueryModalSubmitOk}>
            </AreaQuery>
        );
    }

    getCreateModal() {
        return (
            <AreaEditor editor={false}
                        title={"新增区域"}
                        size={0.7}
                        visible={this.state.createModalVisible}
                        currentData={this.state.currentData}
                        onCancel={this.onCreateModalCancel}
                        onSubmitOk={this.onCreateModalSubmitOk}>
            </AreaEditor>
        );
    }

    onCreateClick() {
        if (!this.state.selectedRows || this.state.selectedRows.length < 1) {
            message.error("请选择要添加的区域的父区域！");
            return;
        }
        this.setState({currentData: this.state.selectedRows[0]})
        super.onCreateClick();
    }

    getRowSelection() {
        let rowSelection = {
            type: "radio",
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange
        }
        return rowSelection;
    }

    getColumns() {
        const columns = [{
            title: '区域ID',
            dataIndex: 'id',
            width: 120,
            align: 'center',
            render: (text, record) => {
                return (
                    <Tooltip title={text}>
                        <div className="result-columns-div">{text}</div>
                    </Tooltip>
                );
            }
        }, {
            title: '父区域ID',
            dataIndex: 'parentId',
            width: 120,
            align: 'center',
            render: (text, record) => {
                return (
                    <Tooltip title={text}>
                        <div className="result-columns-div">{text}</div>
                    </Tooltip>
                );
            }
        }, {
            title: '区域级别',
            dataIndex: 'areaTypeName',
            width: 80,
            align: 'center'
        }, {
            title: '区域名字',
            dataIndex: 'areaName',
            width: 120,
            render(text, record) {
                return (
                    <Tooltip title={text}>
                        <div className="result-columns-div">{text}</div>
                    </Tooltip>
                );
            }
        }, {
            title: '区域简称',
            dataIndex: 'shortName',
            width: 120,
            render(text, record) {
                return (
                    <Tooltip title={text}>
                        <div className="result-columns-div">{text}</div>
                    </Tooltip>
                );
            }
        }, {
            title: '是否启用',
            dataIndex: 'isDeleted',
            align:'center',
            width: 100,
            render: (text, record) => {
                return record.isDeleted ? '否' : '是'
            }
        }, {
            title: '操作',
            fixed: 'right',
            align: 'center',
            width: 100,
            render: (text, record) => (
                <div style={{margin: 'auto', textAlign: 'center'}}>
                    <a  onClick={() => this.onEditClick(record)}>编辑</a>
                </div>
            )
        }];
        return columns;
    }


    readerBreadcrumbArea = (data) => data.map((area, index) => {
        return (
            <Breadcrumb.Item key={area.id}
                             onClick={() => this.breadcrumbClick(area, index)}>{area.areaName}</Breadcrumb.Item>
        );
    });

    breadcrumbClick = (area, index) => {
        let areas = [...this.state.breadcrumbArea];

        areas.splice(index + 1, areas.length - 1 - index);

        this.setState({breadcrumbArea: areas});
        if (area.id == 0) {
            this.reload(1, {
                entity: {
                }
            });
        } else {
            this.reload(1, {
                entity: {
                    parentId: area.id
                },
                keyword:""
            });
        }
    }

    onRowDoubleClick(record) {
        let areas = [...this.state.breadcrumbArea];
        areas.push(record);
        this.setState({breadcrumbArea: areas});

        this.reload(1, {
            entity: {
                parentId: record.id
            },
            keyword:""
        });
    }
}

export default AreaManager;