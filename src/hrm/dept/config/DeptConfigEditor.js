import React from 'react';
import BaseModalEditor from "../../../base/BaseModalEditor";
import {Col, Form, Input, Row} from "antd";
import TreeSelectManager from "../../../component/TreeSelectManager";
import {dictionaryStorage} from "../../../base/DictionaryStorage";

class DeptConfigEditor extends BaseModalEditor {

    constructor(props) {
        super(props);
        this.state.deptName = "";
    }

    getRequestUrl(isEditor) {
        return isEditor ? "deptConfig/update" : "deptConfig/create";
    }

    getRequestEntity(values) {
        if (this.state.deptName) {
            values.deptName = this.state.deptName;
        }

        return values;
    }

    getFormUI(form) {

        return (
            <Form ref={this.form}
                  initialValues={this.getRefreshFormData(this.props.currentData || {})}
                  wrapperCol={{span: 20}} labelCol={{span: 4}}>
                <Row>
                    <Col span={24}>
                        <Form.Item label={"ID"} name={"id"}>
                            <Input disabled/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="所属部门"
                                   rules={[{
                                       required: !this.props.editor,
                                       message: '部门必填',
                                   }]}
                                   name={"deptId"}>
                            <TreeSelectManager queryUrl={"dept/queryToTree"}
                                               name={"deptName"}
                                               code={"id"}
                                               onTreeChange={(value, label) => {
                                                   this.setState({deptName: label[0]})
                                               }}
                                               config={{disabled: this.props.editor}}
                                               children={'children'}>
                            </TreeSelectManager>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label={"区域级别"}
                                   name={"areaType"}>
                            {
                                dictionaryStorage.selection("com.cii.bomsp.base.area.dictionary.AreaType")
                            }
                        </Form.Item>

                    </Col>
                </Row>
            </Form>
        );
    }


}

export default DeptConfigEditor;