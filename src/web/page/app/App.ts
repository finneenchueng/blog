import { defineComponent, ref } from 'vue';
import Menu from '@/components/menu/Menu.vue';
import Footer from '@/components/footer/Footer.vue';

export default defineComponent({
    components: {
        Menu,
        Footer
    },
    setup() {
        const count = ref(0)
        const inc = () => {
            count.value++;
        }

        return {
            count,
            inc
        }
    },
    methods: {

        
    },
    mounted() {
        
    },
});