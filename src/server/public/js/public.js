var browser={
    versions:function(){
           var u = navigator.userAgent, app = navigator.appVersion;
           return {//移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !u.match(/Windows NT/)&&(!!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/)), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
         }(),
         language:(navigator.browserLanguage || navigator.language).toLowerCase()
}

	// document.writeln("语言版本: "+browser.language);
	// document.writeln(" 是否为移动终端: "+browser.versions.mobile);
	// document.writeln(" ios终端: "+browser.versions.ios);
	// document.writeln(" android终端: "+browser.versions.android);
	// document.writeln(" 是否为iPhone: "+browser.versions.iPhone);
	// document.writeln(" 是否iPad: "+browser.versions.iPad);
	// document.writeln(navigator.userAgent);
window.onload=function(){
	var ele_obj=document.getElementsByClassName('container-fluid');
	if(browser.versions.mobile){
		ele_obj[1].style.display='block';
		document.body.removeChild(ele_obj[0]);
		document.head.innerHTML+='<meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, width=device-width">';
	}else{
		ele_obj[0].style.display='block';
		document.body.removeChild(ele_obj[1]);
	}
}
