import React, {Fragment} from 'react';
import BaseManager from "./BaseManager";
import SplitPane from "react-split-pane";
import Pane from 'react-split-pane/lib/Pane';

import {Size} from "./Size";

class BaseSplitManager extends BaseManager {

    constructor(props) {
        super(props);

        this.state.leftPaneSize = "200px";
        this.state.topPaneSize = "150px";

        this.getLeftPane = this.getLeftPane.bind(this);
        this.getRightPane = this.getRightPane.bind(this);
        this.getRightPaneSplit = this.getRightPaneSplit.bind(this);
        this.getRightPaneTop = this.getRightPaneTop.bind(this);
        this.getRightPaneBottom = this.getRightPaneBottom.bind(this);

        this.getLeftPaneSize = this.getLeftPaneSize.bind(this);
        this.getLeftPaneMinSize = this.getLeftPaneMinSize.bind(this);
        this.getLeftPaneMaxSize = this.getLeftPaneMaxSize.bind(this);
        this.getTopPaneMinSize = this.getTopPaneMinSize.bind(this);
        this.getTopPaneMaxSize = this.getTopPaneMaxSize.bind(this);

    }

    getLeftPaneSize(){
        const {leftPaneSize} = this.state;
        if (leftPaneSize && leftPaneSize.indexOf("px") != -1){
            return leftPaneSize.substring(0,leftPaneSize.indexOf("px"))
        }

        return 400;
    }

    getLeftPaneMinSize() {
        return "100px"
    }

    getLeftPaneMaxSize() {
        return "400px"
    }

    getTopPaneMinSize() {
        return "100px"
    }

    getTopPaneMaxSize() {
        return "400px"
    }

    getLeftPane() {
    }

    getRightPane() {

        if (this.getRightPaneSplit()) {
            return (
                <SplitPane split="horizontal" onChange={(size) => {
                               this.setState({topPaneSize: size[0]})
                           }}>
                    <Pane minSize={this.getTopPaneMinSize()}
                          className="content-top-pane"
                          maxSize={this.getTopPaneMaxSize()}
                          size={this.state.topPaneSize}>
                        {
                            this.getRightPaneTop()
                        }
                    </Pane>
                    <Pane>
                        {
                            this.getRightPaneBottom()
                        }
                    </Pane>
                </SplitPane>
            );
        } else {
            return (
                this.getRightPaneBottom()
            );
        }
    }

    getRightPaneSplit() {
        return true;
    }

    getRightPaneTop() {
    }

    getRightPaneBottom() {
        return (
            <Fragment>
                {
                    this.getTable()
                }
            </Fragment>
        );
    }

    getTableScrollY() {
        const {tableScrollY} = this.props;
        if (tableScrollY) {
            return tableScrollY;
        } else {
            if (this.getRightPaneSplit()) {
                return this.state.height - Size.pageHeight - Size.tableHeaderHeight - this.state.splitHSize;
            } else {
                return this.state.height - Size.pageHeight - Size.tableHeaderHeight;
            }
        }
    }

    getTableScrollX() {
        const {tableScrollX} = this.props;
        if (tableScrollX) {
            return tableScrollX;
        } else {
            return Size.screenWidth() - Size.menuWidth
        }
    }

    render() {
        return (
            <div>
                {
                    this.getToolbar()
                }
                <div style={{height: this.state.height}}>
                    <SplitPane split="vertical" onChange={(size) => {
                        this.setState({leftPaneSize: size[0]});
                    }}>
                        <Pane size={this.state.leftPaneSize}
                              className="content-left-pane"
                              maxSize={this.getLeftPaneMaxSize()}
                              minSize={this.getLeftPaneMinSize()}>
                            {
                                this.getLeftPane()
                            }
                        </Pane>

                        <Pane className="content-right-pane">
                            {
                                this.getRightPane()
                            }
                        </Pane>
                    </SplitPane>
                </div>
                {
                    this.getOtherModal()
                }
            </div>
        );
    }


}

export default BaseSplitManager;