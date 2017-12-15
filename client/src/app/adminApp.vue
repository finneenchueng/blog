<template>
  <div class="page">
      <div class="page__bd">
          <div class="weui-tab">
              <HeadMenu></HeadMenu>
              <div class="weui-tab__panel">
                <div class="mng-content-block" ref="list_content">
                  <router-view></router-view>
                </div>
              </div>
              <FooterBlock></FooterBlock>
          </div>
      </div>
      <modal :show.sync="modalOpt.show"  :extendClass="modalOpt.cancelClass" @ok="modalConfirm" title="" >
        <div slot="modal-body">{{modalOpt.msg}}</div>
      </modal>
  </div>
</template>

<script>
import HeadMenu from '../components/admin/header'
import FooterBlock from '../components/admin/footer'
import modal from '../components/common/Modal';
import toolkit from '../tool';
export default {
  name: 'app',
  components:{
    HeadMenu,
    FooterBlock,
    modal
  },
  data () {// 数据对象
		return {
      modalOpt:{
        show:false,
        msg:'',
        cancelClass:'hide',

      },
		}
  },
  methods:{
    setListHei(){
      var win_hei=document.documentElement.clientHeight;
      var target_ele=this.$refs.list_content;
      // console.log(target_ele)
      var _hei=target_ele.offsetHeight;
      // console.log(target_ele.parentNode)
      // var _footer_ele=target_ele.parentNode.nextSibling;
      var _footer_ele = target_ele.parentNode.nextElementSibling || target_ele.parentNode.nextSibling;
      // console.log(_footer_ele)
      var footer_hei=_footer_ele.offsetHeight;
      var new_hei=win_hei-50-50-footer_hei;
      var _ele=target_ele.children[0];
      if(_ele!=undefined){
        _ele.style.height=new_hei+"px";
      }

    },
    doPopBox(message){
      this.modalOpt={
        show:true,
        title:'提示：',
        msg:message,
        cancelClass:'hide'

      }
    },
    modalConfirm(){
      if(!this.sessionOpt.success){
        var pre_path=toolkit.getMenuJumpPath('toLogin');
        window.location.href=pre_path;
      }

    },
  },
  computed:{
    sessionOpt:function(){
      // console.log(this.$store.state.mngData.sessionOpt)
      return this.$store.state.mngData.sessionOpt
    }
  },
  watch: {
      sessionOpt: {
          deep: true,
          handler (val,oldval) {
            if(val!=undefined){
              if(val.success!=undefined){
                this.doPopBox(val.msg);
              }
            }

          }
      }
  },
  mounted: function(){ // 创建完成后需要执行的代码块
		var that=this;
    that.setListHei();
  },
  updated: function () {
    var that=this;
    that.setListHei();
  },
  // watch: {
  //     // 监听每当sessionList改变时，保存到localStorage中
  //     sessionList: {
  //         deep: true,
  //         handler () {
  //             store.save({
  //                 ...
  //             });
  //         }
  //     }
  // }
}
</script>
