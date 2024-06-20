<template>
    <v-container fluid class="blog-post-container">
        <v-container>
            <!-- <client-only>
                <BlogsReorder
                    :popup="orderPopup"
                    :closePopup="() => (orderPopup = false)"
                    v-if="
                        orderPopup &&
                        store.location.blogs &&
                        store.location.blogs.length > 1
                    "
                />
                <BlogsAddEdit
                    v-if="isAdminLoggedIn()"
                    :popup="editPopup"
                    :toggleEditPopup="toggleEditPopup"
                    :blog="selectedBlog"
                />
                <DeleteWarning
                    v-if="isAdminLoggedIn()"
                    :popup="deletePopup"
                    :onConfirm="deleteBlog"
                    :onCancel="toggleDeletePopup"
                />
            </client-only> -->
            <!-- <client-only>
                <div v-if="isAdminLoggedIn()" class="text-center">
                    <v-btn
                        class="add-review-btn mx-1"
                        @click="toggleEditPopup('new')"
                    >
                        <v-icon
                            class="mr-1"
                            icon="mdi-plus-circle-outline"
                        ></v-icon
                        >Add Blog (admin)
                    </v-btn>
                    <v-btn
                        color="error"
                        class="add-review-btn mt-3 mt-sm-0 mx-1"
                        @click="orderPopup = true"
                        >Change Blogs Order</v-btn
                    >
                </div>
            </client-only> -->

            <v-row class="mt-5 mb-2">
                <v-col sm="4" cols="12" v-for="(blog, ig) in blogs" :key="ig">
                    <v-card
                        class="mx-auto blog-post d-block clearfix card-outter"
                        max-width="400"
                    >
                        <div
                            :class="
                                showFullContent[ig]
                                    ? 'card-max-height'
                                    : 'card-max-height-full'
                            "
                        >
                            <!-- <p >this class apply when click on redmore button the height of card increase other wise max-height apply{{showFullContent[ig] ? 'text true' : 'text false'}}</p> -->
                            <!-- <client-only>
                                <div class="text-center mb-3">
                                    <v-icon
                                        class="edit-btn"
                                        v-if="isAdminLoggedIn()"
                                        @click="toggleEditPopup(blog)"
                                        icon="mdi-table-edit"
                                    ></v-icon>
                                    <v-icon
                                        class="delete-btn"
                                        v-if="isAdminLoggedIn()"
                                        @click="toggleDeletePopup(blog)"
                                        icon="mdi-delete"
                                    ></v-icon>
                                </div>
                            </client-only> -->

                            <video
                                v-if="blog.media?.media_type === 'video'"
                                class="video-size"
                                ref="video"
                                autoplay
                                loop
                                muted
                                playsinline
                            >
                                <source
                                    :src="
                                        blog.media
                                            ? getMediaUrl(blog.media, 'small')
                                                  .name
                                            : ''
                                    "
                                    type="video/mp4"
                                />
                            </video>
                            <v-img
                                v-if="
                                    (blog.media &&
                                        blog.media.media_type == 'image') ||
                                    !blog.media
                                        ? true
                                        : false
                                "
                                class="align-end text-white"
                                height="200"
                                :src="
                                    !blog.media
                                        ? store.getLogo
                                        : getMediaUrl(blog.media)
                                "
                                contain
                            >
                            </v-img>

                            <v-card-title class="pt-4">
                                {{ blog.title }}
                            </v-card-title>
                            <v-card-text>
                                <!-- <p>this condition to show hide read more button on content length {{blog.content.length }}</p> -->
                                <div v-if="showFullContent[ig]">
                                    <div
                                        class="content-color"
                                        v-html="blog.content"
                                    />
                                </div>
                                <div v-else>
                                    <div
                                        class="content-color"
                                        v-html="truncatedContent(blog.content)"
                                    />
                                </div>
                                <!-- <v-btn
                                    v-if="blog.content.length > 300"
                                    color="orange"
                                    @click="toggleContent(ig)"
                                >
                                    {{
                                        showFullContent[ig]
                                            ? 'Read Less'
                                            : 'Read More'
                                    }}
                                </v-btn> -->
                            </v-card-text>
                            <v-card-actions class="card-actions-custom d-block">
                                <div class="justify-self-end">
                                    <v-btn
                                        class="read-more mb-2"
                                        :to="{
                                            name: 'blog-slug',
                                            params: { slug: getSlugValue(blog) }
                                        }"
                                    >
                                        Read More
                                        <v-icon
                                            class="ml-1"
                                            right
                                            dark
                                            icon="mdi-chevron-double-right"
                                        ></v-icon>
                                    </v-btn>
                                </div>
                            </v-card-actions>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
// import { authMixin } from '../../mixins/authMixin';
// import BlogsReorder from '../../components/blog/BlogsReorder';
// import BlogsAddEdit from '../../components/blog/BlogAddEdit';
// import DeleteWarning from '../warnings/DeleteWarning.vue';
// import { secureCalls } from '../../mixins/apiCalls';
import { abbiStore } from '../../stores';
import { blogMediaMixin } from '../../mixins/blogMediaMixin'


