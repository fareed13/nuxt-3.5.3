<template>
    <div class="home-slider landing-page-banner">
        <div>
            <v-carousel :show-arrows="false" hide-delimiters cycle>
                <v-carousel-item
                    cover
                    :src="src"
                    class="img-overlay"
                    gradient="to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)"
                >
                    <div
                        class="d-flex justify-center align-center flex-column h-100 text-center"
                        style="
                            height: 100% !important;
                            margin-top:40px
                        "
                    >
                        <h1 class="pb-0 mb-0">
                            {{ header }}
                        </h1>
                    </div>
                </v-carousel-item>
            </v-carousel>
        </div>
    </div>
</template>
<script>
import { abbiStore } from '../stores';
export default {
    setup() {
        const store = abbiStore();
        return {
            store
        };
    },
    props: ['header', 'background'],
    data: () => ({
        extended: false,
        extendedSlot: false,
        prominent: false,
        dense: false,
        collapse: false,
        flat: true,
        bg: false,
        extensionHeight: 48
    }),
    computed: {
        src() {
            const shared = this.store.organization.shared;
            if (shared.inner_page_media) {
                return (
                    useRuntimeConfig().public.AMAZONAWS_IMAGE_URL +
                    shared.inner_page_media.name +
                    '_1200.' +
                    shared.inner_page_media.extension
                );
            }
            const service = this.store.getServices;
            const random = Math.floor(Math.random() * service.length);
            return `${useRuntimeConfig().public.AMAZONAWS_IMAGE_URL}${
                service[random].large_media.uuid
            }_1200.${service[random].large_media.extension}`;
        },
    }
};
</script>
<style lang="scss" scoped>
// @import '../assets/sass/colors';
@mixin transformAll($pro) {
    transform: $pro;
    -webkit-transform: $pro;
    -ms-transform: $pro;
    -moz-transform: $pro;
}
.home-slider {
    position: relative;
    width: 100%;
    p {
        font-family: Khand;
        font-size: 36px;
        // color: $slider-text-color;
    }
    h1 {
        margin-top: 100px;
        color: white;
    }
    @media (max-width: 991px) {
        h1 {
            font-size: 30px;
        }
    }
    @media (max-width: 600px) {
        h1 {
            margin-top: 270px;
        }
    }
}
</style>