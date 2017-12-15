<template>
  <div class="drawer-box" @scroll="doScroll">
    <div class="container">
      <div class="page__bd page__bd_spacing">
        <Menus></Menus>
        <div class="f-container-box">
          <ArticleView ref="preview_ex"></ArticleView>
          <!-- <router-view></router-view> -->
        </div>

      </div>

    <!-- <router-view/> -->
      <FootItem></FootItem>
    </div>
  </div>
</template>

<script>
import Menus from '../components/index/Menu'
import FootItem from '../components/index/FooterBlock'
import ArticleView from '../components/asyn/ArticleView'
export default {
  name: 'index',
  components:{
    Menus,
    FootItem,
    ArticleView
  },
  data () {// 数据对象
		return {
			title:'this is a indexApp title!'
		}
  },
  methods:{
    doScroll(e){
      var ele=e.target;
      this.$refs.preview_ex.doViewScroll(ele);
    }
  },
  mounted: function(){ // 创建完成后需要执行的代码块
		// var that=this;
		// console.log(that.title);
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
