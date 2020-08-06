export const toIndex = '/';
export const toDetail = '/page/tag';
export const toArchive = '/page/archives';
export const toAbout = '/page/about';
export const toLogin = '/mng/login';
export const toAdminIndex = '/mng';

export const menuList = [{
    textKey: 'menu.label.home',
    routePath: '/',
    target: toIndex
},{
    textKey: 'menu.label.archive',
    routePath: '/detail/:id',
    target: toArchive
},{
    textKey: 'menu.label.about',
    routePath:'/about',
    target: toAbout
}]
