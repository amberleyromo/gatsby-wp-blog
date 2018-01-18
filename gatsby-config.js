module.exports = {
  siteMetadata: {
    title: 'amberley.me',
    subtitle: 'Gatsby + WP'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        baseUrl: 'amberley.me',
        protocol: 'https',
        hostingWPCOM: false,
        useACF: false
      },
      verboseOutput: true,
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-glamor',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography.js',
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-112664995-1",
        anonymize: true,
      },
    },
  ],
  
};
