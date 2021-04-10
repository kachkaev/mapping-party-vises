module.exports = {
  productionBrowserSourceMaps: true,
  future: {
    webpack5: true,
  },
  i18n: {
    locales: ["en", "ru"],
    defaultLocale: "en",
  },
  redirects: () => [
    {
      source: "/",
      destination: "/map-comparison",
      permanent: false,
    },
  ],
};
