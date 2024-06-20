import { mediaMixin } from './mediaMixin';
import { mapState, mapActions } from 'pinia'
import { abbiStore } from '../stores';

export const sections = {
  props: ['headline', 'subtitle', 'section', 'content', 'backgroundImage', 'bullets', 'media', 'backgroundColor', 'customBullets', 'url', 'interactiveVideo'],
  data: () => ({
    sectionReady: true
  }),
  mixins:[mediaMixin],
  mounted(){
  },
  computed: {
    ...mapState(abbiStore, ['callToAction','auth']),
},
  methods: {
    ...mapActions(abbiStore, ['setDialog','setSelectedPlan']),

    openDialog(componentName) {
      if(!this.auth.loggedIn) {
        this.setSelectedPlan(null)
        this.setDialog(true)
      }
      this.$gtag('event', 'secure_your_class_clicked', {
       button: componentName + '_button'
      })
    }
  }
}
