import React from 'react';
import {Tooltip} from "antd";
import {request, Utils} from "../../base/CiiUtils";
import EmployeeEditor from './EmployeeEditor';
import BaseManager from "../../base/BaseManager";
import EmployeeQuery from "./EmployeeQuery";
import EmployeeQuitEditor from "./EmployeeQuitEditor";
import EmployeeTransferEditor from "./EmployeeTransferEditor";
import EmployeeUpdatePhoneEditor from "./EmployeeUpdatePhoneEditor";
import EmployeeRehireEditor from "./EmployeeRehireEditor";


class EmployeeManager extends BaseManager {

    constructor(props) {
        super(props);

        //离职
        this.state.quitVisible = false;
        this.state.employee = {};

        //异动
        this.state.transferVisible = false;
        this.state.transferCurrentData = {};

        //返聘
        this.state.rehireVisible = false;

        //更新手机号
        this.state.updatePhoneVisible = false;

    }

    getRequestUrl() {
        return 'emp/query';
    }

    getQueryModal() {
        return (
            <EmployeeQuery title={"人员查询面板"}
                           size={0.7}
                           onCancel={this.onQueryModalCancel}
                           visible={this.state.queryModalVisible}
                           onSubmitOk={this.onQueryModalSubmitOk}/>
        );

    }

    getEditModal() {
        return (
            <EmployeeEditor title={"人员编辑"}
                            editor={true}
                            currentData={this.state.currentData}
                            visible={this.state.editModalVisible}
                            onCancel={this.onEditModalCancel}
                            onSubmitOk={this.onEditModalSubmitOk}/>
        );
    }

    getCreateModal() {
        return (
            <EmployeeEditor title={"新增人员"}
                            editor={false}
                            visible={this.state.createModalVisible}
                            onCancel={this.onCreateModalCancel}
                            onSubmitOk={this.onCreateModalSubmitOk}/>
        );

    }

    onQuitClick = (record) => {
        this.setState({quitVisible: true, currentData: record});
    }
    onQuitSubmitOk = () => {
        this.reload(this.state.page.current, this.state.queryCondition);
        this.setState({quitVisible: false});
    }
    onQuitCancel = () => {
        this.setState({quitVisible: false});
    }

    onRehireClick = (record) => {
        this.setState({rehireVisible: true, currentData: record});
    }
    onRehireSubmitOk = () => {
        this.setState({rehireVisible: false});
        this.reload(this.state.page.current, this.state.queryCondition);
    }
    onRehireCancel = () => {
        this.setState({rehireVisible: false});
    }

    onUpdatePhoneClick = (record) => {
        this.setState({updatePhoneVisible: true,currentData: record});
    }
    onUpdatePhoneCancel = () => {
        this.setState({updatePhoneVisible: false});
    }
    onUpdatePhoneSubmitOk = () => {
        this.reload(this.state.page.current, this.state.queryCondition);
        this.setState({updatePhoneVisible: false});
    }

    onTransferClick = (record) => {
        this.setState({currentData: record,transferVisible: true})
    }
    onTransferCancel = () => {
        this.setState({transferVisible: false})
    }
    onTransferSubmitOk = () => {
        this.reload(this.state.page.current, this.state.queryCondition);
        this.setState({transferVisible: false})
    }

    openOrCloseLogin = (record) => {
        request({
            conf: {
                url: record.canLogin ? 'emp/closeLogin' : 'emp/openLogin',
                data: {
                    entity: {
                        id: record.id
                    }
                }
            },
            success: () => {
                this.reload(this.state.page.current)
            }
        });
    }

