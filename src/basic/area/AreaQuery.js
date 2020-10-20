import React from 'react';
import {Form, Col, Input, InputNumber, Row} from "antd";

import {dictionaryStorage} from "../../base/Common";
import BaseQuery from "../../base/BaseQuery";

class AreaQuery extends BaseQuery {

    constructor(props) {
        super(props);
    }

    getFormUI(form) {
        return (
            <Form ref={this.form} wrapperCol={{span: 18}} labelCol={{span: 6}}>
                <Row>
                    <Col span={12}>
                        <Form.Item label={"父编码"} name={"parentId"}>
                            <InputNumber style={{width: '100%'}}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={"编码"} name={"id"}>
                            <InputNumber style={{width: '100%'}}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label={"类型"} name={"areaType"}>
                            {
                                dictionaryStorage.selection("com.cii.bomsp.base.area.dictionary.AreaType")
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
            </Form>
        );
    }

}

export default AreaQuery;