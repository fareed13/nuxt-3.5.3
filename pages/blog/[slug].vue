<template>
    <div>
        <LandingPageBanner :header="customHeader" />
        <BlogDetails
            :title="customHeader"
            :media="media"
            :content="content"
            :files="files"
            :extension="extension"
        />
    </div>
</template>

<script>
import { tagsData, headData } from '../../composables/MetaTags';
import LandingPageBanner from '@/components/LandingPageBanner';
import BlogDetails from '@/components/blog/BlogDetail';
import { abbiStore } from '../../stores';

export default {
    async setup() {
        const store = abbiStore();
        const { titleFromAPI, descriptionFromAPI, headlineFromAPI, cssText } =
            await tagsData();
        useHead(headData(titleFromAPI, descriptionFromAPI, cssText));
        return {
            store,
            titleFromAPI,
            descriptionFromAPI,
            headlineFromAPI,
            cssText
        };
    },
    components: {
        LandingPageBanner,
        BlogDetails
    },
    data: () => {
        return {
            CustomTitle: 'Blog',
            customHeader: null,
            media: null,
            files: [],
            content: null,
            extension: null
        };
    },
    mounted() {
        const blogSlug = this.$route.params.slug;
        const blogId = parseInt(blogSlug.split('-').pop());
        const targetedBlog = this.store.location.blogs.find(
            (b) => b.id === blogId
        );
        this.customHeader = targetedBlog.title;
        this.media = targetedBlog.media ? targetedBlog.media : null;
        this.content = targetedBlog.content;
        this.files = targetedBlog.blog_files
            ? targetedBlog.blog_files.map((bf) => bf.file_path)
            : [];
        this.extension = targetedBlog.media ? targetedBlog.media.extension : '';
    }
};
</script>

<style lang="scss" scoped>
@import '../../assets/sass/colors';
.video-gallery {
    h2 {
        text-align: center;
        font-size: 50px;
    }
    .col-12 {
        margin-bottom: 20px;
    }
    .video-box {
        iframe.video {
            height: 500px;
            border: 5px solid #000000;
        }

        h3 {
            text-align: center;
            font-size: 36px;
            // font-family: $Khand-Medium !important;
        }
    }

    @media (max-width: 1903px) {
        .video-box {
            iframe.video {
                height: 320px;
            }
        }
    }

    @media (max-width: 1263px) {
        .video-box {
            iframe.video {
                height: 230px;
            }
        }
        h2 {
            font-size: 36px;
        }
    }

    @media (max-width: 767px) {
        .video-box {
            iframe.video {
                height: 200px;
            }
        }
    }

    @media (max-width: 600px) {
        .video-box {
            iframe.video {
                height: 300px;
            }
        }
    }

    @media (max-width: 450px) {
        .video-box {
            iframe.video {
                height: 220px;
            }
        }
    }
}
</style>
