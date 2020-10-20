import React from 'react'
import {Checkbox, message, Radio, Select} from "antd";
import {request} from "./CiiUtils";

/** 字典组件*/
function DictionaryStorage() {
    this.dicMap = new Map();
}

DictionaryStorage.prototype.getId = function (key, code) {
    if (key && code) {
        return key + "@" + code;
    }
}
DictionaryStorage.prototype.get = function (key, code) {
    if (key) {
        if (code) {
            return this.dicMap.get(this.getId(key, code));
        } else {

            const dicS = new Array();
            let dicParent = null;

            this.dicMap.forEach((dic) => {
                if (dic.key === key) {
                    let dp = this.dicMap.get(this.getId(key, dic.parentCode));
                    if (dp) {
                        if (!dicParent) {
                            dicParent = dp;
                        }
                        dicS.push(dic)
                    }
                }
            });
            return dicS;
        }
    }
}
/**
 * config.mode : 'multiple' | 'tags'，设置多选或者标签
 * config.onChange: (value)=>{}
 * config.disable: true
 * config.defaultValue: "value"
 * @param key
 * @param config
 * @returns {*}
 */
DictionaryStorage.prototype.selection = function (key, config) {
    if (key) {
        let dicS = this.get(key);

        if (dicS && dicS.length > 0) {
            let dp = this.dicMap.get(this.getId(key, dicS[0].parentCode));

            let props = {
                optionFilterProp: "children",
                filterOption: (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                showSearch: config && config.showSearch === false ? false : true,
                placeholder: dp.name
            };
            if (config && config.onChange) {
                props.onChange = config.onChange;
            }
            if (config && (config.disabled === true)) {
                props.disabled = true;
            }

            if (config && config.mode) {
                props.mode = config.mode;
            }
            if (config && config.defaultValue) {
                props.defaultValue = config.defaultValue;
            }
            if (config && config.value) {
                props.value = config.value;
            }


            let vl = (
                <Select {...props}>
                    {
                        dicS.map((dic) => {
                            return <Select.Option key={dic.code} value={dic.code}>{dic.name}</Select.Option>
                        })
                    }
                </Select>
            );
            return vl;
        } else {
            message.error(key + "没有值");
            return <Select></Select>
        }
    }
}
/**
 * config.onChange: (e:Event)=>{},value->e.target.value
 * config.defaultValue : String[]
 * config.disabled:true
 * @param key
 * @param config
 * @returns {*}
 */
DictionaryStorage.prototype.radio = function (key, config) {
    if (key) {
        let dicS = this.get(key);

        if (dicS && dicS.length > 0) {
            // let dp = this.dicMap.get(this.getId(key, dicS[0].parentCode));

            let props = {
                name:key
            };
            if (config && config.onChange){
                props.onChange = config.onChange;
            }
            if (config && config.defaultValue){
                props.defaultValue = config.defaultValue;
            }
            if (config && (config.disabled===true)){
                props.disabled = true
            }

            let vl = (
                <Radio.Group {...props}>
                    {
                        dicS.map((dic) => {
                            return <Radio key={dic.code} value={dic.code}>{dic.name}</Radio>
                        })
                    }
                </Radio.Group>
            );
            return vl;
        } else {
            message.error(key + "没有值");
            return <Radio.Group></Radio.Group>
        }
    }
}

/**
 * config.onChange: (checkedValue)=>{}
 * config.defaultValue : String[]
 * config.disabled:true
 * @param key
 * @param config
 * @returns {*}
 */
DictionaryStorage.prototype.checkbox = function (key, config) {
    if (key) {
        let dicS = this.get(key);

        if (dicS && dicS.length > 0) {
            // let dp = this.dicMap.get(this.getId(key, dicS[0].parentCode));

            let props = {
                name:key
            };
            if (config && config.onChange){
                props.onChange = config.onChange;
            }
            if (config && config.defaultValue){
                props.defaultValue = config.defaultValue;
            }
            if (config && (config.disabled===true)){
                props.disabled = true
            }

            let vl = (
                <Checkbox.Group {...props}>
                    {
                        dicS.map((dic) => {
                            return <Checkbox key={dic.code} value={dic.code}>{dic.name}</Checkbox>
                        })
                    }
                </Checkbox.Group>
            );
            return vl;
        } else {
            message.error(key + "没有值");
            return <Checkbox.Group></Checkbox.Group>
        }
    }
}
DictionaryStorage.prototype.init = function (callback) {
    request({
        conf: {
            url: 'dictionary/queryAll',
            data: {
                // key:'com.cii.bomsp.hrm.emp.dictionary.EducationType'
            },
        },
        success: (data) => {
            if (data.result) {
                for (let i = 0; i < data.result.length; i++) {
                    let dic = data.result[i];
                    this.dicMap.set(this.getId(dic.key,dic.code), dic);
                }
            }

            if (callback) {
                callback();
            }
        }
    });
}
const dictionaryStorage = new DictionaryStorage();


export {dictionaryStorage}