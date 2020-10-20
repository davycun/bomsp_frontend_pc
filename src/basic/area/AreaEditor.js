import React from 'react';
import BaseModalEditor from "../../base/BaseModalEditor";

import {Form, Col, Input, InputNumber, Row} from "antd";

import {dictionaryStorage} from "../../base/Common";

class AreaEditor extends BaseModalEditor {

    constructor(props) {
        super(props);
    }

    getRequestUrl(isEditor) {
        return isEditor ? 'area/update' : 'area/create'
    }

    getRefreshFormData(data) {
        const {editor} = this.props;
        if (editor) {
            return data;
        } else {
            let r = {
                parentId: data.id
            }

            if (data.areaType == "Province") {
                r.areaType = "City";
            } else if (data.areaType == "City") {
                r.areaType = "Region";
            } else if (data.areaType == "Region") {
                r.areaType = "Street";
            } else {
                r.areaType = "Community";
            }

            return r;
        }
    }

    getFormUI(form) {
        return (
            <Form ref={this.form}
                  initialValues={this.getRefreshFormData(this.props.currentData||{})}
                  wrapperCol={{span: 18}} labelCol={{span: 6}}>
                <Row>
                    <Col span={12}>
                        <Form.Item label={"父编码"} name={"parentId"}>
                            <Input disabled/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={"编码"} name={"id"}>
                            <Input disabled/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label={"类型"} name={"areaType"}>
                            {
                                dictionaryStorage.selection("com.cii.bomsp.base.area.dictionary.AreaType", {
                                    disabled: true
                                })
                            }
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={"名称"} name={"areaName"}>
                            {
                                <Input/>
                            }
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label={"简称"} name={"shortName"}>
                            {
                                <Input/>
                            }
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={"排序"} name={"sort"}>
                            {
                                <InputNumber min={0} style={{width: '100%'}}/>
                            }
                        </Form.Item>
                    </Col>
                </Row>

            </Form>
        );
    }

}

export default AreaEditor;