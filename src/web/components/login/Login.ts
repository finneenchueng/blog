import { defineComponent, ref, onBeforeMount, reactive, watch } from 'vue';
import { clickStore } from '@/store/click-store';
import { commonStore } from '@/store/common-store';
import { initLanguage } from '@/utils/locale';
import MenuVue from '@/components/menu/Menu.vue';
import FooterVue from '@/components/footer/Footer.vue';
import ArchiveVue from '@/components/archive/Archive.vue';

export default defineComponent({
    components: {
        Menu: MenuVue,
        Footer: FooterVue,
        ArticleView: ArchiveVue,
    },
    // setup() {
    //     const count = ref(0)
    //     const inc = () => {
    //         count.value++;
    //     }

    //     return {
    //         count,
    //         inc
    //     }
    // },
    setup(props, context) {
        initLanguage();
        console.log('props;', props)
        onBeforeMount(async () => {
            console.log('APP onBeforeMount')
            await clickStore.init();
            // await commonStore.init();
        });

        const inc = () => {
            clickStore.incrementCount()
            // should throw a warning and don't mutate the store
            // clickStore.getState().count++
        }
        const state = reactive({ currentIndex: 0 })
        watch(
            () => state.currentIndex,
            (currentIndex, prevCurrentIndex) => {
                console.log('prevCurrentIndex:', prevCurrentIndex)
                console.log('currentIndex:', currentIndex)
            }
        )
        return {
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