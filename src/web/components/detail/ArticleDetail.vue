<template>
  <div class="f-container-item" ref="container_detail">
    <!-- <article class="weui-article">
        <h1>大标题</h1>
        <section>
            <h2 class="title">章标题</h2>
            <section>
                <h3>1.1 节标题</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                </p>
                <p>
                  {{detailData}}
                </p>
                <p>
                    <img src="./images/pic_article.png" alt="">
                    <img src="./images/pic_article.png" alt="">
                </p>
            </section>
            <section>
                <h3>1.2 节标题</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </section>
        </section>
    </article> -->
    <div class="weui-panel">
        <!-- <div class="weui-panel__hd">文字列表附来源</div> -->
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_text">
            <article class="weui-article">
                <h1>{{detailData.title}}</h1>
                <section>
                  <p v-html="pageContent"></p>
                </section>
            </article>
            <ul class="weui-media-box__info">
                <li class="weui-media-box__info__meta" >作者：{{detailData.author}}</li>
                <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">标签：{{detailData.lblName}}</li>
                <li class="weui-media-box__info__meta weui-media-box__info__meta_extra" >写于：{{detailData.createTime==undefined?'':detailData.createTime.substr(0,10)}}</li>

            </ul>
          </div>

        </div>

    </div>

  </div>
</template>
<script>
import {mapState} from 'vuex';
import toolkit from '../../tool';
export default {
  name: 'detailModule',
  data () {
    return {
      msg:'',
      _timer:null,
      pageContent:''
    }

  },
  components:{

  },
  methods:{
    submitData() {
      if(toolkit.checkDevOrProdEnv()){
        var json = toolkit.parseJsonResult(window.clientSetting);
        this.$store.commit('doDetailData', json);
      }else{
        var postId=this.getParamByUrl();

        if(postId!=null){
          var reqParam={
            postId:postId
          }
          console.log(reqParam)
          this.$store.dispatch('reqDetailData', reqParam);
        }
      }
    },
    getParamByUrl(){
      var uri = window.location.href;
      var re = new RegExp("\\?key=(\\w+)(#\\/)$", "ig");
      var tmp=uri.match(re);
      var result=null;
      if(typeof tmp ==='object'&&tmp!==null){
        if(tmp.length >0){
          result=tmp[0].substring(5,tmp[0].length-2);
        }
      }
      return result;
    },
    setScroll(){
      var that=this;
      var container_box=this.$refs.container_detail.parentNode.parentNode.parentNode;
      var outer_box=container_box.parentNode;
      // console.log(outer_box)
    }
  },
  computed: mapState({
    detailData: function(state){
      var _detailData=state.detailData;
      var res={};
      if(_detailData==undefined){
        return {};
      }else if(_detailData.data==undefined){
        return {};
      }else{
        res=_detailData.data;
        this.pageContent=toolkit.baseDecrypt(res.content);
      }
      return res
    }

  }),

  cteated: function () {
    // console.log('cteated 钩子执行...');
  },
  mounted: function () {
    // console.log('mounted 钩子执行...');
    this.submitData();
  },
  updated: function () {
    // console.log('updated 钩子执行...');
  },
  destroyed: function () {
    // console.log('destroyed 钩子执行...');
  }

}
</script>
<style scoped>

</style>
