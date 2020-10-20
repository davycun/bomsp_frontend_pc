import React from 'react';
import {Redirect} from 'react-router-dom';
import {EditOutlined,LogoutOutlined} from "@ant-design/icons"
import { Row, Col, Menu, Dropdown, Avatar } from "antd";
import './Header.css'

import ChangePassword from '../ums/ChangePassword';
import {request} from "../base/CiiUtils";
import {Constants} from "../base/Constants";


class MyHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            changePasswordVisible: false,
            hasLogin: true,
            currentUser: {},
            company: {}
        }
    }

    componentDidMount() {
        this.reloadCurrentUser();
    }

    onChangePasswordClick = () => {
        this.setState({changePasswordVisible: true})
    }
    onChangePasswordCancel = () => {
        this.setState({changePasswordVisible: false})
    }
    onChangePasswordSubmitOk = () => {
        this.setState({changePasswordVisible: false})
    }


    /**
     * 加载当前用户信息
     */
    reloadCurrentUser = () => {
        request({
            conf: {
                url: 'userEmployee/current',
            },
            success: (data) => {
                this.setState({
                    currentUser: data.result
                })
            }
        });

        request({
            conf: {
                url: 'cpy/myCompany',
                data: {}
            },
            success: (response) => {
                this.setState({company: response.result})
            }
        })
    }
    /**
     * 获取设置的按钮的功能菜单
     * @returns {*}
     */
    getTool = () => {
        return (
            <Menu style={{width: 150, textAlign: 'left'}}>
                <Menu.Item>
                    <a onClick={this.onChangePasswordClick}><EditOutlined style={{marginRight: 10}}/>修改密码</a>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item>
                    <a onClick={this.onQuitClick}><LogoutOutlined style={{marginRight: 10}}/>退出</a>
                </Menu.Item>
            </Menu>
        );
    }

    /**
     * 用户退出响应函数
     */
    onQuitClick = () => {
        request({
            conf: {
                url: 'userEmployee/logout',
                data: {}
            },
            success: (response) => {
                this.setState({hasLogin: false})
            }
        });
    }

    getSlogan = () => {
        if (this.state.company && this.state.company.logo) {
            return (
                <img src={Constants.fileReadUrl + this.state.company.logo} style={{height: 28}}></img>
            );
        } else if (this.state.company && this.state.company.slogan) {
            return (
                <span style={{color:"#FFFFFF"}}>{this.state.company.slogan}</span>
            );
        } else if(this.state.company && this.state.company.cpyName){
            return (
                <span style={{color:"#FFFFFF"}}>{this.state.company.cpyName}</span>
            );
        }
        return <span style={{color:"#FFFFFF"}}>后台管理系统</span>
    }

    render() {

        if (this.state.hasLogin) {
            return (
                <Row>
                    <Col span={16}>
                        {
                            this.getSlogan()
                        }
                    </Col>
                    <Col span={8} style={{textAlign: "right"}}>
                        <Dropdown overlay={this.getTool}>
                            <a><Avatar size={20}
                                       style={{marginRight: 5}}
                                       src={Constants.fileReadUrl + this.state.currentUser.avatar}></Avatar> {this.state.currentUser.userName}
                            </a>
                        </Dropdown>
                        <ChangePassword title={"修改密码"}
                                        editor={true}
                                        size={0.4}
                                        visible={this.state.changePasswordVisible}
                                        onCancel={this.onChangePasswordCancel}
                                        onSubmitOk={this.onChangePasswordSubmitOk}/>
                    </Col>
                </Row>
            );
        } else {
            return <Redirect to="/login"/>
        }
    }
}

export default MyHeader;