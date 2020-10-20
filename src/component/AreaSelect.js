import React from 'react';
import { RedoOutlined } from '@ant-design/icons';
import { Cascader } from "antd";
import {request} from "../base/CiiUtils";

/**
 * <AreaSelect props.../>
 * 1、queryCondition
 * {
 *     areaTypes:["Province","City","Region","Street","Community"]
 *     notAreaTypes:["Province","City","Region","Street","Community"]
 * }
 */
class AreaSelect extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            areas: [],
            area: {},
            value: []
        }

        this.onAreaChange = this.onAreaChange.bind(this);
        this.reload = this.reload.bind(this);
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

    reload() {
        const {queryCondition} = this.props;

        let qc = {
            entity: {
                notAreaTypes: ['Province']
            }
        }

        request({
            conf: {
                url: 'areaCpy/queryAllToTree',
                data: queryCondition ? queryCondition : qc
            },
            success: (data) => {
                if (data.result != null && data.result.length > 0) {
                    this.setState({areas: data.result});
                }
            },
            finally: () => {
            }
        });
    }

    onAreaChange(value, selectedOptions) {
        let ar = {};

        if (selectedOptions.length >=4){
            ar.communityId = selectedOptions[3].id;
            ar.communityName = selectedOptions[3].areaName;
        }

        if (selectedOptions.length >= 3) {
            ar.streetName = selectedOptions[2].areaName;
            ar.streetId = selectedOptions[2].id;
        }
        if (selectedOptions.length >= 2) {
            ar.regionName = selectedOptions[1].areaName;
            ar.regionId = selectedOptions[1].id;
        }
        if (selectedOptions.length >= 1) {
            ar.cityName = selectedOptions[0].areaName;
            ar.cityId = selectedOptions[0].id;
        }
        const {onChange, onAreaChange} = this.props;
        if (onChange) {
            onChange(value);
        }

        if (onAreaChange) {
            onAreaChange(ar);
        }

    };

    render() {
        return (
            <Cascader fieldNames={{
                label: 'areaName',
                value: 'id',
                children: 'children'
            }}
                      value={this.props.value}
                      placeholder={"选择市区街道"}
                      options={this.state.areas}
                      suffixIcon={<RedoOutlined onClick={() => this.reload()} />}
                      onChange={this.onAreaChange}
                      showSearch={true}
                      changeOnSelect={true}></Cascader>
        );
    }

}

export default AreaSelect;