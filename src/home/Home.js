import React from "react";
import HeightAdapter from '../base/HeightAdapter';
import {Size} from "../base/Common"


class Home extends HeightAdapter {

    constructor(props) {
        super(props);
        this.state.statistic = {};
        this.state.statisticModalVisible = false;
        this.state.statisticQueryCondition = {}
    }

    getSubtractHeight() {
        return Size.totalHeight() - Size.toolbarHeight;
    }

    render() {
        return (
            <div style={{height: this.state.height, borderTop: "1px solid #F0F2F5", overflowX: "auto"}}>
            </div>
        );
    }
}

export default Home;