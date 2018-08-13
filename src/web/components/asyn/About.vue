<template>
  <div class="f-container-item container-item-about" >
      <div class="weui-panel">
            <div class="weui-panel__hd">关于me</div>
            <div class="weui-panel__bd">
                <div class="weui-media-box weui-media-box_text">
                  <p>
                    <img src="../../assets/about.jpg" style="width:40%;margin:20px 0 20px 30%" />
                  </p>
                    <h4 class="weui-media-box__title">半路出道，做码农不过4年而已</h4>
                    <h4 class="weui-media-box__title">没入行之前老羡慕那些会电脑的人士了，对，我尊称为“人士”，因为那时简直就把所谓“人士”当作黑客大侠了；后来知道许多黑客老低调了</h4>
                    <h4 class="weui-media-box__title">做过抓包、爬虫；给老板弄过网上盗数据的勾当</h4>
                    <h4 class="weui-media-box__title"爱睡懒觉，十足的宅虫；不爱运动，还好饭量不怎么大胖不起来</h4>
                    <h4 class="weui-media-box__title">喜欢一首歌会重复一天，不厌其烦的听</h4>
                    <h4 class="weui-media-box__title">玩过LOL，跟风过守望先锋，不会魔兽，正在玩手游拳皇98OL</h4>
                    <h4 class="weui-media-box__title">正在做一名堂堂正正的前端工程师，尽管其中很多坑，但却乐此不疲</h4>
                </div>
            </div>
            <div class="weui-panel__hd">关于博客网站</div>
            <div class="weui-panel__bd">
                <div class="weui-media-box weui-media-box_text">
                    <h4 class="weui-media-box__title">做这个博客之前特意网上找了一遍，几乎全是PHP的，或是框架模板或是相关php插件</h4>
                    <h4 class="weui-media-box__title">借鉴过（<a href="http://webjyh.com" target="_blank" rel="nofollow">M.J</a>）、（<a href="http://typecho.org/" target="_blank" rel="nofollow">Typecho</a>）</h4>
                    <h4 class="weui-media-box__title">前段时间刚看完朴灵的《深入浅出NODE》，特意拿来练习一下，然后就想着做个成品了</h4>
                    <h4 class="weui-media-box__title">本网站前端使用的是：vue+weUI；后端：nodejs+express+mongodb</h4>
                    <h4 class="weui-media-box__title">感兴趣的同学可以到我个人的github：<a href="https://github.com/mackcheung/blog.git" target="_blank">站点</a>下载源码</h4>
                    <h4 class="weui-media-box__title">水平有限，如遇到或发现什么问题，或有什么意见都请联系我的邮箱</h4>
                    <h4 class="weui-media-box__title">欢迎交流</h4>
                    <p class="weui-media-box__desc">
                      <a href="https://weibo.com/u/1219569497/home?wvr=5" target="_blank" class="weui-btn weui-btn_mini weui-btn_primary">新浪微博</a>
                      <a href="https://github.com/mackcheung" target="_blank" class="weui-btn weui-btn_mini weui-btn_primary">Github</a>
                      <a href="https://www.facebook.com/mack.cheung.12" target="_blank" class="weui-btn weui-btn_mini weui-btn_primary">FaceBook</a>
                      <a href="https://twitter.com/mackcheung" target="_blank" class="weui-btn weui-btn_mini weui-btn_primary">Twitter</a>
                    </p>
                    <ul class="weui-media-box__info">
                        <li class="weui-media-box__info__meta">联系邮箱：zhuimengyiyuan@msn.cn</li>
                        <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">QQ：502598298</li>
                        <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">更新日期：2016-11-06</li>
                    </ul>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: 'aboutModule',
  data () {
    return {
      msg:'',
    }

  },
  components:{

  },
  methods:{
    submitData() {
        this.$store.dispatch('reqAboutData', {});
    }

  },
  computed: mapState({
    aboutData: function(state){
      return state.aboutData
    }

  }),
  mounted: function () {
    this.submitData();
  },


}
</script>
