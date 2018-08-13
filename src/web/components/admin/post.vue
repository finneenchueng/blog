<template>
    <div class="weui-panel weui-panel_access post-form" ref="post_form">
        <!-- <div class="weui-panel__hd">文字组合列表</div> -->
        <div class="weui-panel__bd">
            <div class="weui-media-box weui-media-box_text">
                <!-- <h4 class="weui-media-box__title">标题一</h4> -->
                <div class="weui-cells weui-cells_form">
                    <input type="hidden" name="postId" v-model="postData.postId"/>
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">标题</label></div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" type="text" name="title" placeholder="请输入标题"
                                   v-model="postData.title"/>
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">分类</label></div>
                        <div class="weui-cell__bd">
                            <select class="weui-select" name="type" v-model="postData.type">
                                <option v-for="(item,index) in catelist" :value="item.cateId"
                                        :selected="item.cateId==postData.type?'selected':''">{{item.cateName}}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_switch">
                        <div class="weui-cell__bd">是否开启</div>
                        <div class="weui-cell__ft">
                            <input class="weui-switch" :class="checkBoxCls" type="checkbox" name="enabled"
                                   v-model="postData.enabled"/>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_switch">
                        <div class="weui-cell__bd">是否允许评论</div>
                        <div class="weui-cell__ft">
                            <input class="weui-switch" :class="checkBoxCls" type="checkbox" name="allowComment"
                                   v-model="postData.allowComment"/>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_switch">
                        <div class="weui-cell__bd">是否允许匿名评论</div>
                        <div class="weui-cell__ft">
                            <input class="weui-switch" :class="checkBoxCls" type="checkbox"
                                   name="forbidAnonymousComment" v-model="postData.forbidAnonymousComment"/>
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">预览内容</label></div>
                        <div class="weui-cell__bd">
                            <textarea class="weui-textarea" name="summary" :value="summay" placeholder="请输入文本" rows="3"
                                      :maxlength="summayOpt.sum" @blur="chgSummary"></textarea>
                            <div class="weui-textarea-counter"><span>{{summayOpt.count}}</span>/{{summayOpt.sum}}</div>
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">标签</label></div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" type="text" name="lblName" v-model="postData.lblName"
                                   placeholder="请输入标签"/>
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">搜索词</label></div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" type="text" name="keyWords" v-model="postData.keyWords"
                                   placeholder="请输入搜索词"/>
                        </div>
                    </div>
                </div>
                <input type="hidden" name="content" v-model="postData.content" data-decode-mark="1" ref="ele_content"/>
                <p class="weui-media-box__desc editor-box" style="height:630px">
                    <html5Editor :content="decodeContent(postData.content)" @change="updateContentData"
                                 ref="editor_box"></html5Editor>
                </p>
            </div>

        </div>
        <!-- <modal title="Modal Title" :show.sync="modalShow" @ok="modalConfirm" @cancel="modalCancel">
            <div>Modal Body</div>

            <div slot="header">Modal Header</div>
            <div slot="footer">Modal Footer</div>
        </modal> -->
        <!-- <modal :show.sync="modalOpt.show" @ok="modalConfirm" title="modalOpt.msg" >
            {{modalOpt.msg}}
        </modal> -->
        <modal :show.sync="modalOpt.show" :closeWhenOK.sync="!modalOpt.show" :extendClass="modalOpt.cancelClass"
               :full="modalOpt.fullModal" @ok="modalConfirm" :title="modalOpt.title">
            <div slot="modal-body" :style="modalOpt.styleOpt" v-html="decodeContent(modalOpt.msg)"></div>
            <!-- <div slot="modal-body" >{{modalOpt.msg}}</div> -->

            <!-- <div slot="header">Modal Header</div> -->
            <!-- <div slot="footer">Modal Footer</div> -->
        </modal>
        <div class="weui-panel__ft">
            <!-- <a href="javascript:void(0);" class="weui-cell weui-cell_access weui-cell_link">
                <div class="weui-cell__bd">查看更多</div>
                <span class="weui-cell__ft"></span>
            </a>
            <div class="weui-cell weui-cell_access">
              <a href="javascript:;" class="weui-btn weui-btn_primary">确定</a>
              <a href="javascript:;" class="weui-btn weui-btn_default">取消</a>
              <span class="weui-cell__ft">sdgasdf</span>
            </div> -->
            <div class="weui-form-preview__ft">
                <a class="weui-form-preview__btn weui-form-preview__btn_default" href="javascript:"
                   @click="postPreview">预览</a>
                <button type="submit" class="weui-form-preview__btn weui-form-preview__btn_primary" href="javascript:"
                        @click="submitPosts">确定
                </button>
            </div>
        </div>

    </div>
