import { defineComponent, onBeforeMount, computed, watch, reactive } from 'vue';
import { commonStore } from '../../store/common-store';
import { router } from '@/router/appRouter';
import { $t } from '@/utils/locale';

export default defineComponent({
    props: {
        show: {
            type: Boolean,
            twoWay: true,
            default: false
        },
        title: {
            type: String,
            default: 'Modal'
        },
        small: {
            type: Boolean,
            default: false
        },
        large: {
            type: Boolean,
            default: false
        },
        full: {
            type: Boolean,
            default: false
        },
        // 为true时无法通过点击遮罩层关闭modal
        force: {
            type: Boolean,
            default: false
        },
        // 自定义组件transition
        transition: {
            type: String,
            default: 'modal'
        },
        // 确认按钮text
        okText: {
            type: String,
            default: '确定'
        },
        // 取消按钮text
        cancelText: {
            type: String,
            default: '取消'
        },
        // 确认按钮className
        okClass: {
            type: String,
            default: 'weui-dialog__btn weui-dialog__btn_default'
        },
        // 取消按钮className
        cancelClass: {
            type: String,
            default: 'weui-dialog__btn weui-dialog__btn_primary'
        },
        extendClass: {
            type: String,
            default: ''
        },
        // 点击确定时关闭Modal
        // 默认为false，由父组件控制prop.show来关闭
        closeWhenOK: {
            type: Boolean,
            // default: false
        }
    },
    setup(props, context) {
        console.log('props;', props)
        // console.log('context;', context)
        // console.log(' context.attrs;',  context.attrs)
        // console.log('context.slots;', context.slots)
        // console.log('context.emit;', context.emit)
       
        /*
        const modalClass = computed(() => {
            return {
                'modal-lg': props.large,
                'modal-sm': props.small,
                'modal-full': props.full
            }
        })

        const showState = reactive({ show: props.show })
        watch(
            () => showState.show,
            (value, prevValue) => {
                // 在显示时去掉body滚动条，防止出现双滚动条
            // if (value) {
            //     document.body.className += ' modal-open';
            // }
            // 在modal动画结束后再加上body滚动条
            // else {
            //     if (!this.duration) {
            //         this.duration = window.getComputedStyle(this.$el)['transition-duration'].replace('s', '') * 1000;
            //     }
            //     window.setTimeout(() => {
            //         document.body.className = document.body.className.replace(/\s?modal-open/, '');
            //     }, this.duration || 0);
            // }
            // console.log(value)
            if(value){
                this.$el.className="dialog-chk fade-in";
              }
              else{
                // this.$el.className=this.$el.className.replace("fade-in","fade-out");
                // if (!this.duration) {
                //     this.duration = window.getComputedStyle(this.$el)['animation-duration'].replace('s', '') * 600;
                // }
                // console.log(this.duration)
                // window.setTimeout(() => {
                //     // document.body.className = document.body.className.replace(/\s?modal-open/, '');
                // }, this.duration || 0);
                this.doAnimateBeforeClose();
              }
            }
        );
        */
        onBeforeMount(async () => {
            // await commonStore.init()
        })
        return {
            duration: null,
            modalClass: {},
            $t,
        }
    },
    methods: {
        // ok () {
        //     this.$emit('ok');
        //      // this.$emit(‘increment1‘,[12,‘kkk‘]);
        //     if (this.closeWhenOK) {
        //         this.show = false;
        //     }
        // },
        // cancel () {
        //   this.$emit('cancel');
        //   this.show = false;
        // },
        // // 点击遮罩层
        // clickMask () {
        //     if (!this.force) {
        //         this.cancel();
        //     }
        // },
        // doAnimateBeforeClose(){
        //   this.$el.className=this.$el.className.replace("fade-in","fade-out");
        //   var _self=this;
        //   if (!this.duration) {
        //       this.duration = window.getComputedStyle(this.$el)['animation-duration'].replace('s', '') * 400;
        //   }
        //   // this.show = false;
        //   // console.log(this.duration)
        //   this.$emit('update:show', false)
        //   window.setTimeout(() => {
        //     // _self.show = false;
        //     _self.$el.className='dialog-unchk';
        //   }, this.duration || 0);
        // },
        // getCancelBtncls(){
        //   return this.cancelClass+' '+this.extendClass
        // },
        // setContentBodyScroll(){
        //   var win_hei=document.documentElement.clientHeight;
        //   var target_ele = this.$refs.list_content as HTMLDivElement;
        //   // console.log(target_ele)
        //   var _hei=target_ele.offsetHeight;
        //   // console.log(target_ele.parentNode)
        //   // var _footer_ele=target_ele.parentNode.nextSibling;
        //   var _footer_ele = target_ele.parentNode?.nextElementSibling || target_ele.parentNode?.nextSibling;
        //   // console.log(_footer_ele)
        //   var footer_hei=_footer_ele.offsetHeight;
        //   var new_hei=win_hei-50-50-footer_hei;
        //   var _ele=target_ele.children[0]  as HTMLDivElement;
        //   if(_ele!=undefined){
        //     _ele.style.height=new_hei+"px";
        //   }

        // }
        
        
    },
    beforeDestroy () {
        document.body.className = document.body.className.replace(/\s?modal-open/, '');
    },
    mounted() {
        
    },
});