<template>
    <div id="top-banner" ref="top-banner" v-scroll="onScroll" v-if="store.banner"
                :class="{ TopBar: isClassShow }">
        <div v-show="!store.dialog">
            <div
                class="hidden-md-and-up text-left"
                sticky
            >
                <v-row no-gutters class="banner-row" justify="center" align="center">
                    <v-col cols="11">
                        <div class="banner-text text-uppercase ">
                          {{ getDeal() }}
                          <span
                            :style="{
                              color: store.organization.colors[
                                      'app-main-accent-color'
                                  ]
                                      ? store.organization.colors[
                                            'app-main-accent-color'
                                        ] + '!important'
                                      : 'crimson'
                              }"
                            @click="store.auth.loggedIn ? store.setDialog(false) : store.setDialog(true)"
                          >
                            {{specialOffer ? 'Specials' : ' New Member Savings'}}</span>{{specialOffer ? '!' : ':'}}
                          <span
                          v-if="store.organization.is_gift_card_enabled"
                              :style="{
                                  color: store.organization.colors[
                                      'app-main-accent-color'
                                  ]
                                      ? store.organization.colors[
                                            'app-main-accent-color'
                                        ] + '!important'
                                      : 'crimson'
                              }"
                              @click="$router.push('/gift-card')"
                              >Gift Cards
                          </span>
                          Available!
                        </div>
                    </v-col>
                    <v-col cols="1">
                        <v-btn
                        variant="text"
                            fab
                            small
                            text
                            style="color: crimson"
                            :style="{
                                color: store.organization.colors[
                                    'app-main-accent-color'
                                ]
                                    ? store.organization.colors[
                                          'app-main-accent-color'
                                      ] + '!important'
                                    : 'crimson'
                            }"
                            v-on:click="store.setBanner(false)"
                        >
                            <v-icon icon="mdi-close" style="font-size:24px"></v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </div>
        </div>
        <div class="hidden-sm-and-down" sticky single-line>
          <!-- center-with-rubby only in firefox workig i change structure wit grid system -->
          <v-row justify="center" align="center" class="  ">
            <v-col cols="11" class="pl-0 py-6">
              <div class="banner-text text-uppercase ">
                {{ getDeal() }}
                <span
                  :style="{
                  color: store.organization.colors[
                          'app-main-accent-color'
                      ]
                          ? store.organization.colors[
                                'app-main-accent-color'
                            ] + '!important'
                          : 'crimson'
                  }"
                  @click="store.auth.loggedIn ? store.setDialog(false) : store.setDialog(true)"
                >{{specialOffer ? 'Specials' : ' New Member Savings'}}</span>{{specialOffer ? '!' : ':'}}
                <span
                    v-if="store.organization.is_gift_card_enabled"
                    :style="{
                        color: store.organization.colors[
                            'app-main-accent-color'
                        ]
                            ? store.organization.colors[
                                  'app-main-accent-color'
                              ] + '!important'
                            : 'crimson'
                    }"
                    @click="$router.push('/gift-card')"
                >
                    Gift Cards
                </span>
                Available!
              </div>
            </v-col>
            <v-col cols="1" class="pr-0 py-6 text-right">
                <v-btn 
                  variant="text" 
                  size="small"  
                  :style="{
                    color: store.organization.colors['app-main-accent-color']
                        ? store.organization.colors['app-main-accent-color'] + '!important'
                        : 'crimson'
                    }" 
                  
                  class="banner-closebtn"
                  v-on:click="store.setBanner(false)"
                >
                <v-icon icon="mdi-close" style="font-size:24px"></v-icon>
              </v-btn>
            </v-col>
          </v-row >
        </div>
    </div>
</template>
<script>
import {abbiStore} from '../stores'
// import {offerDealMixin} from '../mixins/offerDeal'

export default {
  setup () {
        const store = abbiStore()
        return {
        store
        }
    },
    props: {
        active: {
            default: true,
            type: Boolean
        }
    },
    // mixins: [offerDealMixin],
    data: () => ({
        isClassShow: false,
    }),
    methods: {
        onScroll(e) {
            if (typeof window === 'undefined') {
                return;
            }
            const top = window.pageYOffset || e.target.scrollTop || 0;
            this.isClassShow = top > 100;
        },
    }
};
</script>
<style lang="scss" scoped>
  @import '../assets/sass/colors';
  .center-with-rubby{
    display: ruby;
  }
.banner-row {
    // margin-top: -20px;
    display:flex;
    justify-content: center;

    .gift-top-banner{
      display: flex;
      align-items: center;
      flex-grow: 1;
    }
}
.banner-text {
  font-size: 30px !important;
  font-weight: 600;
  line-height:31px;
  span {
    cursor:pointer;
  }
}
#top-banner {
  min-height: 57px;
  padding:0px 20px;
}
@media only screen and (max-width:767px) {
  #top-banner{
    padding: 10px 30px;
    .banner-row{
      padding-top:10px;
    }
  }
}
@media (min-width: 375px) and (max-width: 694.99px) {
    .banner-text {
        font-size: 12px !important;
    }
}
@media (min-width: 695px) and (max-width: 1060.99px) {
    .banner-text {
        font-size: 15px !important;
    }
}
@media (min-width: 1061px) and (max-width: 1350px) {
    .banner-text {
        font-size: 20px !important;
    }
}
@media(min-width:768px) and (max-width:1024px){
  #top-banner{
      padding:11px 20px !important;
      .banner-text{
        line-height: 40px;
      }
      .banner-closebtn{
        float: right;
      }
  }
}
</style>
