<template>
  <div class="weui-footer">
      <p class="weui-footer__links" >
          Powered by Node+Expess | Author by <a href="javascript:;" class="weui-footer__link">Finneen</a> | Designer by  <a href="javascript:;" class="weui-footer__link">Finneen</a>
      </p>
      <p class="weui-footer__text">Copyright &copy; 2015-2017 finneen.cn</p>
  </div>
</template>

<script>

import {mapState} from 'vuex';
export default {
  name: 'c_footer',
  data () {
    return {
      msg:'this is a footer template!'
    }

  },
  // components:{
  //   MenuList
  // },
  methods:{

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
