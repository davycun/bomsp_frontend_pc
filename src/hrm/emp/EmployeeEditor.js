import React from 'react';

import {PlusOutlined} from '@ant-design/icons';
import {Form, Row, Col, Input, DatePicker, AutoComplete, Divider, Upload} from "antd";
import moment from 'moment';

import {Utils} from "../../base/CiiUtils";
import {dictionaryStorage} from "../../base/Common";
import BaseModalEditor from "../../base/BaseModalEditor";
import TreeSelectManager from "../../component/TreeSelectManager";
import SelectManager from "../../component/SelectManager";
import {Constants} from "../../base/Constants";


class EmployeeEditor extends BaseModalEditor {

    constructor(props) {
        super(props);

        this.state.ownerDeptName = '';
        this.state.confirmLoading = false;
        this.state.idCardImageFront = [];
        this.state.idCardImageBack = [];
        this.state.educationImages = [];
        this.state.bankCardImage = [];
        this.state.previewVisible = false;

        this.state.avatar = [];
    }

    onCurrentDataChange(data) {
        let st = {
            idCardImageFront: Utils.makeUploadFileList(data.idCardImageFront),
            idCardImageBack: Utils.makeUploadFileList(data.idCardImageBack),
            bankCardImage: Utils.makeUploadFileList(data.bankCardImage),
            educationImages: Utils.makeUploadFileList(data.educationImages),
            avatar: Utils.makeUploadFileList(data.avatar),
            ownerDeptName: data.ownerDeptName
        }
        this.setState(st);
    }

    getRefreshFormData(employee) {

        let emp = employee;

        emp.enterDate = moment(emp.enterDate);
        emp.graduationDate = moment(emp.graduationDate);
        emp.birthday = moment(emp.birthday);
        emp.regularDate = moment(emp.regularDate);
        emp.contractDate = [moment(emp.contractStartDate), moment(emp.contractEndDate)];

        return emp;
    }

    getRequestUrl(isEditor) {
        return isEditor ? 'emp/update' : 'emp/create'
    }

    getRequestEntity(values) {
        let emp = values;

        if (emp.contractDate) {
            emp.contractStartDate = emp.contractDate[0];
            emp.contractEndDate = emp.contractDate[1];
        }

        emp.idCardImageFront = Utils.makeFileCodeString(emp.idCardImageFront);
        emp.idCardImageBack = Utils.makeFileCodeString(emp.idCardImageBack);
        emp.bankCardImage = Utils.makeFileCodeString(emp.bankCardImage);
        emp.educationImages = Utils.makeFileCodeString(emp.educationImages);
        emp.avatar = Utils.makeFileCodeString(emp.avatar);

        if (!this.props.editor){
            emp.ownerDeptName = this.state.ownerDeptName;
        }

        return emp;
    }

    avatarImageChange = (file) => {
        this.onUploadChange(file, "avatar")
    }

    /**
     * 身份证正面
     * @param file
     */
    idCardImageFrontChange = (file) => {
        this.onUploadChange(file, "idCardImageFront");
    }
    /**
     * 身份证背面
     * @param file
     */
    idCardImageBackChange = (file) => {
        this.onUploadChange(file, "idCardImageBack");
    }
    /**
     * 学历照片
     * @param file
     */
    educationImageChange = (file) => {
        this.onUploadChange(file, "educationImages");
    }
    bankCardImageChange = (file) => {
        this.onUploadChange(file, "bankCardImage");
    }

