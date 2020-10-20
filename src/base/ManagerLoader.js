import React from 'react';


import MenuManager from '../basic/auth/MenuManager';
import RoleManager from '../basic/auth/RoleManager';
import RoleUserManager from '../basic/auth/RoleUserManager';
import DataRoleManager from '../basic/auth/DataRoleManager';
import DataRoleUserManager from '../basic/auth/DataRoleUserManager';
import DeptManager from '../hrm/dept/DeptManager';
import DeptConfigManager from '../hrm/dept/config/DeptConfigManager';
import EmployeeManager from '../hrm/emp/EmployeeManager';
import PostManager from '../hrm/PostManager';
import CompanyManager from '../basic/cpy/CompanyManager';
import NewsManager from '../basic/news/NewsManager';
import DictionaryManager from '../basic/dictionary/DictionaryManager';
import AreaManager from '../basic/area/AreaManager';
import AreaCpyManager from '../basic/area/AreaCpyManager';
import DeptAreaManager from "../hrm/dept/DeptAreaManager";
import OperationLogManager from "../basic/log/OperationLogManager";
import EditLogManager from "../basic/log/EditLogManager";

/** 菜单点击对应的类加载*/
const menuMap = new Map();

menuMap.set('MenuManager', <MenuManager/>);
menuMap.set('RoleManager', <RoleManager/>);
menuMap.set('RoleUserManager', <RoleUserManager/>);
menuMap.set('DataRoleManager', <DataRoleManager/>);
menuMap.set('DataRoleUserManager', <DataRoleUserManager/>);
menuMap.set('DeptManager', <DeptManager/>);
menuMap.set('EmployeeManager', <EmployeeManager/>);
menuMap.set('PostManager', <PostManager/>);
menuMap.set('CompanyManager', <CompanyManager/>);
menuMap.set('NewsManager', <NewsManager/>);
menuMap.set('DeptAreaManager', <DeptAreaManager/>);
menuMap.set('DeptConfigManager',<DeptConfigManager/>);
menuMap.set('OperationLogManager', <OperationLogManager/>);
menuMap.set('EditLogManager',<EditLogManager/>);
menuMap.set('AreaManager', <AreaManager/>);
menuMap.set('AreaCpyManager', <AreaCpyManager/>);
menuMap.set('DictionaryManager', <DictionaryManager/>);


export {menuMap}