import React from 'react';
import {message, Modal,AutoComplete} from "antd";
import {request} from "./CiiUtils";
import AreaSelect from "../component/AreaSelect";
import {Constants} from "./Constants";

/**
 * <BaseEditor props.. />
 * 有如下属性：
 * 1、onSubmitOk 当修改或者新增成功之后的回调
 * 2、editor  表示当前是更新还是新增窗口
 * 3、currentData 表示更新面板展示的数据
 */
class BaseEditor extends React.Component {

    constructor(props) {
        super(props);
        
        this.form = React.createRef();

        this.state = {
            area: {},
            confirmLoading: false,
            previewVisible: false,
            previewImage: '',
            currentData: {},
            emailDataSource: []
        }
        this.init = this.init.bind(this);
        this.onCurrentDataChange = this.onCurrentDataChange.bind(this);

        this.refreshForm = this.refreshForm.bind(this);
        this.getRefreshFormData = this.getRefreshFormData.bind(this);
        this.getFormUI = this.getFormUI.bind(this);
        this.getRequestUrl = this.getRequestUrl.bind(this);
        this.getRequestEntity = this.getRequestEntity.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.doRequest = this.doRequest.bind(this);
        this.onRequestFailed = this.onRequestFailed.bind(this);
        this.onRequestSuccess = this.onRequestSuccess.bind(this);
        this.resetEditor = this.resetEditor.bind(this);

        this.emailHandleChange = this.emailHandleChange.bind(this);
        this.emailAutoCompleteOption = this.emailAutoCompleteOption.bind(this);
        this.getAreaSelectUI = this.getAreaSelectUI.bind(this);
        this.onAreaChange = this.onAreaChange.bind(this);
        this.onPreview = this.onPreview.bind(this);
        this.getImageViewModal = this.getImageViewModal.bind(this);
        this.onUploadChange = this.onUploadChange.bind(this);
        this.fieldEquals = this.fieldEquals.bind(this);
        this.getOtherModal = this.getOtherModal.bind(this);
    }

