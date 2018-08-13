<template>
  <div class="drawer-box">
    <div class="container">
      <div class="page__bd page__bd_spacing">
        <Menus></Menus>
        <div class="f-container-box">
          <ArticleList></ArticleList>
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
import ArticleList from '../components/archive/ArticleList'
export default {
  name: 'app',
  components:{
    Menus,
    FootItem,
    ArticleList
  },
  data () {// 数据对象
		return {
			title:'this is a archiveApp title!'
		}
  },
  mounted: function(){ // 创建完成后需要执行的代码块
		var that=this;
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
