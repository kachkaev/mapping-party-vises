module.exports = {
  productionBrowserSourceMaps: true,
  future: {
    webpack5: true,
  },
  redirects: () => [
    {
      source: "/",
      destination: "/map-comparison",
      permanent: false,
    },
  ],
};