    componentDidMount() {
        this.init();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.currentData
            && prevProps.currentData
            && this.props.currentData!=prevProps.currentData) {

            this.setState({currentData: this.props.currentData});
            this.onCurrentDataChange(this.props.currentData);
            this.refreshForm();
        }
    }

    /**
     * 在初始化表单之前的调用
     */
    init() {

    }

    onCurrentDataChange(data) {

    }

    refreshForm(){
        let fm = this.getRefreshFormData(this.props.currentData);
        if (fm) {
            if (this.form && this.form.current){
                this.form.current.resetFields();
                this.form.current.setFieldsValue(fm);
            }
        }
    }


    getRefreshFormData(data) {
        return data;
    }

    /**
     * 获取Form表单UI
     */
    getFormUI(form) {
    }

    /**
     * 获取请求接口URL地址
     * @param isCreate
     */
    getRequestUrl(isEditor) {
    }

    /**
     * 提交数据之前对数据进行处理，如果不返回值，或者返回false就表示不继续请求
     * @param values
     */
    getRequestEntity(values) {
        return values;
    }

    /**
     * 请求数据
     */
    handleSubmit(e) {

        //如果是Form表单直接提交，阻止事件继续冒泡
        // if (e) {
        //     e.preventDefault();
        // }
        this.form.current.validateFields().then(values=>{

            let entity = this.getRequestEntity(values);
            if (entity) {
                this.doRequest(entity)
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

    /**
     * 发起实际的请求
     * @param entity
     */
    doRequest(entity) {
        this.setState({confirmLoading: true});
        request({
            conf: {
                url: this.getRequestUrl(this.props.editor),
                data: {
                    entity: entity
                }
            },
            success: (response) => {
                this.onRequestSuccess(response);
            },
            fail: (response) => {
                this.onRequestFailed(response);
            },
            finally: () => {
                this.setState({confirmLoading: false})
            }
        });
    }

    onRequestSuccess(response) {

        const {onSubmitOk} = this.props;
        if (onSubmitOk) {
            onSubmitOk(response);
        }
        this.resetEditor();
    }

    onRequestFailed(response) {
        message.error(response.message);
    }

    resetEditor() {
        this.form.current.resetFields();
    }

    emailHandleChange(value) {
        this.setState({
            emailDataSource: !value || value.indexOf('@') >= 0 ? [] : [
                `${value}@gmail.com`,
                `${value}@163.com`,
                `${value}@126.com`,
                `${value}@qq.com`
            ],
        });
    }
    emailAutoCompleteOption(){
        return this.state.emailDataSource.map((email)=>{
            return (
                <AutoComplete.Option key={email} value={email}>
                    {email}
                </AutoComplete.Option>
            );
        })
    }

    /**
     * 省市区选择公共方法==============
     */
    getAreaSelectUI(queryCondition) {

        if (!queryCondition) {
            queryCondition = {
                entity: {
                    notAreaTypes: ["Province"]
                }
            }
        }

        return <AreaSelect queryCondition={queryCondition}
                           onAreaChange={this.onAreaChange}></AreaSelect>
    }

    onAreaChange(area) {
        this.setState({area: area});
    }

    /**
     * 图片预览===============
     * @param file
     */
    onPreview(file) {
        this.setState({
            previewVisible: true,
            previewImage: file.thumbUrl || file.url
        })
    }

    getImageViewModal() {
        return (
            <Modal visible={this.state.previewVisible}
                   footer={null}
                   onCancel={() => {
                       this.setState({previewVisible: false})
                   }}>
                <img style={{width: '100%'}} alt={"预览图片"} src={this.state.previewImage}></img>
            </Modal>
        );
    }

    /**
     * 公共方法，处理文件改变，改变state
     * @param file 代表的是Upload组件里面file对象
     * @param field
     */
    onUploadChange(file, field) {

        let list = file.fileList, result = [], flag = true, msg = "文件上传出错";

        if (list) {
            for (let i = 0; i < list.length; i++) {
                let f = list[i];

                if (f.status == "error" || (f.status == "done" && f.response && !f.response.isSuccess)) {
                    flag = false;
                    if (f.response && f.response.message) {
                        msg += "，\n" + f.response.message;
                    }
                } else {
                    if (f.status == "done" && f.response && f.response.result && f.response.result.length > 0) {
                        f.url = Constants.fileReadUrl + f.response.result[0].id
                    }
                    result.push(f);
                }
            }
        }
        let st = {};
        st[field] = result;
        this.setState(st);

        if (!flag) {
            message.error(msg);
        }
    }

    setAreaSelectState = (data)=>{
        let area = {
            cityId: data.cityId,
            cityName: data.cityName,
            regionId: data.regionId,
            regionName: data.regionName,
            streetId: data.streetId,
            streetName: data.streetName,
            communityId: data.communityId,
            communityName: data.communityName
        }
        this.setState({area: area});
    }

    getAreaSelectField = (area) => {
        //处理数据，适合form表单

        if (area.communityId != null) {
            return [area.cityId, area.regionId, area.streetId, area.communityId];
        } else if (area.streetId != null) {
            return [area.cityId, area.regionId, area.streetId];
        } else if (area.regionId != null) {
            return [area.cityId, area.regionId];
        } else if (area.cityId != null) {
            return [area.cityId];
        }
        return [];
    }

    fieldEquals(field, value) {

        if (this.form && this.form.current){
            if (value) {
                return this.form.current.getFieldValue(field) === value;
            } else {
                return this.form.current.getFieldValue(field);
            }
        } else{
            return false;
        }

    }

    /**
     * 其他需要弹窗的窗口
     */
    getOtherModal() {
    }

    render() {
        return (
            <div>
                {
                    this.getImageViewModal()
                }
                {
                    this.getFormUI(this.form.current)
                }
                {
                    this.getOtherModal()
                }
            </div>
        );
    }
}

export default BaseEditor;