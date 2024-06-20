import { abbiStore } from "../stores";
async function tagsData() {
  const store = abbiStore()
  const config = useRuntimeConfig().public;
  const route = useRoute();

  // GET SEO
  let titleFromAPI = "";
  let descriptionFromAPI = "";
  let headlineFromAPI = "";
  let cssText = "";
  let locationId = "";
  let slug = route.params.slug || "";
  let page_name = route.params.page || route.name || "";
  if (page_name === 'classes-slug-location') {
    let locationName = route.params.location || "";
    locationName = locationName.replace(/-/g, ' ');
    const targetedLocation = store.locations.find(l => l.city.toLowerCase() === locationName.toLowerCase());
    locationId = targetedLocation ? targetedLocation.id : ''
  }
  if (page_name === 'locations-slug'){
    const targetLoc = store.targetLocations.find(tl => tl.name.toLowerCase().replace(' ', '-') === slug)
    locationId = targetLoc === undefined ? '' : targetLoc?.location
  }

  const [{ data: metaResponse }, { data: cssResponse }] = await Promise.all([
    useFetch(`${config.BACKEND_URL}/website/metatags/?organization_id=${store.organization.id}&page_name=${page_name}&page_slug=${slug}&location_id=${locationId}`),
    useFetch(`${config.BACKEND_URL}/website/css/?domain=${config.DEFAULT_PAGE_DOMAIN}`)
  ])
  titleFromAPI = metaResponse._value?.title || '';
  descriptionFromAPI = metaResponse._value?.description || '';
  headlineFromAPI = metaResponse._value?.headline || '';
  cssText = cssResponse._value;

  return {
    titleFromAPI,
    descriptionFromAPI,
    headlineFromAPI,
    cssText
  }
}

function headData(title, description, cssText) {
  const store = abbiStore()
  const organization = store.organization;

  const logo = store.getLogo;
  const favicon = store.getLogo;
  const domain = 'https://' + store.domain;

  return {
    title,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: description
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: title
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: organization.name
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: description
      },
      {
        property: 'og:image',
        content: logo
      },
      {
        property: 'og:url',
        content: domain
      },
      {
        name: 'twitter:title',
        content: title
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: description
      },
      {
        name: 'twitter:image',
        content: logo
      }
    ],
    link: [
      { rel: 'canonical', href: domain },
      { rel: 'icon', href: logo },
      { rel: 'shortcut icon', href: logo },
      // { rel: 'apple-touch-icon', href: logo },
      { rel: 'icon', type: 'image/x-icon', href: favicon }
    ],
    style: [
      cssText
    ]
  }
}

export { tagsData, headData }