export default {
    dev: {
        toDetail: '/detail.html',
        toIndex: '/index.html',
        toArchive: '/archives.html',
        toAbout: '/about.html',
        toLogin: '/login.html',
        toAdminIndex: '/manage.html'
    },
    prod: {
        toDetail: '/page/tag',
        toIndex: '/',
        toArchive: '/page/archives',
        toAbout: '/page/about',
        toLogin: '/mng/login',
        toAdminIndex: '/mng'
    },
    menuList: [{
        text: '首页',
        routePath: '/',
        target: 'toIndex'
    }, {
        text: '归档',
        routePath: '/detail/:id',
        target: 'toArchive'
    }, {
        text: '关于',
        routePath: '/about',
        target: 'toAbout'
    }]

};
