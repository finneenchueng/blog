<template>
    <div class="login-box">
        <div class="container">
            <div class="page__bd" ref="post_form">
                <modal :show.sync="modalOpt.show" @ok="modalConfirm" :extendClass="modalOpt.cancelClass" title="">
                    <div slot="modal-body">{{modalOpt.msg}}</div>
                </modal>
                <div class="weui-cells__title">登录选项</div>
                <div class="weui-cells__title">用户名</div>
                <div class="weui-cells">
                    <div class="weui-cell">
                        <div class="weui-cell__bd">
                            <input class="weui-input" type="text" name="usrname" placeholder="请输入用户名"/>
                        </div>
                    </div>
                </div>
                <div class="weui-cells__title">密码</div>
                <div class="weui-cells">
                    <div class="weui-cell">
                        <div class="weui-cell__bd">
                            <input class="weui-input" type="password" name="usrpwd" placeholder="请输入密码"/>
                        </div>
                    </div>
                </div>
                <!-- <div class="weui-cells weui-cells_form">

                      <div class="weui-cell weui-cell_vcode">
                          <div class="weui-cell__hd"><label class="weui-label">验证码</label></div>
                          <div class="weui-cell__bd">
                              <input class="weui-input" type="number" placeholder="请输入验证码"/>
                          </div>
                          <div class="weui-cell__ft">
                              <img class="weui-vcode-img" src="../assets/vcode.jpg" />
                          </div>
                      </div>
                  </div> -->

                <div class="weui-btn-area">
                    <a class="weui-btn weui-btn_primary" href="javascript:;" @click="doLogin">登录</a>
                </div>
                <FooterBlock :isFixBottom="true"></FooterBlock>
            </div>
        </div>
    </div>
</template>

<script>
    import FooterBlock from '../components/admin/footer';
    import toolkit from '../tool';
    import modal from '../components/common/Modal';
    import { mapState } from 'vuex';

    export default {
        name: 'login',
        components: {
            FooterBlock,
            modal
        },
        data () { // 数据对象
            return {
                modalOpt: {
                    show: false,
                    msg: ''

                }
            };
        },
        methods: {
            doLogin (e) {
                var postJson = this.getFormData();
                this.$store.dispatch('reqLogin', postJson);
            },
            getFormData () {
                var ele_target = this.$refs.post_form;
                var inputs = ele_target.querySelectorAll('input');
                var postJson = toolkit.getFormData(inputs);
                return postJson;
            },
            setFormPosi () {
                var _that = this;
                var win_hei = document.documentElement.clientHeight;
                var target_ele = this.$refs.post_form;
                var _hei = target_ele.parentNode.offsetHeight;
                var new_hei = (win_hei - _hei) / 2;
                target_ele.parentNode.parentNode.style.marginTop = new_hei + 'px';
                document.onkeydown = function (e) {
                    if (e.keyCode == 13) {
                        _that.doLogin();
                    }
                };
            },
            doPopBox (message) {
                this.modalOpt = {
                    show: true,
                    title: '提示：',
                    msg: message,
                    cancelClass: 'hide'

                };
            },
            dopreJump () {
                var pre_path = toolkit.getMenuJumpPath('toAdminIndex');
                window.location.href = pre_path;
            },
            modalConfirm () {
                this.modalOpt.show = false;
                if (this.resOpt.success) {
                    this.dopreJump();
                } else {
                    this.$store.commit('doLoginResponse', {});
                }
            }
        },
        computed: mapState({
            loginOpt: function (state) {
                var _opt = state.loginOpt;
                // console.log(_opt);
                return _opt;
            },
            resOpt: function (state) {
                // console.log(state.resOpt)
                return state.resOpt;
            }

        }),
        mounted: function () { // 创建完成后需要执行的代码块
            var that = this;
            that.setFormPosi();
        },
        updated: function () {
            var that = this;
            that.setFormPosi();
        },
        watch: {
            resOpt: {
                deep: true,
                handler (val, oldval) {
                    if (val.success != undefined) {
                        if (val.success) {
                            this.dopreJump();
                            toolkit.doSessionStorageItem('username', val.usrname);
                        } else {
                            this.doPopBox(val.msg);
                        }
                    }

                }
            }
        }
    };
</script>
