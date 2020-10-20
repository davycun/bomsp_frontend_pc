export const Size = {
    headerHeight: 48,
    // tabTitleHeight: 34,
    tabTitleHeight: 35,
    toolbarHeight: 35,
    footerHeight: 40,
    //headerHeight、tabTitleHeight、toolbarHeight、footerHeight之和
    totalHeight: () => {
        return Size.headerHeight + Size.tabTitleHeight + Size.toolbarHeight + Size.footerHeight;
    },
    pageHeight: 35,
    tableHeaderHeight: 35,
    menuWidth: 200,
    menuTopHeight: 40,
    screenHeight: () => {
        return document.documentElement.clientHeight
    },
    screenWidth: () => {
        return document.documentElement.clientWidth
    },
};