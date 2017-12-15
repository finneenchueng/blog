<template>
  <div class="f-header-box ">
    <div class="weui-flex">
        <div class="weui-flex__item head-logo-item">
          <a href="javascript:;" class="head-logo">
            <img src="../../assets/logo.png" />
          </a>
        </div>
    </div>
    <div class="weui-flex" v-if="isPc==true">
      <div class="weui-flex__item">

      </div>
      <div class="weui-flex__item">
        <!-- <MenuList :menu-data="menu_list"></MenuList> -->
        <div class="weui-flex">
          <div class="weui-flex__item"  v-for="(item,index) in menu_list">
            <a  :href="getTargetPath(item.target)" :data-index="index"  class="title-box" :class="{'active': (m_index==index)}" @click="toggleRoute">{{item.text}}</a>
          </div>

        </div>
      </div>
      <div class="weui-flex__item">

      </div>
    </div>

    <div class="weui-flex" v-else>
      <div class="weui-flex__item"  v-for="(item,index) in menu_list">
        <a  :href="getTargetPath(item.target)" :data-index="index"  class="title-box" :class="{'active': (m_index==index)}" @click="toggleRoute">{{item.text}}</a>
      </div>
    </div>

  </div>
</template>

<script>
// import MenuList from './MenuList'
import {mapState} from 'vuex';
import toolkit from '../../tool';
// import pathConfig from '../../tool/request';
export default {
  name: 'Menu',
  data () {
    return {
      msg:'this is a menu template!',
      // menu_list:[{
      //   text:'首页',
      //   routePath:'/'
      // },{
      //   text:'归档',
      //   routePath:'/detail/2112'
      // },{
      //   text:'关于',
      //   routePath:'/about'
      // }],
      menu_list:toolkit.getMenuList(),
      isPc:this.jugePCOrMobile()
    }

  },
  // components:{
  //   MenuList
  // },
  methods:{
    toggleRoute(e) {
      // console.log(e.target)
      var ele=e.target;
      var _i=ele.getAttribute("data-index");
      // console.log(_i)
      // console.log(this)
      // console.log(this.$router)
      // console.log(this.menu_list[_i].routePath)
      // this.$router.push({path:this.menu_list[_i].routePath});
      // console.log(this.$route)
      // console.log(this.$router)
      // console.log(this.menu_index)
      this.$router.push(this.menu_list[_i].routePath);
      this.$store.commit('markMenuItem', _i);
    },
    getTargetPath(targets){
      var pre_path=toolkit.getMenuJumpPath(targets);
      return pre_path;
    },
    jugePCOrMobile(){
      var flag=toolkit.getBrowser().isPc;
      return flag
    }
  },
  computed: mapState({
    // m_index: state => state.menuIndex
    m_index: function(state){
      // console.log(state)
      // console.log(this.menu_index)
      this.menu_index=state.menuIndex;
      return state.menuIndex
    }

  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
