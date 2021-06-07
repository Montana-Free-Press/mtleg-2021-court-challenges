/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `Laws on trial – Montana Capitol lawsuit tracker`,
    description: `MTFP's digital guide to the 2021 laws that have been challenged in court and where those cases stand.`,
    author: `Eric Dietrich / Montana Free Press`,
    siteUrl: `https://www.apps.montanafreepress.org/montana-legislature-lawsuit-tracker/`,
    keywords: ['Montana', 'Legislature', 'House', 'Senate', 'bills', 'lawsuits', 'court', 'Montana Supreme Court', 'abortion', 'gun control', 'voting rights', 'gun rights', 'politics'],
    // hacky as hell
    image: "https://apps.montanafreepress.org/montana-legislature-lawsuit-tracker/images/lawsuit-tracker.png"
  },
  // pathPrefix: `/draft-lawsuit-tracker-2021`, // staging
  pathPrefix: `/montana-legislature-lawsuit-tracker`, // for S3
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-anchor-links`,
      options: {
        offset: -140,
      }
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-emotion`, // styled components
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-MHCJEWF70Y",
        ]
      }
    },
    // {
    //   resolve: `gatsby-plugin-parsely-analytics`,
    //   options: {
    //     apikey: 'montanafreepress.org',
    //     enableInDevelopment: false // send page views when NODE_ENV !== prod
    //   }
    // },
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-webpack-size`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Laws on trial – Montana Capitol lawsuit tracker`,
        short_name: `Laws on trial`,
        description: `Multiple legal challenges have been filed against measures passed by the 2021 Montana Legislature. Here’s where each case stands.`,
        start_url: `/`,
        icon: `static/mtfp-icon.png`,
        background_color: `#eae3da`,
        theme_color: `#F85028`,
        display: `standalone`,
      },
    },
  ],
}
