import React from 'react';
import {createFromIconfontCN} from '@ant-design/icons';
import {Menu, Layout} from "antd";
import './Menu.css'
import {Size} from "../base/Size";
import HeightAdapter from '../base/HeightAdapter';
import {request} from "../base/CiiUtils";

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1692546_hhsio9uu7z.js',
});

class MyMenu extends HeightAdapter {

    constructor(props) {
        super(props);
        this.state.collapsed = false;
        this.state.openKeys = ['customer'];
        this.state.menus = [];
        this.state.rootSubmenuKeys = []
    }

    componentDidMount() {
        this.loadFirstLevelMenu();
        this.reload();
    }

    getSubtractHeight() {
        return Size.headerHeight + Size.footerHeight;
    }

    /**
     * 加载自己的菜单权限
     */
    reload = () => {
        request({
            conf: {
                url: 'menu/queryMyMenu',
                data: {}
            },
            success: (data) => {
                this.setState({
                    menus: data.result
                })
            }
        });
    };

    /**
     * 加载顶级菜单实现菜单树只可以打开一个，其他自动收缩
     */
    loadFirstLevelMenu = () => {
        request({
            conf: {
                url: 'menu/queryFirstLevelMenu'
            },
            success: (data) => {
                this.setState({
                    rootSubmenuKeys: data.result
                })
            }
        });
    }

    renderMenu = (data) => data.map((menu) => {

        if (menu.children && menu.children.length > 0) {
            return (
                <Menu.SubMenu key={menu.itemId} title={menu.itemIcon ?
                    <span><IconFont type={menu.itemIcon}/><span>{menu.menuName}</span></span> :
                    <span>{menu.menuName}</span>}>
                    {this.renderMenu(menu.children)}
                </Menu.SubMenu>
            );
        }

        return (
            <Menu.Item key={menu.itemId}>{menu.itemIcon ?
                <span><IconFont type={menu.itemIcon}/><span>{menu.menuName}</span></span> :
                <span>{menu.menuName}</span>}</Menu.Item>
        );
    });

    /**
     * 调用父组件点击菜单之后的处理函数
     * @param e
     */
    handleClick = (e) => {
        if (this.props.handleClick) {
            this.props.handleClick(e);
        }
    };

    /**
     * 展开菜单之后的的处理函数
     * @param openKeys
     */
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({openKeys});
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : []
            });
        }
    };

    /**
     * 触发菜单收起按钮
     */
    onToggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    render() {

        return (
            <Layout.Sider trigger={null}
                          collapsed={this.state.collapsed}
                          className="menu-sider"
                          style={{height: this.state.height, width: Size.menuWidth}}
                          collapsible>
                <div className="menu-top">
                    <IconFont
                        className="trigger"
                        type={this.state.collapsed ? 'icon-caidanzhankai' : 'icon-caidanshouqi'}
                        onClick={this.onToggle}/>
                </div>

                <Menu onClick={this.handleClick}
                      onOpenChange={this.onOpenChange}
                      openKeys={this.state.openKeys}
                      style={{height: this.state.height - Size.menuTopHeight}}
                    // inlineCollapsed={true}
                    // inlineIndent={20}
                      mode="inline">

                    {
                        this.renderMenu(this.state.menus)
                    }
                </Menu>
            </Layout.Sider>
        );
    };
}

export default MyMenu;