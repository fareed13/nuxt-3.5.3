<template>
    <div>
        <LandingPageBanner v-show="showHeader" :header="headline" />
        <div v-if="ready">
            <client-only>
                <div v-for="(section, i) in sections" :key="i">
                    <component
                        :is="section.component"
                        :headline="section.headline"
                        :content="section.content"
                        :media="section.media"
                        :bullets="section.bullets"
                        :count_of_programs="section.countOfPrograms"
                        :count_of_reviews="section.countOfReviews"
                        :backgroundImage="section.backgroundImage"
                        :customBullets="section.customBullets"
                        :url="section.url"
                        :interactiveVideo="section.interactiveVideo"
                    />
                </div>
            </client-only>
        </div>
    </div>
</template>


<script>
import { tagsData, headData } from '../composables/MetaTags';
import { ComponentsMixin } from '../mixins/componentsMixin';
// import { authMixin } from '../mixins/authMixin';
import { is_global_page } from '../utils/pageUtils';
import { abbiStore } from '../stores';
import { mapActions, mapState } from 'pinia';
import { defineComponent } from 'vue';

export default defineComponent({
    async setup() {
        const store = abbiStore();
        const { titleFromAPI, descriptionFromAPI, headlineFromAPI, cssText } = await tagsData();
        // for seo 
        useHead(headData(titleFromAPI, descriptionFromAPI, cssText));
        return {
            store,
            titleFromAPI,
            descriptionFromAPI,
            headlineFromAPI,
            cssText
        };
    },
    mixins: [ComponentsMixin],
    data: () => ({
        ready: true,
        page_name: '',
        sections: [],
        showHeader: '',
        trackingEventName: '',
        route: '',
        page: null,
        selected_section: null,
        deletePopup: false,
        is_global_page,
        headline:null
    }),
    computed: {
        ...mapState(abbiStore, ['auth']),
        renderOrganizationName() {
            const targetPaths = ['/reviews', '/contact'];
            return targetPaths.some(path => this.$route.path.includes(path));
        }
    },
    
    created() {
        const route = this.$route.params.page;
        const page = this.store.allPages.find((p) => p.slug == route);
        if (!page) {
            window.location.href = '/';
        } else if (page.is_member_only && !this.auth.loggedIn) {
            this.$router.push('/');
        } else {
            this.page = page;
            this.page_name = page.name;
            this.showHeader = page.show_header;
            this.ready = true;
            this.sections = [];
            page.content.forEach((section) => {
                this.sections.push(section);
            });
            this.trackingEventName = page.tracking_event_name;
            this.headline= this.renderOrganizationName ? this.headlineFromAPI : page.name
        }
    },
    methods: {
        ...mapActions(abbiStore, ['setPageEditPopup']),
        editSections(index) {
            this.selected_section = index;
            this.setPageEditPopup(true);
        }
    }
});
</script>

<style scoped>
.first-section .v-image__image.v-image__image--contain {
    background: none !important;
}
.build {
    background-color: red;
    margin: 178px;
    color: yellow;
}
</style>
