/** Resolve public assets against the deployment base, preserving external URLs. */
export const assetUrl = (url: string) =>
  url.startsWith('/') && !url.startsWith('//')
    ? `${import.meta.env.BASE_URL}${url.slice(1)}`
    : url;
