<template>
  <div class="mainIndex">
    <div v-if="ready">
      <div v-for="(section, i) in sections" :key="i">
        <component
          :is="section.component"
          :headline="section.headline"
          :subtitle="section.subtitle"
          :content="section.content"
          :media="section.media"
          :bullets="section.bullets"
          :count_of_programs="section.countOfPrograms"
          :count_of_reviews="section.countOfReviews"
          :backgroundImage="section.backgroundImage"
          :backgroundColor="section.backgroundColor"
          :customBullets="section.customBullets"
          :url="section.url"
          :interactiveVideo="section.interactiveVideo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { abbiStore } from "../stores";
import { mapActions } from 'pinia'
import { defineComponent } from "vue";
import { ComponentsMixin } from "../mixins/componentsMixin";
// import { authMixin } from "../mixins/authMixin";
import { tagsData, headData } from '../composables/MetaTags';

export default defineComponent({
  async setup() {
    const config = useRuntimeConfig().public
    const store = abbiStore();
    const { titleFromAPI, descriptionFromAPI, headlineFromAPI, cssText } = await tagsData();
        // for seo
    useHead(headData(titleFromAPI, descriptionFromAPI, cssText));
    return {
      store,
      config,
      titleFromAPI,
      descriptionFromAPI,
      headlineFromAPI,
      cssText
    };
  },
  mixins: [ ComponentsMixin],
  data: () => ({
    selected_section: null,
    CustomTitle: "",
    Description: "",
    dialog: false,
    ready: false,
    page_name: "",
    sections: [],
    trackingEventName: "",
    page: null,
    deletePopup: false,
    loading: false,
    showHeader: false,
    gTag: "",
  }),

  created() {
    const location = this.store.location;
    const homepage = location.pages.find((i) => i.slug === "homepage");
    if (homepage.length === 0) {
      this.$router.push("/");
    } else {
      this.page = homepage;
      this.showHeader = homepage.show_header;
      this.sections = this.page.content;
      this.ready = true;
      this.trackingEventName = homepage.tracking_event_name;
    }
  },
  methods: {
    ...mapActions(abbiStore, ['setPageEditPopup']),
    editSections(index) {
      this.selected_section = index;
      this.setPageEditPopup(true);
    },
  },
  jsonld() {
    const data = this.store.location;
    const organization = this.store.organization;
    return {
      "@context": "http://schema.org",
      "@type": "LocalBusiness",
      url: "https://" + this.store.domain,
      name: organization.name,
      priceRange: "$$",
      logo: `${this.config.AMAZONAWS_IMAGE_URL}${organization.primary_logo.uuid}_350.${organization.primary_logo.extension}`,
      image: `${this.config.AMAZONAWS_IMAGE_URL}${organization.primary_logo.uuid}_350.${organization.primary_logo.extension}`,
      telephone: "+1-" + data.phone,
      geo: {
        "@type": "GeoCoordinates",
        latitude: data.latitude,
        longitude: data.longitude,
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: data.street,
        addressLocality: data.city,
        addressRegion: data.state.name,
        postalCode: data.zip_code,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-" + data.phone,
        contactType: "Customer service",
      },
    };
  },
});
</script>

<style>
.mainIndex {
  margin-top: 80px;
}
@media (max-width: 667px) {
    .mainIndex{
    /* margin-top: 180px!important; */
}
}
</style>
