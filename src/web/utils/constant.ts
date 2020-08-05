import { $t } from './locale';

export const toIndex = '/';
export const toDetail = '/page/tag';
export const toArchive = '/page/archives';
export const toAbout = '/page/about';
export const toLogin = '/mng/login';
export const toAdminIndex = '/mng';

export const menuList = [{
    text: $t('menu.label.home'),
    routePath: '/',
    target: toIndex
},{
    text: $t('menu.label.archive'),
    routePath: '/detail/:id',
    target: toArchive
},{
    text: $t('menu.label.about'),
    routePath:'/about',
    target: toAbout
}]