</template>

<script>
    // import MenuList from './MenuList'
    import toolkit from '../../tool';
    import Html5Editor from 'vue-html5-editor';
    import { mapState } from 'vuex';
    import modal from '../common/Modal';
    //https://github.com/PeakTai/vue-html5-editor
    var html5Editor = new Html5Editor({
        // 全局组件名称，使用new VueHtml5Editor(options)时该选项无效
        // global component name
        name: 'vue-html5-editor',
        // 是否显示模块名称，开启的话会在工具栏的图标后台直接显示名称
        // if set true,will append module name to toolbar after icon
        showModuleName: false,
        // 自定义各个图标的class，默认使用的是font-awesome提供的图标
        // custom icon class of built-in modules,default using font-awesome
        icons: {
            text: 'fa fa-pencil',
            color: 'fa fa-paint-brush',
            font: 'fa fa-font',
            align: 'fa fa-align-justify',
            list: 'fa fa-list',
            link: 'fa fa-chain',
            unlink: 'fa fa-chain-broken',
            tabulation: 'fa fa-table',
            image: 'fa fa-file-image-o',
            hr: 'fa fa-minus',
            eraser: 'fa fa-eraser',
            undo: 'fa-undo fa',
            'full-screen': 'fa fa-arrows-alt',
            info: 'fa fa-info'
        },
        // 配置图片模块
        // config image module
        image: {
            // 文件最大体积，单位字节  max file size
            sizeLimit: 10 * 1024 * 1024,
            // 上传参数,默认把图片转为base64而不上传
            // upload config,default null and convert image to base64
            upload: {
                url: '/mng/upload',
                headers: {},
                params: {},
                fieldName: 'image'
            },
            // 压缩参数,默认使用localResizeIMG进行压缩,设置为null禁止压缩
            // compression config,default resize image by localResizeIMG (https://github.com/think2011/localResizeIMG)
            // set null to disable compression
            compress: {
                width: 1600,
                height: 1600,
                quality: 80
            },
            // 响应数据处理,最终返回图片链接
            // handle response data，return image url
            uploadHandler (responseText) {
                //default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
                var json = JSON.parse(responseText);
                return json.ok ? json.data : 'error';
            }
        },
        // 语言，内建的有英文（en-us）和中文（zh-cn）
        //default en-us, en-us and zh-cn are built-in
        language: 'zh-cn',
        // 自定义语言
        i18n: {
            //specify your language here
            'zh-cn': {
                'align': '对齐方式',
                'image': '图片',
                'list': '列表',
                'link': '链接',
                'unlink': '去除链接',
                'table': '表格',
                'font': '文字',
                'full screen': '全屏',
                'text': '排版',
                'eraser': '格式清除',
                // "info": "关于",
                'color': '颜色',
                'please enter a url': '请输入地址',
                'create link': '创建链接',
                'bold': '加粗',
                'italic': '倾斜',
                'underline': '下划线',
                'strike through': '删除线',
                'subscript': '上标',
                'superscript': '下标',
                'heading': '标题',
                'font name': '字体',
                'font size': '文字大小',
                'left justify': '左对齐',
                'center justify': '居中',
                'right justify': '右对齐',
                'ordered list': '有序列表',
                'unordered list': '无序列表',
                'fore color': '前景色',
                'background color': '背景色',
                'row count': '行数',
                'column count': '列数',
                'save': '确定',
                'upload': '上传',
                'progress': '进度',
                'unknown': '未知',
                'please wait': '请稍等',
                'error': '错误',
                'abort': '中断',
                'reset': '重置',
                'h5mark': '拷贝源码'
            }
        },
        // 隐藏不想要显示出来的模块
        // the modules you don't want
        hiddenModules: [],
        // 自定义要显示的模块，并控制顺序
        // keep only the modules you want and customize the order.
        // can be used with hiddenModules together
        visibleModules: [
            'text',
            'color',
            'font',
            'align',
            'list',
            'link',
            'unlink',
            'tabulation',
            'image',
            'hr',
            'eraser',
            'undo',
            'full-screen',
            // "info",
            'save',
            'upload',
            'progress',
            'unknown',
            'please wait',
            'error',
            'abort',
            'reset',
            'htmlcode'
        ],
        // 扩展模块，具体可以参考examples或查看源码
        // extended modules
        // modules: {
        //     //omit,reference to source code of build-in modules
        // }
        modules: [
            {
                name: 'htmlcode',
                icon: 'fa fa-file-code-o',
                i18n: 'h5mark',
                show: true,
                tmpData: '',
                init: function (editor) {
                    // console.log(editor)
                    // console.log(editor.content)
                    // console.log(editor.$el)
                    // console.log("emoji module init")
                },
                // handler: function (editor) {
                //     // console.log("data htmlcode module")
                //     // console.log(this)
                //     console.log(editor)
                //     // console.log(editor.$el)
                //     // console.log(editor.$el.children[1])
                //     // console.log(editor.$el.children[1].innerHTML)
                //     // console.log(editor.module.tmpData)
                //     // this.toggleDashboard(`dashboard-${module.name}`)
                //     // editor.content=editor.$el.children[1].innerHTML;
                //     // console.log(editor.$refs.content)
                //
                //     editor.toggleDashboard('dashboard-htmlcode');
                //     editor.$emit('change', editor.$refs.content.innerHTML)
                //     // this.tmpData=editor.$el.children[1].innerHTML;
                //
                //     // return;
                //     // // console.log(editor.dashboard.tmpData)
                //     // var txtarea=editor.$refs.dashboard.getElementsByTagName("textarea")[0];
                //     // console.log(editor.$refs.dashboard)
                //     // if(editor.$refs.dashboard!=undefined&&editor.$refs.dashboard!=null){
                //     //   console.log(typeof editor.$refs.dashboard)
                //     //
                //     // }
                //     // console.log(txtarea)
                //     //
                //     // txtarea.value=editor.$refs.content;
                // },
                //vue component
                dashboard: {
                    template: '<div>' +
                    '<div style="float:right;"><button type="button" @click="insertSource">确定</button></div>' +
                    '<textarea class="weui-textarea" v-bind:style="{ border: ' + '\'1px solid #ddd\'' + ',height: contentOpt.height' + '+\'px\'' + ' }"  placeholder="请将拷贝源码粘贴到此" :value="contentOpt.data" ></textarea>' +
                    '</div>',
                    data: function () {
                        return {
                            contentOpt: this.getCurrentData()
                        };
                    },
                    methods: {
                        insertSource: function (e) {
                            // var target_ele=e.target.parentNode.previousSibling;
                            var target_ele = e.target.parentNode.nextSibling;
                            var _value = '';
                            if (target_ele.innerText == '') {
                                _value = target_ele.value;
                            }
                            //$parent is editor component instance
                            this.$parent.execCommand('insertHTML', _value);
                        },
                        getCurrentData: function () {
                            // console.log(this)
                            // console.log(this.$parent)
                            // console.log(this.$parent.dashboard)
                            // console.log(this.$parent.modules)
                            // console.log(this.$parent.content)
                            // return this.$parent.$refs.content.innerHTML;
                            var _content = this.$parent.$refs.content.innerHTML;
                            var _hei = this.$parent.$refs.content.offsetHeight - 31 - 34 - 20;
                            return {
                                data: _content,
                                height: _hei
                            };
                        }
                    }
                }
            }
        ]
    });
    export default {
        name: 'PostModule',
        data () {
            return this.initData();

        },
        components: {
            html5Editor,
            modal
        },
        methods: {
            initData () {
                return {
                    catelist: [],
                    modalOpt: {
                        show: false,
                        msg: '',
                        cancelClass: 'hide'

                    },
                    postType: 1,
                    toReq: false,
                    summay: '',
                    summayOpt: {
                        count: 0,
                        sum: 2000
                    }
                };
            },
            submitPosts (e) {
                // // console.log(e.target)
                // var ele=e.target;
                // var _i=ele.getAttribute("data-index");
                // // console.log(_i)
                // // console.log(this)
                // // console.log(this.$router)
                // // console.log(this.menu_list[_i].routePath)
                // // this.$router.push({path:this.menu_list[_i].routePath});
                // // console.log(this.$route)
                // // console.log(this.$router)
                // // console.log(this.menu_index)
                // this.$router.push(this.menu_list[_i].routePath);
                // this.$store.commit('markMenuItem', _i);
                // console.log(this.postData)
                var postJson = this.getFormData();
                try {
                    this.modalOpt.formData = JSON.parse(postJson);
                } catch (e) {
                    // console.log(postJson)
                    this.doPopBox('form表单解析异常');
                    return;
                }
                var reqParam = {
                    postType: this.postType,
                    postData: postJson
                };
                // console.log(reqParam)
                this.$store.dispatch('reqPost', reqParam);
            },
            getFormData () {
                var ele_target = this.$refs.post_form;
                var inputs = ele_target.querySelectorAll('input,select,textarea');
                var postJson = toolkit.getFormData(inputs);
                return postJson;
            },
            postPreview (e) {
                var _data = this.getFormData();
                var _formData = JSON.parse(_data);
                this.modalOpt = {
                    show: true,
                    title: '预览：',
                    msg: _formData.content,
                    cancelClass: 'hide',
                    fullModal: true,
                    formData: _formData,
                    styleOpt: 'overflow-y:auto;height:900px;'
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
            chgCheckBoxCls () {
                if (toolkit.getBrowser().isPc) {
                    return 'rm-checkbox';
                } else {
                    return '';
                }

            },
            toMngHome () {
                this.$store.commit('doCheckReq', true);
                this.$router.push({ name: 'list' });
            },
            modalCancel () {

            },
            modalConfirm () {
                var flag = false;
                if (this.resOpt.success != undefined) {
                    if (this.resOpt.success) {
                        flag = true;
                    }
                }
                if (flag) {
                    this.toMngHome();
                    this.modalOpt.show = false;
                } else {
                    if (this.modalOpt.formData != undefined) {
                        var opt = {
                            cateOpt: this.catelist,
                            data: this.modalOpt.formData
                        };
                        this.$store.commit('doPostData', opt);
                    }

                    this.modalOpt = {
                        show: false
                    };
                }

            },
            updateContentData (data) {
                // console.log('监听到。。。。');
                // console.log(data)
                // console.log(this.$refs.editor_box)
                // console.log(this.$refs.editor_box.content)
                // this.$refs.editor_box.content=data;
                this.postData.content = toolkit.baseEncrypt(data);
                if (data != '') {
                    // if(this.$refs.ele_content.value==''){
                    //
                    // }
                    this.$refs.ele_content.value = toolkit.baseEncrypt(data);
                }
                // console.log(toolkit.baseEncrypt(data))

            },
            getPreData (isForceDo) {
                var reqParam = {};
                // reqParam.menuIndex=this.$route.params.menuIndex;
                var _opt = this.$store.state.mngData.routeData.doReq;
                if (typeof _opt == 'object') {
                    if (_opt.toReq) {
                        if (_opt.postId != undefined) {
                            reqParam.postId = _opt.postId;
                        }
                    }
                } else if (typeof _opt == 'Boolean') {
                    this.$store.commit('doCheckReq', false);
                    this.$store.dispatch('reqPost', reqParam);
                }
                // if(this.$route.params.postId!=undefined){
                //   reqParam.postId=this.$route.params.postId;
                // }
                if (isForceDo) {
                    this.$store.commit('doCheckReq', false);
                    this.$store.dispatch('reqPost', reqParam);
                    this.initData();
                }

            },
            decodeContent (content) {
                return toolkit.baseDecrypt(content);
            },
            chgLineBreakText (content) {
                if (typeof content != 'string') {
                    return content;
                }
                return toolkit.replaceLineBreak(content);
            },
            chgSummary (e) {
                var ele = e.target;
                var opt = {
                    cateOpt: this.catelist,
                    data: this.postData
                };
                var _name = ele.getAttribute('name');
                var _val = ele.value;
                opt.data[_name] = _val;
                this.$store.commit('doPostData', opt);
            }
        },
        computed: mapState({
            postData: function (state) {
                // console.log(state)
                // this.tmpPostId=state.postData.postId;
                // console.log(this.modalShow)
                this.catelist = [];
                var _postData = {};
                var _postDataOpt = state.mngData.routeData.postData;
                // console.log(_postDataOpt)
                if (_postDataOpt != undefined) {
                    this.catelist = _postDataOpt.cateOpt;
                    if (_postDataOpt.data != undefined) {
                        _postData = _postDataOpt.data;
                        _postData.summay = this.chgLineBreakText(_postData.summary);
                        this.summay = _postData.summary;
                        if (_postData.isAdd) {
                            this.postType = 0;
                        }
                    }
                }

                return _postData;
            },
            resOpt: function (state) {
                var resopt = state.mngData.resOpt;
                return resopt;
            },
            checkBoxCls: function () {
                return this.chgCheckBoxCls();
            }

        }),
        watch: {
            summay: {
                deep: true,
                handler (val, oldval) {
                    if (val != undefined) {
                        var len = val.length;
                        if (len > this.summayOpt.sum) {
                            len = this.summayOpt.sum;
                        }
                        this.summayOpt.count = len;
                    }

                }
            },
            resOpt: {
                deep: true,
                handler (val, oldval) {
                    if (val.success != undefined) {
                        this.doPopBox(val.msg);
                    }

                }
            }
        },
        beforeCreate: function () {
            // console.log('beforeCreate 钩子执行...');
            // console.log(this.number)

        },
        cteated: function () {
            // console.log('cteated 钩子执行...');
            // console.log(this.number)

        },
        beforeMount: function () {
            // console.log('beforeMount 钩子执行...');
            // console.log(this.number)

        },
        mounted: function () {
            // console.log('mounted 钩子执行...');
            // console.log(this.$route.params.menuIndex)
            // console.log(this.number)
            this.getPreData(true);
            // console.log("%c \n","font-size:41px;background:url('http://cdn.iknow.bdimg.com/static/common/pkg/module_zed9cd9fd.png') no-repeat -135px -1px");
            // console.log("请在邮件中注明%c来自:console","color:red;font-weight:bold;");
            // console.info('\u60A8\u6253\u5F00\u4E86\u63A7\u5236\u53F0\uFF0C\u8BF7\u4E0D\u8981\u5411\u6211\u70AB\u8000\u3002\u56E0\u4E3A\u5E76\u4E0D\u80FD\u4EE3\u8868\u4EC0\u4E48\uFF0C\u8FD9\u53EA\u662F\u73A9\u73A9\u800C\u5DF2\u3002');

            // window.check = (function () {
            //     var callbacks = [], timeLimit = 50, open = false;
            //     setInterval(loop, 2000);
            //     return {
            //         addListener: function (fn) {
            //             callbacks.push(fn);
            //         },
            //         cancleListenr: function (fn) {
            //             callbacks = callbacks.filter(function (v) {
            //                 return v !== fn;
            //             });
            //         }
            //     }
            //     function loop() {
            //         var startTime = new Date();
            //         // debugger;
            //
            //         if (new Date() - startTime > timeLimit) {
            //             if (!open) {
            //                 callbacks.forEach(function (fn) {
            //                     fn.call(null);
            //                 });
            //             }
            //             open = true;
            //         } else {
            //             open = false;
            //         }
            //     }
            // })();
            //
            // check.addListener(function () {
            //     // alert('Open Devtool');
            //     conosle.log('Open Devtool')
            // });

        },
        beforeUpdate: function () {
            // console.log('beforeUpdate 钩子执行...');
            // console.log(this.number)
        },
        updated: function () {
            // console.log('updated 钩子执行...');
            // console.log(this.number)
            this.getPreData();
        },
        beforeDestroy: function () {
            // console.log('beforeDestroy 钩子执行...');
            // console.log(this.number)
        },
        destroyed: function () {
            // console.log('destroyed 钩子执行...');
            // console.log(this.number)
        }

    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
