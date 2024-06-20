<template>
  <div v-if="sectionReady" fluid class="big-back-with-png px-0" :style="cssProps">
    <div class="big-bgimage-main" :style="{ background: `url(${getBackgroundUrl()})` }">
      <div class="container-custom">
        <div class="bigimage-caption" :style="{ display: 'flex', justifyContent: 'center' }">
          <v-row :style="{ maxWidth: '1185px' }">
            <v-col class="bigimage-leftContent" cols="12" md="6">
              <h1 class="text-white font-size-custom">{{headline}}</h1>
              <span class="text-para text-white" v-html="content"></span>
              <div class="pt-4">
              <ul class="pl-5" v-for="(   bullet, i   ) in    bullets   " :key="i">
                <li>
                  <v-icon class="mdi text-white font-size3 ml-n6" icon="mdi-arrow-right-thick"> </v-icon>
                  <span class="text-white ml-2" v-html="bullet" />
                </li>
              </ul>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="video-box-bgImg">
                <img v-if="media && media.length ? media[0].type !== 'video' : false" class="right-image" contain
                  :src="getMediaUrl(media[0])" />
                <video ref="video" autoplay loop muted playsinline v-else>
                  <source :src="media ? getMediaUrl(media[0], 'medium').name : ''" type="video/mp4" />
                </video>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { sections } from '../../mixins/sections';
import { abbiStore } from '../../stores';

export default {
   setup () {
      const store = abbiStore()
      return {
      store
      }
    }, 
  mixins: [sections],
  computed: {
    cssProps() {
      return {
        '--background-color': this.backgroundColor
          ? this.backgroundColor
          : 'yellow'
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.big-bgimage-main {
  width: 100%;
  height: 750px;
  background-size: cover !important;
  align-items: center;
  text-align: left;
  justify-content: left;
  display: flex;
  background-color: black;
 .font-size-custom{
      font-size: 50px;
    }
  .container-custom {
    width: 85% !important;
    margin-left: auto;
    margin-right: auto;
  }

  .bigimage-caption {
    h2 {
      line-height: 1;
      font-size: 60px !important;
      margin-bottom: 30px;
      margin-top: 40px;
    }

    .text-para {
      font-size: 18px;
    }

    .video-box-bgImg {
      video {
        z-index: 2;
        width: 100%;
        max-width: 100%;
        height: 100% !important;
        max-height: 427px !important;
      }
    }
  }

  .right-image {
    width: 100%;
  }
}

@media only screen and (max-width:767px) {
  .big-bgimage-main {
    height: auto;
    padding: 50px 20px;

    .container-custom {
      width: 100% !important;
      margin-top:30px
    }

    .bigimage-caption {
      h2 {
        font-size: 36px !important;
        line-height: 42px;
      }
      
    }
   .font-size-custom{
      font-size: 30px;
    }
  }
}

@media(min-width:768px) and (max-width:1024px) {
  .big-bgimage-main {
    height: auto;
    padding: 50px 20px;

    h2 {
      margin-top: 0px;
    }
  }
}
</style>
