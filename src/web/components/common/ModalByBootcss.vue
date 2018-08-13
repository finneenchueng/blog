<template>
    <div v-show="show" :transition="transition">
        <div class="modal" @click.self="clickMask">
            <div class="modal-dialog" :class="modalClass" v-el:dialog>
                <div class="modal-content">
                    <!--Header-->
                    <div class="modal-header">
                        <slot name="header">
                            <a type="button" class="close" @click="cancel">x</a>
                            <h4 class="modal-title">
                                <slot name="title">
                                    {{title}}
                                </slot>
                            </h4>
                        </slot>
                    </div>
                    <!--Container-->
                    <div class="modal-body">
                        <slot></slot>
                    </div>
                    <!--Footer-->
                    <div class="modal-footer">
                        <slot name="footer">
                            <button type="button" :class="cancelClass" @click="cancel">{{cancelText}}</button>
                            <button type="button" :class="okClass" @click="ok">{{okText}}</button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-backdrop in"></div>
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
                default: 'OK'
            },
            // 取消按钮text
            cancelText: {
                type: String,
                default: 'Cancel'
            },
            // 确认按钮className
            okClass: {
                type: String,
                default: 'btn blue'
            },
            // 取消按钮className
            cancelClass: {
                type: String,
                default: 'btn red btn-outline'
            },
            // 点击确定时关闭Modal
            // 默认为false，由父组件控制prop.show来关闭
            closeWhenOK: {
                type: Boolean,
                default: false
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
            if (this.show) {
                document.body.className += ' modal-open';
            }
        },
        beforeDestroy () {
            document.body.className = document.body.className.replace(/\s?modal-open/, '');
        },
        watch: {
            show (value) {
                // 在显示时去掉body滚动条，防止出现双滚动条
                if (value) {
                    document.body.className += ' modal-open';
                }
                // 在modal动画结束后再加上body滚动条
                else {
                    if (!this.duration) {
                        this.duration = window.getComputedStyle(this.$el)['transition-duration'].replace('s', '') * 1000;
                    }
                    window.setTimeout(() => {
                        document.body.className = document.body.className.replace(/\s?modal-open/, '');
                    }, this.duration || 0);
                }
            }
        },
        methods: {
            ok () {
                this.$emit('ok');
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
            }
        }
     };
</script>

<style scoped>
    .modal-open {
      overflow: hidden;
    }

    .modal {
      display: none;
      overflow: hidden;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1040;
      -webkit-overflow-scrolling: touch;
      outline: 0;
    }

    .modal.fade .modal-dialog {
      -webkit-transform: translate(0, -25%);
      -ms-transform: translate(0, -25%);
      -o-transform: translate(0, -25%);
      transform: translate(0, -25%);
      -webkit-transition: -webkit-transform 0.3s ease-out;
      -o-transition: -o-transform 0.3s ease-out;
      transition: transform 0.3s ease-out;
    }

    .modal.in .modal-dialog {
      -webkit-transform: translate(0, 0);
      -ms-transform: translate(0, 0);
      -o-transform: translate(0, 0);
      transform: translate(0, 0);
    }

    .modal-open .modal {
      overflow-x: hidden;
      overflow-y: auto;
    }

    .modal-dialog {
      position: relative;
      width: auto;
      margin: 10px;
    }

    .modal-content {
      position: relative;
      background-color: #ffffff;
      border: 1px solid #999999;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 6px;
      -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
      box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
      -webkit-background-clip: padding-box;
      background-clip: padding-box;
      outline: 0;
    }

    .modal-backdrop {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      background-color: #000000;
    }

    .modal-backdrop.fade {
      opacity: 0;
      filter: alpha(opacity = 0);
    }

    .modal-backdrop.in {
      opacity: 0.5;
      filter: alpha(opacity = 50);
    }

    .modal-header {
      padding: 15px;
      border-bottom: 1px solid #e5e5e5;
      min-height: 16.42857143px;
    }

    .modal-header .close {
      margin-top: -2px;
    }

    .modal-title {
      margin: 0;
      line-height: 1.42857143;
    }

    .modal-body {
      position: relative;
      padding: 15px;
    }

    .modal-footer {
      padding: 15px;
      text-align: right;
      border-top: 1px solid #e5e5e5;
    }

    .modal-footer .btn+.btn {
      margin-left: 5px;
      margin-bottom: 0;
    }

    .modal-footer .btn-group .btn+.btn {
      margin-left: -1px;
    }

    .modal-footer .btn-block+.btn-block {
      margin-left: 0;
    }

    .modal-scrollbar-measure {
      position: absolute;
      top: -9999px;
      width: 50px;
      height: 50px;
      overflow: scroll;
    }

    @media screen and (min-width: 768px) {
      .modal-dialog {
        width: 600px;
        margin: 30px auto;
      }
      .modal-content {
        -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
      }
      .modal-sm {
        width: 300px;
      }
    }

    @media screen and (min-width: 992px) {
      .modal-lg {
        width: 900px;
      }
    }

    .modal {
        display: block;
    }
    .modal-transition {
        transition: all .6s ease;
    }
    .modal-leave {
        /* 样式没什么用，但可以让根标签的transitionEnd生效，以去掉modal-leave */
        border-radius: 1px !important;
    }
    .modal-transition .modal-dialog, .modal-transition .modal-backdrop {
        transition: all .5s ease;
    }
    .modal-enter .modal-dialog, .modal-leave .modal-dialog {
        opacity: 0;
        transform: translateY(-30%);
    }
    .modal-enter .modal-backdrop, .modal-leave .modal-backdrop {
        opacity: 0;
    }
</style>
