<template>
   <div class="light-gray-section light-gray-bg">
    <div class="container custom-container-team">
      <div class="hp-title-box">
        <h3>{{headline}}</h3>
        <div class="p" v-if="content" v-html="content"></div>
      </div>
      <v-row class="mt-10">
        <v-col class="mt-7" md="4" sm="4" v-for="(instructor, ig) in instructors.slice(0, 3)" :key="ig">
         <div class="cocahes-card">
          <div style=" flex-direction: column; align-items: center;">

            <v-img
              :src="getInstructorMediaUrl(instructor.media)"
              class="d-flex instructer-media"
              height="400"
              cover
            >
            </v-img>
            <!-- <div class="d-flex justify-end"> -->
            <h3 style="font-size: 20px;">{{ instructor.name }}</h3>
            <!-- </div> -->
          </div>
          <span class="coaches-title" :style="{color:store.organization.colors['app-main-accent-color']+'!important',fontFamily:'poppin'+ '!important'}">{{subtitle}}</span>
        </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
  import { abbiStore } from "../../stores";
  import { sections } from '../../mixins/sections'
  export default {
    setup() {
    const store = abbiStore();
    return {
      store,
    };
  },
    mixins: [sections],
    props: ['service_id'],
    data () {
      return {
        instructors: [],
      }
    },
    methods: {
      getInstructorMediaUrl(mediaObj) {
        return useRuntimeConfig().public.AMAZONAWS_IMAGE_URL +
        (mediaObj ? mediaObj.uuid : '') +
        '_700.' +
        (mediaObj ? mediaObj.extension : 'jpg')
      }
    },
    created() {
      this.instructors = this.store.organization.staffs;
    }
  }
</script>

<style lang="scss" scoped>
.custom-container-team{
  margin-left: auto;
  margin-right: auto;
  max-width: 70%;
}
.light-gray-section{
    &.light-gray-bg{
        background:#EEEEEE;
        padding:70px;
    }
    .hp-title-box{
        h3{
            font-size: 45px;
            line-height: 64px;
            letter-spacing: 1px;
            text-transform:uppercase;
            text-align:center;
            font-weight: 800;
            color: #111111;
            margin-bottom:20px;
            max-width:850px;
            margin:auto;
        }
        .p{
            text-align:center;
            font-size: 16px;
            color:#777777;
            line-height: 31px;
            max-width:700px;
            margin:auto;
        }
    }
  .cocahes-card{
    position:relative;
      h3{
        text-transform:uppercase;
        text-align:center;
        font-weight:900;
        margin-top:10px;
        // margin-right:20px;
      }
      .v-image{
        margin-right:30px;
      }
      .coaches-title{
        position:absolute;
        top:53px;
        right:-63px;
        text-transform:uppercase;
        transform:rotate(-270deg);
        color:#d5242c;
      }
      &:after{
        content: '';
        position: absolute;
        height: 150px;
        width: 1px;
        background: #d5242c;
        bottom: 39px;
        right: -13px;
        transition:0.2s;
      }
      &:hover{
        &:after{
          height: 180px;
          transition:0.2s;
        }
      }
   }
}
@media only screen and (max-width: 1500px) and (min-width: 1400px){
  .custom-container-team{
  max-width: 90%;
}
}
@media only screen and (max-width: 1300px){
  .custom-container-team{
  max-width: 100%;
}
}
@media only screen and (max-width:767px){
  .custom-container-team{
    max-width: 80%;
  }
  .cocahes-card{
    h3{
      margin-right: 0px;
    }
     .coaches-title{
        right:-75px!important;
     }
  }
    .light-gray-section{
      &.light-gray-bg{
          padding:40px 0px;
      }
      .hp-title-box{
        h3{
           font-size: 33px;
           line-height: 44px;
           margin-bottom:10px;
        }
      }
    }
}
@media(min-width:768px) and (max-width:1024px){
  .light-gray-section{
    &.light-gray-bg{
      padding: 48px 11px;
      .hp-title-box{
        h3{
         font-size: 37px;
         line-height: 45px;
        }
      }
    }
  }
}
</style>
