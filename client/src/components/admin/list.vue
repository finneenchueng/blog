<template>
  <div class="weui-panel weui-panel_access">
    <div class="weui-panel__hd">
      <h4>博文列表</h4>
      <div style="text-align:right;">
        <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_default" @click="delPost">删除</a>
      </div>
    </div>
    <modal :show.sync="modalOpt.show" @ok="modalConfirm" :title="modalOpt.msg" >
        {{modalOpt.msg}}
    </modal>
    <modal :show.sync="modalOpt.show"  :closeWhenOK.sync="!modalOpt.show" :extendClass="modalOpt.cancelClass"  @ok="modalConfirm" :title="modalOpt.title" >
      <div slot="modal-body">{{modalOpt.msg}}</div>
    </modal>
    <div class="weui-panel__bd">
      <div class="weui-media-box weui-media-box_text">
        <table class="content-tbl">
          <thead>
            <tr>
              <th></th>
              <th><div class="weui-cell">标题</div></th>
              <!-- <th ><div class="weui-cell">博文内容</div></th> -->
              <th><div class="weui-cell">类别</div></th>
              <th><div class="weui-cell">概要</div></th>
              <th><div class="weui-cell">标签</div></th>
              <th><div class="weui-cell">别名</div></th>
              <th width=""><div class="weui-cell">创建时间</div></th>
            </tr>
          </thead>
          <tbody ref="list_body">
            <tr v-for="(item,index) in postDataList" :data-index="index" :data-key="item.postId" :data-flag="item.editChked==undefined?0:item.editChked">
              <th><input class="weui-switch rm-checkbox" type="checkbox" /></th>
              <th><a href="javascript:;" class="weui-cell weui-cell_link"  @click="toDetail">{{item.title}}</a></th>
              <!-- <td><div class="weui-cell" style="padding-top:30px;">{{decodeContent(item.content)}}</div></td> -->
              <td><div class="weui-cell">{{item.typeName}}</div></td>
              <td><div class="weui-cell">{{item.summary}}</div></td>
              <td><div class="weui-cell">{{item.lblName}}</div></td>
              <td><div class="weui-cell">{{item.alias}}</div></td>
              <td @click="toggleEdit">
                <input type="text" class="weui-input" name="createTime" :value="item.createTime" @blur="doEdit"/>
                <div class="weui-cell">{{item.createTime}}</div>
              </td>
              <!-- <td v-if="item.editChked==undefined||item.editChked==0" @click="toggleEdit"><div class="weui-cell">{{decodeContent(item.createTime+','+item.editChked)}}</div></td> -->
              <!-- <td @click="toggleEdit"><div class="weui-cell">{{item.createTime}}</div></td> -->
            </tr>
          </tbody>
        </table>



      </div>

    </div>

  </div>
</template>

