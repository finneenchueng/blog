<template>
    <div class="dialog-unchk"  :transition="transition">
        <div class="weui-mask" @click.self="clickMask"></div>
        <div class="weui-dialog" :class="modalClass" ref="dialog">
            <div class="weui-dialog__hd">
              <!-- <strong class="weui-dialog__title">弹窗标题</strong> -->
              <slot name="header">
                {{title}}
              </slot>
            </div>
            <div class="weui-dialog__bd" style="text-align: initial;">
              <!-- 弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内 -->
              <slot name="modal-body"></slot>
            </div>
            <div class="weui-dialog__ft">
                <slot name="footer">
                    <a href="javascript:;" :class="getCancelBtncls()" @click="cancel">{{cancelText}}</a>
                    <a href="javascript:;" :class="okClass" @click="ok">{{okText}}</a>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
    /**
     * Bootstrap Style Modal Component for Vue
     * Depend on Bootstrap.css
     */
     //https://github.com/Coffcer/vue-bootstrap-modal
     export default {
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
        data () {
            return {
                duration: null
            };
        },
        computed: {
            modalClass () {
                return {
                    'modal-lg': this.large,
                    'modal-sm': this.small,
                    'modal-full': this.full
                }
            }
        },
        created () {
            // if (this.show) {
            //     document.body.className += ' modal-open';
            // }
        },
        updated: function () {

        },
        beforeDestroy () {
            document.body.className = document.body.className.replace(/\s?modal-open/, '');
        },
        watch: {
            show (value) {
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
        },
        methods: {
            ok () {
                this.$emit('ok');
                 // this.$emit(‘increment1‘,[12,‘kkk‘]);
                if (this.closeWhenOK) {
                    this.show = false;
                }
            },
            cancel () {
              this.$emit('cancel');
              this.show = false;
            },
            // 点击遮罩层
            clickMask () {
                if (!this.force) {
                    this.cancel();
                }
            },
            doAnimateBeforeClose(){
              this.$el.className=this.$el.className.replace("fade-in","fade-out");
              var _self=this;
              if (!this.duration) {
                  this.duration = window.getComputedStyle(this.$el)['animation-duration'].replace('s', '') * 400;
              }
              // this.show = false;
              // console.log(this.duration)
              this.$emit('update:show', false)
              window.setTimeout(() => {
                // _self.show = false;
                _self.$el.className='dialog-unchk';
              }, this.duration || 0);
            },
            getCancelBtncls(){
              return this.cancelClass+' '+this.extendClass
            },
            setContentBodyScroll(){
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

            }
        }
     };
</script>

<style scoped>
    .modal {
        /*display: block;*/
    }
    /*.modal-transition {
        opacity:0;
        transition: opacity 1.2s linear;
    }*/
    .modal-leave {
        /* 样式没什么用，但可以让根标签的transitionEnd生效，以去掉modal-leave */
        border-radius: 1px !important;
    }
    /*.modal-transition .weui-dialog, .modal-transition .weui-mask {
        transition: all .5s ease;
    }
    .modal-enter .weui-dialog, .modal-leave .weui-dialog {
        opacity: 0;
        transform: translateY(-30%);
    }
    .modal-enter .weui-mask, .modal-leave .weui-mask {
        opacity: 0;
    }*/
    .modal-full{
      max-width: none;
      width:90%;
    }
    .dialog-chk{
      position: relative;
      display: flex;
      z-index: 2000;
      width:100%;
      height: 100%;

    }
    .dialog-unchk{
      display: none;
    }
    @-webkit-keyframes fadeInAction {
      0% {
        opacity: 0; /*初始状态 透明度为0*/
      }
      50% {
        opacity: 0.5; /*中间状态 透明度为0*/
      }
      100% {
        opacity: 1; /*结尾状态 透明度为1*/
      }
    }
    .fade-in{
      animation-name: fadeInAction; /*动画名称*/
      animation-duration: 0.4s; /*动画持续时间*/
      animation-iteration-count: 1; /*动画次数*/
      animation-delay: 0s; /*延迟时间*/
    }
    @-webkit-keyframes fadeOutAction {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 0;
      }
    }
    .fade-out{
      animation-name: fadeOutAction; /*动画名称*/
      animation-duration: 0.4s; /*动画持续时间*/
      animation-iteration-count: 1; /*动画次数*/
      animation-delay: 0s; /*延迟时间*/
    }
</style>
