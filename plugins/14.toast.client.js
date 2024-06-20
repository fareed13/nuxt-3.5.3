import 'vue-toastification/dist/index.css';
import { useToast } from 'vue-toastification';
import '@/assets/sass/_custom.scss';


export default defineNuxtPlugin((nuxtApp) => {
    try {
        const toast = useToast({
            position: 'top-right',
            timeout: 3000,
            closeButton: false,
            bodyClassName: "toast-body-class",
            toastClassName: "toast-class",
            icon: false,
            hideProgressBar: true,
        })

        return {
            provide: {
                toast
            }
        }
    } catch (e) {
        // nuxtApp.$rollbar.error(e)
        console.error(e)
    }

})