    getOtherModal() {
        return (
            <div>
                <EmployeeQuitEditor editor={false}
                                    title={"员工离职"}
                                    visible={this.state.quitVisible}
                                    size={0.5}
                                    currentData={this.state.currentData}
                                    onSubmitOk={this.onQuitSubmitOk}
                                    onCancel={this.onQuitCancel}>
                </EmployeeQuitEditor>
                <EmployeeTransferEditor title={"员工异动"}
                                        editor={false}
                                        size={0.5}
                                        visible={this.state.transferVisible}
                                        currentData={this.state.currentData}
                                        onSubmitOk={this.onTransferSubmitOk}
                                        onCancel={this.onTransferCancel}>
                </EmployeeTransferEditor>

                <EmployeeUpdatePhoneEditor title={"修改手机号"}
                                           editor={false}
                                           size={0.5}
                                           visible={this.state.updatePhoneVisible}
                                           currentData={this.state.currentData}
                                           onSubmitOk={this.onUpdatePhoneSubmitOk}
                                           onCancel={this.onUpdatePhoneCancel}>
                </EmployeeUpdatePhoneEditor>
                <EmployeeRehireEditor title={"返聘员工"}
                                      editor={false}
                                      size={0.5}
                                      visible={this.state.rehireVisible}
                                      currentData={this.state.currentData}
                                      onSubmitOk={this.onRehireSubmitOk}
                                      onCancel={this.onRehireCancel}>
                </EmployeeRehireEditor>
            </div>
        );
    }

    getOperationWidth() {
        return 300;
    }

    getOperations(record) {

        let opts = [{
            name: "编辑",
            onClick: this.onEditClick
        }, {
            name: record["canLogin"] ? '关闭登录' : '打开登录',
            onClick: this.openOrCloseLogin,
            popConfirmTitle: record["canLogin"] ? '确定要关闭？' : '确定要打开？',
        }, {
            name: "异动",
            onClick: this.onTransferClick
        }, {
            name: "更新号码",
            onClick: this.onUpdatePhoneClick
        }];

        if (!record["hasQuit"]) {
            opts.push({
                name: "离职",
                onClick: this.onQuitClick,
            })
        }

        if (record["hasQuit"]) {
            opts.push({
                name: "返聘",
                onClick: this.onRehireClick,
            })
        }

        return opts;

    }

    getTableScrollX() {
        return 4500;
    }

