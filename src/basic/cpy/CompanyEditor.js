import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form,Input, Row, Col, AutoComplete, Upload } from "antd";
import BaseModalEditor from "../../base/BaseModalEditor";
import {Utils} from "../../base/CiiUtils";
import {Constants} from "../../base/Constants";

class CompanyEditor extends BaseModalEditor {

    constructor(props) {
        super(props);
        this.state.logo = [];
    }

    getRequestUrl(isEditor) {
        return isEditor ? "cpy/update" : "cpy/create"
    }

    getRequestEntity(values) {
        values.logo = Utils.makeFileCodeString(values.logo);
        return values;
    }

    onCurrentDataChange(data) {
        let st = {
            logo: Utils.makeUploadFileList(data.logo)
        }
        this.setState(st);

    }


    logoImageChange = (file) => {
        this.onUploadChange(file, "logo")
    }

    getFormUI(form) {
        return (
            <Form ref={this.form}
                  initialValues={this.getRefreshFormData(this.props.currentData||{})}
                  labelCol={{span: 7}}
                  wrapperCol={{span: 17}}>
                <Row>
                    <Col span={12}>
                        <Form.Item label="公司编码" name={"id"}>
                                    <Input disabled/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="公司名称"
                                   rules={[{
                                       required: true,
                                       message: '公司名称必填'
                                   }]}
                                   name={"cpyName"}>
                                    <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="管理员邮箱"
                                   name={"adminEmail"}>
                            <AutoComplete
                                onChange={this.emailHandleChange}
                                placeholder="Email">
                                {
                                    this.emailAutoCompleteOption()
                                }
                            </AutoComplete>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="管理员电话"
                                   rules={[{
                                       required: true,
                                       message: '管理员手机号必填'
                                   }]}
                                   name={"adminPhone"}>
                                    <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="公司别名" name={"aliasCode"}>
                            <Input disabled/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="备注" name={"remark"}>
                                    <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="公司Slogan" name={"slogan"}>
                                    <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="公司别名" name={"logo"}>
                            <Upload action={Constants.fileUploadUrl}
                                    onPreview={this.onPreview}
                                    onChange={this.logoImageChange}
                                    multiple={true}
                                    fileList={this.state.logo}
                                    listType="picture-card">
                                {this.state.logo.length >= 1 ? null : (
                                    <div>
                                        <PlusOutlined />
                                        <div className="ant-upload-text">logo</div>
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

export default CompanyEditor;