    getFormUI(form) {
        const {RangePicker} = DatePicker;
        return (
            <Form ref={this.form}
                  initialValues={this.getRefreshFormData(this.props.currentData||{})}
                  labelCol={{span: 9}} wrapperCol={{span: 15}}>
                <Row>
                    <Col span={8}>
                        <Form.Item label="人员编码" name={"id"}>
                            <Input disabled={true}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="姓名"
                                   rules={[{
                                       required: true,
                                       message: '姓名必填'
                                   }]}
                                   name={"empName"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="电话"
                                   rules={[{
                                       required: true,
                                       message: '电话必填',
                                       pattern: Utils.phoneReg
                                   }]}
                                   name={"empPhone"}>
                            <Input disabled={this.props.editor}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>

                    <Col span={8}>
                        <Form.Item label="邮箱"
                                   name={"email"}>
                            <AutoComplete
                                onChange={this.emailHandleChange}
                                placeholder="Email">
                                {
                                    this.emailAutoCompleteOption()
                                }
                            </AutoComplete>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="岗位"
                                   rules={[{
                                       required: true,
                                       message: '岗位必填'
                                   }]}
                                   name={"postId"}>
                            <SelectManager queryUrl={"post/queryAll"}
                                           code={"id"}
                                           name={"postName"}>
                            </SelectManager>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="所属部门"
                                   rules={[{
                                       required: !this.props.editor,
                                       message: '部门必填',
                                   }]}
                                   name={"ownerDeptId"}>
                            <TreeSelectManager queryUrl={"dept/queryToTree"}
                                               name={"deptName"}
                                               code={"id"}
                                               onTreeChange={(value, label) => {
                                                   this.setState({ownerDeptName: label[0]})
                                               }}
                                               config = {{disabled:this.props.editor}}
                                               children={'children'}>
                            </TreeSelectManager>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Form.Item label="入职日期"
                                   rules={[{
                                       required: true,
                                       message: "入职日期必填"
                                   }]}
                                   name={"enterDate"}>
                            <DatePicker/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="转正日期"
                                   rules={[{
                                       required: true,
                                       message: "转正日期必填"
                                   }]}
                                   name={"regularDate"}>
                            <DatePicker/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="劳动合同周期"
                                   rules={[{
                                       required: true,
                                       message: "劳动合同周期必填"
                                   }]}
                                   name={"contractDate"}>
                            <RangePicker/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Form.Item label="性别"
                                   rules={[{
                                       required: true,
                                       message: "性别必填"
                                   }]}
                                   name={"sex"}>
                            {
                                dictionaryStorage.radio("com.ciiframework.common.dictionary.SexType")
                            }
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="婚姻状况"
                                   rules={[{
                                       required: true,
                                       message: "婚姻状况不能为空"
                                   }]}
                                   name={"marryType"}>
                            {
                                dictionaryStorage.radio("com.cii.bomsp.hrm.emp.dictionary.MarryType")
                            }
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="户籍"
                                   rules={[{
                                       required: true,
                                       message: "户籍不能为空"
                                   }]}
                                   name={"householdRegisterType"}>
                            {
                                dictionaryStorage.radio("com.cii.bomsp.hrm.emp.dictionary.HouseholdRegisterType")
                            }
                        </Form.Item>
                    </Col>


                </Row>
                <Row>
                    <Col span={8}>
                        <Form.Item label="学历"
                                   rules={[{
                                       required: true,
                                       message: '学历必填'
                                   }]}
                                   name={"educationType"}>
                            {
                                dictionaryStorage.selection("com.cii.bomsp.hrm.emp.dictionary.EducationType")
                            }
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="毕业学校"
                                   name={"school"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="专业"
                                   name={"major"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Form.Item label="毕业日期"
                                   name={"graduationDate"}>
                            <DatePicker/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="银行卡号"
                                   name={"bankCardNumber"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="开户银行"
                                   name={"bankName"}>
                            <Input/>
                        </Form.Item>
                    </Col>

                </Row>

                <Row>
                    <Col span={8}>
                        <Form.Item label="出生日期"
                                   name={"birthday"}>
                            <DatePicker/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="户籍所在地"
                                   name={"householdRegisterLocation"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="现居住地"
                                   name={"address"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Form.Item label="联系人1姓名"
                                   name={"linkManOneName"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="联系人1电话"
                                   name={"linkManOnePhone"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="联系人1关系"
                                   name={"linkManOneRelation"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Form.Item label="联系人2姓名"
                                   name={"linkManTwoName"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="联系人2电话"
                                   name={"linkManTwoPhone"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="联系人2关系"
                                   name={"linkManTwoRelation"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Form.Item label="身份证号"
                                   name={"idCard"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>

                </Row>
                <Row>
                    <Col span={24}>
                        <Divider orientation="left"></Divider>
                    </Col>
                </Row>

                <Row>
                    <Col span={8}>
                        <Form.Item label="身份证正面"
                                   // rules={[{
                                   //     required: true,
                                   //     message: '身份证正面必填'
                                   // }, {
                                   //     validator: (rule, value) => {
                                   //         if (value && value.fileList && value.fileList.length < 1) {
                                   //             return Promise.reject("身份证正面照片必填！");
                                   //         } else {
                                   //             return Promise.resolve();
                                   //         }
                                   //     }
                                   // }]}
                                   name={"idCardImageFront"}>
                            <Upload action={Constants.fileUploadUrl}
                                    onPreview={this.onPreview}
                                    onChange={this.idCardImageFrontChange}
                                    fileList={this.state.idCardImageFront}
                                    listType="picture-card">
                                {this.state.idCardImageFront.length >= 1 ? null : (
                                    <div>
                                        <PlusOutlined/>
                                        <div className="ant-upload-text">正面</div>
                                    </div>
                                )}
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="身份证反面"
                                   // rules={[{
                                   //     required: true,
                                   //     message: '身份证正面必填'
                                   // }, {
                                   //     validator: (rule, value) => {
                                   //         if (value && value.fileList && value.fileList.length < 1) {
                                   //             return Promise.reject('身份证正面照片必填！');
                                   //         } else {
                                   //             return Promise.resolve();
                                   //         }
                                   //     }
                                   // }]}
                                   name={"idCardImageBack"}>
                            <Upload action={Constants.fileUploadUrl}
                                    onPreview={this.onPreview}
                                    onChange={this.idCardImageBackChange}
                                    fileList={this.state.idCardImageBack}
                                    listType="picture-card">
                                {this.state.idCardImageBack.length >= 1 ? null : (
                                    <div>
                                        <PlusOutlined/>
                                        <div className="ant-upload-text">反面</div>
                                    </div>
                                )}
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="银行卡正面"
                                   // rules={[{
                                   //     required: true,
                                   //     message: '银行卡正面必填'
                                   // }, {
                                   //     validator: (rule, value) => {
                                   //         if (value && value.fileList && value.fileList.length < 1) {
                                   //             return Promise.reject('银行卡正面照片必填！');
                                   //         } else {
                                   //             return Promise.resolve();
                                   //         }
                                   //     }
                                   // }]}
                                   name={"bankCardImage"}>
                            <Upload action={Constants.fileUploadUrl}
                                    onPreview={this.onPreview}
                                    onChange={this.bankCardImageChange}
                                    fileList={this.state.bankCardImage}
                                    listType="picture-card">
                                {this.state.bankCardImage.length >= 1 ? null : (
                                    <div>
                                        <PlusOutlined/>
                                        <div className="ant-upload-text">银行卡</div>
                                    </div>
                                )}
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Divider orientation="left"></Divider>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Form.Item name={"avatar"} label="头像">
                            <Upload action={Constants.fileUploadUrl}
                                    onPreview={this.onPreview}
                                    onChange={this.avatarImageChange}
                                    multiple={true}
                                    fileList={this.state.avatar}
                                    listType="picture-card">
                                {this.state.avatar.length >= 1 ? null : (
                                    <div>
                                        <PlusOutlined/>
                                        <div className="ant-upload-text">头像</div>
                                    </div>
                                )}
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label="学历照片"
                                   labelCol={{span: 4}}
                                   wrapperCol={{span: 20}}
                                   name={"educationImages"}>
                            <Upload action={Constants.fileUploadUrl}
                                    onPreview={this.onPreview}
                                    onChange={this.educationImageChange}
                                    multiple={true}
                                    fileList={this.state.educationImages}
                                    listType="picture-card">
                                {this.state.educationImages.length >= 4 ? null : (
                                    <div>
                                        <PlusOutlined/>
                                        <div className="ant-upload-text">毕业证/学位证</div>
                                    </div>
                                )}
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        );
    }


}

export default EmployeeEditor;