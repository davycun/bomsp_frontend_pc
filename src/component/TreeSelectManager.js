import React from 'react';
import {request} from "../base/CiiUtils";
import { RedoOutlined } from '@ant-design/icons';
import { TreeSelect } from "antd";

/**
 * <TreeSelectManager ..props>
 * </TreeSelectManager>
 *
 * 1、queryUrl，查询地址
 * 2、code，树的key
 * 2、name，树的title
 * 4、children，树的子节点名称
 * 5、onTreeSelect，选择之后的回调函数
 * 6、onTreeChange，选择变更之后的回调函数
 *
 */
class TreeSelectManager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            queryCondition: {},
            treeData: [],
            // currentData: {},
            // selectedKeys: [],
            // expandedKeys: ['0'],
        }

        this.getRequestUrl = this.getRequestUrl.bind(this);
        this.reload = this.reload.bind(this);
        this.getNodeCode = this.getNodeCode.bind(this);
        this.getNodeName = this.getNodeName.bind(this);
        this.getNodeChildren = this.getNodeChildren.bind(this);
        this.getMultiple = this.getMultiple.bind(this);
        this.onTreeSelect = this.onTreeSelect.bind(this);
        this.onTreeChange = this.onTreeChange.bind(this);
    }


    componentDidMount() {
        this.reload({})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.value
            && this.props.value
            && (this.props.value!=prevProps.value)){
            this.setState({value: this.props.value});
        }
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
                <TreeSelect.TreeNode title={item[this.getNodeName()]} key={item[this.getNodeCode()]}
                                     value={item[this.getNodeCode()]} dataRef={item}>
                    {this.renderTreeNode(item[this.getNodeChildren()])}
                </TreeSelect.TreeNode>
            )
        }
        return <TreeSelect.TreeNode title={item[this.getNodeName()]} key={item[this.getNodeCode()]}
                                    value={item[this.getNodeCode()]} dataRef={item}/>
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

    getMultiple() {
        const {multiple} = this.props;
        return multiple ? true : false;
    }

    onTreeSelect(value, node, extra) {

        const {onTreeSelect, onSelect} = this.props;
        if (onTreeSelect) {
            onTreeSelect(value, node, extra);
        }
        if (onSelect) {
            onSelect(value, node, extra);
        }
    }

    onTreeChange(value, label, extra) {
        const {onChange, onTreeChange} = this.props;
        if (onChange) {
            onChange(value, label, extra);
        }

        if (onTreeChange) {
            onTreeChange(value, label, extra)
        }
    }




    render() {

        let ps = {};

        if(this.props.config){
            ps = {...this.props.config};
        }

        ps.showSearch=true;
        ps.allowClear=true;
        ps.placeholder="请选择";
        ps.multiple=this.getMultiple();
        ps.suffixIcon=(<RedoOutlined onClick={() => this.reload()} />);
        ps.value = this.props.value;
        ps.onChange = this.onTreeChange;
        ps.onSelect = this.onTreeSelect;

        return (
            <TreeSelect {...ps}>
                {
                    this.renderTreeNode(this.state.treeData)
                }
            </TreeSelect>
        );
    }

}

export default TreeSelectManager;