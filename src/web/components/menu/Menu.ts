import { defineComponent, onBeforeMount } from 'vue';
import { clickStore } from '../../store/click-store';
import { menuList } from '@/utils/constant';
import { router } from '@/entry/router/appRouter';

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
        toggleRoute(e: MouseEvent) {
            console.log(this)
            // console.log(this.$route)
            return;
            const ele = e.target as HTMLAnchorElement;
            const i = ele.getAttribute("data-index") as string;
            const index = Number.parseInt(i);
            console.log(this.menu_list[index].routePath)
            router.push(this.menu_list[index].routePath);
            // this.$router.push(this.menu_list[_i].routePath);
            // this.$store.commit('markMenuItem', _i);
        },
        
        
    },
    mounted() {
        
    },
});