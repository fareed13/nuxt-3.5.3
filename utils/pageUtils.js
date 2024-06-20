export const is_global_page = (page) => {
  const config = useRuntimeConfig().public
  
  return page.location === config.ABBI_DEFAULT_LOCATION_ID || page.slug === 'homepage' ? true : false
}
export const is_global_page_by_slug = (slug, pages) => {
  const config = useRuntimeConfig().public

  const page = pages.find(p => p.slug === slug)
  return page && page.location === config.ABBI_DEFAULT_LOCATION_ID || page.slug === 'homepage' ? true : false
}

export const check_page_in_menu = (organization, page) => {
  if (organization.additional_headers.find(ah => ah.text === page.name)) {
    return true
  }
  return false
}

export const check_content_http = (content) => {
  if (content && content.includes('http://')) {
    return true
  }
  return false
}
