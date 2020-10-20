import React, {Component} from 'react';
import { ConfigProvider, Layout } from 'antd';
import './App.css';
import MyHeader from './layout/Header';
import SiderMenu from './layout/Menu';
import MyFooter from './layout/Footer';
import MyContent from './layout/Content';
import {dictionaryStorage, menuMap,currentContext} from './base/Common';

import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Home from "./home/Home";

moment.locale('zh-cn');

const {Header, Footer, Content} = Layout;


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    };
    componentDidMount() {
        //加载用户信息
        currentContext.reload();

        dictionaryStorage.init(() => {
            this.tabPanel.add(this.getHomePane());
        });
    }
    menuClick = (e) => {
        const tab = {
            title: e.item.props.children,
            key: e.key,
            closable: true,
            content: menuMap.get(e.key)
        };
        this.tabPanel.add(tab);
    }
    getHomePane = () => {
        return {
            title: '首页',
            key: 'home',
            closable: false,
            content: <Home/>
        }
    }

    /**
     * 获取子面板的引用
     * @param ref
     */
    tabOnRef = (ref) => {
        this.tabPanel = ref;
    };

    render() {
        return (
            <ConfigProvider locale={zh_CN}>
                <div className="App">
                    <Layout>
                        <Header>
                            <MyHeader/>
                        </Header>
                        <Layout>
                            <SiderMenu handleClick={this.menuClick}/>
                            <Content>
                                <MyContent parentRef={this.tabOnRef}/>
                            </Content>
                        </Layout>
                        <Footer>
                            <MyFooter/>
                        </Footer>
                    </Layout>
                </div>
            </ConfigProvider>
        );
    }
}

export default App;