<script>
import modal from '../common/Modal';
import {mapState} from 'vuex';
import toolkit from '../../tool';
export default {
  name: 'ListModule',
  data () {
    return {
      msg:'this is a list template!',
      currentParam:null,
      modalOpt:{
        show:false,
        msg:'',

      }
    }

  },
  components:{
    modal
  },
  methods:{
    toDetail(e) {
      var ele=e.target;
      var _key=ele.parentNode.parentNode.getAttribute("data-key");
      this.$store.commit('doCheckReq', {toReq:true,postId:_key});
      this.$router.push({name:'post'});
      // this.$store.commit('setMenu', 1);

    },
    toggleEdit(e){
      e.stopPropagation();
      var ele=e.target;
      while(ele.tagName!='TD'){
        ele=ele.parentNode;
      }
      ele.className="cell-col";
      var _index=ele.parentNode.getAttribute("data-index");
      var datalist=this.postDataList;
      var cur_item=null;
      datalist.forEach(function(item,i){
         var flag=0;
         if(i==_index){
           flag=1;
           cur_item=item;
           datalist[i].editChked=flag;
           return false;
         }

       });
       var tmpParam={
         data:cur_item,
         index:_index
       };
       // console.log(tmpParam)
      this.$store.commit('doModData', tmpParam);
    },
    doEdit(e){
      var ele=e.target;
      var _name=ele.getAttribute("name");
      var _val=ele.value;
      var _id=ele.parentNode.parentNode.getAttribute("data-key");
      var _index=ele.parentNode.parentNode.getAttribute("data-index");
      ele.parentNode.className='';
      var opt={
        postId:_id
      }
      opt[_name]=_val;
      var tmpParam={
        postType:1,
        postData:opt,
        index:_index
      };
      this.$store.dispatch('reqModPost', tmpParam);
    },
    getPreData(isForceDo){
      var reqParam={};
      if(isForceDo){
        this.$store.commit('doCheckReq', false);
        this.$store.dispatch('reqAdminList', reqParam);
      }else{
        if(this.$store.state.mngData.routeData.doReq){
          this.$store.commit('doCheckReq', false);
          this.$store.dispatch('reqAdminList', reqParam);
        }
      }


    },
    delPost(){
      var _box=this.$refs.list_body;
      var _chkbox=_box.querySelectorAll(".rm-checkbox");
      var len=0;
      if(_chkbox!=null){
        len=_chkbox.length;
      }
      var post_id=null;
      if(len>0){
        for(var i=0;i<len;i++){
          var item_ele=_chkbox[i];
          if(item_ele.checked){
            // var _ele = item_ele.parentNode.nextElementSibling || item_ele.parentNode.nextSibling;
            // var target_a=_ele.children[0];
            var _ele = item_ele.parentNode.parentNode;
            var _id=_ele.getAttribute("data-key");
            if(post_id==null){
              post_id=_id;
            }else{
              post_id +=','+_id;
            }
          }
        }
      }
      if(post_id!=null){
        var tmpParam={postType:2,postData:{postId:post_id}};
        this.currentParam=tmpParam;
        this.$store.dispatch('reqDelPost', tmpParam);
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
      // var _list=this.$store.state.mngData.routeData.postDataList;
      // var _opt=this.$store.state.mngData.resOpt;
      this.modalOpt.show=false;
      if(this.resOpt.success){
        this.getPreData(true);
        // var temp_arr=[];
        // var post_str=this.currentParam.postData.postId;
        // var arr=[];
        // if(post_str.indexOf(',')==-1){
        //   arr.push(post_str);
        // }else{
        //   arr=post_str.split(',');
        // }
        // for(var k=0;k<_list.length;k++){
        //   var item=_list[k];
        //   var flag=true;
        //   for(var j=0;j<arr.length;j++){
        //     if(item.postId==arr[j]){
        //       flag=false;
        //       break;
        //     }
        //   }
        //   if(flag){
        //     temp_arr.push(item);
        //   }
        //
        // }
        // _list=temp_arr;
      }else{
        // _list={closeOpt:true};
      }
    },
    decodeContent(content){
      return toolkit.baseDecrypt(content);
    },

  },
  computed: mapState({
    postDataList: function(state){
      // console.log(state)
      // console.log(state.postDataList)
      var postDatalist=state.mngData.routeData.postDataList;
      // console.log(postDatalist);
      // console.log(postDatalist.data);
      var _data=postDatalist.data;
      // if(_data!=undefined){
      //   if(typeof _data.length=='number'){
      //     _data.forEach(function(item,i){
      //       console.log(i+'==='+item.editChked)
      //     });
      //   }
      //
      // }

      return _data
    },
    resOpt:function(state){
      // console.log(state.mngData.resOpt)
      return state.mngData.resOpt
    }

  }),
  watch: {
      resOpt: {
          deep: true,
          handler (val,oldval) {
            // console.log(val)
            if(val.success!=undefined){
              this.doPopBox(val.msg);
            }

          }
      },

  },
  mounted: function () {
    // console.log('mounted 钩子执行...');
    // console.log(this.$route.params.menuIndex)
    // console.log(this.number)
    this.getPreData(true);
    // this.setScroll();
  },
  beforeUpdate: function () {
    // console.log('beforeUpdate 钩子执行...');
    // console.log(this.number)
  },
  updated: function () {
    // console.log('updated 钩子执行...');
    // console.log(this.postDataList)
    // this.setScroll();
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
