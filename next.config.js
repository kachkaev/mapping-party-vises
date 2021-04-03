module.exports = {
  productionBrowserSourceMaps: true,
  future: {
    webpack5: true,
  },
  redirects: () => [
    {
      source: "/",
      destination: "/before-after",
      permanent: false,
    },
  ],
};
