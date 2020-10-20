import React from 'react';
import BaseEditor from "./BaseEditor";
import {Modal} from "antd";
import {Size} from "./Size";

/**
 * 1、onCancel 函数 指定弹出对话框取消的处理函数
 * 2、onSubmitOk（父类） 当修改或者新增成功之后的回调
 * 3、editor（父类）   表示当前是更新还是新增窗口
 * 4、visible 布尔值 设置弹出框是否可见
 * 5、size 弹出窗口的大小
 * 6、currentData（父类）  表示更新面板展示的数据
 */
class BaseModalEditor extends BaseEditor {

    constructor(props) {
        super(props);

        this.getModalSize = this.getModalSize.bind(this);
        this.getOkText = this.getOkText.bind(this);
    }

    getModalSize() {
        const {size} = this.props;
        if (size && size < 1) {
            return size;
        }
        return 0.9;
    }

    getOkText() {
        const {editor} = this.props;
        return editor ? '更新' : '新增';
    }

    render() {
        const {title, visible, onCancel} = this.props;
        return (
            <div>
                <Modal title={title}
                       style={{top: Size.screenHeight() * (1 - this.getModalSize()) / 2}}
                       bodyStyle={{height: Size.screenHeight() * this.getModalSize() - 110, overflow: 'auto'}}
                       width={Size.screenWidth() * this.getModalSize()}
                       visible={visible}
                       onOk={this.handleSubmit}
                       onCancel={onCancel}
                       okText={this.getOkText()}
                       confirmLoading={this.state.confirmLoading}>
                    {
                        this.getImageViewModal()
                    }
                    {
                        this.getFormUI(this.form.current)
                    }
                    {
                        this.getOtherModal()
                    }
                </Modal>
            </div>
        );
    }
}

export default BaseModalEditor;