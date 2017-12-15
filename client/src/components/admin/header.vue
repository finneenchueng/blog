<template>
  <div class="weui-navbar">
    <div class="weui-navbar__item menu-item img-box">
        <img src="../../assets/logo.png" />
    </div>
    <div class="weui-navbar__item menu-item" v-for="(item,index) in menu_list" :class="{'weui-bar__item_on': (m_index==index)}">
          <a  href="javascript:void(0)" :data-index="index"  @click="doJump"><i class="fa" :class="item.iconclsName"></i>{{item.text}}</a>
          <ul class="dropdown-menu" v-if="item.childrens.length>0" >
            <li v-for="(sub_item,sub_index) in item.childrens">
              <a href="javascript:void(0)" :data-index="index" :data-sub-index="sub_index" @click="doJump" >{{sub_item.text}}</a>
            </li>
          </ul>

    </div>

    <!-- <div class="weui-navbar__item menu-item">
        <a href="javascript:;" class="mark-item"  @click="jumpModBlock"><i class="fa fa-pencil"></i>写博客</a>
    </div>
    <div class="weui-navbar__item menu-item weui-bar__item_on">
      <a href="javascript:;" class="mark-item" @click="jumpModBlock"><i class="fa fa-navicon"></i>列表</a>
      <ul class="dropdown-menu">
        <li><a href="#">目录</a></li>
        <li><a href="#">评论</a></li>
        <li><a href="#">分类</a></li>
        <li><a href="#">模板</a></li>
      </ul>
    </div>

    <div class="weui-navbar__item menu-item">
        <a href="javascript:;" class="mark-item"  @click="jumpModBlock"><i class="fa fa-user-circle"></i>管理员 </a>
    </div> -->
  </div>
</template>

<script>
import toolkit from '../../tool';
import {mapState} from 'vuex';
export default {
  name: 'Menu',
  data () {
    return {
      msg:'this is a menu template!',
      menu_list:[
        {
          text:'列表',
          routePath:'/list',
          iconclsName:'fa-navicon',
          childrens:[]
          // childrens:[
          //   {
          //     text:'目录',
          //     routePath:'/'
          //   },
          //   {
          //     text:'评论',
          //     routePath:'/'
          //   },
          //   {
          //     text:'分类',
          //     routePath:'/'
          //   },
          //   {
          //     text:'模板',
          //     routePath:'/'
          //   }
          // ]
        },
        {
          text:'写博客',
          routePath:'/post',
          iconclsName:'fa-pencil',
          childrens:[]
        },
        {
          text:toolkit.doSessionStorageItem('username'),
          routePath:'/',
          iconclsName:'fa-user-circle',
          childrens:[]
        },
      ]
    }

  },
  // components:{
  //   MenuList
  // },
  methods:{
    getAsynModuleName(){
      var uri = window.location.href;
      var re = new RegExp("#\\/(\\w+)\\?*", "ig");
      var tmp=uri.match(re);
      var result=null;
      if(typeof tmp ==='object'&&tmp!==null){
        if(tmp.length >0){
          result=tmp[0].substring(2,tmp[0].length-1);
        }
      }
      return result;
    },
    doJump(e){
      var ele=e.target;
      while(ele.tagName!=='A'){
        ele=ele.parentNode;
      }
      var _index=ele.getAttribute("data-index");
      var sub_index=ele.getAttribute("data-sub-index");
      this.jumpModBlock(_index,sub_index);
    },
    jumpModBlock(_index,sub_index) {
      var new_path='';
      if(sub_index==null||sub_index==undefined){
        // this.$router.push(this.menu_list[_index].routePath);
        // this.$router.push({name:this.menu_list[_index].routePath,params:{menuIndex:_index}});
        new_path=this.menu_list[_index].routePath;
      }else{
        // this.$router.push({name:this.menu_list[_index].childrens[sub_index].routePath,params:{menuIndex:_index}});
        new_path=this.menu_list[_index].childrens[sub_index].routePath;
      }
      new_path=new_path.replace('/','');
      this.$store.commit('setMenu', _index);
      this.$store.commit('doCheckReq', true);
      this.$router.push({name:new_path,params:{menuIndex:_index}});
    },
    getStartMenuIndex(menulist,modName){
      var len=menulist.length;
      var index=0;
      for(var i=0;i<len;i++){
        var itemmenu=menulist[i];
        if(itemmenu.routePath.indexOf(modName)>-1){
          index=i;
          break;
        }
      }
      return index;
    },
    toTargetMenuText(){
      var cur_default_menuindex=this.getStartMenuIndex(this.menu_list,this.getAsynModuleName());
      var get_index=this.$store.state.mngData.menuData.menuIndex;
      // console.log(cur_default_menuindex+'!='+get_index)
      if(cur_default_menuindex!=get_index){
        this.jumpModBlock(cur_default_menuindex);
      }
    },
  },
  computed: mapState({
    // m_index: state => state.menuIndex
    m_index: function(state){
      // console.log(state)
      var tmp_index=state.mngData.menuData.menuIndex;
      if(tmp_index==undefined){
        tmp_index=this.getStartMenuIndex(this.menu_list,this.getAsynModuleName());
        this.$store.commit('setMenu', tmp_index);
      }
      // this.menu_index=tmp_index;
      return tmp_index
    }

  }),
  mounted: function () {
    this.toTargetMenuText();
  },
  update: function () {
    this.toTargetMenuText();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
