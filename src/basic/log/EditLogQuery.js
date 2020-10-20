import React from 'react';
import BaseQuery from "../../base/BaseQuery";
import {Form, Col, Input, Row, DatePicker} from "antd";

import {dictionaryStorage} from "../../base/Common";

class EditLogQuery extends BaseQuery {

    constructor(props) {
        super(props);
    }

    getFormUI(form) {

        return (
            <Form ref={this.form}
                  wrapperCol={{span: 18}} labelCol={{span: 6}}>
                <Row>
                    <Col span={24}>
                        <Form.Item label={"业务ID"} name={"bizId"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label={"操作人ID"} name={"createId"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label={"操作人姓名"} name={"createName"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label={"最早操作时间"} name={"createTimeStart"}>
                            <DatePicker style={{width: '100%'}}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label={"最晚操作时间"} name={"createTimeEnd"}>
                            <DatePicker style={{width: '100%'}}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default EditLogQuery;