<template>
    <div style="margin-bottom:30px"> 
        <v-container v-if="sectionReady" fluid class="sell-product app-white-background py-12 px-0">
            <v-container>
                <v-row>
                    <v-col
                        md="7"
                        cols="12"
                        class="pr-md-7 d-flex flex-column justify-center "
                    >
                        <div class="content">
                            <h2 class="my-3" v-html="headline">
                            </h2>
                            <span class="para" v-html="content"> </span>
                            <ul class="pl-4" v-for="(bullet, i) in bullets" :key="i">
                                <li>
                                  <v-icon class="mdi text-black font-size3 ml-n6" icon="mdi-arrow-right-thick"></v-icon>
                                  <span v-html="bullet"/></li>
                            </ul>
                            <a>
                                <v-btn
                                    class="v-btn--block d-block text-white mt-3 cta_button btn_animation mb-2"
                                    color="app-main-accent-color"
                                    :style="{
                                        backgroundColor:
                                            store.organization.colors[
                                                'app-main-accent-color'
                                            ] + '!important'
                                    }"
                                    @click="openDialog('general_right_image')"
                                >
                                    <span class="v-btn__content">
                                        <p v-text="store.callToAction" />
                                        <span class="text-wrap">
                                            {{store.getServices[0]?.urgency_headline ?
                                            store.getServices[0].urgency_headline :
                                            "Beginner classes enrolling right now!"}}
                                        </span>
                                    </span>
                                </v-btn>
                            </a>
                        </div>
                    </v-col>
                    <v-col md="5" cols="12" class="pl-md-7 d-flex flex-column justify-center">
                        <span
                            v-if="
                                media && media.length
                                    ? media[0].type === 'video'
                                    : false
                            "
                        >
                            <VideoPlayer
                                :media="getMediaUrl(media[0])"
                                class="image"
                                :style="{
                                    boxShadow:
                                        '-15px -15px 0 ' +
                                        store.organization.colors[
                                            'app-main-accent-dark'
                                        ]
                                }"
                                style="z-index: 1"
                            />
                        </span>
                        <span v-else>
                            <v-img
                                :src="media ? getMediaUrl(media[0], 'medium') : ''"
                                class="image"
                                :style="{
                                    boxShadow:
                                        '-15px -15px 0 ' +
                                        store.organization.colors[
                                            'app-main-accent-dark'
                                        ]
                                }"
                                style="z-index: 1"
                            />
                        </span>
                    </v-col>
                </v-row>
            </v-container>
        </v-container>
        <RightToLeftArrow />
    </div>
</template>

<script>
import { abbiStore } from "../../stores";
import { sections } from '../../mixins/sections';
import RightToLeftArrow from './RightToLeftArrow';
export default {
    setup() {
    const store = abbiStore();
    return {
      store,
    };
  },
    components: {
        RightToLeftArrow,
        VideoPlayer: defineAsyncComponent(() => import('../../components/media/VideoPlayer.vue'))
    },
    mixins: [sections],
    data: () => ({
    }),
};
</script>

<style lang="scss" scoped>
@import '../../assets/sass/colors';
.cta_button {
    background: #d5242c !important;
    //check again
}

h5 {
    color: #9e0007;
    font-size: 18px;
}
.para {
    //  color: $text-black;
    font-size: 16px;
}
.para :deep()  {
    p {
        margin-bottom: 16px;
    }
    ul{
        margin-left: 5%;
    }
}

.sell-product {

    .sell-product span.v-btn__content {
        display: block !important;
    }
    .container{
        @media (min-width: 1904px){
    max-width: 1300px !important;
    }
    }
    overflow: hidden;
    .image {
        box-shadow: -15px -15px 0 #9e0007;
    }
    .v-btn {
        height: auto !important;
        max-height: 100% !important;
        display: block !important;
        flex: none !important;
        padding-top: 15px !important;
        padding-bottom: 15px !important;
        border-radius: 5px;
        position: relative;
        z-index: 1;

        p {
            margin-bottom: 0;
            text-transform: capitalize;
            font-size: 30px;
            font-family: Khand;
            font-weight: bold;
            letter-spacing: 2px;
        }
        span {
            //font-family: Khand;
            font-weight: bolder;
            font-size: 16px;
            text-transform: none;
        }
    }
    .btn_animation{
        animation:rocking 2s infinite;
    animation-timing-function:cubic-bezier(0, 0, 0.58, 1);
    transition:.2s
    }
    @keyframes rocking{0%{transform:rotate(0deg)}25%{transform:rotate(0deg)}50%{transform:rotate(2deg)}75%{transform:rotate(-2deg)}100%{transform:rotate(0deg)}}
    .btn_animation:hover{animation:none !important}
    ul {
      margin: 20px 0;
      padding-left: 20px!important;
      li {
        list-style-type: none;
      }
    }
  strong {
    font-style: normal;
    border-radius: 1em 0 1em 0;
    text-shadow: 1px 1px 1px #fff;
    background-image:
      linear-gradient(-100deg,
        rgba(255,250,150,0.15),
        rgba(255,250,150,0.8) 100%,
        rgba(255,250,150,0.25)
      );
  }

    @media (max-width: 1263px) {
        .v-btn {
            p {
                font-size: 22px;
            }
            span {
                font-size: 12px;
            }
        }
    }
    @media (max-width: 991px) {
        .v-btn {
            p {
                font-size: 30px;
            }
            span {
                font-size: 16px;
            }
        }
    }

    @media (max-width: 599px) {
        .v-btn {
            p {
                font-size: 22px;
            }
            span {
                font-size: 14px;
            }
        }
    }
    @media (max-width: 399px) {
        .v-btn {
            p {
                font-size: 16px;
            }
            span {
                font-size: 10px;
            }
        }
    }
        @media only screen and (max-width: 767px) {
            // .content{
                h2{
                    font-size: 40px!important;
                }
                ul {
            padding-left: 20px!important;
        }
            // }
        .v-btn {
            p {
                font-size: 18px;
            }
            span {
                font-size: 10px;
            }
        }
    }
}
</style>
