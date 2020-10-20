import React from 'react';

import {Form, Input, InputNumber, Radio, Row, Col} from "antd";
import BaseModalEditor from "../../base/BaseModalEditor";

class MenuEditor extends BaseModalEditor {

    constructor(props) {
        super(props);
    }

    getRequestUrl(isEditor) {
        return isEditor ? "menu/update" : "menu/create";
    }

    getRefreshFormData(data) {
        const {editor} = this.props;
        if (!editor) {
            return {
                parentId: data.id
            }
        }
        return data;
    }

    getFormUI(form) {
        return (
            <Form ref={this.form}
                  initialValues={this.getRefreshFormData(this.props.currentData||{})}
                  wrapperCol={{span: 16}} labelCol={{span: 8}}>
                <Row>
                    <Col span={12}>
                        <Form.Item label="父菜单编码"
                                   rules={[{
                                       required: true,
                                       message: '父菜单编码必填'
                                   }]}
                                   name={"parentId"}>
                            <Input disabled={true}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="菜单编码" name={"id"}>
                            <Input disabled={true}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="菜单名称"
                                   rules={[{
                                       required: true,
                                       message: "菜单名称必填"
                                   }]}
                                   name={"menuName"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="菜单类型"
                                   rules={[{
                                       required: true,
                                       message: "菜单类型必填",
                                       initialValue: 'Menu'
                                   }]}
                                   name={"menuType"}>
                            <Radio.Group>
                                <Radio value="Menu">菜单</Radio>
                                <Radio value="Function">功能</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="菜单层级"
                                   rules={[{
                                       required: true,
                                       message: "层级必填"
                                   }]}
                                   name={"level"}>
                            <InputNumber min={1} style={{width: '100%'}}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="菜单排序"
                                   rules={[{
                                       required: true,
                                       message: "菜单排序必填"
                                   }]}
                                   name={"sort"}>
                            <InputNumber min={1} style={{width: '100%'}}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>

                        <Form.Item label="ItemId" name={"itemId"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>

                        <Form.Item label="接口地址" name={"menuUrl"}>
                            <Input/>
                        </Form.Item>
                    </Col>

                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="ItemIcon" name={"itemIcon"}>
                            {
                                <Input/>
                            }
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="ItemClass" name={"itemClass"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="ItemPack" name={"itemPack"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>

                    <Col span={24}>
                        <Form.Item labelCol={{span: 4}} wrapperCol={{span: 20}}
                                   label="备注" style={{width: '100%'}}
                                   name={"remark"}>
                            <Input.TextArea rows={2}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        );
    }

}

export default MenuEditor;