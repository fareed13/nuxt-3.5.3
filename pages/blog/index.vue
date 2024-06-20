<template>
  <div>
    <LandingPageBanner :header="CustomTitle" />
    <BlogList />
  </div>
</template>

<script>
import { tagsData, headData } from '../../composables/MetaTags'
import LandingPageBanner from '@/components/LandingPageBanner'
import BlogList from '@/components/blog/BlogList'

export default {
  async setup() {
        const { titleFromAPI, descriptionFromAPI, headlineFromAPI, cssText } = await tagsData();
        // for seo 
        useHead(headData(titleFromAPI, descriptionFromAPI, cssText));
        return {
          titleFromAPI,
          descriptionFromAPI,
          headlineFromAPI,
          cssText
        };
    },
  components: {
    LandingPageBanner,
    BlogList
  },
  data: () => ({
    CustomTitle: 'Blog'
  })

}
</script>
