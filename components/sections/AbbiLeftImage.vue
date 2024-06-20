<template>
    <div v-if="sectionReady" class="manage-section">
        <v-container>
            <v-row>
                <v-col
                    lg="6"
                    class="justify-center"
                >
                <div class="abbileft-bg-section">
                    <svg class="m-bg" width="714.094" viewBox="0 0 714.094 737.625">
                        <defs></defs>
                        <path
                            class="ipad-background"
                            fill-rule="evenodd"
                            d="M501,795s124.616-40.066,310-190c0,0,68.856-60.088,32-190,0,0-54.991-180.651-167-291,0,0-31.641-41.4-125-53S246.382,113.884,188,209c-59.41,96.791-48.89,176.17-45,202,0,0,13.547,176.712,128,301S439.588,807.645,501,795Z"
                            transform="translate(-139.75 -69.469)"
                        />
                    </svg>
                    <div class="ipad-main-abbileft">
                      <v-img :src="media ? getMediaUrl(media[0],'x-large') : ''" class="ipad-2"></v-img>
                    </div> 
                </div>                    
                </v-col>
                <v-col
                    lg="6"
                    class="justify-center abbi-left-content-col"
                >
                <div class="abbileft-content-section">
                    <h2 class="heading mb-2" v-html="headline"></h2>
                    <span v-html="content" class="para text-black"> </span>
                    <span class="para text-black" v-html="section"> </span>
                    <ul class="pl-4" v-for="(bullet, i) in bullets" :key="i">
                        <li v-html="bullet"></li>
                    </ul>
                    <v-btn
                        outlined
                        @click="openDialog('abbi_left_image')"
                        class="request-btn text-white mt-3 text-capitalize"
                        >Secure your spot!</v-btn
                    >
                </div>    
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { sections } from '../../mixins/sections';

export default {
    mixins: [sections],

};
</script>
<style lang="scss" scoped>
@import '../../assets/sass/colors';
.manage-section {
    margin-bottom: 0;
    .abbi-left-content-col{
        align-items: center;
        display: flex;
        .abbileft-content-section{
            padding: 0px 20px;
        }
    }
    .ipad-background {
        fill: #f5f5f5; //ipad_backshap_background
    }
    h2 {
        font-family: Khand;
        font-weight: bolder;
        font-size: 50px !important;
        line-height: 1.108;
    }
    .para {
        line-height: 1.667;
    }
    .request-btn {
        font-family: Khand;
        font-weight: bolder;
        font-size: 21px;
        border-radius: 40px;
        width: 280px;
        text-align: center;
        height: auto;
        padding: 0.6rem 0.75rem;
        background: #575cec; //request_btn_background
    }
    .m-bg {
        max-width: 530px;
        height: 650px;
    }
    .abbileft-bg-section{
        position: relative;
    }
    .ipad-main-abbileft{
        position: absolute;
        top:0px;
        bottom:0;
        left: 0;
        right: 0;
        justify-content: center;
        align-items: center;
        display: flex;
    }
    .mob {
        display: none;
    }
    .flex-column {
        position: relative;
        z-index: 8;
    }
    @media (min-width: 2500px) {
        
    }
    @media (min-width: 4000px) {
        .ipad-1,
        .ipad-2,
        .m-bg {
            left: 32%;
        }
    }
    @media (max-width: 2600px) {
       
        .ipad-1,
        .ipad-2 {
            max-width: 500px;
        }
        .ipad-1 {
            margin-top: 30px;
        }
        .ipad-2 {
            margin-top: 120px;
        }
    }
    @media (max-width: 1320px) {
        .m-bg {
            left: 0;
            max-width: 100%;
            margin-top: -20px;
            height: 500px;
        }
        .ipad-1,
        .ipad-2 {
            max-width: 320px;
        }
        .ipad-1 {
            margin-top: 30px;
        }
        .ipad-2 {
            margin-top: 120px;
        }
    }
    @media (max-width: 1263px) {
        .btn-info {
            font-size: 18px;
            width: 100%;
            max-width: 200px;
        }
        
    }

    @media (max-width: 900px) {
        h2 {
            font-size: 36px !important;
        }

        .request-btn {
            font-size: 18px;
            width: 220px;
        }
    }

    @media (max-width: 767px) {
        margin-top: 0;
        margin-bottom: 0;
    }
    @media (max-width: 576px) {
        .m-bg {
            max-width: 350px;
        }
        .ipad-1,
        .ipad-2 {
            max-width: 300px;
        }
    }

    @media (max-width: 399px) {
        .m-bg {
            margin-top: 0;
            max-width: 250px;
        }
        .ipad-1,
        .ipad-2 {
            max-width: 300px;
        }
    }
}
@media only screen and (max-width:767px){
    .manage-section{
        .row{
            display: block;
        }
         .ipad-main-abbileft{
            max-width: 200px;
            margin: auto;    
            bottom:inherit;
         }
         .m-bg{
             max-width: 100%;
         }
    }
}
</style>
