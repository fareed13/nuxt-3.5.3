import { abbiStore } from '../stores';
import { mapState, mapActions } from 'pinia';
export const footerMixin = {
  data () {
    return {
      loading: false,
      schoolType: 'Fitness Classes',
      mainLinks: [
        { text: 'Home', url: '/', show: true },
        { text: 'Programs', url: '/classes', show: true },
        { text: 'Instructors', url: '/instructors', show: true },
        { text: 'Schedule', url: '/schedule', show: true },
        { text: 'Contact', url: '/contact', show: true },
        { text: 'Login', url: '/login', show: true }
      ],
      industryChoices: {
        fitness_center: 'Fitness Center',
        salon: 'Salon',
        junk_removal: 'Junk Removal'
      }
    }
  },
  computed: {
    ...mapState(abbiStore, ['organization', 'auth', 'isAustralia', 'locations', 'location', 'getLogo', 'domain']),
    logo () {
      return this.getLogo
    },
    phoneLink () {
      return 'tel:' + (this.location.phone ? this.location.phone : '')
    },
    mailLink() {
      return 'mailto:' + (this.location.email ? this.location.email : '')
    }
  },
  watch: {
    auth(loggedIn) {
      if (loggedIn) this.mainLinks[5].show = false;
      else this.mainLinks[5].show = true;
    }
  },
  created () {
    const location = this.location
    const organization = this.organization
    if (organization.school_type) this.mainLinks[1].text = organization.school_type
    const staffs = organization.staffs
    if (staffs.length === 1) {
      this.mainLinks[2] = {
        text: organization.industry_type === 'salon' ? 'Stylists' : 'Instructors',
        url: '/instructors/' + staffs[0].slug,
        show: true
      }
    }
    if (organization.industry_type === 'salon') {
      this.mainLinks[1].text = 'Services'
    }
    if(location.instructor_text_override) {
      this.mainLinks[2].text = location.instructor_text_override;
    }
    if (location.schedules_count < 1 || organization.industry_type === 'salon') {
      this.mainLinks[3].show = false
    }
    if (organization.school_type != null) {
      this.schoolType = organization.school_type
    }
  },

  methods: {
    ...mapActions(abbiStore, ['setLeadFormInfo', 'setDialog']),
  }
}
