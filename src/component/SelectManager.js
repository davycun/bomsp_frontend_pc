import React from 'react';
import {request} from "../base/CiiUtils";
import { RedoOutlined } from '@ant-design/icons';
import { Select } from "antd";

/**
 * 1、queryUrl
 * 2、code，节点key及value
 * 3、name，
 * 4、onSelectChange
 */
class SelectManager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
        this.getRequestUrl = this.getRequestUrl.bind(this);
        this.getNodeCode = this.getNodeCode.bind(this);
        this.getNodeName = this.getNodeName.bind(this);
        this.reload = this.reload.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
    }

    componentDidMount() {
        this.reload();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.value
            && this.props.value
            && (this.props.value!=prevProps.value)){
            this.setState({value: this.props.value});
        }
    }

    getRequestUrl() {
        const {queryUrl} = this.props;
        return queryUrl ? queryUrl : "";
    }

    getNodeCode() {
        const {code} = this.props;
        return code ? code : "code";
    }

    getNodeName() {
        const {name} = this.props;
        return name ? name : "name";
    }

    getPlaceholder() {
        const {placeholder} = this.props;
        return placeholder ? placeholder : "请选择";
    }

    getMode() {
        const {mode} = this.props;
        return mode ? mode : "default";
    }

    reload() {
        request({
            conf: {
                url: this.getRequestUrl(),
                data: {}
            },
            success: (data) => {
                this.setState({
                    data: data.result
                });
            }
        });
    }

    onSelectChange(value, option) {
        const {onSelectChange, onChange} = this.props;
        if (onSelectChange) {
            onSelectChange(value, option);
        }
        if (onChange) {
            onChange(value, option);
        }
    }

    render() {
        return (
            <Select showSearch={true}
                    suffixIcon={<RedoOutlined onClick={() => this.reload()} />}
                    value={this.props.value}
                    optionFilterProp="children"
                    onChange={this.onSelectChange}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    mode={this.getMode()}
                    placeholder={this.getPlaceholder()}>
                {this.state.data.map((post) => {
                    return <Select.Option key={post[this.getNodeCode()]}
                                          value={post[this.getNodeCode()]}>{post[this.getNodeName()]}</Select.Option>
                })}
            </Select>
        );
    }
}

export default SelectManager;