    getColumns() {
        const columns = [{
            title: '姓名',
            dataIndex: 'empName',
            width: 100,
            align: 'center',
            fixed: 'left'
        }, {
            title: '部门',
            dataIndex: 'ownerDeptName',
            width: 120,
            align: 'center',
            fixed: 'left',
            render: (text, record) => {
                return (
                    <Tooltip title={text}>
                        <div className="result-columns-div">{text}</div>
                    </Tooltip>
                );
            }
        }, {
            title: '人员ID',
            dataIndex: 'id',
            align: 'center',
            width: 150,
            render: (text, record) => {
                return (
                    <Tooltip title={record.id}>
                        <div className="result-columns-div">{record.id}</div>
                    </Tooltip>
                );
            }
        }, {
            title: '电话',
            dataIndex: 'empPhone',
            align: 'center',
            width: 150
        }, {
            title: '性别',
            dataIndex: 'sexName',
            align: 'center',
            width: 100
        }, {
            title: '工号',
            dataIndex: 'workNumber',
            align: 'center',
            width: 120
        }, {
            title: '在职状态',
            dataIndex: "hasQuit",
            align: 'center',
            width: 80,
            className: "red-column",
            render: (text, record) => {
                return record["hasQuit"] === false ? '在职' : '已离职';
            }
        }, {
            title: '邮箱',
            dataIndex: 'email',
            align: 'center',
            width: 150,
            render: (text, record) => {
                return (
                    <Tooltip title={record.email}>
                        <div className="result-columns-div">{record.email}</div>
                    </Tooltip>
                );
            }
        }, {
            title: '身份证号',
            dataIndex: 'idCard',
            align: 'center',
            width: 150,
            render: (text, record) => {
                return (
                    <Tooltip title={record.idCard}>
                        <div className="result-columns-div">{record.idCard}</div>
                    </Tooltip>
                );
            }
        }, {
            title: '入职日期',
            dataIndex: 'enterDate',
            align: 'center',
            width: 150,
            render: (text, record) => {
                return Utils.dateFormat(new Date(record.enterDate), 'yyyy-MM-dd');
            }
        }, {
            title: '学历',
            dataIndex: 'educationTypeName',
            align: 'center',
            width: 150
        }, {
            title: '毕业院校',
            dataIndex: 'school',
            align: 'center',
            width: 150
        }, {
            title: '专业',
            dataIndex: 'major',
            align: 'center',
            width: 150
        }, {
            title: '毕业日期',
            dataIndex: 'graduationDate',
            align: 'center',
            width: 150,
            render: (text, record) => {
                return Utils.dateFormat(new Date(record.graduationDate), 'yyyy-MM-dd');
            }
        }, {
            title: '出生日期',
            dataIndex: 'birthday',
            align: 'center',
            width: 150,
            render: (text, record) => {
                return Utils.dateFormat(new Date(record.birthday), 'yyyy-MM-dd');
            }
        }, {
            title: '婚姻状况',
            dataIndex: 'marryTypeName',
            align: 'center',
            width: 150
        }, {
            title: '联系人1姓名',
            dataIndex: 'linkManOneName',
            align: 'center',
            width: 150
        }, {
            title: '联系人1电话',
            dataIndex: 'linkManOnePhone',
            align: 'center',
            width: 150
        }, {
            title: '联系人1关系',
            dataIndex: 'linkManOneRelation',
            align: 'center',
            width: 150
        }, {
            title: '联系人2姓名',
            dataIndex: 'linkManTwoName',
            align: 'center',
            width: 150
        }, {
            title: '联系人2电话',
            dataIndex: 'linkManTwoPhone',
            align: 'center',
            width: 150
        }, {
            title: '联系人2关系',
            dataIndex: 'linkManTwoRelation',
            align: 'center',
            width: 150
        }, {
            title: '户籍',
            dataIndex: 'householdRegisterTypeName',
            align: 'center',
            width: 150
        }, {
            title: '户籍所在地',
            dataIndex: 'householdRegisterLocation',
            align: 'center',
            width: 150,
            render: (text, record) => {
                return (
                    <Tooltip title={record.householdRegisterLocation}>
                        <div className="result-columns-div">{record.householdRegisterLocation}</div>
                    </Tooltip>
                );
            }
        }, {
            title: '现居住地',
            dataIndex: 'address',
            width: 150,
            align: 'center',
            render: (text, record) => {
                return (
                    <Tooltip title={record.address}>
                        <div className="result-columns-div">{record.address}</div>
                    </Tooltip>
                );

            }
        }, {
            title: '转正日期',
            dataIndex: 'regularDate',
            align: 'center',
            width: 150,
            render: (text, record) => {
                return Utils.dateFormat(new Date(record.contractEndDate), 'yyyy-MM-dd');
            }
        }, {
            title: '合同签订开始日期',
            dataIndex: 'contractStartDate',
            align: 'center',
            width: 150,
            render: (text, record) => {
                return Utils.dateFormat(new Date(record.contractStartDate), 'yyyy-MM-dd');
            }
        }, {
            title: '合同签订结束日期',
            dataIndex: 'contractEndDate',
            align: 'center',
            width: 150,
            render: (text, record) => {
                return Utils.dateFormat(new Date(record.contractEndDate), 'yyyy-MM-dd');
            }
        }, {
            title: '银行卡号',
            dataIndex: 'bankCardNumber',
            align: 'center',
            width: 150,
            render: (text, record) => {
                return (
                    <Tooltip title={record.bankCardNumber}>
                        <div className="result-columns-div">{record.bankCardNumber}</div>
                    </Tooltip>
                );

            }
        }, {
            title: '开户银行',
            dataIndex: 'bankName',
            align: 'center',
            width: 150,
            render: (text, record) => {
                return (
                    <Tooltip title={record.bankName}>
                        <div className="result-columns-div">{record.bankName}</div>
                    </Tooltip>
                );

            }
        }];

        return columns;
    }

}

export default EmployeeManager;