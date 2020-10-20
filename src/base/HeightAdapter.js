import React from 'react';
import {Size} from "./Size";


class HeightAdapter extends React.Component {

    constructor(props) {
        super(props);
        window.addEventListener('resize', this.updateHeight);
        this.getSubtractHeight = this.getSubtractHeight.bind(this);
        this.getSubtractWidth = this.getSubtractWidth.bind(this);

        this.state = {
            height: Size.screenHeight() - this.getSubtractHeight(),
            width: Size.screenWidth() - this.getSubtractWidth()
        }

    }

    getSubtractHeight(){return 0}
    getSubtractWidth(){return 0}

    updateHeight = () => {
        const height = Size.screenHeight() - this.getSubtractHeight();
        const width = Size.screenWidth() - this.getSubtractWidth();
        this.setState({height,width});
    }
}

export default HeightAdapter;