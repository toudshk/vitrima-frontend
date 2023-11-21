export const getWorkUrl = (slug: string) => `/work/${slug}`
export const getUsersUrl = (slug: string) => `/users/${slug}`

export const getAdminUrl = (url: string) => `/admin-page/${url}`
export const getAdminHomeUrl = () => getAdminUrl('').slice(0, -1)
