<template>
  <div class="f-container-item" ref="container_detail">
    <div class="weui-panel">
        <!-- <div class="weui-panel__hd">文字列表附来源</div> -->
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_text">
              <article class="weui-article">
                  <h1>归档列表</h1>
                  <section v-for="(item,index) in archivesData">
                      <h2 class="title">{{item.cateName}}</h2>
                      <section v-for="(sub_item,sub_index) in item.children">
                          <h3>
                            {{(index+1)+"."+(sub_index+1)+" "}}
                            <a :href="getDetailPath(sub_item)" class="weui-cell_access weui-cell_link weui-media-box__title" >{{sub_item.title}}</a>
                          </h3>
                      </section>

                  </section>
              </article>
            </div>
          </div>
        </div>
  </div>
</template>
<script>
import {mapState} from 'vuex';
import toolkit from '../../tool';
export default {
  name: 'listModule',
  data () {
    return {
      msg:'',
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
    submitData() {
      if(toolkit.checkDevOrProdEnv()){
        var json = toolkit.parseJsonResult(window.clientSetting);
        this.$store.commit('doArchiveListData', json);
      }else{
        this.$store.dispatch('reqArchiveListData', {});
      }

    },
  },
  computed: mapState({
    archivesData: function(state){
      var _data=state.archiveListData;
      if(_data==undefined){
        return {};
      }else if(_data.data==undefined){
        return {};
      }
      return _data.data
    }

  }),
  mounted: function () {
    // console.log('mounted 钩子执行...');
    this.submitData();
  },


}
</script>
<style scoped>

</style>
