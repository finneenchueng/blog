import { defineComponent, onBeforeMount } from 'vue';
import { commonStore } from '../../store/common-store';
import { router } from '@/entry/router/appRouter';
import { $t } from '@/utils/locale';

export default defineComponent({
    setup(props, context) {
        console.log('props;', props)
        // console.log('context;', context)
        // console.log(' context.attrs;',  context.attrs)
        // console.log('context.slots;', context.slots)
        // console.log('context.emit;', context.emit)
       
        
        
        onBeforeMount(async () => {
            // await commonStore.init()
        })
        return {
            isPc: true,
            globalState: commonStore.getState(),
            $t,
        }
    },
    methods: {
        toggleRoute(index: number, routePath: string) {
            // router.push(routePath);
            commonStore.setMenuIndex(index);
        },
        
        
    },
    mounted() {
        
    },
});