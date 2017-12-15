<template>
  <div class="weui-footer" :class="isFixBottom?'weui-footer_fixed-bottom':''">
      <p class="weui-footer__links" >
          Powered by Node+Expess | Author by <a href="javascript:;" class="weui-footer__link">Finneen</a> | Designer by  <a href="javascript:;" class="weui-footer__link">Finneen</a>
      </p>
      <p class="weui-footer__text">Copyright &copy; 2015-2017 finneen.cn</p>
  </div>
</template>

<script>
// import {mapState} from 'vuex';
export default {
  name: 'footerblock',
  props:['isFixBottom'],
  data () {
    return {
      msg:'',

    }

  },
  // components:{
  //   MenuList
  // },
  methods:{

  },

}
</script>
