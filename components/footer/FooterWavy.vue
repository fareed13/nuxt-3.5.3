<template>
  <div class="footer footer-bg" :style="{ backgroundImage: `url(${footerBgimage})` }">
    <v-container>
      <v-row justify="center" align="center">
        <v-col md="4" sm="4">
          <div class="footer-widget ">
            <v-icon color="#636363" icon="mdi-phone"></v-icon>
            <p> <a style="color: #fff; text-decoration: none;" :href="phoneLink">{{store.location.pretty_phone}}</a></p>
          </div>
        </v-col>
        <v-col md="4" sm="4">
          <div class="logo-widget">
            <v-img
              :src="logo"
              contain
              width="220"
            >
            </v-img>
          </div>
        </v-col>
        <v-col md="4" sm="4">
          <div class="footer-widget">
            <v-icon color="#636363" icon="mdi-email"></v-icon>
            <p><a style="color: #f0f0f0; text-decoration: none;" class="p" :href="mailLink">{{store.location.email}}</a></p>
          </div>
        </v-col>
        <v-col sm="12" md="12">
          <div class="logo-widget">
          <div class="bottom-terms-bar" v-if="isAustralia">
            <v-btn small to="/terms-of-service" color="#fff" text variant="plain" >Terms of service </v-btn>|
            <v-btn small to="/refund-policy" color="#fff" text variant="plain" >Refund Policy</v-btn>
            <span v-if="store.locations.length < 2">|</span>
            <v-btn v-if="store.locations.length < 2" small color="#fff" text variant="plain" >ABN: {{store.location.abn}} </v-btn>
          </div>
           <p>© Copyright {{ new Date().getFullYear() }} | {{store.domain }} |
              <nuxt-link to="/privacy-policy">Privacy Policy</nuxt-link>
              <span class="designby-tagline">Website Integrated by
               <a
                target="_blank"
                href="https://abbi.ai"
               >Abbi.AI</a>
              </span>
            </p>
            <div class="footer-socialIcon" v-if="store.location.social_media && store.location.social_media.length > 0">
              <v-btn variant="outlined" rounded color="#f9f9f9" v-for="(sm, i) in store.location.social_media" :key="i" :href="sm.url" target="_blank">
                <v-icon color="#f9f9f9" size="18">{{social[sm.platform.toLowerCase()]}}</v-icon>
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
  import { abbiStore } from '../../stores';
  import footerBgimage from "../../assets/img/footer-bg.png"
  import { footerMixin } from '../../mixins/footerMixin'
  export default {
      setup () {
        const store = abbiStore()

        return {
        store
        }
    },
    mixins: [footerMixin],
    data: () => ({
      footerBgimage,
      social: {
        linkedin: 'mdi-linkedin',
        yahoo: 'mdi-yahoo',
        facebook: 'mdi-facebook',
        instagram: 'mdi-instagram',
        twitter: 'mdi-twitter',
        google: 'mdi-google',
        snapchat: 'mdi-snapchat',
        pinterest: 'mdi-pinterest'
      },
    })
  }
</script>
<style lang="scss" scoped>
  .footer-bg{
    padding:100px 0px;
    text-align:center;
    background-size:cover;
    padding-bottom:130px;
    .logo-widget{
      text-align:center;
      position:relative;
      top:110px;
      .v-image{
        margin:auto;
      }
      p{
        color:#fff;
        font-size:13px;
        margin-top:15px;
      }
      .footer-socialIcon{
        .v-btn{
          height: 35px;
          min-width:35px !important;
          padding: 0 0;
          margin:0 7px;
        }
      }
      .designby-tagline{
        color: #fff;
        line-height: 36px;
        padding-bottom: 5px;
        display: block;
        font-size:13px;
      }
    }
    .footer-widget{
      position:relative;
      top:100px;
      p{
        color:#fff;
        font-size:13px;
        margin-top:5px;
        &:before{
          content: '';
          position: absolute;
          width: 200px;
          height: 2px;
          background: #fff;
          margin: auto;
          left: 0;
          margin-top: 46px;
          right: 0;
        }
      }
    }
  }
  @media only screen and (max-width:767px){
    .footer-bg{
      .col{
        flex-basis: 100%;
      }
      .logo-widget{
        .footer-socialIcon{
          .v-btn{
              min-width: 44px!important;
          }
        }
      }
    }
  }
  @media(min-width:1904px) and (max-width:2800px){
    .footer-bg{
      padding: 170px 0px;
    }
  }
</style>
