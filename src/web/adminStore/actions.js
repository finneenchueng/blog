import Vue from 'vue';
import VueResource from 'vue-resource'; // get $http
import compiles from '../../server/logicCheck/compile';

Vue.use(VueResource);
const actions = {
    getData (context, object) {
        const { progress, isRefresh } = object;
        progress.$Progress.start();
        context.commit('updateLoadingState', false);
        context.commit('updateBusyState', true);

        /**
         * use vue-resource
         */
        Vue.http.get('/mock/api.json').then((response) => {
            const json = response.data;
            context.commit('updateLoadingState', true);
            context.commit('updateBusyState', false);
            if (isRefresh === true) {
                context.commit('refreshData', json);
            } else {
                context.commit('addData', json);
            }
            progress.$Progress.finish();
        }, () => {
            context.commit('updateBusyState', false);
            progress.$Progress.fail();
        });
    },
    reqPost (context, param) {
        var condition = compiles.getPostParamOption(param);
        /**
         * use vue-resource
         */
        Vue.http.post('/mng/post', condition).then((response) => {
            var json = compiles.parseJsonResult(response.body);
            context.commit('doPostData', json);
            // progress.$Progress.finish();
        }, (response) => {
            if (response.status == 800) {
                var json = compiles.parseJsonResult(response.body);
                context.commit('doSessionData', json);
            }
        });
    },
    reqModPost (context, param) {
        var condition = compiles.getPostParamOption(param);
        Vue.http.post('/mng/post', condition).then((response) => {
            var json = compiles.parseJsonResult(response.body);
            // console.log(json)
            // console.log(context)
            if (json.success) {
                context.dispatch('reqAdminList', {});
                // context.commit('doModData', param);
            } else {
                context.commit('doResponseOption', json);
            }
        }, (response) => {
            if (response.status == 800) {
                var json = compiles.parseJsonResult(response.body);
                context.commit('doSessionData', json);
            }
        });
    },
    reqDelPost (context, param) {
        console.log(param);
        var condition = compiles.getPostParamOption(param);
        Vue.http.post('/mng/post', condition).then((response) => {
            var json = compiles.parseJsonResult(response.body);
            var _list = context.state.mngData.routeData.postDataList;
            // if(json.success){
            //   var temp_arr=[];
            //   var post_str=param.postId;
            //   var arr=[];
            //   if(post_str!=undefined){
            //     if(post_str.indexOf(',')==-1){
            //       arr.push(post_str);
            //     }else{
            //       arr=post_str.split(',');
            //     }
            //     for(var k=0;k<_list.length;k++){
            //       var item=_list[k];
            //       var flag=true;
            //       for(var j=0;j<arr.length;j++){
            //         if(item.postId==arr[j]){
            //           flag=false;
            //           break;
            //         }
            //       }
            //       if(flag){
            //         temp_arr.push(item);
            //       }
            //
            //     }
            //     _list=temp_arr;
            //
            //   }
            //
            // }
            context.commit('doResponseOption', json);
        }, (response) => {
            if (response.status == 800) {
                var json = compiles.parseJsonResult(response.body);
                context.commit('doSessionData', json);
            }
        });
    },
    reqAdminList (context, param) {
        var condition = compiles.getPostParamOption(param);
        /**
         * use vue-resource
         */
        Vue.http.post('/mng/list', condition).then((response) => {
            var json = compiles.parseJsonResult(response.body);
            context.commit('doPostDataList', json);
        }, (response) => {
            if (response.status == 800) {
                var json = compiles.parseJsonResult(response.body);
                context.commit('doSessionData', json);
            }
        });
    }
};
export default actions;
