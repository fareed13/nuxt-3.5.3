<template>
    <v-container fluid class="blog-post-container">
        <v-container>
            <v-row>
                <v-col cols="12">
                    ​
                    <div class="blog-post d-block clearfix">
                        <h2 class="d-block text-center mb-5">{{title}}</h2>
                        <div v-if="media" class="blog-post-img d-block mr-6 mb-3">
                            <video
                                v-if="media?.media_type === 'video'"
                                class="video-size"
                                ref="video"
                                autoplay
                                loop
                                muted
                                playsinline
                            >
                                <source
                                    :src="
                                        media
                                            ? getMediaUrl(media, 'small')
                                                  .name
                                            : ''
                                    "
                                    type="video/mp4"
                                />
                            </video>
                            <v-img
                                v-if="
                                    (media &&
                                        media.media_type == 'image') ||
                                    !media
                                        ? true
                                        : false
                                "
                                class="align-end text-white"
                                height="200"
                                :src="
                                    !media
                                        ? getLogo
                                        : getMediaUrl(media)
                                "
                                contain
                            >
                            </v-img>
                        </div>
                        <span v-html="content"></span>
                        <div class="blogDetail-files" v-if="files && files.length > 0">
                            <h2 class="mb-5">Blog Files</h2>
                            <v-list>
                                <v-list-item class="link-page" v-for="(item, i) in files" :key="i">
                                    <v-list-item-icon>
                                        <v-icon icon="mdi-file"></v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title @click="openFile(item)" v-text="item"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </div>
                    </div>​
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>
​
<script>
import { blogMediaMixin } from '../../mixins/blogMediaMixin'
import { abbiStore } from '../../stores';
import { mapState, mapActions } from 'pinia'


export default {
    setup() {
        const store = abbiStore();
        return {
            store
        };
    },
    mixins: [blogMediaMixin],
    props: {
        title: {
            default: ''
        },
        media: {
            default: null
        },
        content: {
            default: ''
        },
        files: {
            type: Array,
            default: () => []
        },
        extension: {
            default: 'png'
        }
    },
    data() {
        return {
            video: false,
        };
    },
    computed: {
    ...mapState(abbiStore, ['getLogo'])
    },
    methods: {
        // method to open file in new tab
        openFile(filePath) {
            window.open(filePath, '_blank');
        }
    }
};
</script>
​
<style lang="scss" scoped>
@import '../../assets/sass/colors';
.link-page {
    cursor: pointer;
    margin: 5px;
}
.blog-post-container {
    background: #f3f3f3;
    .clearfix {
        &::after {
            content: '';
            clear: both;
            display: table;
        }
    }
    .blog-post {
        padding: 30px;
        margin: 20px 0;
        background: #ffffff;
        border-radius: 5px;
        box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
        .read-more {
            float: right;
            font-size: 16px;
            height: auto;
            padding: 3px 7px !important;
            padding-left: 20px !important;
            font-family: Khand-Bold;
            background: transparent !important;
            color: #d5242c;
            border: 2px solid #d5242c;
            border-radius: 30px;
            .v-icon {
                background: #d5242c;
                color: #ffffff;
                padding: 15px;
                border-radius: 20px;
            }
        }
        .blog-post-img {
            float: left;
            width: 100%;
            max-width: 400px;
        }
        ​ h2 {
            font-size: 40px;
            font-family: Khand-Bold;
        }
    }
    @media (max-width: 750px) {
        .blog-post {
            .blog-post-img {
                float: none;
                text-align: center;
                margin: 0 auto !important;
                margin-bottom: 20px !important;
            }
        }
    }
}
</style>