export default {
    setup() {
        const store = abbiStore();
        return {
            store
        };
    },
    mixins: [blogMediaMixin],
    components: {
        VideoPlayer: defineAsyncComponent(() =>
            import('../../components/media/VideoPlayer.vue')
        ),
        // DeleteWarning,
        // BlogsAddEdit,
        // BlogsReorder
    },
    data() {
        return {
            orderPopup: false,
            showFullContent: [],
            blogs: '',
            selectedBlog: null,
            editPopup: false,
            deletePopup: false,
            video: false
        };
    },
    computed: {
        truncatedContent() {
            return (content) => {
                // wordlimit should be 50 if increase it all blog card getting scroll which is not good looking
                const wordLimit = 50;
                if (typeof content === 'string') {
                    const words = content.split(' ');
                    if (words.length <= wordLimit) {
                        return content;
                    } else {
                        return words.slice(0, wordLimit).join(' ') + '...';
                    }
                } else {
                    return content; // Return the content as is if it's not a string
                }
            };
        }
    },

    methods: {
        toggleContent(index) {
            if (index in this.showFullContent) {
                this.showFullContent[index] = !this.showFullContent[index];
            } else {
                this.showFullContent[index] = true;
            }
        },
        toggleDeletePopup(item) {
            this.selectedBlog = item;
            this.deletePopup = item ? true : false;
        },
        toggleEditPopup(item) {
            if (item === 'new') {
                this.selectedBlog = null;
                this.editPopup = true;
            } else {
                this.selectedBlog = item;
                this.editPopup = item ? true : false;
            }
        },
        getSlugValue(blog) {
            const name = blog.title
                ? blog.title.toLowerCase().replace(/[\s]/gi, '-') + '-'
                : '';
            return `${name}${blog.id}`;
        },
        getMediaPath(blog) {
            let path = '';
            if (blog.media.media_type !== 'video') {
                path = `${useRuntimeConfig().public.AMAZONAWS_IMAGE_URL}${
                    blog.media_id
                }_700.${blog.media.extension}`;
            }
            return path;
        },
        // check if blog has media or not
        haveMeida(blog) {
            return blog.media_id ? true : false;
        },
        async deleteBlog() {
            if (this.selectedBlog) {
                try {
                    const response = await this.deleteApiCalls(
                        this.secureEndpoint.BLOG,
                        this.selectedBlog.id
                    );
                    if (process.client) {
                        this.$toast.success('Blog deleted successfully', {
                            duration: 15000
                        });
                    }
                    this.blogs = this.blogs.filter(
                        (b) => b.id !== this.selectedBlog.id
                    );
                    this.toggleDeletePopup();
                } catch (error) {
                    if (process.client) {
                        this.$toast.error(error, {
                            duration: 15000
                        });
                    }
                    this.toggleDeletePopup();
                }
            }
        }
    },
    async created() {
        const location = this.store.location;
        this.blogs = location.blogs;
    }
};
</script>

<style lang="scss" scoped>
@import '../../assets/sass/colors';
.blog-post-container {
    background: #f3f3f3;
    .card-max-height {
        // background-color: blue;
        height: 100% !important;
        padding-bottom: 25px;
    }
    .card-max-height-full {
        // background-color: red;
        height: 650px;
        padding-bottom: 30px;
        overflow: hidden;
        // overflow-y: scroll;
    }
    .video-size {
        max-height: 200px;
        width: 100%;
        object-fit: cover;
    }
    .card-outter {
        padding-bottom: 50px;
    }
    .card-actions-custom {
        position: absolute;
        bottom: 0;
        width: 85%;
        background-color: white;
        margin-top: 4px;
    }
    // for some reason deep selector not working thats why write two deep selector due to this second one is working
    .content-color :deep() {
        h1 {
            color: red !important;
        }
    }
    .content-color :deep() {
        h1 {
            color: black !important;
            font-size: 30px!important;

        }
        h2 {
            font-size: 30px!important;
        }
        img {
            max-width: 300px !important;
            object-fit: contain !important;
            max-height: 530px;
        }
    }
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
        .read-more {
            float: right;
            font-size: 16px;
            height: auto;
            padding: 3px 7px !important;
            padding-left: 20px !important;

            background: transparent !important;
            color: #d5242c;
            border: 2px solid #d5242c;
            border-radius: 30px;
            .v-icon {
                background: #d5242c;
                color: #ffffff;
                padding: 0;
                width: 32px;
                height: 32px;
                border-radius: 20px;
                text-align: center;
                display: flex;
            }
        }
        .blog-post-img {
            float: left;
            width: 100%;
            max-width: 400px;
        }

        h2 {
            font-size: 40px;
        }
    }
    @media (max-width: 750px) {
        .blog-post {
            h2 {
                font-size: 35px !important;
            }
            .blog-post-img {
                float: none;
                text-align: center;
                margin: 0 auto !important;
                margin-bottom: 20px !important;
            }
        }
    }
    .edit-btn,
    .delete-btn {
        color: #0c3cac;
        border: 1px solid #0c3cac;
        border-radius: 50%;
        padding: 5px;
        margin: 0 5px;
    }
    .delete-btn {
        border-color: #d90000;
        color: #d90000 !important;
    }
    .add-review-btn {
        background: #d5242c !important;
        color: #ffffff;
    }
}
</style>
