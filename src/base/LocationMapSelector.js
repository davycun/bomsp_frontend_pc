import React from 'react';
import {Input, Modal} from "antd";
import {Size} from "./Size";

class LocationMapSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentData: {},
            point: {}
        }
        this.getModalSize = this.getModalSize.bind(this);
        this.onSubmitOk = this.onSubmitOk.bind(this);
        this.onCurrentDataChange = this.onCurrentDataChange.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.currentData
            && prevProps.currentData
            && prevProps.currentData != this.props.currentData) {
            this.setState({currentData: this.props.currentData});
            this.onCurrentDataChange(this.props.currentData);
        }
    }

    onCurrentDataChange(currentData) {

        const {BMap} = window;

        if (currentData && currentData.point) {
            this.setState({point: currentData.point});

            this.showMap(currentData.point);

        } else if (currentData && currentData.cityName && currentData.address) {

            let myGeo = new BMap.Geocoder();

            myGeo.getPoint(this.getAddress(currentData), (point) => {
                if (point) {
                    this.setState({point: point});
                    this.showMap();
                }
            }, currentData.cityName);
        }
    }

    getAddress = (currentData) => {

        if (!currentData) {
            currentData = this.state.currentData;
        }
        return (currentData.cityName || "") + (currentData.regionName || "")
            + (currentData.streetName || "") + (currentData.address || "");
    }

    showMap = (point) => {
        const {BMap} = window;
        setTimeout(() => {
            //新增地图
            let map = new BMap.Map("mapContainer"); // 创建Map实例
            map.centerAndZoom(point ? point : this.state.point, 15);
            map.setCurrentCity(this.state.currentData.cityName);
            map.enableScrollWheelZoom(true);
            map.addControl(new BMap.MapTypeControl()); //添加地图类型控件

            //添加覆盖物
            let myIcon = new BMap.Icon("zuobiao.png", new BMap.Size(40, 40), {
                imageSize: new BMap.Size(40, 40)
            });
            let marker = new BMap.Marker(point ? point : this.state.point, {icon: myIcon});
            map.addOverlay(marker);

            //允许覆盖物拖动
            marker.enableDragging();
            marker.addEventListener("dragend", (e) => {
                this.setState({point: {lng: e.point.lng, lat: e.point.lat}})

            })
        }, 1000);
    }

    onSubmitOk(e) {
        if (e) {
            e.preventDefault();
        }
        const {onSubmitOk} = this.props;

        if (onSubmitOk) {
            onSubmitOk(this.state.point);
        }
    }

    getModalSize() {
        const {size} = this.props;
        if (size && size < 1) {
            return size;
        }
        return 0.9;
    }

    render() {
        const {title, visible, onCancel} = this.props;

        return (
            <Modal title={title}
                   style={{top: Size.screenHeight() * (1 - this.getModalSize()) / 2}}
                   bodyStyle={{height: Size.screenHeight() * this.getModalSize() - 110, overflow: 'auto'}}
                   width={Size.screenWidth() * this.getModalSize()}
                   visible={visible}
                   onOk={this.onSubmitOk}
                   onCancel={onCancel}
                   okText={'确认'}>
                <div style={{height: '100%', width: '100%', overflow: 'hidden'}} id="mapContainer">
                </div>
                <Input style={{width: 300, position: "absolute", top: 100, left: 40}} disabled={true}
                       value={this.getAddress()}
                       placeholder={"输入位置"}/>
            </Modal>
        );
    }


}

export default LocationMapSelector;