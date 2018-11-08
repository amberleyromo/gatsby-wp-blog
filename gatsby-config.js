module.exports = {
  siteMetadata: {
    title: `amberley dot blog`,
    subtitle: `Gatsby + WP`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Amberley Dot Blog",
        short_name: "amberleyblog",
        start_url: "/",
        background_color: "#f49985",
        theme_color: "#fff7f3",
        display: "minimal-ui",
        icons: [
          {
            src: `/favicons/icon-192x192.png`,
            sizes: `192x192`,
            type: `image/png`
          },
          {
            src: `/favicons/icon-512x512.png`,
            sizes: `512x512`,
            type: `image/png`
          }
        ]
      }
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        baseUrl: `amberley.me`,
        protocol: `https`,
        hostingWPCOM: false,
        useACF: false,
        excludedRoutes: [
          "/*/*/key",
          "/*/*/settings",
          "/*/*/stats",
          "/*/*/users/*"
        ]
      },
      verboseOutput: true
    },
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-accessibilityjs`,
      options: {
        injectStyles: false,
        errorClassName: false
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-112664995-1",
        anonymize: true
      }
    },
    `gatsby-plugin-twitter`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `/src/utils/typography.js`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `weeklies`,
        path: `${__dirname}/content/weeklies`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `resources`,
        path: `${__dirname}/content/resources`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-code-titles`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 786,
              backgroundColor: `#ffffff`
            }
          },
          `gatsby-remark-autolink-headers`
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`
  ]
};
