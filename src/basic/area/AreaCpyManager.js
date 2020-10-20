import React from 'react';
import BaseManager from "../../base/BaseManager";
import {Button, Col, Row, Tooltip, message, Breadcrumb, Space} from "antd";
import AreaQuery from "./AreaQuery";
import {request} from "../../base/CiiUtils";
import AreaSelector from "./AreaSelector";

class AreaCpyManager extends BaseManager {

    constructor(props) {
        super(props);
        this.state.enableModalSelectorVisible = false;
        this.state.disableModalSelectorVisible = false;

        this.state.breadcrumbArea = [{areaName: "全部", id: 0, parentId: 0}];
        this.state.queryCurrentData = {};
    }

    getRequestUrl() {
        return "areaCpy/query"
    }

    getQueryModal() {
        return (
            <AreaQuery title={"区域查询"}
                       visible={this.state.queryModalVisible}
                       size={0.6}
                       currentData={this.state.queryCurrentData}
                       onCancel={this.onQueryModalCancel}
                       onSubmitOk={this.onQueryModalSubmitOk}>
            </AreaQuery>
        );
    }

    onRowDoubleClick(record) {
        let areas = this.state.breadcrumbArea;
        areas.push(record);
        this.setState({breadcrumbArea: areas});

        this.reload(1, {
            entity: {
                parentId: record.id
            },
            keyword: ""
        });
    }

    getToolbar() {
        return (
            <div className="toolbar">
                <Space size="small">
                    {
                        this.getKeywordUI()
                    }
                    {
                        this.getQueryUI()
                    }
                    <Button size="small" onClick={this.onEnableClick}>启用</Button>

                    <Button size="small" onClick={this.onDisableClick}>禁用</Button>

                    <Breadcrumb separator={">"}>
                        {
                            this.readerBreadcrumbArea(this.state.breadcrumbArea)
                        }
                    </Breadcrumb>
                </Space>
                <AreaSelector title={"启用的父区域选择"} size={0.7}
                              visible={this.state.enableModalSelectorVisible}
                              onCancel={this.onEnableSelectorCancel}
                              onSubmitOk={this.onEnableSelectorSubmitOk}>

                </AreaSelector>
                <AreaSelector title={"启用的父区域选择"} size={0.7}
                              visible={this.state.disableModalSelectorVisible}
                              onCancel={this.onDisableSelectorCancel}
                              onSubmitOk={this.onDisableSelectorSubmitOk}>

                </AreaSelector>
                {
                    this.getQueryModal()
                }
            </div>
        );
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
                entity: {}
            });
        } else {
            this.reload(1, {
                entity: {
                    parentId: area.id
                },
                keyword: ""
            });
        }
    }

    onEnableClick = () => {
        this.setState({enableModalSelectorVisible: true})
    }
    onEnableSelectorSubmitOk = (keys, rows) => {
        request({
            conf: {
                url: 'areaCpy/enableArea',
                data: {
                    entity: {
                        id: rows[0].id
                    }
                },
                success: (data) => {
                    message.success(data.message);

                }
            }
        });
        this.setState({enableModalSelectorVisible: false})
        this.reload(1, this.state.queryCondition)
    }
    onEnableSelectorCancel = () => {
        this.setState({enableModalSelectorVisible: false})
    }

    onDisableClick = () => {
        this.setState({disableModalSelectorVisible: true})
    }
    onDisableSelectorSubmitOk = (keys, rows) => {
        request({
            conf: {
                url: 'areaCpy/disableArea',
                data: {
                    entity: {
                        id: rows[0].id
                    }
                },
                success: (data) => {
                    message.success(data.message);

                }
            }
        });
        this.setState({disableModalSelectorVisible: false})
        this.reload(1, this.state.queryCondition)
    }
    onDisableSelectorCancel = () => {
        this.setState({disableModalSelectorVisible: false})
    }

    getColumns() {
        const columns = [{
            title: '区域ID',
            dataIndex: 'id',
            width: 60,
            align: 'center'
        }, {
            title: '父区域ID',
            dataIndex: 'parentId',
            width: 60,
            align: 'center'
        }, {
            title: '区域级别',
            dataIndex: 'areaTypeName',
            width: 60,
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
            width: 100,
            render: (text, record) => {
                return record.isDeleted ? '否' : '是'
            }
        }];
        return columns;
    }

}

export default AreaCpyManager;