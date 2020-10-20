import React from 'react';

import BaseSelector from "../base/BaseSelector";

class UserSelector extends BaseSelector {

    constructor(props) {
        super(props);
    }

    getCreateUI() {
        return <div></div>;
    }

    getRequestUrl() {
        return "userEmployee/selector";
    }

    getColumns() {
        const columns = [{
            title: "用户编码",
            dataIndex: "id",
            width: 150,
            align: "left",
        }, {
            title: "用户姓名",
            dataIndex: "userName",
            width: 100,
            align: "left",
        }, {
            title: "用户电话",
            dataIndex: "userPhone",
            width: 120,
            align: "left",
        }, {
            title: "用户所属部门",
            dataIndex: "ownerDeptName",
            width:150,
            align: "left",
        }, {
            title: "公司",
            dataIndex: "cpyName",
            width:200,
            align: "left",
        }];

        return columns;
    }
}

export default UserSelector;