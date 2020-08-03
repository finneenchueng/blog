import { defineComponent, onBeforeMount } from 'vue'
import { clickStore } from '../../store/click-store'

export default defineComponent({
    setup() {
        onBeforeMount(async () => await clickStore.init())

        const inc = () => {
            clickStore.incrementCount()
            // should throw a warning and don't mutate the store
            // clickStore.getState().count++
        }

        return {
            isPc: true,
            menu_list: [],
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