import React from 'react';
import {Tree} from "antd";
import {request} from "../base/CiiUtils";

/**
 * <TreeManager ..props/>
 * 1、queryCondition，条件变化之后就会重新刷新树
 * 2、queryUrl，查询的接口地址
 * 3、code，表示数据key应该取的数据字段名称
 * 4、name，配置树title应该取的数据字段名称
 * 5、children，表示树子节点children应该取的数据字段名称
 * 6、rootCode，通常情况下是'0'，表示根结点的key
 * 7、rootName，根结点title，默认是 "根结点"
 * 8、onSelectChange，当选择改变的时候回调函数
 */

class TreeManager extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            queryCondition: {},
            treeData: [],
            currentData: {},
            selectedKeys: [],
            expandedKeys: ['0']
        }
        this.init = this.init.bind(this);
        this.onQueryConditionChange = this.onQueryConditionChange.bind(this);
        this.getRequestUrl = this.getRequestUrl.bind(this);
        this.reload = this.reload.bind(this);
        this.getNodeCode = this.getNodeCode.bind(this);
        this.getNodeName = this.getNodeName.bind(this);
        this.getNodeChildren = this.getNodeChildren.bind(this);
        this.onTreeSelect = this.onTreeSelect.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onTreeExpand = this.onTreeExpand.bind(this);

        this.getRootNode = this.getRootNode.bind(this);
    }

    componentDidMount() {
        this.init();
    }

    init() {
        this.reload({})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.queryCondition
            && prevProps.queryCondition
            && this.props.queryCondition != prevProps.queryCondition) {
            this.setState({queryCondition: this.props.queryCondition});
            this.onQueryConditionChange(this.props.queryCondition);
        }
    }

    onQueryConditionChange(queryCondition) {
        this.reload(queryCondition)
    }

    getRequestUrl() {
        const {queryUrl} = this.props;
        if (queryUrl) {
            return queryUrl
        }
    }

    reload(queryCondition) {

        if (queryCondition) {
            this.setState({queryCondition})
        }

        let req = queryCondition || this.state.queryCondition;

        request({
            conf: {
                url: this.getRequestUrl(),
                data: req
            },
            success: (data) => {
                this.setState({
                    treeData: data.result
                });
            }
        });
    }

    renderTreeNode = (data) => data.map((item) => {
        if (item[this.getNodeChildren()] && item[this.getNodeChildren()].length) {
            return (
                <Tree.TreeNode title={item[this.getNodeName()]} key={item[this.getNodeCode()]} dataRef={item}>
                    {this.renderTreeNode(item[this.getNodeChildren()])}
                </Tree.TreeNode>
            )
        }
        return <Tree.TreeNode title={item[this.getNodeName()]} key={item[this.getNodeCode()]} dataRef={item}/>
    });

    getNodeCode() {
        const {code} = this.props;
        return code ? code : "code";
    }

    getNodeName() {
        const {name} = this.props;
        return name ? name : "name";
    }

    getNodeChildren() {
        const {children} = this.props;
        return children ? children : "children";
    }

    onTreeSelect(selectedKeys, info) {
        const {selectedNodes} = info;
        if (selectedNodes && selectedNodes.length) {
            const {dataRef} = selectedNodes[0];
            if (dataRef) {
                this.setState({
                    currentData: dataRef
                });
                this.onSelectChange(dataRef);
            }
        }
        this.setState({selectedKeys: selectedKeys});
    }

    onSelectChange(currentData) {

        const {onSelectChange} = this.props;
        if (onSelectChange) {
            onSelectChange(currentData);
        }
    }

    onTreeExpand(expandedKeys) {
        this.setState({
            expandedKeys
        });
    }

    getRootNode() {

        const {rootName, rootCode} = this.props;
        let rt = {};
        rt[this.getNodeCode()] = rootCode ? rootCode : "0";
        rt[this.getNodeName()] = rootName ? rootName : "根节点"

        return rt;
    }

    render() {
        return (
            <Tree
                onSelect={this.onTreeSelect}
                onExpand={this.onTreeExpand}
                expandedKeys={this.state.expandedKeys}
                selectedKeys={this.state.selectedKeys}>
                <Tree.TreeNode title={this.getRootNode()[this.getNodeName()]}
                               key={this.getRootNode()[this.getNodeCode()]}
                               dataRef={this.getRootNode()}>
                    {this.renderTreeNode(this.state.treeData)}
                </Tree.TreeNode>
            </Tree>
        );
    }
}

export default TreeManager;