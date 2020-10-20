import React from 'react';
import {request} from "./CiiUtils";

/**
 * 用户信息
 */
function CurrentContext() {
    this.currentUser = {};
    this.userMenuFunctions = [];
}

CurrentContext.prototype.getUserId = function () {
    return this.currentUser.id;
}
CurrentContext.prototype.getUserName = function () {
    return this.currentUser.userName;
}
CurrentContext.prototype.getOwnerDeptId = function () {
    return this.currentUser.ownerDeptId;
}
CurrentContext.prototype.getOwnerDeptName = function () {
    return this.currentUser.ownerDeptName;
}
CurrentContext.prototype.setCurrentUser = function (user) {
    this.currentUser = user;
}
CurrentContext.prototype.getMenuFunctions = function () {
    return this.userMenuFunctions;
}
CurrentContext.prototype.hasOperationAuth = function (itemId) {
    if (this.userMenuFunctions && this.userMenuFunctions.length > 0 && itemId) {
        for (let i=0; i<this.userMenuFunctions.length; i++){
            let menu = this.userMenuFunctions[i];
            if (menu.itemId && menu.itemId == itemId){
                return true;
            }
        }
    }
    return false;
}

CurrentContext.prototype.reload = function () {
    request({
        conf: {
            url: 'userEmployee/current'
        },
        success: (data) => {
            this.currentUser = data.result;
        }
    });

    request({
        conf: {
            url: 'menu/queryMyFunction'
        },
        success: (response) => {
            this.userMenuFunctions = response.result;
        }
    });
}
const currentContext = new CurrentContext();

export {currentContext}

