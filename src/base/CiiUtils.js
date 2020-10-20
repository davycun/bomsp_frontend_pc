import axios from 'axios';
import {message} from 'antd';
import {Constants} from "./Constants";


function request(cf) {

    let config = cf;

    if (!config.conf || !config.conf.url) {
        message.error('参数必须配置规则同axios的配置');
        return;
    }

    if (!config.conf.method) {
        config.conf.method = 'POST';
    }

    if (config.conf.method === 'POST') {
        if (config.conf.headers) {
            if (!config.conf.headers.contentType) {

                config.conf.headers.contentType = 'application/json;charset=UTF-8';
            }

        } else {
            config.conf.headers = {
                contentType: 'application/json;charset=UTF-8'
            }
        }

        if (config.conf.headers.contentType == 'application/json;charset=UTF-8'
            && !config.conf.data) {

            config.conf.data = {}

        }
    }
    config.conf.url = Constants.contextPath + config.conf.url;
    axios(config.conf).then((response) => {
        if (response.data.isSuccess) {

            if (config.success && (typeof config.success == 'function')) {
                config.success(response.data);
            } else {
                message.success(response.data.message);
            }

        } else {
            //用户没有登录跳转到指定页面
            //TODO
            if (response.data.code && response.data.code === 'U1000') {
                window.document.location.href = "/login";
            }
            if (config.fail && (typeof config.fail == 'function')) {
                config.fail(response.data);
            } else {
                message.error(response.data.message);
            }

        }

        if (config.finally && (typeof config.finally == 'function')) {
            config.finally();
        }
    }).catch((reason) => {
        if (reason.response) {
            message.error(reason.response.status + ":"+reason.response.statusText);
        }
        if (config.finally && (typeof config.finally == 'function')) {
            config.finally();
        }
    });
}

export const Utils = {
    phoneReg: /^1[3456789]\d{9}$/,
    isPhone: function (value) {
        return Utils.phoneReg.test(value);
    },
    dateFormat: function (date, format) {

        if (date) {

            if (!format) {
                format = "yyyy-MM-dd";
            }

            let dt = date;

            if (!(date instanceof Date)) {
                dt = new Date(date);
            }

            let o = {
                "M+": dt.getMonth() + 1,                 //月份
                "d+": dt.getDate(),                    //日
                "h+": dt.getHours(),                   //小时
                "m+": dt.getMinutes(),                 //分
                "s+": dt.getSeconds(),                 //秒
                "q+": Math.floor((dt.getMonth() + 3) / 3), //季度
                "S": dt.getMilliseconds()             //毫秒
            };
            if (/(y+)/.test(format))
                format = format.replace(RegExp.$1, (dt.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (let k in o)
                if (new RegExp("(" + k + ")").test(format))
                    format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return format;
        }

        return "";
    },
    booleanToString(obj, field) {
        if (obj[field] === true) {
            obj[field] = 'true';
        }
        if (obj[field] === false) {
            obj[field] = 'false';
        }
    },
    booleanHasToDisplay: function (value, subFix) {
        let result = "未知";
        if (value === true) {
            result = "有";
            if (subFix){
                result += subFix;
            }
        } else if (value === false) {
            result = "无";
            if (subFix){
                result += subFix;
            }
        }
        return result;
    },
    booleanIsToDisplay: function (value) {
        let result = "未知";
        if (value === true) {
            result = "是";
        } else if (value === false) {
            result = "否"
        }
        return result;
    },
    /**
     * 针对编辑页面创建Upload文件上传组件的fileList
     * @param fileCode
     * @returns {Array|{uid: string, name: string, thumbUrl: string, url: string, status: string}[]}
     */
    makeUploadFileList(fileCode) {

        if (!fileCode) {
            return [];
        }
        let ts = [];
        if (typeof fileCode == 'string') {
            ts = fileCode.split(",")
        }
        if (Object.prototype.toString.call(fileCode) === '[object Array]') {
            ts = fileCode;
        }
        let list = [];
        for (let i = 0; i < ts.length; i++) {
            list.push({
                uid: ts[i],
                name: ts[i],
                fileId: ts[i],
                // fileCode: ts[i],
                status: 'done',
                url: Constants.fileReadUrl + ts[i],
                thumbUrl: Constants.fileReadUrl + ts[i] + "@list"
            })
        }
        return list;
    },

    makeFileCodeString(files) {
        let fileCodes = "";
        if (files && files.fileList && files.fileList.length > 0) {
            for (let i = 0; i < files.fileList.length; i++) {
                let f = files.fileList[i];
                if (f.fileId) {
                    fileCodes += f.fileId;
                } else if (f.response && f.response.isSuccess) {
                    fileCodes += f.response.result[0].id;
                }

                if (i < files.fileList.length - 1) {
                    fileCodes += ",";
                }
            }
        }
        return fileCodes;
    }

}

export {axios, request};