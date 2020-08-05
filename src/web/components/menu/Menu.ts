import { defineComponent, onBeforeMount } from 'vue';
import { clickStore } from '../../store/click-store';
import { menuList } from '@/utils/constant';

export default defineComponent({
    setup(props, context) {
        console.log('props;', props)
        // console.log('context;', context)
        // console.log(' context.attrs;',  context.attrs)
        // console.log('context.slots;', context.slots)
        // console.log('context.emit;', context.emit)
       
        
        
        onBeforeMount(async () => await clickStore.init())

        const inc = () => {
            clickStore.incrementCount()
            // should throw a warning and don't mutate the store
            // clickStore.getState().count++
        }
        console.log('menuList:', menuList)
        return {
            isPc: true,
            menu_list: menuList,
            countState: clickStore.getState(),
            isInitialized: clickStore.getIsInitialized(),
            inc
        }
    },
    methods: {

        
    },
    mounted() {
        
    },
});