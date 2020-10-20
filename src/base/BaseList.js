import React from 'react';
import BaseTable from "./BaseTable";
import {Size} from "./Size";

/**
 * 详情窗口右边列表的父类，用法示例
 * <BaseList ...props></BaseList>
 * 参数支持如下
 * 1、size，是一个0～1之间的数字，是屏幕比例，在详情面板中传入详情getModalSize方法
 * 2、queryCondition属性作为查询条件，其中queryCondition变化之后会进行重新加载
 * queryCondition:{
 *     keyword:"",
 *     entity:{
 *     }
 * }
 */
class BaseList extends BaseTable {

    constructor(props) {
        super(props);
        this.getOtherModal = this.getOtherModal.bind(this);
    }

    getTablePageClassName() {
        return "modal-page";
    }

    getTableScrollX() {
        const {tableScrollX} = this.props;
        if (tableScrollX) {
            return tableScrollX;
        } else {
            return 2000;
        }
    }

    getTableScrollY() {

        const {tableScrollY} = this.props;
        if (tableScrollY) {
            return tableScrollY;
        } else {
            const {size} = this.props;
            let sub = Size.tabTitleHeight + Size.tableHeaderHeight + (this.getPagination() ? Size.pageHeight : 0);
            //添加footerHeight、modalHeaderHeight
            sub = sub + 125;

            if (size && size < 1) {
                return Size.screenHeight() * size - sub;
            }
            return Size.screenHeight() * 0.9 - sub
        }

    }

    getOtherModal() {
        return <div></div>
    }

    render() {
        return (
            <div>
                {
                    this.getTable()
                }
                {
                    this.getDetailModal()
                }
                {
                    this.getEditModal()
                }
                {
                    this.getOtherModal()
                }
            </div>
        );
    }

}

export default BaseList;