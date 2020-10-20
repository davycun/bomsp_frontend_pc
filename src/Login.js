import React from 'react';
import {Redirect} from 'react-router-dom';
import LoginForm from './LoginForm';
import HeightAdapter from "./base/HeightAdapter";
import "./Login.css";
import {Utils} from "./base/CiiUtils";


class Login extends HeightAdapter {
    constructor(props) {
        super(props);
        this.state.hasLogin = false;
    }

    loginSuccess = () => {
        this.setState({
            hasLogin: true
        })
    }

    render() {

        if (this.state.hasLogin) {
            return (<Redirect to="/"/>);
        } else {
            return (
                <div className="login">
                    <div className="login-header">
                        <img src="./logo512.png" style={{height: 50,marginLeft:80}}></img>
                    </div>
                    <div className="login-content" style={{height: this.state.height - 128}}>
                        <LoginForm loginSuccess={this.loginSuccess}/>
                    </div>
                    <div className="login-footer">
                        © 2015 ~ {Utils.dateFormat(new Date(),"yyyy")}  yihaoyuanqu.com 热线电话：13917182631 沪ICP备19036662号-2
                    </div>
                </div>
            );
        }
    }
}

export default Login;