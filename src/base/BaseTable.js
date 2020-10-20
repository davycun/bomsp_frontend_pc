import React from 'react';
import HeightAdapter from "./HeightAdapter";
import {Popconfirm, Table, message} from "antd";
import {Size} from "./Size";
import {request} from "./CiiUtils";
import {currentContext} from "./CurrentContext";

/**
 * <BaseTable props... />
 * 其中props有如下属性：
 * 1、queryCondition属性作为查询条件，其中queryCondition变化之后会进行重新加载
 * queryCondition:{
 *     keyword:"",
 *     entity:{
 *     }
 * }
 * 2、tableScrollY，纵坐标滚动的距离
 * 3、tableScrollX,横坐标滚动的距离
 * 4、pagination，如果不需要展示分页就传入false
 */

class BaseTable extends HeightAdapter {

    constructor(props) {
        super(props);

        this.state.tableLoading = false;
        this.state.currentData = {};
        this.state.page = {
            current: 1,
            total: 0,
            pageSize: 50
        };
        this.state.dataSource = [];
        this.state.detailModalVisible = false;
        this.state.editModalVisible = false;
        this.state.queryCondition = {};
        this.state.selectedRowKeys = [];
        this.state.selectedRows = [];
        this.state.tableExpandData = {};

        this.init = this.init.bind(this);

        this.onQueryConditionChange = this.onQueryConditionChange.bind(this);
        this.getRequestUrl = this.getRequestUrl.bind(this);
        this.reload = this.reload.bind(this);
        this.doRequest = this.doRequest.bind(this);
        this.getKeywordText = this.getKeywordText.bind(this);
        this.getTable = this.getTable.bind(this);
        this.onTableChange = this.onTableChange.bind(this);
        this.getSorterFieldToColumn = this.getSorterFieldToColumn.bind(this);
        this.getPagination = this.getPagination.bind(this);
        this.getColumnsAndOperations = this.getColumnsAndOperations.bind(this);
        this.getColumns = this.getColumns.bind(this);
        this.getOperations = this.getOperations.bind(this);
        this.getOperationHasAuth = this.getOperationHasAuth.bind(this);
        this.getOperationWidth = this.getOperationWidth.bind(this);
        this.getOperationFixed = this.getOperationFixed.bind(this);
        this.getTableRowKey = this.getTableRowKey.bind(this);
        this.getRowSelection = this.getRowSelection.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);

        this.onRow = this.onRow.bind(this);
        this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
        this.getTableScrollX = this.getTableScrollX.bind(this);
        this.getTableScrollY = this.getTableScrollY.bind(this);
        this.getTablePageClassName = this.getTablePageClassName.bind(this);

        this.getTableCanExpanded = this.getTableCanExpanded.bind(this);
        this.getTableExpandedRowRender = this.getTableExpandedRowRender.bind(this);
        this.onTableExpand = this.onTableExpand.bind(this);
        this.getTableExpandRowKey = this.getTableExpandRowKey.bind(this);
        this.getTableExpandScrollX = this.getTableExpandScrollX.bind(this);
        this.getTableExpandScrollY = this.getTableExpandScrollY.bind(this);
        this.getTableExpandPagination = this.getTableExpandPagination.bind(this);
        this.getTableExpandColumns = this.getTableExpandColumns.bind(this);
        this.getTableExpandQueryUrl = this.getTableExpandQueryUrl.bind(this);
        this.getTableExpandQueryData = this.getTableExpandQueryData.bind(this);
        this.getTableExpandDataFromResponse = this.getTableExpandDataFromResponse.bind(this);

        this.beforeReload = this.beforeReload.bind(this);
        this.afterReloadSuccess = this.afterReloadSuccess.bind(this);

        this.getEditModal = this.getEditModal.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onEditModalSubmitOk = this.onEditModalSubmitOk.bind(this);
        this.onEditModalCancel = this.onEditModalCancel.bind(this);

