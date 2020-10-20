import React from 'react';
import BaseQuery from "../../base/BaseQuery";

import {Form, Col, Input, Row, DatePicker} from "antd";
import {dictionaryStorage} from "../../base/Common";

class NewsQuery extends BaseQuery {

    constructor(props) {
        super(props);
    }

    getFormUI(form) {

        return (
            <Form ref={this.form}
                  layout="horizontal"
                  labelCol={{span: 4}}
                  wrapperCol={{span: 20}}>
                <Row>
                    <Col span={24}>
                        <Form.Item label="资讯编码" name={"id"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="资讯标题" name={"newsTitle"}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="资讯类型" name={"newsType"}>
                            {
                                dictionaryStorage.selection("com.cii.bomsp.base.news.dictionary.NewsType")
                            }
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label={"创建时间大于"} name={"createTimeStart"}>
                            <DatePicker style={{width: '100%'}}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label={"创建时间小于"} name={"createTimeEnd"}>
                            <DatePicker style={{width: '100%'}}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        );
    }


}

export default NewsQuery;