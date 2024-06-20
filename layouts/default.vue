<template>
  <v-app class="app-overflow">
          <div v-on:mouseleave="mouseleaves" class="home">
          <component :is="HeaderComponent" :critical="true" />
          <slot />
          <component :is="FooterComponent" :critical="true"/>

      </div>
  </v-app>
</template>

<script>
import { abbiStore } from '../stores';
import { mapActions, mapState } from 'pinia'
export default {
  setup () {
      const store = abbiStore()
      return {
      store
      }
  },

  data: () => ({
      dialog: false
  }),
computed: {
    ...mapState(abbiStore, ['organization', 'auth']),
    HeaderComponent() {
        const organization = this.store.organization;
            const component = organization.shared?.header
                ? organization.shared.header
                : 'HeaderDefault';
        return defineAsyncComponent(()=> import(`../components/header/${component}.vue`));
    },
    FooterComponent() {
          const organization = this.store.organization;
          const component = organization.shared?.footer
              ? organization.shared.footer
              : 'FooterDefault';
          return defineAsyncComponent(()=> import(`../components/footer/${component}.vue`));
    }
  },

  created() {
      const token = useCookie('auth._token.local').value
      const user = useCookie('user').value
      if(!!token){
          this.store.setAuth({loggedIn:true, user:{...user}})
      }

      const cookie = useCookie('client_id')
      if (!cookie.value) {
          const cookieValue = Math.random().toString(36).substring(2) + Date.now().toString(36);
          cookie.value = cookieValue
      }
  },

  mounted() {
    this.checkSetupCompletion()
    const utmSource = useCookie('utm_source')
    const utmMedium = useCookie('utm_medium')
    const utmCampaign = useCookie('utm_campaign')
    const topic1 = useCookie('topic_1')
    if (this.$route.query.utm_source) {
        utmSource.value = this.$route.query.utm_source
    } else if (
        !utmSource.value && utmSource.value !== 'Organic'
    ) {
        utmSource.value = 'Organic'
    }

    if (this.$route.query.utm_medium) {
        utmMedium.value = this.$route.query.utm_medium
    } else if (
        !utmMedium.value &&
        utmMedium.value !== 'None'
    ) {
        utmMedium.value = 'None'
    }

    if (this.$route.query.utm_campaign) {
        utmCampaign.value = this.$route.query.utm_campaign
    } else if (
        !utmCampaign.value &&
        utmCampaign.value !== 'None'
    ) {
        utmCampaign.value = 'None'
    }

    if (this.$route.query.topic_1) {
        topic1.value = this.$route.query.topic_1
    } else if (
        !topic1.value &&
        topic1.value !== 'None'
    ) {
        topic1.value = 'None'
    }
  },
  methods: {
      ...mapActions(abbiStore, ['setDialog']),
      mouseleaves() {
        if (!(document.activeElement.tagName === 'INPUT')) {
            const haveSeenPopup = useCookie('have_seen_popup', { maxAge: 30 * 60 })
          if (!haveSeenPopup.value) {
            haveSeenPopup.value = true;
            if (!this.auth.loggedIn) {
              this.setDialog(true)
            }
          }
        }
      },
      checkSetupCompletion() {
        if (this.store.organization.is_setup_completed !== undefined && !this.store.organization.is_setup_completed ) {
          return this.$router.push('/setup')
        }
      }
  }
};
</script>

<style lang="scss">
.v-application {
  background-color: #fff !important;
}
.desk-form {
  .v-text-field--filled > .v-input__control > .v-input__slot,
  .v-text-field--full-width > .v-input__control > .v-input__slot,
  .v-text-field--outlined > .v-input__control > .v-input__slot {
      min-height: 40px;
  }
  .v-text-field--outlined .v-label {
      top: 10px;
  }
  .v-text-field__details {
      display: none !important;
  }
}
 @media only screen and (max-width: 767px) {
    .app-overflow{
        overflow: hidden;
    }
 }
</style>
