import React from 'react';

import {Tabs} from "antd";
import './Content.css';

class MyContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeKey: 'main',
            panes:[]
        };
    }

    componentDidMount() {
        const {parentRef} = this.props;
        if (parentRef){
            parentRef(this);
        }
    }

    onChange = (targetKey) => {
        this.setState({activeKey: targetKey});
    };

    add = (pane) => {
        const activeKey = pane.key;
        const panes = this.state.panes;
        let hasLoad = false;
        panes.forEach((p,i) => {
            if  (p.key === pane.key){
                hasLoad = true;
            }
        });

        if (!hasLoad){
            panes.push(pane);
            this.setState({panes,activeKey});
        }else{
            this.setState({activeKey})
        }
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });

        let panes = [...this.state.panes];
        panes = panes.filter(pn => pn.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        if (!panes.length){
            activeKey = 'main';
        }
        this.setState({
            panes:panes,
            activeKey:activeKey
        });
    }

    render() {
        return (
            <div>
                <Tabs defaultActiveKey="main"
                      type="editable-card"
                      size="small"
                      activeKey={this.state.activeKey}
                      onChange={this.onChange}
                      hideAdd={true}
                      onEdit={this.onEdit}>
                    {this.state.panes.map(
                        pane => <Tabs.TabPane
                            tab={pane.title}
                            key={pane.key}
                            closable={pane.closable}>{pane.content}</Tabs.TabPane>)}
                </Tabs>
            </div>
        );
    }
}

export default MyContent;