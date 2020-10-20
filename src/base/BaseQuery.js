import React from 'react';
import {Button, message, Modal} from "antd";
import {Size} from "./Size";
import AreaSelect from "../component/AreaSelect";

/**
 * 支持的配置参数为
 * 1、title，弹出框标题
 * 2、size，弹出框大小
 * 3、visible，弹窗框是否可见
 * 4、onCancel，弹框关闭的响应函数
 * 5、onSubmitOk，点击查询的响应函数
 */

class BaseQuery extends React.Component {

    constructor(props) {
        super(props);

        this.form = React.createRef();

        this.state = {
            currentData: {},
            area: {}
        }
        this.getFooter = this.getFooter.bind(this);
        this.onResetClick = this.onResetClick.bind(this);
        this.onQueryClick = this.onQueryClick.bind(this);
        this.getFormUI = this.getFormUI.bind(this);
        this.onCurrentDataChange = this.onCurrentDataChange.bind(this);
        this.getRefreshFormData = this.getRefreshFormData.bind(this);

        this.getAreaSelectUI = this.getAreaSelectUI.bind(this);
        this.onAreaChange = this.onAreaChange.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.currentData
            && prevProps.currentData
            && this.props.currentData!=prevProps.currentData) {
            this.setState({currentData: this.props.currentData});
            this.onCurrentDataChange(this.props.currentData);
        }
    }

    onCurrentDataChange(currentData){
        let fm = this.getRefreshFormData(currentData);
        if (fm) {
            this.form.current.setFieldsValue(fm);
        }
    }
    getRefreshFormData(data){
        return data;
    }

    onResetClick() {
        this.form.current.resetFields();
    }

    onQueryClick() {

        this.form.current.validateFields().then(values=>{

            const {onSubmitOk} = this.props;
            if (onSubmitOk && (typeof onSubmitOk == 'function')) {

                let condition = this.getQueryCondition(values);
                if (condition){
                    onSubmitOk(condition);
                }
            }

        }).catch(errorInfos=>{

            let msg = "必填信息缺失:";
            let errorFields = errorInfos["errorFields"];
            for (let i=0;i<errorFields.length;i++) {
                let err = errorFields[i];
                if (err.errors && err.errors.length > 0) {
                    if (i>0){
                        msg+=",";
                    }
                    msg += err.errors[0];

                }
            }
            message.error(msg);
        });
    }

    getQueryCondition(data){
        return data;
    }

    getModalSize() {
        if (this.props.size && this.props.size < 1) {
            return this.props.size;
        }
        return 0.9;
    }

    getFormUI(form) {
        return <div></div>
    }

    getFooter() {
        return (
            [
                <Button key="reset" onClick={this.onResetClick}>
                    重置
                </Button>,
                <Button key="submit" type="primary" onClick={this.onQueryClick}>
                    查询
                </Button>
            ]
        );
    }

    getAreaSelectUI() {
        return <AreaSelect onAreaChange={this.onAreaChange}></AreaSelect>
    }
    onAreaChange(area) {
        this.setState({area: area});
    }

    render() {
        return (
            <div>
                <Modal title={this.props.title}
                       style={{top: Size.screenHeight() * (1 - this.getModalSize()) / 2}}
                       bodyStyle={{height: Size.screenHeight() * this.getModalSize() - 110, overflow: 'auto'}}
                       width={Size.screenWidth() * this.getModalSize()}
                       visible={this.props.visible}
                       onOk={this.onQueryClick}
                       onCancel={this.props.onCancel}
                       footer={this.getFooter()}>
                    {
                        this.getFormUI(this.form.current)
                    }

                </Modal>
            </div>
        );
    }
}

export default BaseQuery;