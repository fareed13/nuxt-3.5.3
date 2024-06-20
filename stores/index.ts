import { defineStore } from 'pinia'
import axios from 'axios';


export const abbiStore = defineStore({
    id: 'abbi',
    state: () => ({
      location: '',
      domain: '',
      domainRequest: '',
      checkoutInfo: 'empty',
      locations: [],
      organization:{},
      leadFormInfo: {},
      pixelId: 2438056513083598,
      dialog: false,
      reviewDialog: false,
      banner: true,
      fonts: {},
      userToken: '',
      resetPasswordRequired: false,
      landingPages: [],
      sessionUser: '',
      userRole: null,
      sidebar: false,
      servicePopup: false,
      allContacts: [],
      serviceEditPopup: false,
      isSocketConnected: false,
      pageEditPopup : false,
      selectedEvent: null,
      selectedSchedule: null,
      selectedScheduleDate: null,
      selectedScheduleLocation: null,
      auth: {
        loggedIn: false,
        user:null,
      },
      allPages:[],
      targetLocations: [],
      selectedPlan:null,
      globalStep:null
    }), 
    actions: {
      SOCKET_ONOPEN (event)  {
        this.isSocketConnected = true
      },
      SOCKET_ONCLOSE (event)  {
        this.isSocketConnected = false
      },
      SOCKET_ONERROR (event)  {
        console.error(event)
      },
      SOCKET_ONMESSAGE (message)  {
        console.log('new message arrived')
      },
      setServicePopup(data) {
        this.servicePopup = data
      },
      setServiceEditPopup(data) {
        this.serviceEditPopup = data
      },
      setPageEditPopup (data) {
        this.pageEditPopup = data
      },
      setSidebar(data) {
        this.sidebar = data
      },
      setUserRole(data) {
        this.userRole = data
      },
      setSessionUser(data) {
        this.sessionUser = data
      },
      setUserToken(data) {
        this.userToken = data
      },
      setResetPasswordRequired(data) {
        this.resetPasswordRequired = data
      },
      setLocation(data) {
        this.location = data
      },
      setOrganization(data) {
        this.organization = data
      },
      setLocations(data) {
        this.locations = data
      },
      setDomain(data) {
        this.domain = data
      },
      setDomainRequest(data) {
        this.domainRequest = data
      },
      setCheckoutInfo(data) {
        this.checkoutInfo = data
      },
      setLeadFormInfo(data) {
        this.leadFormInfo = data
      },
      setPixelId(data) {
        this.pixelId = data
      },
      setDialog(data) {
        this.dialog = data
      },
      setReviewDialog(data) {
        this.reviewDialog = data
      },
      setBanner(data) {
        this.banner = data
      },
      setLandingPages(data) {
        this.landingPages = data
      },
      setAllPages(data) {
        this.allPages = data
      },
      setSelectedEvent(data) {
        this.selectedEvent = data
      },
      setSelectedSchedule(data) {
        this.selectedSchedule = data
      },
      setSelectedScheduleDate(data) {
        this.selectedScheduleDate = data
      },
      setSelectedScheduleLocation (data) {
        this.selectedScheduleLocation = data
      },
      setAuth (data) {
        this.auth = data
      },
      setTargetLocations (data) {
        this.targetLocations = data
      },
      async setAllContacts() {
        return axios({
          method: "GET",
          url: '/customer/lite/',
          params: {organization_id: this.organization.id},
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${useCookie('auth._token.local').value}`
          }
        }).then( res => {
          this.allContacts = res.data
          return this.allContacts
        }).catch( err => {
          this.allContacts = []
          return this.allContacts
        })
      },
      setSelectedPlan(data) {
        this.selectedPlan = data
      },
      setGlobalStep(data) {
        this.globalStep = data
      },
    },
    getters: {
      isUk(state) {
        const st = state.location.state;
        return (
          st.name.toLowerCase() === 'united kingdom' ||
          (st.parent_state && st.parent_state.name.toLowerCase() === 'united kingdom')
        );
      },
      isAustralia(state) {
        const st = state.location.state;
        return (
          st.name.toLowerCase() === 'australia' ||
          (st.parent_state && st.parent_state.name.toLowerCase() === 'australia')
        );
      },
      industry_type(state) {
        return state.organization.industry_type
      },
      org_reviews(state) {
        return state.organization.org_reviews
      },
      pages(state) {
        return state.location.pages
      },
      getDomain(state) {
        return state.domain
      },
      getOrganization_id(state) {
        return state.organization.id
      },
      getLocation(state) {
        return state.location
      },
      getTargetLocations(state){
        return state.targetLocations
      },
      getServices(state) {
        return state.organization.services
      },
      promoCode(state) {
        let discount = 100;
        const services = state.organization.services;
        let all_service_plans = services.map(s => s.service_plans)
        all_service_plans = [].concat(...all_service_plans);
        const service_plans = all_service_plans.filter(sp => sp.plan && sp.plan.discounted_price);
        if (service_plans.length > 0) {
          const plan = service_plans[0].plan;
          discount = plan.discounted_price ? (((plan.price - plan.discounted_price) / plan.price) * 100) : 100
        }
        return {
          discount: discount
        }
      },
      getLogo(state) {
        return state.organization.primary_logo && state.organization.primary_logo.uuid
          ? `${useRuntimeConfig().public.AMAZONAWS_IMAGE_URL}${state.organization.primary_logo.uuid}_350.${state.organization.primary_logo.extension}`
          : ''
      },
      callToAction(state) {
        const callToAction = state.location.call_to_action

        if (callToAction) {
          return state.location.call_to_action.replace('#discount#', this.promoCode.discount.toFixed(0) + '%')
        } else {
          return 'Secure Your First Class'
        }
      },
      getLocations(state) {
        return state.locations
      },
      getOrganization(state) {
        return state.organization
      },
      getDomainRequest(state) {
        return state.domainRequest
      },
      getCheckoutInfo(state) {
        return state.checkoutInfo
      },
      getLeadFormInfo(state) {
        return state.leadFormInfo
      },
      getPixelId(state) {
        return state.pixelId
      },
      getDialog(state) {
        return state.dialog
      },
      getReviewDialog(state) {
        return state.reviewDialog
      },
      getBanner(state) {
        return state.banner
      },
      getSocialMediaPlatforms(state) {
        return state.location.socialmedia
      },
      getFacilitiesImageCount(state) {
        return state.location.locationmedias_count
      },
      getUserToken(state) {
        return state.userToken
      },
      getResetPasswordRequired(state) {
        return state.resetPasswordRequired
      },
      getLandingPages(state) {
        return state.landingPages
      },
      getSessionUser(state) {
        return state.sessionUser
      },
      getUserRole(state) {
        return state.userRole
      },
      getSidebar(state) {
        return state.sidebar
      },
      getServicePopup(state) {
        return state.servicePopup
      },
      getServiceEditPopup(state) {
        return state.serviceEditPopup
      },
      getPageEditPopup(state) {
        return state.pageEditPopup
      },
      getAllContacts(state) {
        return state.allContacts
      },
      getAllPages(state) {
        return state.allPages
      },
      getEvents(state) {
        let allevents = state.locations.map(l => l.location_events)
        allevents = [].concat(...allevents);
        return allevents
      },
      getEelectedEvent(state) {
        return state.selectedEvent
      },
      getSelectedSchedule(state) {
        return state.selectedSchedule
      },
      getSelectedScheduleDate(state) {
        return state.selectedScheduleDate
      },
      getOrgCurrencySign(state) {
        let sign = '$';
        if (state.location && state.location.state) {
          if ((state.location.state.name && state.location.state.name.toLowerCase() === 'united kingdom') ||
            (state.location.state.parent_state && state.location.state.parent_state.name && state.location.state.parent_state.name.toLowerCase() === 'united kingdom')
          ) {
            sign = '£';
          }
        }
        return sign;
      },
      getEditorOptions(state) {
        return  {
          // Some Quill options...
          theme: 'snow',
            modules: {
            toolbar: [
              [{ font: [] }, { size: [] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ script: 'super' }, { script: 'sub' }],
              [{ header: [false, 1, 2, 3, 4, 5, 6] }, 'blockquote', 'code-block'],
              [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
              ['direction', { align: [] }],
              ['link', 'image'],
              ['clean'],
              [{ 'color': [] }, { 'background': [] }],
            ]
          }
        }
      },
      getSelectedScheduleLocation(state) {
        return state.selectedScheduleLocation
      },
      getSelectedPlan(state) {
        return state.selectedPlan
      },
      getGlobalStep(state) {
        return state.globalStep
      },
    }
})