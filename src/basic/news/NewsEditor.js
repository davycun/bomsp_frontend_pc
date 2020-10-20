import React from 'react';
import { PlusOutlined } from '@ant-design/icons';

import { Form,Col, Input, message, Row, Upload } from "antd";
import ReactQuill, {Quill} from 'react-quill';
import {Utils} from "../../base/CiiUtils";
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.core.css';
import {dictionaryStorage, Size} from "../../base/Common";
import BaseModalEditor from "../../base/BaseModalEditor";
import {Constants} from "../../base/Constants";

class NewsEditor extends BaseModalEditor {

    constructor(props) {
        super(props);
        this.state.text = '';
        this.state.avatar = [];
    }

    getRequestUrl(isEditor) {

        return isEditor ? "news/update" : "news/create";
    }

    onCurrentDataChange(data) {
        this.setState({
            text: data.content,
            avatar: Utils.makeUploadFileList(data.avatar)
        });
    }

    getRequestEntity(values) {

        if (!this.state.text || '' == this.state.text) {
            message.error("资讯内容必填");
            return;
        }
        if (this.state.avatar.length < 1) {
            message.error("资讯缩略图必填");
            return;
        }

        values.content = this.state.text;
        values.avatar = Utils.makeFileCodeString(values.avatar);

        return values;
    }

    handlerContentChange = (text) => {
        this.setState({
            content: text,
            text: text
        })

    }

    /**
     *资讯缩略图变化后的处理函数
     * @param file
     */
    avatarChange = (file) => {
        this.setState({avatar: file.fileList})
    }


    getQuillModules = () => {
        if (!this.modules) {
            this.modules = {
                toolbar: [
                    [{'header': [1, 2, 3, 4, 5, 6, false]}],
                    [{'font': []}],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                    [{'script': 'sub'}, {'script': 'super'}],
                    ['link', 'image'],
                    [{'direction': 'rtl'}],
                    [{'color': []}, {'background': []}],
                    [{'align': []}],
                    ['clean']
                ],
            }
        }
        return this.modules;
    }

    getFormUI(form) {

        return (
            <Form ref={this.form}
                  layout="horizontal"
                  initialValues={this.getRefreshFormData(this.props.currentData||{})}
                  labelCol={{xs: 4, sm: 4, md: 3, lg: 3, xl: 2, xxl: 1}}
                  wrapperCol={{xs: 20, sm: 20, md: 21, lg: 21, xl: 22, xxl: 23}}>
                <Row>
                    <Col span={24}>
                        <Form.Item label="资讯编码" name={"id"}>
                                    <Input disabled/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="资讯标题"
                                   rules={[{
                                       required: true,
                                       message: '标题必填'
                                   }]}
                                   name={"newsTitle"}>
                                    <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="资讯类型"
                                   rules={[{
                                       required: true,
                                       message: '类型必填'
                                   }]}
                                   name={"newsType"}>
                            {
                                    dictionaryStorage.selection("com.cii.bomsp.base.news.dictionary.NewsType")
                            }
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="资讯摘要"
                                   rules={[{
                                       required: true,
                                       message: '摘要必填'
                                   }]}
                                   name={"brief"}>
                                    <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="推广关键字"
                                   rules={[{
                                       required: true,
                                       message: '推广关键字必填'
                                   }]}
                                   name={"keywords"}>
                                    <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="推广描述"
                                   rules={[{
                                       required: true,
                                       message: '推广描述必填'
                                   }]}
                                   name={"description"}>
                                    <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="资讯缩略图" name={"avatar"}>
                            <Upload action={Constants.fileUploadUrl}
                                    onPreview={this.onPreview}
                                    onChange={this.avatarChange}
                                    fileList={this.state.avatar}
                                    listType="picture-card">
                                {this.state.avatar.length >= 1 ? null : (
                                    <div>
                                        <PlusOutlined />
                                        <div className="ant-upload-text">缩略图</div>
                                    </div>
                                )}
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <ReactQuill value={this.state.text}
                                    style={{height: Size.screenHeight() * this.getModalSize() - 110 - 48 , overflow: "hidden"}}
                                    modules={this.getQuillModules()}
                                    onChange={this.handlerContentChange}></ReactQuill>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default NewsEditor;

