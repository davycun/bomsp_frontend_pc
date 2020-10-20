import React from 'react';
import {Button, message, Modal, Popconfirm} from "antd";
import {Size} from "./Size";
import SplitPane from "react-split-pane";
import Pane from "react-split-pane/lib/Pane";
import {currentContext} from "./CurrentContext";

/**
 * 使用配置属性支持：
 * 1、title
 * 2、size
 * 3、visible
 * 4、onCancel
 */
class BaseDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            leftPaneSize: "400px",
            currentData: {}
        }
        this.onCurrentDataChange = this.onCurrentDataChange.bind(this);

        this.getFooter = this.getFooter.bind(this);
        this.getOperations = this.getOperations.bind(this);
        this.getOperationHasAuth = this.getOperationHasAuth.bind(this);

        this.getContent = this.getContent.bind(this);
        this.getLeftPane = this.getLeftPane.bind(this);
        this.getRightPane = this.getRightPane.bind(this);
        this.getLeftPaneSize = this.getLeftPaneSize.bind(this);
        this.getLeftPaneMaxSize = this.getLeftPaneMaxSize.bind(this);
        this.getLeftPaneMinSize = this.getLeftPaneMinSize.bind(this);

        this.getOtherModal = this.getOtherModal.bind(this);
        this.getModalSize = this.getModalSize.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.currentData
            && prevProps.currentData
            && prevProps.currentData != this.props.currentData) {
            this.setState({currentData: this.props.currentData});
            this.onCurrentDataChange(this.props.currentData);
        }
    }

    onCurrentDataChange(currentData) {
    }

    /**
     * 放回详情窗口footer
     */
    getFooter() {

        let record = this.state.currentData, footer = [], operations = this.getOperations(this.state.currentData);

        if (operations && operations.length > 0) {

            let authOpts = [];

            for (let i = 0; i < operations.length; i++) {

                if (this.getOperationHasAuth(operations[i], record)) {
                    const {onClick, name} = operations[i];
                    if (onClick && name) {
                        authOpts.push(operations[i]);
                    }
                }
            }

            if (authOpts && authOpts.length > 0) {
                footer = authOpts.map((item, index) => {
                    const {onClick, name, popConfirmTitle, itemId} = item;
                    if (popConfirmTitle) {
                        return (
                            <Popconfirm key={itemId ? itemId : index} title={popConfirmTitle}
                                        onConfirm={() => onClick(record)}>
                                <Button key={itemId ? itemId : index}>
                                    {name}
                                </Button>
                            </Popconfirm>
                        )
                    } else {
                        return (
                            <Button key={itemId ? itemId : index} onClick={() => onClick(record)}>
                                {name}
                            </Button>
                        );
                    }

                });
            }
        }

        return footer;
    }

    /**
     * 返回一个列表，列表里面的对象是
     * {
     *     name : 表示操作的名字,
     *     onClick : 表示点击之后的处理函数,
     *     authCheck : 表示此操作功能是否需要权限的检查，默认false，
     *     popConfirmTitle : 如果包含此字段就表示，需要弹出提示，表示弹出提示的文本信息
     *     itemId : 此元素的key，也是与后端授权关联的字段值相同
     * }
     * @param record
     * @returns {Array}
     */
    getOperations(record) {
        return [];
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
     * 详情窗口大小
     * @returns {number|*}
     */
    getModalSize() {
        if (this.props.size && this.props.size < 1) {
            return this.props.size;
        }
        return 0.9;
    }

    /**
     * 详情弹窗的内容区域
     * @returns {*}
     */
    getContent() {
        return (
            <SplitPane split="vertical" onChange={(size) => {this.setState({leftPaneSize: size[0]})}}>

                <Pane size={this.state.leftPaneSize}
                      className="content-left-pane"
                      paneStyle={{overflow: "auto"}}
                      maxSize={this.getLeftPaneMaxSize()}
                      minSize={this.getLeftPaneMinSize()}>
                    {
                        this.getLeftPane()
                    }
                </Pane>
                <Pane>
                    {
                        this.getRightPane()
                    }
                </Pane>
            </SplitPane>
        );
    }

    getLeftPaneSize(){
        const {leftPaneSize} = this.state;
        if (leftPaneSize && leftPaneSize.indexOf("px") != -1){
            return leftPaneSize.substring(0,leftPaneSize.indexOf("px"))
        }

        return 400;
    }

    getLeftPaneMinSize() {
        return "100px"
    }

    getLeftPaneMaxSize() {
        return "70%"
    }

    /**
     * 采用默认的split作为内容返回左边区域内容
     * @returns {*}
     */
    getLeftPane() {
        return <div></div>
    }

    /**
     * 采用默认的split作为内容返回左边区域内容
     * @returns {*}
     */
    getRightPane() {
        return <div></div>
    }

    /**
     * 返回一些其他新增或者修改或者详情的弹窗的view
     * @returns {*}
     */
    getOtherModal() {
        return (
            <div></div>
        );
    }

    render() {
        return (
            <div>
                <Modal title={this.props.title}
                       style={{top: Size.screenHeight() * (1 - this.getModalSize()) / 2}}
                       bodyStyle={{height: Size.screenHeight() * this.getModalSize() - 110, overflow: 'auto'}}
                       width={Size.screenWidth() * this.getModalSize()}
                       visible={this.props.visible}
                       onCancel={this.props.onCancel}
                       footer={this.getFooter()}>
                    {
                        this.getContent()
                    }
                    {
                        this.getOtherModal()
                    }
                </Modal>
            </div>
        );
    }
}

export default BaseDetail;