        this.getDetailModal = this.getDetailModal.bind(this);
        this.onDetailClick = this.onDetailClick.bind(this);
        this.onDetailModalSubmitOk = this.onDetailModalSubmitOk.bind(this);
        this.onDetailModalCancel = this.onDetailModalCancel.bind(this);
    }

    getSubtractWidth() {
        return Size.menuWidth;
    }

    getSubtractHeight() {
        return Size.totalHeight();
    }

    init() {
        const {queryCondition} = this.props;
        this.reload(1, queryCondition);
    }

    componentDidMount() {
        this.init()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.queryCondition
            && prevProps.queryCondition
            && this.props.queryCondition != prevProps.queryCondition) {
            this.setState({queryCondition: this.props.queryCondition});
            this.onQueryConditionChange(this.props.queryCondition);
        }
    }

    /**
     * 当查询条件变更的时候调用的方法
     * @param queryCondition
     */
    onQueryConditionChange(queryCondition) {
        this.reload(1, queryCondition)
    }

    /**
     * reload加载数据需要请求的接口
     */
    getRequestUrl() {
        return "";
    }

    getKeywordText() {
        return null;
    }

    /**
     * 加载列表数据
     * @param page
     * @param queryCondition
     */
    reload(page, queryCondition) {

        this.setState({tableLoading: true});
        //组织条件
        let req = {
            start: page ? (page - 1) * this.state.page.pageSize : (this.state.page.current - 1) * this.state.page.pageSize,
            pageSize: this.state.page.pageSize
        }
        if (queryCondition) {
            Object.assign(req, queryCondition);
            if (!req.entity) {
                req.entity = this.state.queryCondition.entity;
            }
        }

        if (this.getKeywordText() && !req.keyword && req.keyword !== "") {
            req.keyword = this.getKeywordText();
        }

        this.beforeReload(req);

        this.doRequest(req);

        //更新状态
        let st = {queryCondition: queryCondition || {}};
        if (page) {
            st.page = {current: page, pageSize: req.pageSize};
        }
        this.setState(st);
    }

    /**
     *实际发起请求数据
     */
    doRequest(req) {
        //发起请求
        request({
            conf: {
                url: this.getRequestUrl(),
                data: req
            },
            success: (dt) => {
                if (dt.result) {

                    //有分页和没有分页的取值属性不一致
                    const {pagination} = this.props;
                    if (pagination === false) {
                        this.setState({dataSource: dt.result});
                    } else {
                        let pg = this.state.page;
                        pg.total = dt.result.totalCount;
                        pg.pageSize = dt.result.pageSize;
                        this.setState({dataSource: dt.result.data, page: pg});
                    }
                } else {
                    // message.error("请求成功，但result没有结果!")
                    // this.setState({dataSource: dt.result});
                }
                this.afterReloadSuccess(dt);
            },
            finally: () => {
                this.setState({tableLoading: false});
            }
        });
    }

    /**
     * 发起请求之前调用
     * @param req
     */
    beforeReload(req) {
    }

    /**
     * reload加载数据成功之后调用
     */
    afterReloadSuccess(data) {
    }


    getTable(){
        let props = {
            rowKey: this.getTableRowKey(),
            size: "small",
            columns: this.getColumnsAndOperations(),
            dataSource: this.state.dataSource,
            scroll: {x: this.getTableScrollX(),y: this.getTableScrollY()},
            onRow: this.onRow,
            loading: this.state.tableLoading,
            pagination: this.getPagination(),
            onChange: this.onTableChange,
            bordered: true
        }
        let rowSelection = this.getRowSelection();
        if (rowSelection) {
            props.rowSelection = rowSelection;
        }
        if (this.getTableCanExpanded()) {
            props.expandedRowRender = this.getTableExpandedRowRender;
            props.onExpand = this.onTableExpand;
        }
        return (
            <Table {...props}></Table>
        );
    }

    getPagination() {
        const {pagination} = this.props;
        if (pagination || pagination === false) {
            return pagination;
        } else {
            return {
                current: this.state.page.current,
                total: this.state.page.total,
                pageSize: this.state.page.pageSize,
                className: this.getTablePageClassName(),
                showTotal: (total) => `共${total}条`
            }
        }
    }

    onTableChange(pagination, filters, sorter, extra) {

        let cd = this.state.queryCondition;
        if (sorter && sorter.field) {
            cd.orderBy = sorter.field;
            let column = this.getSorterFieldToColumn(sorter.field);
            if (column) {
                cd.orderBy = column;
                if (sorter.order === 'ascend'){
                    cd.isAsc = true;
                } else if(sorter.order === 'descend'){
                    cd.isAsc = false;
                }
            }
        }

        this.reload(pagination ? pagination.current : 1, cd);
    }

    getSorterFieldToColumn(field) {
        return field;
    }

    /**
     * 返回列及操作列
     * @returns {Array}
     */
    getColumnsAndOperations() {

        let columns = this.getColumns();

        if (this.getOperationWidth() && this.getOperationWidth() > 0) {
            let opts = {
                title: '操作',
                align: 'center',
                width: this.getOperationWidth(),
                render: (text, record) => {
                    let opts;
                    let operations = this.getOperations(record);
                    let authOpts = [];

                    if (operations && operations.length > 0) {
                        for (let i = 0; i < operations.length; i++) {

                            if (this.getOperationHasAuth(operations[i], record)) {
                                const {onClick, name} = operations[i];
                                if (onClick && name) {
                                    authOpts.push(operations[i]);
                                }
                            }
                        }
                    }

                    if (authOpts && authOpts.length > 0) {
                        opts = authOpts.map((item, index) => {
                            const {onClick, name, popConfirmTitle, itemId} = item;
                            if (popConfirmTitle) {
                                return (
                                    <Popconfirm key={itemId ? itemId : index}
                                                title={popConfirmTitle}
                                                onConfirm={() => onClick(record)}>
                                        <a key={itemId ? itemId : index}
                                           style={{marginLeft: index == 0 ? 0 : 10}}>{name}</a>
                                    </Popconfirm>
                                )
                            } else {
                                return (
                                    <a key={itemId ? itemId : index}
                                       style={{marginLeft: index == 0 ? 0 : 10}}
                                       onClick={() => onClick(record)}>{name}</a>
                                );
                            }

                        });
                    }

                    return (
                        <div style={{margin: 'auto', textAlign: 'center'}}>
                            {
                                opts
                            }
                        </div>
                    );
                }
            }
            if (this.getOperationFixed()) {
                opts.fixed = this.getOperationFixed();
            }

            columns.push(opts);
        }

        return columns;
    }

    /**
     * 判断当前操作用户是否操作权限
     * @param operation
     * @param record
     * @returns {boolean}
     */
    getOperationHasAuth(operation, record) {

        //TODO
        //operation里面必须有itemId，就是此操作的唯一识别
        //operation里面的authCheck必须是true

        const {itemId, authCheck} = operation;

        //如果没有此属性或者此属性为false，那么直接返回有权限，代表不需要校验
        if (!authCheck) {
            return true;
        }

        if (!itemId) {
            message.error("校验权限authCheck为true，但是缺少itemId的配置!")
            return false;
        }

        return currentContext.hasOperationAuth(itemId);
    }

    /**
     * 返回列表的列，不需要包括操作列
     */
    getColumns() {
        return [];
    }

    /**
     * 返回一个列表，列表里面的对象是
     * {
     *     name : 表示操作的名字,
     *     onClick : 表示点击之后的处理函数,
     *     authCheck : 不必填，表示此操作功能是否需要权限的检查，默认false，
     *     popConfirmTitle : 不必填，如果包含此字段就表示，需要弹出提示，表示弹出提示的文本信息
     *     itemId : 不必填，此元素的key，也是与后端授权关联的字段值相同
     * }
     * @param record
     * @returns {Array}
     */
    getOperations(record) {
        return [];
    }

    getOperationWidth() {
        return 0;
    }

    /*列表操作列是否固定，不固定可以返回false，固定就返回right或者left*/
    getOperationFixed() {
        return 'right';
    }

    /**
     * 每一行的主键
     * @returns {string}
     */
    getTableRowKey() {
        return "id"
    }

    /**
     * 表格横坐标滚动距离
     * @returns {number}
     */
    getTableScrollX() {
        const {tableScrollX} = this.props;
        if (tableScrollX) {
            return tableScrollX;
        } else {
            return Size.screenWidth() - Size.menuWidth
        }
    }

    /**
     * 表格纵坐标滚动距离
     */
    getTableScrollY() {
        const {tableScrollY} = this.props;
        if (tableScrollY) {
            return tableScrollY;
        } else {
            return this.state.height - Size.pageHeight - Size.tableHeaderHeight;
        }
    }

    /**
     * return a object
     * {
     *     type:"checkbox"|"radio",
     *     selectedRowKeys: this.state.selectedRowKeys,
     *     onChange:this.onSelectChange
     * }
     */
    getRowSelection() {
        return false;
    }

    onSelectChange(selectedRowKeys, selectedRows) {
        this.setState({
            selectedRowKeys: selectedRowKeys,
            selectedRows: selectedRows
        });
    }

    /**
     * 表格是否可以展开
     * @returns {boolean}
     */
    getTableCanExpanded() {
        return false;
    }

    getTableExpandedRowRender(record, index, indent, expanded) {
        return (
            <Table bordered={false}
                   rowKey={this.getTableExpandRowKey()}
                   size={"small"}
                   scroll={{x:this.getTableExpandScrollX(),y:this.getTableExpandScrollY()}}
                   columns={this.getTableExpandColumns(record)}
                   pagination={this.getTableExpandPagination()}
                   dataSource={this.state.tableExpandData[record[this.getTableRowKey()]]}>
            </Table>
        );
    }

    onTableExpand(expanded, record) {
        if (expanded) {
            request({
                conf: {
                    url: this.getTableExpandQueryUrl(),
                    data: this.getTableExpandQueryData(record)
                },
                success: (response) => {
                    let et = this.state.tableExpandData;
                    et[record[this.getTableRowKey()]] = this.getTableExpandDataFromResponse(response);

                    this.setState({
                        tableExpandData: et
                    })
                }
            });
        }
    }
    getTableExpandRowKey(){
        return this.getTableRowKey();
    }
    getTableExpandScrollX(){
        return this.getTableScrollX();
    }
    getTableExpandScrollY(){
        return this.getTableScrollY()/3;
    }
    getTableExpandColumns(record) {
    }
    getTableExpandQueryUrl() {
    }
    getTableExpandQueryData(record) {
    }
    getTableExpandPagination(){
        return false;
    }
    getTableExpandDataFromResponse(response){
        return response.result.data;
    }


    /**
     * table的onRow扩展
     * @param record
     * @returns {{onDoubleClick: onDoubleClick}}
     */
    onRow(record) {
        return {
            onDoubleClick: (event) => {
                this.onRowDoubleClick(record);
            }
        }
    }

    onRowDoubleClick(record) {
        this.onDetailClick(record);
    }

    getTablePageClassName() {
        return "content-page";
    }

    getEditModal() {
        return <div></div>
    }

    onEditClick(record) {
        this.setState({currentData: record, editModalVisible: true});
    }

    onEditModalSubmitOk(response) {
        this.reload(this.state.page.current, this.state.queryCondition);
        this.setState({editModalVisible: false});
    }

    onEditModalCancel() {
        this.setState({editModalVisible: false})
    }

    getDetailModal() {
        return <div></div>
    }

    onDetailClick(record) {
        this.setState({currentData: record, detailModalVisible: true});
    }

    onDetailModalSubmitOk(e) {
        this.setState({detailModalVisible: false});
        this.reload(this.state.page.current, this.state.queryCondition);
    }

    onDetailModalCancel() {
        this.setState({detailModalVisible: false})
    }

}

export default BaseTable;