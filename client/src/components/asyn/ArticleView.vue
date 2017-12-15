<template>
  <div class="f-container-item" data-mark="list" ref="container_scroll">
    <div class="panel-box" v-for="(item,index) in previewDataList">
        <div class="weui-panel">
          <div class="weui-panel__hd">
            <a :href="getDetailPath(item)" class="weui-cell weui-cell_access weui-cell_link weui-media-box__title" :data-key="item.alias" >{{item.title}}</a>
            <div class="weui-media-box weui-media-box_text">
                <!-- <h4 class="weui-media-box__title">标题一</h4> -->
                <p class="weui-media-box__desc" v-html="item.summary"></p>

            </div>

          </div>
          <div class="weui-panel__hd">
            <ul class="weui-media-box__info">
                <li class="weui-media-box__info__meta" >作者：finneen</li>
                <li class="weui-media-box__info__meta weui-media-box__info__meta_extra">标签：{{item.lblName}}</li>
                <!-- <li class="weui-media-box__info__meta weui-media-box__info__meta_extra" >写于：{{item.createTime}}</li> -->
            </ul>
          </div>
        </div>
    </div>
    <div class="weui-toast extend-toast do-hide" ref="toast_block">
        <div>
          <i class="weui-loading weui-icon_toast"></i>
          <p class="weui-toast__content">数据加载中</p>
        </div>
        <div class="weui-toast__content" style="display:none;"></div>
    </div>
  </div>

</template>

<script>
import {mapState} from 'vuex';
import toolkit from '../../tool';
export default {
  name: 'previewModule',
  data () {
    return {
      msg:'',
      pageSize:5,
      currentPageNo:1,
      maxPageNo:-1,
      _switchflag:true,
      _timer:null
    }

  },
  components:{

  },
  methods:{
    getDetailPath(item){
      var pre_path=toolkit.getMenuJumpPath('toDetail');
      if(toolkit.checkDevOrProdEnv()){
        return pre_path+'/'+item.postId;
      }else{
        return pre_path+'?key='+item.postId;
      }
    },
    submitPreviewData(cur_page_num) {
      // var ele_target=this.$refs.post_form;
      var _pageNum=cur_page_num==undefined?1:cur_page_num;
      this.currentPageNo=_pageNum;
      var reqParam={
        pageNum:_pageNum,
        pageSize:this.pageSize
      }
      if(this.currentPageNo==1){
        this._switchflag=true;
        if(toolkit.checkDevOrProdEnv()){
          var json = toolkit.parseJsonResult(window.clientSetting);
          this.$store.commit('loadAndUpdatePreviewData', json);
        }else{
          this.$store.dispatch('getPreviewDataList', reqParam);
        }
      }else{
        this.$store.dispatch('getPreviewDataList', reqParam);
      }

    },
    previousPage(){
      var curPageNo=this.currentPageNo;
      if(curPageNo>1){
        curPageNo--;
        this.submitPreviewData(curPageNo);
      }
    },
    nextPage(){
      var that=this;
      var curPageNo=that.currentPageNo;
      if(curPageNo<that.maxPageNo){
        curPageNo++;
        that.setShowLoadingBlock();
        that.submitPreviewData(curPageNo);
      }else{

        if(this._timer==null){
          that.setShowLoadingBlock(true);
          that._timer=window.setTimeout(function(){
            that._timer=null;
            that.setHideLoadingBlock(1000);
          },200);
        }
      }
    },
    getMaxPageNo(totalCount){
      var _maxPageNo=totalCount%this.pageSize==0?totalCount/this.pageSize:Math.ceil(totalCount/this.pageSize);
      return _maxPageNo;
    },
    setShowLoadingBlock(isShowLoadingEnd){
      var ele=this.$refs.toast_block;
      if(isShowLoadingEnd){
        ele.children[1].style.display='block';
        ele.children[0].style.display='none';
        ele.children[1].innerText="已经到底啦！";
      }else{
        ele.children[0].style.display='block';
        ele.children[1].style.display='none';
        ele.children[1].innerText="";
      }
      if(ele!=undefined){
        this._switchflag=false;
        var _cls=ele.className;
        _cls=_cls.replace(" do-hide","")+" do-show";
        ele.className=_cls;
      }

    },
    setHideLoadingBlock(tmp_timecount){
      var that=this;
      var ele=that.$refs.toast_block;
      var timecount=200;
      if(tmp_timecount!=undefined){
        timecount=tmp_timecount;
      }
      if(ele!=undefined){
        var _cls=ele.className;
        if(_cls.indexOf('do-hide')>-1){
          return;
        }
        _cls=_cls.replace(" do-show","");
        _cls=_cls.replace(" do-hide","");
        ele.className=_cls;
        this._timer=window.setTimeout(function(){
          _cls+=" do-hide";
          ele.className=_cls;
          that._timer=null;
          if(tmp_timecount==undefined){
            that._switchflag=true;
          }else{
            that._timer=window.setTimeout(function(){
              that._switchflag=true;
              that._timer=null;
            },timecount);
          }
        },timecount);
      }
    },
    doViewScroll(outer_box){
      var that=this;
      var container_box=that.$refs.container_scroll.parentNode.parentNode.parentNode;
      if(container_box.parentNode==outer_box){
        if((outer_box.scrollTop+outer_box.offsetHeight)>=container_box.offsetHeight){
          if(that._switchflag){
            that.nextPage();
          }
        }
      }
    },
    chgLineBreakText(content){
      if(typeof content!='string'){
        return content;
      }
      return toolkit.replaceLineBreak(content);
    },
  },
  computed: mapState({
    previewDataList: function(state){
      var _previewDataList=state.postData.previewList;
      this.maxPageNo=this.getMaxPageNo(_previewDataList.count);
      this.setHideLoadingBlock();
      // console.log(_previewDataList)
      return _previewDataList.data
    }

  }),
  beforeCreate: function () {
    // console.log('beforeCreate 钩子执行...');
  },
  cteated: function () {
    // console.log('cteated 钩子执行...');
  },
  beforeMount: function () {
    // console.log('beforeMount 钩子执行...');
  },
  mounted: function () {
    // console.log('mounted 钩子执行...');
    this.submitPreviewData();

  },
  beforeUpdate: function () {
    // console.log('beforeUpdate 钩子执行...');
  },
  updated: function () {
    // console.log('updated 钩子执行...');
  },
  beforeDestroy: function () {
    // console.log('beforeDestroy 钩子执行...');
  },
  destroyed: function () {
    // console.log('destroyed 钩子执行...');
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
