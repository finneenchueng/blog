import { createApp, hydrate } from 'vue';
import AppVue from '@/page/app/App.vue';
import appRouter from '@/router/appRouter';
import { RouteLocationMatched } from 'vue-router';

const App = createApp(AppVue);
export default (context: any) => {
    return new Promise((resolve, reject) => {
        appRouter.push(context.url);
        App.use(appRouter);
        appRouter.isReady().then(()=>{
            Promise.all((appRouter.currentRoute.value.matched as any).flatMap((record: RouteLocationMatched) =>{
                // console.log('sdf:', record)
                // console.log('components:', Object.values(record.components))
                return  Object.values(record.components);
        
            })).then(() => {
                // context.state = store.state
                resolve(App);
            }).catch(reject);
        });

    });
}
