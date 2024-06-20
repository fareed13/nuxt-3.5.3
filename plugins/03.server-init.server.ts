import { abbiStore } from "../stores/index";
import axios from "axios";

export default defineNuxtPlugin(async (nuxtApp) => {
  const store = abbiStore();

  try {
    let domain = useRuntimeConfig().public.DEFAULT_PAGE_DOMAIN
    const baseUrl = useRuntimeConfig().public.BACKEND_URL

    store.$patch({
      domain: domain,
      domainRequest: domain
    })
    const res = await axios.get(`${baseUrl}/website/?domain=${domain}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': null
        },
      });
      const data = res.data

    const targetLoc = await axios.get(`${baseUrl}/website/store/target-location/?domain=${domain}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': null
        },
      });
    const targetLocations = targetLoc.data

    const organization = data[0];
    const locations = [...organization.locations]
    const location = locations[0];
    // only show if website not suspended
    if (organization.website_status !== 'suspended') {
      if (location.colors === null) {
        location.colors = {}
      }

      store.$patch({
        location: location,
        organization: organization,
        locations: locations,
        landingPages: location.landing_pages,
        allPages: organization.page,
        targetLocations: targetLocations
      })
    } else {
      console.log("Website is suspended, please contact admin");
    }
  } catch (err) {
    // nuxtApp.$rollbar.error(err)
    console.error(err)
  }


});